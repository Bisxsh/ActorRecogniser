use actix_web::{get, web, App, HttpServer, Responder, HttpResponse, Error};
use actix_multipart::Multipart;
use futures_util::StreamExt as _;
use actix_cors::Cors;
use serde::{Serialize, Deserialize};
use dotenvy::dotenv;
use reqwest::Client; // For TMDb API call
use aws_sdk_rekognition::types::Image; // For Rekognition Image type
use aws_sdk_rekognition::Client as RekognitionClient; // Alias to avoid name collision

#[derive(Debug, Serialize)]
struct ActorMatch {
    id: Option<u32>,
    name: String,
    match_confidence: f32,
    image_url: Option<String>,
}

#[derive(Debug, Serialize)]
struct ActorMatchesResponse {
    matches: Vec<ActorMatch>,
}

#[derive(Debug, Serialize)]
struct MediaCredit {
    title: String,
    media_type: String,
    release_year: Option<String>,
    image_url: Option<String>,
}

#[derive(Debug, Serialize)]
struct ActorMediaResponse {
    media: Vec<MediaCredit>,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let allowed_origins_shared = vec![
        "http://localhost:5173".to_string(),
        "https://actor-recogniser.vercel.app".to_string(),
    ];

    HttpServer::new(move || {
        let allowed_origins_for_worker = allowed_origins_shared.clone();

        let cors = Cors::default()
            .allowed_origin_fn(move |origin, _req_head| {
                let origin_str = origin.to_str().unwrap_or("");
                allowed_origins_for_worker.contains(&origin_str.to_string())
            })
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .service(hello)
            .service(
                web::resource("/identify-actor")
                    .route(web::post().to(identify_actor))
            )
            .service(web::resource("/actor-media/{id}").route(web::get().to(actor_media)))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}

#[get("/")]
async fn hello() -> impl Responder {
    "Hello from Actix Web backend!"
}

async fn identify_actor(mut payload: Multipart) -> Result<HttpResponse, Error> {
    dotenv().ok();
    let mut image_bytes: Option<Vec<u8>> = None;

    while let Some(item) = payload.next().await {
        let mut field = item?;
        if let Some(content_disposition) = field.content_disposition() {
            if let Some(name) = content_disposition.get_name() {
                if name == "image" {
                    let mut data = Vec::new();
                    while let Some(chunk) = field.next().await {
                        let chunk = chunk?;
                        data.extend_from_slice(&chunk);
                    }
                    image_bytes = Some(data);
                }
            }
        }
    }

    let img = match image_bytes {
        Some(img) => img,
        None => return Ok(HttpResponse::BadRequest().body("No image file found in request")),
    };

    let config = aws_config::load_defaults(aws_config::BehaviorVersion::latest()).await;
    let rekognition_client = RekognitionClient::new(&config);
    let http_client = Client::new();
    let tmdb_api_key = std::env::var("TMDB_API_KEY").expect("TMDB_API_KEY not set");

    // Call Rekognition recognize_celebrities
    let rekognition_response = rekognition_client
        .recognize_celebrities()
        .image(Image::builder().bytes(img.into()).build())
        .send()
        .await
        .map_err(|e| actix_web::error::ErrorInternalServerError(format!("Rekognition Error: {:?}", e)))?;

    let celebrities = rekognition_response.celebrity_faces();
    let mut matches: Vec<ActorMatch> = Vec::new();
    #[derive(Debug, Deserialize)]
    struct TmdbSearchPersonResponse {
        results: Vec<TmdbPersonResult>,
    }
    #[derive(Debug, Deserialize)]
    struct TmdbPersonResult {
        id: u32,
        name: String,
        profile_path: Option<String>,
        popularity: f64,
    }
    #[derive(Debug, Deserialize)]
    struct TmdbPersonImagesResponse {
        profiles: Vec<TmdbPersonImage>,
    }
    #[derive(Debug, Deserialize)]
    struct TmdbPersonImage {
        file_path: String,
    }
    for celeb in celebrities {
        if let (Some(name), Some(conf)) = (celeb.name(), celeb.match_confidence()) {
            // 1. Search TMDb for this celebrity name
            let tmdb_search_url = format!(
                "https://api.themoviedb.org/3/search/person?api_key={}&query={}",
                tmdb_api_key,
                urlencoding::encode(name)
            );
            let tmdb_search_response: TmdbSearchPersonResponse = http_client
                .get(&tmdb_search_url)
                .send()
                .await
                .map_err(actix_web::error::ErrorInternalServerError)?
                .json()
                .await
                .map_err(actix_web::error::ErrorInternalServerError)?;
            // Find the person with the highest popularity
            if let Some(person) = tmdb_search_response.results.into_iter().max_by(|a, b| a.popularity.partial_cmp(&b.popularity).unwrap_or(std::cmp::Ordering::Equal)) {
                // 2. Get the ID from the response
                let person_id = person.id;
                // 3. Query for their details with images appended
                let tmdb_person_url = format!(
                    "https://api.themoviedb.org/3/person/{}?api_key={}&append_to_response=images",
                    person_id, tmdb_api_key
                );
                #[derive(Debug, Deserialize)]
                struct TmdbPersonWithImages {
                    name: String,
                    images: Option<TmdbPersonImagesResponse>,
                }
                let tmdb_person_response: TmdbPersonWithImages = http_client
                    .get(&tmdb_person_url)
                    .send()
                    .await
                    .map_err(actix_web::error::ErrorInternalServerError)?
                    .json()
                    .await
                    .map_err(actix_web::error::ErrorInternalServerError)?;
                // 4. Get the first image URL from images
                let image_url = tmdb_person_response.images
                    .and_then(|imgs| imgs.profiles.get(0).map(|img| format!("https://image.tmdb.org/t/p/w500{}", img.file_path)));
                // 5. Push to matches
                matches.push(ActorMatch {
                    id: Some(person_id),
                    name: tmdb_person_response.name,
                    match_confidence: conf,
                    image_url,
                });
            }
        }
    }
    Ok(HttpResponse::Ok().json(ActorMatchesResponse { matches }))
}

async fn actor_media(path: web::Path<u32>) -> Result<HttpResponse, Error> {
    let actor_id = path.into_inner();
    dotenv().ok();
    let http_client = Client::new();
    let tmdb_api_key = std::env::var("TMDB_API_KEY").expect("TMDB_API_KEY not set");
    
    // Get movie credits
    let tmdb_movie_credits_url = format!(
        "https://api.themoviedb.org/3/person/{}/movie_credits?api_key={}",
        actor_id, tmdb_api_key
    );
    
    // Get TV credits
    let tmdb_tv_credits_url = format!(
        "https://api.themoviedb.org/3/person/{}/tv_credits?api_key={}",
        actor_id, tmdb_api_key
    );
    
    #[derive(Debug, Deserialize)]
    struct TmdbMovieCreditsResponse {
        cast: Vec<TmdbMovieCast>,
    }
    #[derive(Debug, Deserialize)]
    struct TmdbMovieCast {
        id: u32,
        title: String,
        #[serde(rename = "release_date")]
        release_date: Option<String>,
        #[serde(rename = "poster_path")]
        poster_path: Option<String>,
    }
    
    #[derive(Debug, Deserialize)]
    struct TmdbTvCreditsResponse {
        cast: Vec<TmdbTvCast>,
    }
    #[derive(Debug, Deserialize)]
    struct TmdbTvCast {
        id: u32,
        name: String,
        #[serde(rename = "first_air_date")]
        first_air_date: Option<String>,
        #[serde(rename = "poster_path")]
        poster_path: Option<String>,
    }
    
    // Fetch both movie and TV credits concurrently
    let (movie_credits_response, tv_credits_response) = tokio::join!(
        http_client.get(&tmdb_movie_credits_url).send(),
        http_client.get(&tmdb_tv_credits_url).send()
    );
    
    let movie_credits: TmdbMovieCreditsResponse = movie_credits_response
        .map_err(actix_web::error::ErrorInternalServerError)?
        .json()
        .await
        .map_err(actix_web::error::ErrorInternalServerError)?;
        
    let tv_credits: TmdbTvCreditsResponse = tv_credits_response
        .map_err(actix_web::error::ErrorInternalServerError)?
        .json()
        .await
        .map_err(actix_web::error::ErrorInternalServerError)?;
    
    // Combine and format all media credits
    let mut all_media: Vec<MediaCredit> = Vec::new();
    
    // Add movies
    for cast_entry in movie_credits.cast {
        all_media.push(MediaCredit {
            title: cast_entry.title,
            media_type: "movie".to_string(),
            release_year: cast_entry.release_date.map(|d| d.split('-').next().unwrap_or("").to_string()),
            image_url: cast_entry.poster_path.map(|path| format!("https://image.tmdb.org/t/p/w500{}", path)),
        });
    }
    
    // Add TV shows
    for cast_entry in tv_credits.cast {
        all_media.push(MediaCredit {
            title: cast_entry.name,
            media_type: "tv".to_string(),
            release_year: cast_entry.first_air_date.map(|d| d.split('-').next().unwrap_or("").to_string()),
            image_url: cast_entry.poster_path.map(|path| format!("https://image.tmdb.org/t/p/w500{}", path)),
        });
    }
    
    Ok(HttpResponse::Ok().json(ActorMediaResponse { media: all_media }))
}