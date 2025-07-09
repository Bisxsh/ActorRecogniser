<template>
  <div class="actor-media-section">
    <h2>{{ actor.name }}'s Media</h2>
    <div v-if="movies.length === 0 && tvShows.length === 0" class="no-media-error">
      No movies or TV shows found for this actor.
    </div>
    <div class="media-categories" v-else>
      <div v-if="movies.length > 0" class="media-category">
        <h3>Movies</h3>
        <div class="media-grid">
          <MediaCard v-for="movie in movies" :key="`movie-${movie.title}`" :media="movie" />
        </div>
      </div>

      <div v-if="tvShows.length > 0" class="media-category">
        <h3>TV Shows</h3>
        <div class="media-grid">
          <MediaCard v-for="show in tvShows" :key="`tv-${show.title}`" :media="show" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MediaCard from './MediaCard.vue'
import type { Actor, Media, ActorMedia } from '../../types'

interface Props {
  actor: Actor
  actorMedia: ActorMedia | null
}

const props = defineProps<Props>()

const movies = computed(() => {
  if (!props.actorMedia?.media) return []
  return props.actorMedia.media.filter((item) => item.media_type === 'movie')
})

const tvShows = computed(() => {
  if (!props.actorMedia?.media) return []
  return props.actorMedia.media.filter((item) => item.media_type === 'tv')
})
</script>

<style scoped>
.actor-media-section {
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
}

.actor-media-section h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #222;
  font-size: 1.8rem;
}

.media-categories {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.media-category h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.4rem;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 0.5rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.no-media-error {
  color: #d40000;
  font-weight: 500;
  margin-top: 1rem;
  text-align: center;
}
</style>
