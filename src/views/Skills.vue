<script setup>
// Levels are deliberately coarse (3 tiers) rather than fake precision like
// "87% React" - segments per tier, rendered as a retro VU-meter bar.
const TIERS = { daily: 7, solid: 5, seen: 3 }
const MAX = 8

const groups = [
  {
    name: 'Langages & frameworks',
    cmd: 'cat ~/skills/languages',
    items: [
      { name: 'C# / .NET', tier: TIERS.daily },
      { name: 'ASP.NET Core', tier: TIERS.daily },
      { name: 'Python', tier: TIERS.daily },
      { name: 'JavaScript', tier: TIERS.daily },
      { name: 'Vue.js', tier: TIERS.daily },
      { name: 'HTML / CSS', tier: TIERS.daily },
      { name: 'PHP', tier: TIERS.solid },
      { name: 'Symfony', tier: TIERS.solid },
      { name: 'Java', tier: TIERS.seen },
      { name: 'Next.js', tier: TIERS.seen },
      { name: 'Angular', tier: TIERS.seen },
    ],
  },
  {
    name: 'Bases de donnees',
    cmd: 'cat ~/skills/databases',
    items: [
      { name: 'SQL Server', tier: TIERS.daily },
      { name: 'SQL', tier: TIERS.daily },
      { name: 'MySQL', tier: TIERS.solid },
      { name: 'Oracle', tier: TIERS.seen },
    ],
  },
  {
    name: 'Analyse & modelisation',
    cmd: 'cat ~/skills/modeling',
    items: [
      { name: 'MCD', tier: TIERS.solid },
      { name: 'UML', tier: TIERS.solid },
      { name: 'Programmation objet', tier: TIERS.daily },
    ],
  },
  {
    name: 'Environnement',
    cmd: 'cat ~/skills/env',
    items: [
      { name: 'Linux', tier: TIERS.daily },
      { name: 'Docker', tier: TIERS.daily },
      { name: 'Windows Server', tier: TIERS.solid },
      { name: 'Nginx / reverse proxy', tier: TIERS.solid },
    ],
  },
]
</script>

<template>
  <div class="page">
    <p class="prompt">cat ~/skills/*</p>
    <h1 class="title">COMPETENCES</h1>
    <p class="legend">
      <span class="legend-item"><span class="swatch full"></span>quotidien</span>
      <span class="legend-item"><span class="swatch mid"></span>confirme</span>
      <span class="legend-item"><span class="swatch low"></span>vu en formation</span>
    </p>

    <section v-for="g in groups" :key="g.name" class="group">
      <p class="group-cmd prompt">{{ g.cmd }}</p>
      <h2 class="group-name">{{ g.name }}</h2>
      <ul class="skills">
        <li v-for="s in g.items" :key="s.name" class="skill">
          <span class="skill-name">{{ s.name }}</span>
          <span class="meter" :aria-label="`niveau ${s.tier} sur ${MAX}`">
            <span
              v-for="n in MAX"
              :key="n"
              class="seg"
              :class="{ on: n <= s.tier }"
            ></span>
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.title { font-size: clamp(2.2rem, 6vw, 3.6rem); margin: 0.5rem 0 1.4rem; }

.legend { display: flex; gap: 1.6rem; flex-wrap: wrap; color: var(--dim); font-size: 0.78rem; margin: 0 0 3rem; }
.legend-item { display: inline-flex; align-items: center; gap: 0.5em; }
.swatch { width: 10px; height: 10px; display: inline-block; border: 1px solid var(--white); }
.swatch.full { background: var(--white); }
.swatch.mid { background: var(--dim); border-color: var(--dim); }
.swatch.low { background: transparent; border-color: var(--line); }

.group { margin-bottom: 3rem; }
.group-cmd { margin: 0 0 0.3rem; font-size: 0.78rem; }
.group-name { font-size: clamp(1.2rem, 2.8vw, 1.5rem); margin: 0 0 1.3rem; }

.skills { list-style: none; margin: 0; padding: 0; }
.skill {
  display: grid;
  grid-template-columns: minmax(10rem, 1fr) auto;
  align-items: center;
  gap: 1.5rem;
  padding: 0.6rem 0;
  border-top: 1px solid var(--line);
}
.skill:last-child { border-bottom: 1px solid var(--line); }
.skill-name { font-size: 0.9rem; color: var(--ink); }

.meter { display: flex; gap: 3px; }
.seg { width: 9px; height: 16px; border: 1px solid var(--line); }
.seg.on { background: var(--white); border-color: var(--white); }

@media (max-width: 480px) {
  .seg { width: 7px; height: 14px; }
}
</style>
