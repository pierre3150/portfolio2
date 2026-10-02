<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const clock = ref('')

function tick() {
  const now = new Date()
  clock.value = now.toLocaleTimeString('fr-FR', { hour12: false })
}

let timer
onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => clearInterval(timer))

const nav = [
  { to: '/', cmd: 'cd ~', label: 'accueil' },
  { to: '/projects', cmd: 'cd /projects', label: 'projets' },
  { to: '/online', cmd: 'cd /online', label: 'en ligne' },
  { to: '/services', cmd: 'cd /services', label: 'services' },
  { to: '/passions', cmd: 'cd /passions', label: 'passions' },
  { to: '/about', cmd: 'cd /about', label: 'a propos' },
  { to: '/skills', cmd: 'cd /skills', label: 'competences' },
]
</script>

<template>
  <div class="frame crt-flicker">
    <!-- HUD corner brackets, viewfinder-style -->
    <span class="hud-corner tl" aria-hidden="true"></span>
    <span class="hud-corner tr" aria-hidden="true"></span>
    <span class="hud-corner bl" aria-hidden="true"></span>
    <span class="hud-corner br" aria-hidden="true"></span>

    <header class="topbar">
      <router-link to="/" class="brand">PIERRE<span class="dim">.SYS</span></router-link>
      <div class="status">
        <span class="rec"><span class="dot"></span>REC</span>
        <span class="clock">{{ clock }}</span>
      </div>
    </header>

    <nav class="cmdnav" aria-label="Navigation principale">
      <router-link
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="cmdlink"
        :class="{ active: route.path === item.to }"
      >{{ item.cmd }}</router-link>
    </nav>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="scan" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="statusbar">
      <span>{{ route.meta.cmd || '~' }}</span>
      <span class="dim">pierre-dev.fr</span>
    </footer>
  </div>

  <div class="crt-overlay" aria-hidden="true"></div>
  <div class="crt-vignette" aria-hidden="true"></div>
</template>

<style scoped>
.frame {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.hud-corner {
  position: fixed;
  width: 18px;
  height: 18px;
  z-index: 61;
  pointer-events: none;
  opacity: 0.5;
}
.hud-corner.tl { top: 10px; left: 10px; border-top: 1px solid var(--white); border-left: 1px solid var(--white); }
.hud-corner.tr { top: 10px; right: 10px; border-top: 1px solid var(--white); border-right: 1px solid var(--white); }
.hud-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid var(--white); border-left: 1px solid var(--white); }
.hud-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid var(--white); border-right: 1px solid var(--white); }

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem var(--gutter) 0.9rem;
  border-bottom: 1px solid var(--line);
}
.brand {
  font-family: var(--font-display);
  font-size: 1.1rem;
  text-decoration: none;
  color: var(--white);
  letter-spacing: 0.01em;
}
.dim { color: var(--dim); }

.status {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  font-size: 0.75rem;
  color: var(--dim);
}
.rec { display: flex; align-items: center; gap: 0.4em; letter-spacing: 0.08em; }
.rec .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--white);
  animation: blink 1.4s steps(1) infinite;
}
.clock { font-variant-numeric: tabular-nums; color: var(--ink); }

.cmdnav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.4rem;
  padding: 0.85rem var(--gutter);
  border-bottom: 1px solid var(--line);
  font-size: 0.82rem;
}
.cmdlink {
  text-decoration: none;
  color: var(--dim);
  position: relative;
  white-space: nowrap;
}
.cmdlink::before { content: '$ '; color: var(--line); }
.cmdlink:hover { color: var(--white); }
.cmdlink.active { color: var(--white); }
.cmdlink.active::after {
  content: '';
  position: absolute;
  left: 1.1em; right: 0; bottom: -0.3em;
  height: 1px;
  background: var(--white);
}

main { flex: 1; }

.statusbar {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem var(--gutter);
  border-top: 1px solid var(--line);
  font-size: 0.72rem;
  color: var(--ink);
}

/* Page transition: a quick horizontal "tune-in" static wipe rather than a
   generic fade-and-slide, consistent with the CRT-channel-switch concept. */
.scan-enter-active, .scan-leave-active { transition: opacity 0.18s linear, filter 0.18s linear; }
.scan-enter-from, .scan-leave-to { opacity: 0; filter: brightness(2.2) blur(1px); }

@media (max-width: 640px) {
  .topbar { padding-top: 0.9rem; }
  .cmdnav { gap: 0.3rem 1rem; font-size: 0.78rem; }
}
</style>
