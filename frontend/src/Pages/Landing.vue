<template>
  <div class="landing-root">
    <section class="scroll-section hero-section">
      <LandingHero @launch-app="goToApp" />
    </section>
    <section class="scroll-section app-details-section" ref="appDetailsSection">
      <LandingAppDetails />
    </section>
    <section class="scroll-section how-it-works-section">
      <LandingHowItWorks />
    </section>
    <section class="scroll-section cta-section">
      <LandingCta />
    </section>
    <section class="scroll-section footer-section">
      <LandingFooter />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LandingHero from '../components/landing/Hero.vue'
import LandingAppDetails from '../components/landing/AppDetails.vue'
import LandingHowItWorks from '../components/landing/HowItWorks.vue'
import LandingFooter from '../components/landing/Footer.vue'
import LandingCta from '../components/landing/LandingCta.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
function goToApp() {
  router.push('/app')
}

const appDetailsSection = ref<HTMLElement | null>(null)

onMounted(() => {
  if (appDetailsSection.value) {
    gsap.to(document.body, {
      backgroundColor: 'red',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: appDetailsSection.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }
})
</script>

<style scoped>
.landing-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.scroll-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero-section {
  height: 100vh;
}

.app-details-section {
  min-height: 100vh;
}

.how-it-works-section {
  min-height: 100vh;
}
</style>
