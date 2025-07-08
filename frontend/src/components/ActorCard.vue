<template>
  <div class="actor-card" @click="$emit('click', actor)" :class="{ selected: isSelected }">
    <img
      v-if="actor.image_url"
      :src="actor.image_url"
      :alt="actor.name"
      class="actor-img"
      @error="handleImageError"
    />
    <div v-else class="actor-img-placeholder">
      <span>{{ actor.name.charAt(0) }}</span>
    </div>
    <div class="actor-name">{{ actor.name }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Actor } from '../types'

interface Props {
  actor: Actor
  isSelected?: boolean
}

defineProps<Props>()

defineEmits<{
  click: [actor: Actor]
}>()

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
  const placeholder = target.nextElementSibling as HTMLElement
  if (placeholder && placeholder.classList.contains('actor-img-placeholder')) {
    placeholder.style.display = 'flex'
  }
}
</script>

<style scoped>
.actor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  background: #fafbfc;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.actor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.actor-card.selected {
  border: 2px solid #0078d4;
  transform: translateY(-2px);
}

.actor-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: #eee;
}

.actor-img-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: #eee;
  border-radius: 8px;
  color: #aaa;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  position: relative;
}

.actor-img-placeholder span {
  display: block;
  width: 100%;
  text-align: center;
  font-size: inherit;
  color: inherit;
}

.actor-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
  text-align: center;
  margin-top: 0.25rem;
}
</style>
