export interface Actor {
  id: number | null
  name: string
  match_confidence: number
  image_url: string | null
}

export interface ActorMatchesResponse {
  matches: Actor[]
}

export interface Media {
  title: string
  media_type: string
  release_year: string | null
  image_url: string | null
}

export interface ActorMedia {
  media: Media[]
}
