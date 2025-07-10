<template>
  <section class="details-section">
    <div ref="titleContainer" class="title-container">
      <h1 class="details-title">Instantly Identify Actors</h1>
      <h1 class="details-subtitle">
        From The
        <span class="details-large-text" ref="largeText">Largest</span>
        Community Database
      </h1>
    </div>

    <div class="grid-container">
      <Card ref="card1" class="card" icon="🧑" title="4 Million+" desc="Actors" />
      <Card ref="card2" class="card" icon="🎞️" title="200,000+" desc="TV Shows" />
      <Card ref="card3" class="card" icon="🎥" title="1,000,000+" desc="Movies" />
    </div>

    <div class="powered-by-container">
      <h2 class="powered-by-text" ref="poweredByText">
        <span class="filled-text">Powered by</span>
        <br />
        <span class="tmdb-letters">
          <span v-for="(letter, index) in 'TMDb'" :key="'p2-' + index" class="letter">{{
            letter
          }}</span>
        </span>
        <span class="filled-text"> & </span>
        <span class="aws-letters">
          <span v-for="(letter, index) in 'AWS'" :key="'p3-' + index" class="letter">{{
            letter
          }}</span>
        </span>
      </h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card from '../Card.vue'

gsap.registerPlugin(ScrollTrigger)

const titleContainer = ref<HTMLElement | null>(null)
const largeText = ref<HTMLElement | null>(null)
const card1 = ref<InstanceType<typeof Card> | null>(null)
const card2 = ref<InstanceType<typeof Card> | null>(null)
const card3 = ref<InstanceType<typeof Card> | null>(null)
const poweredByText = ref<HTMLElement | null>(null)

onMounted(() => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: titleContainer.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
  if (titleContainer.value) {
    const titles = titleContainer.value.querySelectorAll('h1')
    timeline.from(titles, {
      y: 30,
      opacity: 0,
      delay: 0.5,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
    })
    // if (largeText.value) {
    //   timeline.to(largeText.value, {
    //     fontSize: '4rem',
    //     duration: 1.0,
    //     ease: 'bounce.out',
    //   })
    //   timeline.to(largeText.value, {
    //     fontSize: '3rem',
    //     delay: 0.2,
    //     duration: 0.5,
    //     ease: 'power3.out',
    //   })
    // }
  }

  const cards = [card1.value?.$el, card2.value?.$el, card3.value?.$el].filter(Boolean)

  if (cards.length) {
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      stagger: 0.3,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.grid-container',
        start: 'top 80%',
      },
    })
  }

  if (poweredByText.value) {
    const letters = poweredByText.value.querySelectorAll('.letter')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: poweredByText.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      letters,
      {
        '--fill-percentage': '0%',
      },
      {
        '--fill-percentage': '100%',
        duration: 1,
        ease: 'none',
        stagger: 0.05,
      },
      0,
    )

    tl.fromTo(
      letters,
      {
        scale: 1,
      },
      {
        scale: 1.2,
        duration: 0.5,
        ease: 'none',
        yoyo: true,
        repeat: 1,
        stagger: 0.05,
      },
      0,
    )
  }
})
</script>

<style scoped>
.details-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rem;
  width: 100%;
}

.title-container {
  text-align: center;
}

.details-title {
  font-size: 4rem;
  font-weight: 700;
  color: #f5f7fa;
  text-shadow:
    0 2px 16px #0ff2,
    0 0px 2px #fff2;
  z-index: 2;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

.details-subtitle {
  font-size: 3rem;
  font-weight: 500;
  color: var(--color-primary-dark);
  opacity: 0.8;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

.details-large-text {
  --clr-1: var(--color-primary);
  --clr-2: #33ff8c;
  --clr-3: #ffc640;
  --clr-4: #e54cff;
  font-size: 3rem;
  font-weight: 700;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image:
    radial-gradient(circle at 10% 20%, var(--clr-1), transparent 40%),
    radial-gradient(circle at 80% 10%, var(--clr-2), transparent 40%),
    radial-gradient(circle at 50% 90%, var(--clr-3), transparent 40%),
    radial-gradient(circle at 90% 80%, var(--clr-4), transparent 40%);
  background-size: 200% 200%;
  animation: aurora-move 12s ease-in-out infinite alternate;
}

@keyframes aurora-move {
  to {
    background-position: 100% 100%;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 2;
  place-items: center;
}

.powered-by-container {
  z-index: 1;
  width: 100%;
  text-align: center;
}

.powered-by-text {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  margin-top: 4rem;
}

.filled-text {
  color: var(--color-primary-dark);
  opacity: 0.7;
}

.tmdb-letters,
.aws-letters {
  color: transparent;
  -webkit-text-stroke: 1px var(--color-primary-light);
}

.letter {
  display: inline-block;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  --fill-percentage: 0%;
  background-image: conic-gradient(
    var(--color-primary-light) var(--fill-percentage),
    transparent var(--fill-percentage)
  );
  opacity: 1;
}

@media (max-width: 900px) {
  .details-section {
    gap: 4rem;
  }

  .grid-container {
    grid-template-columns: 1fr;
  }

  .details-title {
    font-size: 3rem;
    line-height: 1.2;
  }

  .details-subtitle {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-top: 1rem;
  }

  .details-large-text {
    font-size: 1.5rem;
  }

  .powered-by-text {
    font-size: 5rem;
    line-height: 1.1;
  }
}

@media (max-width: 480px) {
  .details-title {
    font-size: 2.5rem;
  }

  .details-subtitle {
    font-size: 1.25rem;
  }

  .powered-by-text {
    font-size: 3.5rem;
  }
}
</style>
