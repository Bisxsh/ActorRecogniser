<template>
  <section class="how-it-works-section mt-[40rem]">
    <div class="how-title">Find an actor in 3 Simple Steps:</div>

    <div class="sticky-sections-wrapper">
      <section ref="firstSection" class="sticky-step-section mt-">
        <video autoplay loop muted playsinline class="background-video">
          <source src="../../assets/videos/Stock_Video_Generation_Request.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div class="video-overlay"></div>
        <div class="step-content-wrapper">
          <p class="step-number">1</p>
          <p class="step-title">Upload your Image</p>
        </div>
        <div class="step-cards-wrapper">
          <Card class="step-card" icon="📷" title="Snap" desc="Take a photo" />
          <Card class="step-card" icon="🗃️" title="Upload" desc="Upload an image" />
          <Card class="step-card" icon="📋" title="Paste" desc="Copy/Paste an image" />
        </div>
      </section>

      <div></div>

      <section ref="secondSection" class="sticky-step-section text-white">
        <video autoplay loop muted playsinline class="background-video">
          <source src="../../assets/videos/Video_Generation_Cropping_a_Face.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div class="video-overlay"></div>
        <div class="step-content-wrapper">
          <p class="step-number">2</p>
          <p class="step-title">Focus on the faces</p>
          <p class="step-desc">
            Easily crop or select just the faces you want to identify for precise results.
          </p>
        </div>
      </section>

      <section ref="thirdSection" class="sticky-step-section text-white">
        <video autoplay loop muted playsinline class="background-video">
          <source
            src="../../assets/videos/Video_Generation_Request_Complete.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div class="video-overlay"></div>
        <div class="step-content-wrapper">
          <p class="step-number">3</p>
          <p class="step-title">Discover their story</p>
          <p class="step-desc">
            Click on an identified actor to instantly view all their movies and TV shows.
          </p>
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

let firstSection = ref(null)
let secondSection = ref(null)
let thirdSection = ref(null)

onMounted(() => {
  const stickySections = gsap.utils.toArray('.sticky-step-section')

  stickySections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section as HTMLElement,
      start: 'top top',
      end: 'bottom top',
      pin: true,
    })
  })

  gsap.to('.app-root-wrapper', {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    scrollTrigger: {
      trigger: firstSection.value,
      start: 'top bottom',
      end: 'top 40%',
      toggleActions: 'play none reverse reverse',
    },
    reversed: true,
  })

  gsap.to('.app-root-wrapper', {
    backgroundColor: 'var(--color-background-dynamic)',
    scrollTrigger: {
      trigger: thirdSection.value,
      start: 'bottom 20%',
      end: 'bottom top',
      toggleActions: 'play none reverse reverse',
    },
  })
})
</script>

<style scoped>
.how-it-works-section {
  padding: 2rem;
  text-align: center;
  width: 100%;
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
  min-height: 300vh;
  overflow: visible;
  margin-top: 20vh;
}

.sticky-step-section {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: 100vw;
  height: auto;
  z-index: -2;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -1;
}

.step-content-wrapper {
  position: relative;
  z-index: 1;
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
  top: -10rem;
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
  opacity: 1;
  /* Make opacity 1 */
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
    top: -20rem;
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
    top: -15rem;
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
