<template>
  <nav class="navbar" :class="{ 'navbar-hidden': !visible }">
    <div class="navbar-left" @click="goHome">Who's That Actor</div>
    <div class="navbar-right">
      <!-- Add nav links here if needed -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(true)
let lastScrollY = window.scrollY

function onScroll() {
  const currentY = window.scrollY
  if (currentY > lastScrollY && currentY > 40) {
    visible.value = false // scrolling down
  } else {
    visible.value = true // scrolling up
  }
  lastScrollY = currentY
}

function goHome() {
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  background: var(--color-background);
  min-height: 56px;
  z-index: 100;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.navbar-hidden {
  transform: translateY(-100%);
}
.navbar-left {
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.navbar-left:hover {
  opacity: 0.8;
}
.navbar-right {
  /* Placeholder for future nav links */
}
</style>
