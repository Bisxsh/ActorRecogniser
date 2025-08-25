<template>
  <div class="media-card">
    <img
      v-if="media.image_url"
      :src="media.image_url"
      :alt="media.title"
      class="media-img"
      @error="handleImageError"
    />
    <div v-else class="media-img-placeholder">
      <span>{{ media.title.charAt(0) }}</span>
    </div>
    <div class="media-info">
      <div class="media-title">{{ media.title }}</div>
      <div v-if="media.release_year" class="media-year">{{ media.release_year }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Media } from '../../types'

interface Props {
  media: Media
}

defineProps<Props>()

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
  const placeholder = target.nextElementSibling as HTMLElement
  if (placeholder && placeholder.classList.contains('media-img-placeholder')) {
    placeholder.style.display = 'flex'
  }
}
</script>

<style scoped>
.media-card {
  background: #fafbfc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.media-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.media-img {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  background: #eee;
}

.media-img-placeholder {
  width: 100%;
  aspect-ratio: 2/3;
  height: auto;
  min-height: 180px;
  font-size: 3rem;
  border-radius: 8px;
  background: #eee;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-img-placeholder span {
  display: block;
  width: 100%;
  text-align: center;
  font-size: inherit;
  color: inherit;
}

.media-info {
  padding: 0.75rem;
}

.media-title {
  font-weight: 600;
  color: #222;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  line-height: 1.3;
}

.media-year {
  color: #666;
  font-size: 0.8rem;
}
</style>
