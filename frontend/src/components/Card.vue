<template>
  <div class="details-card">
    <div class="card-icon">{{ icon }}</div>
    <div class="card-title">{{ title }}</div>
    <div class="card-desc">{{ desc }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ icon: string; title: string; desc: string }>()
</script>

<style>
@layer components {
  .details-card {
    position: relative;
    width: 100%;
    aspect-ratio: 2 / 1.5;
    border-radius: 28px;
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 234, 255, 0.02);
    box-shadow:
      inset 0 1px 1px 0 rgba(0, 234, 255, 0.2),
      inset 0 24px 48px 0 rgba(0, 234, 255, 0.06);
    transition:
      background-color 0.45s cubic-bezier(0.6, 0.6, 0, 1),
      box-shadow 0.45s cubic-bezier(0.6, 0.6, 0, 1);
    padding: 2.5rem 2rem 2rem 2rem;
    min-width: 220px;
    max-width: 280px;
    overflow: hidden;
  }

  .details-card:before {
    background:
      linear-gradient(180deg, rgba(0, 234, 255, 0.24), rgba(0, 234, 255, 0)),
      rgba(0, 234, 255, 0.12);
    border-radius: inherit;
    content: '';
    inset: 0;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    position: absolute;
    padding: 1px;
    pointer-events: none;
    transition: opacity 0.45s cubic-bezier(0.6, 0.6, 0, 1);
  }

  .details-card:hover {
    background-color: rgba(0, 234, 255, 0.04);
    box-shadow:
      inset 0 1px 1px 0 rgba(0, 234, 255, 0.3),
      inset 0 24px 48px 0 rgba(0, 234, 255, 0.1);
  }

  .details-card:hover:before {
    opacity: 0.8;
  }

  .card-icon {
    font-size: 2.6rem;
    margin-bottom: 1.2rem;
    color: #00eaff;
    filter: drop-shadow(0 0 12px #00eaff88);
    position: relative;
    z-index: 1;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #e6eaf3;
    letter-spacing: 0.01em;
    position: relative;
    z-index: 1;
  }

  .card-desc {
    font-size: 1.08rem;
    color: #b6c2e0;
    letter-spacing: 0.01em;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 640px) {
    .details-card {
      aspect-ratio: 2 / 1.8;
    }
  }
}
</style>
