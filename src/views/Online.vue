<script setup>
const sites = [
  {
    id: 'latribu',
    name: 'microcreche-latribu.fr',
    window: 'latribu.site — WordPress + espace prive',
    period: 'Stage, janv.—fev. 2025',
    desc: "Site vitrine de la micro-creche La Tribu (Wanquetin, Wailly, Saint-Catherine), partie publique sous WordPress. Developpement en plus d'un espace prive en HTML/PHP/JavaScript avec connexion securisee, pour la gestion des heures, des stocks et des depenses de l'equipe.",
    stack: ['WordPress', 'PHP', 'JavaScript', 'HTML/CSS', 'OVH'],
    url: 'https://microcreche-latribu.fr/',
  },
  {
    id: 'aesius',
    name: 'aesius.fr',
    window: 'aesius.site — vitrine regroupement de credit',
    period: 'Projet personnel',
    desc: "Site vitrine complet pour un service de regroupement de credit, concu et developpe seul de bout en bout : structure, design et mise en ligne.",
    stack: ['HTML/CSS', 'JavaScript'],
    url: 'https://www.aesius.fr/',
  },
]
</script>

<template>
  <div class="page">
    <p class="prompt">curl -I /online/*</p>
    <h1 class="title">EN LIGNE</h1>
    <p class="sub">Projets livres, deployes, et toujours accessibles aujourd'hui.</p>

    <div class="sites">
      <article v-for="s in sites" :key="s.id" class="term site">
        <div class="term-bar">
          <span class="term-dots"><span></span><span></span><span></span></span>
          <span>{{ s.window }}</span>
          <span class="period">{{ s.period }}</span>
        </div>
        <div class="term-body">
          <h2 class="site-name">{{ s.name }}</h2>
          <p class="site-desc">{{ s.desc }}</p>
          <ul class="stack">
            <li v-for="t in s.stack" :key="t">{{ t }}</li>
          </ul>
          <a class="btn" :href="s.url" target="_blank" rel="noopener">OUVRIR LE SITE</a>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.title { font-size: clamp(2.2rem, 6vw, 3.6rem); margin: 0.5rem 0 0.6rem; }
.sub { color: var(--dim); margin: 0 0 2.4rem; }

.sites { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }

.period { color: var(--dim); }

.site-name {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--white);
  margin: 0 0 0.8rem;
}
.site-desc { color: var(--ink); font-size: 0.9rem; margin: 0 0 1.1rem; }

.stack { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 0 0 1.4rem; }
.stack li {
  font-size: 0.72rem;
  color: var(--dim);
  border: 1px solid var(--line);
  padding: 0.25em 0.6em;
}
</style>
