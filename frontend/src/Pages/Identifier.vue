<template>
  <div class="container">
    <h1 class="identifier-title">Who's That Actor</h1>

    <ImageUploader @actor-identified="handleActorIdentified" />

    <div v-if="result && (!result.matches || result.matches.length === 0)" class="no-actor-error">
      Actor not identified, try another image.
    </div>

    <ActorList
      :actors="result?.matches || []"
      :selected-actor="selectedActor"
      @actor-selected="handleActorSelected"
    />

    <ActorMediaSection
      v-if="selectedActor && actorMedia"
      :actor="selectedActor"
      :actor-media="actorMedia"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageUploader from '../components/identifier/imageuploader.vue'
import ActorList from '../components/identifier/actorlist.vue'
import ActorMediaSection from '../components/identifier/actormediasection.vue'
import type { ActorMatchesResponse, Actor, ActorMedia } from '../types'

const result = ref<ActorMatchesResponse | null>(null)
const selectedActor = ref<Actor | null>(null)
const actorMedia = ref<ActorMedia | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

function handleActorIdentified(data: ActorMatchesResponse) {
  result.value = data
  selectedActor.value = null
  actorMedia.value = null
}

async function handleActorSelected(actor: Actor) {
  if (!actor.id) return

  selectedActor.value = actor
  loading.value = true
  error.value = null

  try {
    const response = await fetch(
      `https://actor-recogniser-service-452650917730.europe-west2.run.app//actor-media/${actor.id}`,
    )
    if (!response.ok) {
      throw new Error('Failed to load actor media')
    }
    const data = await response.json()
    actorMedia.value = data
  } catch (e: any) {
    error.value = e.message || 'Failed to load actor media'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
}

.identifier-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin: 0;
}

.no-actor-error {
  color: #d40000;
  background: #fff0f0;
  border: 1px solid #ffd6d6;
  border-radius: 6px;
  padding: 1rem 2rem;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  max-width: 400px;
}
</style>
