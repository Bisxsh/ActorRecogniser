<template>
  <section class="hero-section">
    <div class="hero-box">
      <div class="hero-icons">
        <span aria-label="Magnifying Glass" title="Search">🔍</span>
        <span aria-label="Clapperboard" title="Clapperboard">🎬</span>
      </div>
      <h1>Free to use!</h1>
      <p>Try it out now!</p>
      <Coffee />
    </div>
  </section>
</template>

<script setup lang="ts">
import Coffee from '../coffee.vue'
</script>

<style scoped>
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  height: 100%;
}

.hero-box {
  border: 1.5px solid #2be7ff44;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  min-width: 320px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(24, 28, 39, 0.85);
  backdrop-filter: blur(6px);
  box-shadow:
    0 4px 32px 0 #00eaff22,
    0 1.5px 8px 0 #0008;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}

.hero-box:hover {
  border-color: #00eaff;
  box-shadow:
    0 8px 40px 0 #00eaff55,
    0 1.5px 8px 0 #0008;
}

.hero-icons {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1.5rem;
  filter: drop-shadow(0 0 8px #00eaff88);
}

.hero-box h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 1rem 0 1rem 0;
  text-align: center;
  color: #f5f7fa;
  text-shadow:
    0 2px 16px #0ff2,
    0 0px 2px #fff2;
  letter-spacing: 0.02em;
}

.hero-box p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #b6c2e0;
  letter-spacing: 0.01em;
}

.launch-app-btn {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: 1.5px solid #00eaff;
  border-radius: 8px;
  background: rgba(0, 234, 255, 0.1);
  color: #00eaff;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.01em;
}

.launch-app-btn:hover {
  background: rgba(0, 234, 255, 0.2);
  box-shadow: 0 0 20px #00eaff44;
  transform: translateY(-2px);
}
</style>
