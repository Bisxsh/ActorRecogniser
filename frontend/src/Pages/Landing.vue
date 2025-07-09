<template>
  <div class="landing-root">
    <section class="scroll-section hero-section">
      <LandingHero @launch-app="goToApp" />
    </section>
    <section class="scroll-section app-details-section">
      <LandingAppDetails />
    </section>
    <section class="scroll-section how-it-works-section">
      <LandingHowItWorks />
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

const router = useRouter()
function goToApp() {
  router.push('/app')
}
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
  padding: 2rem 0;
}

.how-it-works-section {
  min-height: 100vh;
  padding: 2rem 0;
}

.footer-section {
  padding: 1rem;
}
</style>
