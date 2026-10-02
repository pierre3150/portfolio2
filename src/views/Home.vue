<script setup>
import { ref, onMounted } from 'vue'

const bootLines = [
  'BOOTING PIERRE.SYS...',
  '> chargement profil developpeur... OK',
  '> stack full-stack & IA... OK',
  '> cafe... niveau critique',
  'SYSTEM READY',
]

const printed = ref([])
const booting = ref(true)
const showHero = ref(false)

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function runBoot() {
  // Skip the animation for anyone who's asked for less motion - still show
  // the lines, just instantly, so the content itself isn't lost.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    printed.value = [...bootLines]
    booting.value = false
    showHero.value = true
    return
  }

  for (const line of bootLines) {
    await sleep(line.startsWith('SYSTEM') ? 260 : 180)
    printed.value = [...printed.value, line]
  }
  await sleep(320)
  booting.value = false
  showHero.value = true
}

onMounted(runBoot)
</script>

<template>
  <div class="page home">
    <div v-if="booting" class="boot" role="status" aria-live="polite">
      <p v-for="(l, i) in printed" :key="i" class="bootline">{{ l }}</p>
      <span class="cursor"></span>
    </div>

    <div v-show="showHero" class="hero">
      <p class="eyebrow prompt">whoami</p>
      <h1 class="name">PIERRE<br />PARAIN<span class="cursor"></span></h1>
      <p class="role">Developpeur Full-Stack &amp; IA</p>
      <p class="avail">
        <span class="prompt">disponibilite</span>
        &mdash; alternance des septembre 2026, Master DevOps IA
      </p>

      <div class="quicknav">
        <router-link class="btn" to="/projects">PROJETS GITHUB</router-link>
        <router-link class="btn" to="/online">SITES EN LIGNE</router-link>
        <router-link class="btn" to="/about">CV &amp; CONTACT</router-link>
      </div>

      <div class="grid-floor" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style scoped>
.home { min-height: calc(100vh - 220px); display: flex; flex-direction: column; justify-content: center; }

.boot {
  font-size: 0.85rem;
  color: var(--ink);
}
.bootline { margin: 0 0 0.35rem; }
.bootline:last-child { color: var(--white); font-weight: 700; }

.hero { position: relative; padding-bottom: 8rem; }
.eyebrow { margin: 0 0 1.25rem; font-size: 0.85rem; }

.name {
  font-size: clamp(3.2rem, 11vw, 7.5rem);
  letter-spacing: -0.02em;
}

.role {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--ink);
  font-size: clamp(1rem, 2.2vw, 1.3rem);
  margin: 1.1rem 0 0.6rem;
}

.avail {
  color: var(--dim);
  max-width: 46ch;
  margin: 0 0 2.4rem;
}
.avail .prompt { color: var(--ink); }

.quicknav { display: flex; flex-wrap: wrap; gap: 0.8rem; position: relative; z-index: 2; }

/* A quiet retro-futurist horizon grid, well below the text, monochrome only */
.grid-floor {
  position: absolute;
  left: -5vw; right: -5vw; bottom: -2rem;
  height: 180px;
  background-image:
    repeating-linear-gradient(to right, rgba(255,255,255,0.12) 0 1px, transparent 1px 48px),
    repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0 1px, transparent 1px 24px);
  transform: perspective(260px) rotateX(55deg);
  transform-origin: bottom;
  mask-image: linear-gradient(to top, black, transparent);
  opacity: 0.5;
}

@media (max-width: 640px) {
  .hero { padding-bottom: 5rem; }
  .grid-floor { height: 110px; }
}
</style>
