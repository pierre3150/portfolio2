<script setup>
import { ref, onMounted } from 'vue'

const GITHUB_USER = 'pierre3150'

const repos = ref([])
const state = ref('loading') // loading | ready | error

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=owner`
    )
    if (!res.ok) throw new Error(String(res.status))
    const data = await res.json()
    repos.value = data
      .filter((r) => !r.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    state.value = 'ready'
  } catch (e) {
    state.value = 'error'
  }
})
</script>

<template>
  <div class="page">
    <p class="prompt">ls -la /projects</p>
    <h1 class="title">REPOS PUBLICS</h1>
    <p class="sub">
      Recupere en direct depuis GitHub &mdash;
      <a :href="`https://github.com/${GITHUB_USER}`" target="_blank" rel="noopener">@{{ GITHUB_USER }}</a>
    </p>

    <p v-if="state === 'loading'" class="status-line">
      connexion a l'API GitHub<span class="cursor"></span>
    </p>

    <p v-else-if="state === 'error'" class="status-line error">
      ERREUR &mdash; impossible de joindre l'API GitHub. Reessaie plus tard, ou va voir
      directement <a :href="`https://github.com/${GITHUB_USER}`" target="_blank" rel="noopener">github.com/{{ GITHUB_USER }}</a>.
    </p>

    <p v-else-if="repos.length === 0" class="status-line">aucun depot public pour le moment.</p>

    <ul v-else class="repolist">
      <li v-for="r in repos" :key="r.id" class="repo">
        <a :href="r.html_url" target="_blank" rel="noopener" class="repo-link">
          <div class="repo-head">
            <span class="repo-name glitch-hover">{{ r.name }}</span>
            <span class="repo-meta">
              <span v-if="r.language">{{ r.language }}</span>
              <span v-if="r.stargazers_count">&#9733; {{ r.stargazers_count }}</span>
              <span>maj {{ fmtDate(r.pushed_at) }}</span>
            </span>
          </div>
          <p v-if="r.description" class="repo-desc">{{ r.description }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.title { font-size: clamp(2.2rem, 6vw, 3.6rem); margin: 0.5rem 0 0.6rem; }
.sub { color: var(--dim); margin: 0 0 2.4rem; }
.sub a { color: var(--ink); }

.status-line { color: var(--dim); font-size: 0.9rem; }
.status-line.error { color: var(--white); }

.repolist { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.repo { border-bottom: 1px solid var(--line); }
.repo-link { display: block; text-decoration: none; color: inherit; padding: 1.1rem 0.25rem; }
.repo-link:hover { background: var(--panel); }

.repo-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1.2rem;
}
.repo-name { font-weight: 700; color: var(--white); font-size: 1.02rem; }
.repo-meta { display: flex; gap: 1rem; color: var(--dim); font-size: 0.78rem; white-space: nowrap; }
.repo-desc { margin: 0.5rem 0 0; color: var(--ink); max-width: 68ch; font-size: 0.88rem; }
</style>
