<template>
  <div class="image-uploader-outer">
    <div
      class="image-uploader-box"
      @dragover.prevent="dragActive = true"
      @dragleave.prevent="dragActive = false"
      @drop.prevent="onDrop"
      :class="{ 'drag-active': dragActive }"
    >
      <input
        id="image-input"
        type="file"
        accept="image/png, image/jpeg, application/pdf"
        @change="onFileChange"
        ref="fileInput"
        style="display: none"
        capture="environment"
      />
      <template v-if="dragActive && !(imageUrl && isImage)">
        <div class="drop-message">
          <div class="upload-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 16l-4-4-4 4"
                stroke="#b0b0b0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12v7"
                stroke="#b0b0b0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 16.25"
                stroke="#b0b0b0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="drop-message-text">Drop an image here</div>
        </div>
      </template>
      <template v-else>
        <!-- Hide uploader UI when cropper is visible -->
        <template v-if="!(imageUrl && isImage)">
          <div class="upload-area" @click="triggerFileInput">
            <div class="upload-icon">
              <!-- Simple cloud upload SVG icon -->
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 16l-4-4-4 4"
                  stroke="#b0b0b0"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 12v7"
                  stroke="#b0b0b0"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 16.25"
                  stroke="#b0b0b0"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="upload-label">Paste, drag or tap to upload photo</div>
            <div class="upload-subtitle">PNG or JPG</div>
          </div>
          <div class="divider-row">
            <div class="divider"></div>
            <span class="divider-text">OR</span>
            <div class="divider"></div>
          </div>
          <button class="camera-btn" type="button" @click="openCamera">Open camera</button>
        </template>
        <!-- ...rest of uploader UI (camera modal, cropper, etc.)... -->
        <div v-if="showCamera" class="camera-modal">
          <div class="camera-modal-content">
            <video ref="videoRef" autoplay playsinline class="camera-video"></video>
            <div class="camera-controls">
              <button class="capture-btn" @click="capturePhoto">Take Photo</button>
              <button class="close-btn" @click="closeCamera">Cancel</button>
            </div>
          </div>
        </div>
        <div v-if="imageUrl && isImage" class="cropper-area-wrapper">
          <div class="remove-image-row">
            <button class="close-cropper-btn" @click="deleteImage" title="Remove image">
              &times;
            </button>
            <span class="remove-image-label">Remove image</span>
          </div>
          <div class="cropper-area">
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
        </div>
        <div v-if="pdfName && !isImage" class="preview pdf-preview">
          <span>{{ pdfName }}</span>
        </div>
        <div v-if="loading" class="loading">
          <DotLottieVue
            style="height: 100px; width: 100px"
            autoplay
            loop
            src="https://lottie.host/1dc88740-2baa-417f-90a7-7148f30ba334/dojnWDdx52.lottie"
          />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </template>
    </div>
    <!-- Preview and submit button outside border -->
    <div v-if="croppedImage && isImage" class="preview-outer">
      <img :src="croppedImage" alt="Cropped Preview" />
    </div>
    <button
      v-if="((croppedImage && isImage) || (pdfFile && !isImage)) && !loading"
      class="submit-btn submit-btn-outer"
      type="button"
      @click="onSubmit"
    >
      Submit
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import 'vue-advanced-cropper/dist/style.css'
import type { ActorMatchesResponse } from '../../types'

const emit = defineEmits<{
  'actor-identified': [result: ActorMatchesResponse]
}>()

const imageUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const cropperRef = ref<any>(null)
const croppedImage = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const isImage = ref(true)
const pdfFile = ref<File | null>(null)
const pdfName = ref<string | null>(null)
const dragActive = ref(false)
let dragCounter = 0

function handleWindowDragEnter(e: DragEvent) {
  if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
    dragCounter++
    dragActive.value = true
  }
}
function handleWindowDragLeave(e: DragEvent) {
  if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
    dragCounter--
    if (dragCounter <= 0) {
      dragActive.value = false
      dragCounter = 0
    }
  }
}
function handleWindowDrop(e: DragEvent) {
  dragActive.value = false
  dragCounter = 0
}

onMounted(() => {
  window.addEventListener('dragenter', handleWindowDragEnter)
  window.addEventListener('dragleave', handleWindowDragLeave)
  window.addEventListener('drop', handleWindowDrop)
})
onUnmounted(() => {
  window.removeEventListener('dragenter', handleWindowDragEnter)
  window.removeEventListener('dragleave', handleWindowDragLeave)
  window.removeEventListener('drop', handleWindowDrop)
})

// Camera modal state
const showCamera = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
let mediaStream: MediaStream | null = null

function triggerFileInput() {
  fileInput.value?.click()
}

async function openCamera() {
  try {
    showCamera.value = true
    error.value = null
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream
      await videoRef.value.play()
    }
  } catch (e: any) {
    error.value = 'Camera access denied or unavailable.'
    showCamera.value = false
  }
}

function closeCamera() {
  showCamera.value = false
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop())
    mediaStream = null
  }
}

async function capturePhoto() {
  if (!videoRef.value) return
  const video = videoRef.value
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    imageUrl.value = canvas.toDataURL('image/png')
    croppedImage.value = null
    error.value = null
    isImage.value = true
    pdfFile.value = null
    pdfName.value = null
  }
  closeCamera()
}

