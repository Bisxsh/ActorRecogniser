<template>
  <main class="app-root-wrapper">
    <Navbar />
    <div class="navbar-spacer"></div>
    <div class="page-container">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Navbar from './components/landing/Navbar.vue'
import Lenis from 'lenis'

let lenis: Lenis | null = null

onMounted(() => {
  lenis = new Lenis()

  function raf(time: number) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})

onUnmounted(() => {
  lenis?.destroy()
  lenis = null
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--color-background-dynamic);
  color: #e6eaf3;
  font-family: 'Sora', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.app-root-wrapper {
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.app-root-wrapper::before {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, #00eaff33 0%, #10131a 80%);
  opacity: 0.7;
  z-index: -1;
  pointer-events: none;
}

.page-container {
  padding: 6rem 2rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.navbar-spacer {
  height: 56px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .page-container {
    padding: 4rem 1rem;
  }
}
</style>
