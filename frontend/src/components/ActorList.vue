<template>
  <div v-if="actors && actors.length" class="matches-row">
    <ActorCard
      v-for="actor in actors"
      :key="actor.id || actor.name"
      :actor="actor"
      :is-selected="selectedActor?.id === actor.id"
      @click="handleActorClick"
    />
  </div>
</template>

<script setup lang="ts">
import ActorCard from './ActorCard.vue'
import type { Actor } from '../types'

interface Props {
  actors: Actor[]
  selectedActor: Actor | null
}

defineProps<Props>()

const emit = defineEmits<{
  'actor-selected': [actor: Actor]
}>()

function handleActorClick(actor: Actor) {
  emit('actor-selected', actor)
}
</script>

<style scoped>
.matches-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