onUnmounted(() => {
  closeCamera()
})

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files && files[0]) {
    const file = files[0]
    if (file.type.startsWith('image/')) {
      imageUrl.value = URL.createObjectURL(file)
      croppedImage.value = null
      error.value = null
      isImage.value = true
      pdfFile.value = null
      pdfName.value = null
    } else if (file.type === 'application/pdf') {
      imageUrl.value = null
      croppedImage.value = null
      error.value = null
      isImage.value = false
      pdfFile.value = file
      pdfName.value = file.name
    } else {
      error.value = 'Unsupported file type.'
    }
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

function deleteImage() {
  imageUrl.value = null
  croppedImage.value = null
  isImage.value = true
  pdfFile.value = null
  pdfName.value = null
  error.value = null
}

function onDrop(event: DragEvent) {
  dragActive.value = false
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    const file = files[0]
    if (file.type.startsWith('image/')) {
      imageUrl.value = URL.createObjectURL(file)
      croppedImage.value = null
      error.value = null
      isImage.value = true
      pdfFile.value = null
      pdfName.value = null
    } else if (file.type === 'application/pdf') {
      imageUrl.value = null
      croppedImage.value = null
      error.value = null
      isImage.value = false
      pdfFile.value = file
      pdfName.value = file.name
    } else {
      error.value = 'Unsupported file type.'
    }
  }
}

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    const formData = new FormData()
    if (isImage.value) {
      if (!croppedImage.value) return
      const res = await fetch(croppedImage.value)
      const blob = await res.blob()
      formData.append('image', blob, 'image.png')
    } else if (pdfFile.value) {
      formData.append('image', pdfFile.value, pdfFile.value.name)
    } else {
      return
    }
    const response = await fetch(
      'https://actor-recogniser-service-452650917730.europe-west2.run.app//identify-actor',
      {
        method: 'POST',
        body: formData,
      },
    )
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
.image-uploader-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image-uploader-box {
  border: 2px dashed #d0d0d0;
  border-radius: 12px;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 340px;
  width: 360px;
  height: 444%;
  margin: 0 auto;
  position: relative;
}
@media (max-width: 480px) {
  .image-uploader-box {
    max-width: 98vw;
    height: 220px;
  }
}
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  width: 100%;
}
.upload-icon {
  margin-bottom: 0.5rem;
}
.upload-label {
  text-align: center;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
}
.upload-subtitle {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}
.divider-row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0 1.2rem 0;
}
.divider {
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}
.divider-text {
  margin: 0 0.8rem;
  color: #888;
  font-size: 0.95rem;
  font-weight: 500;
}
.camera-btn {
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.7rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1.2rem;
}
.camera-btn:hover {
  background: color-mix(in srgb, var(--color-primary) 80%, #000 20%);
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
.preview img {
  max-width: 300px;
  max-height: 300px;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.pdf-preview {
  margin-top: 1.2rem;
  color: #444;
  font-size: 1.05rem;
  font-weight: 500;
  background: #f3f3f3;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
}
.submit-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: var(--color-primary);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: color-mix(in srgb, var(--color-primary) 80%, #000 20%);
}
.loading {
  margin-top: 1rem;
  color: var(--color-primary);
  font-weight: 500;
}
.error {
  margin-top: 1rem;
  color: #d40000;
  font-weight: 500;
}
.loading-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}
.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.camera-modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
}
.camera-video {
  width: 320px;
  height: 240px;
  background: #000;
  border-radius: 8px;
  margin-bottom: 1.2rem;
}
.camera-controls {
  display: flex;
  gap: 1rem;
}
.capture-btn,
.close-btn {
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.7rem;
  cursor: pointer;
  transition: background 0.2s;
}
.close-btn {
  background: #888;
}
.capture-btn:hover {
  background: color-mix(in srgb, var(--color-primary) 80%, #000 20%);
}
.close-btn:hover {
  background: #555;
}
.preview-outer {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview-outer img {
  max-width: 300px;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.submit-btn-outer {
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
/* Remove preview and submit-btn margin from inside the box */
.preview,
.submit-btn {
  margin-top: 0;
  margin-bottom: 0;
}
.cropper-area-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.remove-image-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}
.close-cropper-btn {
  position: static;
  background: #fff;
  color: var(--color-danger);
  border: 1px solid #ffd6d6;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    color 0.2s;
}
.close-cropper-btn:hover {
  background: #fff0f0;
  color: var(--color-danger);
}
.remove-image-label {
  color: var(--color-danger);
  font-size: 1.05rem;
  font-weight: 500;
  user-select: none;
}
.drag-active {
  border-color: #0078d4;
  background: #f0f8ff;
}
.drop-area {
  border: 2px dashed #aaa;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  text-align: center;
  color: #888;
  min-width: 250px;
  outline: none;
  cursor: pointer;
  margin-bottom: 1rem;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.drop-area:focus {
  border-color: #333;
}
.drop-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem 0;
}
.drop-message-text {
  font-size: 1.1rem;
  color: #0078d4;
  margin-top: 1rem;
  font-weight: 600;
  text-align: center;
}
</style>
