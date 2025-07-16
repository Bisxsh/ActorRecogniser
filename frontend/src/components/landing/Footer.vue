<template>
  <footer class="landing-footer">
    <div class="footer-content">
      <a class="footer-left" href="https://bisesh.dev">Made with ❤️ by Bisesh</a>
      <div class="footer-right">© {{ new Date().getFullYear() }} ActorRecogniser</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script needed
</script>

<style scoped>
.landing-footer {
  width: 100vw;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1rem 2rem; */
  font-size: 1rem;
  color: #b6c2e0;
  letter-spacing: 0.01em;
}

.footer-left,
.footer-right {
  flex: 1 1 0;
}

.footer-left {
  text-align: left;
}

.footer-right {
  text-align: right;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    padding: 1rem;
  }
  .footer-left,
  .footer-right {
    text-align: center;
  }
}
</style>
