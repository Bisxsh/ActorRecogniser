<template>
  <section class="how-it-works-section">
    <div class="how-title">Find an actor in 3 Simple Steps:</div>
    <div class="how-steps">
      <div class="how-step">
        <div class="how-step-title">STEP 1: UPLOAD YOUR IMAGE</div>
        <div class="how-step-icons">
          <span>📋 Copy/Paste</span>
          <span>🖱️ Drag/Drop</span>
          <span>⬆️ Upload</span>
          <span>📷 Take Image</span>
        </div>
        <div class="how-step-visual">[Upload Interface]</div>
      </div>
      <div class="how-step">
        <div class="how-step-title">STEP 2: FOCUS ON THE FACES</div>
        <div class="how-step-desc">Easily crop or select just the faces...</div>
        <div class="how-step-visual">[Cropping Tool]</div>
      </div>
      <div class="how-step">
        <div class="how-step-title">STEP 3: DISCOVER THEIR STORY</div>
        <div class="how-step-desc">Click on an identified actor to view all their movies...</div>
        <div class="how-step-visual">[Actor Profile with Filmography]</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed
</script>

<style scoped>
.how-it-works-section {
  padding: 2rem;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}

.how-steps {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  width: 100vw;
}

.how-step {
  border: 1.5px solid #2be7ff44;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  min-width: 300px;
  background: rgba(24, 28, 39, 0.85);
  backdrop-filter: blur(6px);
  box-shadow:
    0 4px 32px 0 #00eaff22,
    0 1.5px 8px 0 #0008;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
  margin-bottom: 0.5rem;
  height: 100dvh;
  width: 100%;
}

.how-step:hover {
  border-color: #00eaff;
  box-shadow:
    0 8px 40px 0 #00eaff55,
    0 1.5px 8px 0 #0008;
}

.how-step-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #e6eaf3;
  letter-spacing: 0.01em;
}

.how-step-icons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  color: #b6c2e0;
  font-size: 1rem;
}

.how-step-visual {
  margin: 1rem 0 0.5rem 0;
  font-size: 1rem;
  color: #7de2ff;
  opacity: 0.8;
  font-style: italic;
}

.how-step-desc {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #b6c2e0;
  letter-spacing: 0.01em;
}

@media (max-width: 700px) {
  .how-steps {
    gap: 2rem;
  }
  .how-step {
    min-width: 0;
    width: 100%;
    max-width: 100%;
  }
}
</style>
