<template>
  <div class="image-uploader">
    <label for="image-input" class="visually-hidden">Upload Image</label>
    <input
      id="image-input"
      type="file"
      accept="image/*"
      @change="onFileChange"
      ref="fileInput"
      style="display: none"
    />
    <div
      class="drop-area"
      tabindex="0"
      @paste="onPaste"
      @dragover.prevent
      @drop.prevent="onDrop"
      @click="triggerFileInput"
    >
      <span>Click to upload an image or paste an image here</span>
    </div>
    <div v-if="imageUrl" class="cropper-area">
      <Cropper
        ref="cropperRef"
        :src="imageUrl"
        :stencil-props="{ aspectRatio: 1 }"
        :auto-zoom="true"
        :resize-image="true"
        class="cropper"
        @change="onCrop"
      />
    </div>
    <div v-if="croppedImage" class="preview">
      <img :src="croppedImage" alt="Cropped Preview" />
    </div>
    <button v-if="croppedImage && !loading" class="submit-btn" type="button" @click="onSubmit">
      Submit
    </button>
    <div v-if="loading" class="loading">Submitting...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import type { ActorMatchesResponse } from '../types'

const emit = defineEmits<{
  'actor-identified': [result: ActorMatchesResponse]
}>()

const imageUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const cropperRef = ref<any>(null)
const croppedImage = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files && files[0]) {
    const file = files[0]
    if (file.type.startsWith('image/')) {
      imageUrl.value = URL.createObjectURL(file)
      croppedImage.value = null
      error.value = null
    }
  }
}

function onPaste(event: ClipboardEvent) {
  const items = event.clipboardData?.items
  if (!items) return
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        imageUrl.value = URL.createObjectURL(file)
        croppedImage.value = null
        error.value = null
        break
      }
    }
  }
}

function onDrop(event: DragEvent) {
  const files = event.dataTransfer?.files
  if (files && files[0] && files[0].type.startsWith('image/')) {
    imageUrl.value = URL.createObjectURL(files[0])
    croppedImage.value = null
    error.value = null
  }
}

function onCrop() {
  if (cropperRef.value) {
    const canvas = cropperRef.value.getResult().canvas
    if (canvas) {
      croppedImage.value = canvas.toDataURL('image/png')
    }
  }
}

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    if (!croppedImage.value) return
    const res = await fetch(croppedImage.value)
    const blob = await res.blob()
    const formData = new FormData()
    formData.append('image', blob, 'image.png')
    const response = await fetch('http://localhost:8080/identify-actor', {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      throw new Error('Failed to identify actor')
    }
    const data = await response.json()
    emit('actor-identified', data)
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.drop-area {
  border: 2px dashed #aaa;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  text-align: center;
  color: #888;
  min-width: 250px;
  outline: none;
  cursor: pointer;
}
.drop-area:focus {
  border-color: #333;
}
.preview img {
  max-width: 300px;
  max-height: 300px;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.submit-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: #0078d4;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: #005fa3;
}
.cropper-area {
  width: 320px;
  height: 320px;
  margin-top: 1.5rem;
  background: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cropper {
  width: 300px;
  height: 300px;
}
.loading {
  margin-top: 1rem;
  color: #0078d4;
  font-weight: 500;
}
.error {
  margin-top: 1rem;
  color: #d40000;
  font-weight: 500;
}
</style>
