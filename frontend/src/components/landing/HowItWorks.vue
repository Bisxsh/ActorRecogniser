<template>
  <section class="how-it-works-section">
    <div class="how-title">Find an actor in 3 Simple Steps:</div>

    <div class="sticky-sections-wrapper">
      <section class="sticky-step-section text-black">
        <div class="step-content-wrapper">
          <p class="step-number">1</p>
          <p class="step-title">Upload your Image</p>
          <div class="step-cards-wrapper">
            <Card ref="card1" class="step-card" icon="📷" title="Snap" desc="Take a photo" />
            <Card ref="card2" class="step-card" icon="🗃️" title="Upload" desc="Upload an image" />
            <Card
              ref="card3"
              class="step-card"
              icon="📋"
              title="Paste"
              desc="Copy/Paste an image"
            />
          </div>
        </div>
      </section>

      <section class="sticky-step-section text-white">
        <div class="step-content-wrapper">
          <p class="step-number">2</p>
          <p class="step-title">Focus on the faces</p>
          <p class="step-desc">
            Easily crop or select just the faces you want to identify for precise results.
          </p>
          <div class="step-visual">
            <img
              src="https://placehold.co/400x250/00eaff/000000?text=Cropping+Visual"
              alt="Cropping Tool"
              class="step-image"
            />
          </div>
        </div>
      </section>

      <section class="sticky-step-section text-white">
        <div class="step-content-wrapper">
          <p class="step-number">3</p>
          <p class="step-title">Discover their story</p>
          <p class="step-desc">
            Click on an identified actor to instantly view all their movies and TV shows.
          </p>
          <div class="step-visual">
            <img
              src="https://placehold.co/400x250/00eaff/000000?text=Actor+Profile+Visual"
              alt="Actor Profile"
              class="step-image"
            />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card from '../Card.vue'

gsap.registerPlugin(ScrollTrigger)

const card1 = ref(null)
const card2 = ref(null)
const card3 = ref(null)

onMounted(() => {
  // Get all sticky sections
  const stickySections = gsap.utils.toArray('.sticky-step-section')

  // Create a ScrollTrigger for each section to pin it
  stickySections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section as HTMLElement,
      start: 'top top', // Pin when the top of the section hits the top of the viewport
      end: 'bottom top', // Release when the bottom of the section hits the top of the viewport
      pin: true, // This is the key: GSAP will manage the sticky behavior
      // markers: true, // Uncomment for debugging
      // You can add scrub: true here if you want a subtle animation during the pin
      // For a hard "stack" effect, scrub: false (default) or not setting it is fine.
    })
  })

  // To ensure enough scroll space for all sections to pin and unpin,
  // the parent container (.how-it-works-section or its wrapper) needs sufficient height.
  // The min-height: 300vh on .sticky-sections-wrapper is good for 3 sections.
})
</script>

<style scoped>
.how-it-works-section {
  padding: 2rem;
  text-align: center;
  width: 100%;
  /* min-height will implicitly be determined by the stacked sticky sections */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: visible;
}

.how-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #f5f7fa;
  text-shadow:
    0 2px 16px #0ff2,
    0 0px 2px #fff2;
  letter-spacing: 0.01em;
  z-index: 2;
  position: relative;
}

.sticky-sections-wrapper {
  position: relative;
  width: 100%;
  min-height: 300vh; /* 3 sections * 100vh each */
  overflow: visible;
}

.sticky-step-section {
  /* Removed position: sticky; top: 0; from here. GSAP's pin will handle it. */
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 2rem;
}

.step-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 900px;
  text-align: center;
}

.step-number {
  font-size: 30rem;
  position: absolute;
  left: 0;
  opacity: 0.3;
  line-height: 1;
  color: inherit;
  z-index: -1;
}

.step-title {
  font-size: 3.75rem;
  text-align: left;
  color: inherit;
  margin-bottom: 1rem;
}

.step-desc {
  font-size: 1.125rem;
  color: inherit;
  margin-bottom: 1.5rem;
}

.step-cards-wrapper {
  display: flex;
  gap: 2.5rem;
  margin-top: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.step-card {
  height: 20rem;
}

.step-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 2rem;
}

@media (max-width: 900px) {
  .how-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  .step-number {
    font-size: 20rem;
  }
  .step-title {
    font-size: 2.5rem;
  }
  .step-desc {
    font-size: 1rem;
  }
  .step-cards-wrapper {
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .sticky-step-section {
    padding: 1.5rem;
  }
}

@media (max-width: 600px) {
  .how-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .step-number {
    font-size: 15rem;
  }
  .step-title {
    font-size: 2rem;
  }
  .step-cards-wrapper {
    flex-direction: column;
    gap: 1rem;
  }
  .step-card {
    height: auto;
    min-height: 15rem;
  }
  .sticky-step-section {
    padding: 1rem;
  }
}
</style>
