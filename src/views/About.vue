<script setup>
import DitherPhoto from '../components/DitherPhoto.vue'
import photo from '../assets/pierre-photo.png'

const education = [
  {
    period: '2025 — 2026',
    title: 'Bachelor Full-Stack & Intelligence Artificielle',
    place: 'EPSI Arras',
  },
  {
    period: '2023 — 2025',
    title: 'BTS SIO, option SLAM (Solutions Logicielles et Applications Metiers)',
    place: 'EPSI Arras',
  },
  {
    period: '2020 — 2023',
    title: 'Baccalaureat general — Maths, Numerique & Sciences Informatiques, Physique-Chimie (mention AB)',
    place: 'Lycee Baudimont, Arras',
  },
]

const experience = [
  {
    period: 'depuis sept. 2025',
    title: 'Developpeur alternant',
    place: 'ANGDM, Noyelles-sous-Lens',
    body: "Systeme de centralisation et securisation des parametres de configuration pour les applications metier de l'agence. Client lourd WPF (MVVM), persistance Entity Framework Core 8 / SQL Server, chiffrement via Microsoft Data Protection, API REST en ASP.NET Core.",
  },
  {
    period: 'janv. — fev. 2025',
    title: 'Developpeur web (stage)',
    place: 'La Tribu, Wanquetin / Wailly / Saint-Catherine',
    body: "Site vitrine WordPress et espace prive HTML/PHP/JS avec connexion securisee, pour la gestion des heures, stocks et depenses. Mise en place de l'hebergement sur serveur OVH.",
  },
  {
    period: 'avr. — juin 2024',
    title: 'Developpeur (stage)',
    place: 'Pas-de-Calais Habitat, Arras',
    body: "Migration de metadonnees vers un gestionnaire de donnees, scripts Python de connexion et d'export vers Excel, requetes SQL analysees via DBeaver.",
  },
]
</script>

<template>
  <div class="page">
    <p class="prompt">cat about.txt</p>
    <h1 class="title">A PROPOS</h1>

    <div class="intro">
      <DitherPhoto class="photo" :src="photo" alt="Photo de Pierre Parain" :render-width="280" />
      <div class="intro-text">
        <p>
          Developpeur full-stack en formation (EPSI Arras), actuellement alternant chez ANGDM.
          A l'aise aussi bien cote back — C#/.NET, Python, SQL — que front, et passe une bonne
          partie de son temps libre a administrer son propre cluster Proxmox.
        </p>
        <p>
          A la recherche d'une alternance a partir de septembre 2026 pour poursuivre en
          Master DevOps IA.
        </p>
        <dl class="facts">
          <div><dt>Localisation</dt><dd>Arras — mobile Paris / Lille</dd></div>
          <div><dt>Langues</dt><dd>Francais, Anglais (B2), Espagnol (niveau lycee)</dd></div>
          <div><dt>Permis</dt><dd>B, vehicule personnel</dd></div>
        </dl>
        <div class="actions">
          <a class="btn" href="/CV_Pierre_PARAIN.pdf" download>TELECHARGER LE CV</a>
          <a class="btn" href="mailto:pierreparain.pro@gmail.com">CONTACT</a>
        </div>
      </div>
    </div>

    <section class="block">
      <h2 class="block-title">cat formation.log</h2>
      <ul class="timeline">
        <li v-for="e in education" :key="e.title">
          <span class="period">{{ e.period }}</span>
          <div>
            <p class="t-title">{{ e.title }}</p>
            <p class="t-place">{{ e.place }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="block">
      <h2 class="block-title">cat experience.log</h2>
      <ul class="timeline">
        <li v-for="e in experience" :key="e.title">
          <span class="period">{{ e.period }}</span>
          <div>
            <p class="t-title">{{ e.title }}</p>
            <p class="t-place">{{ e.place }}</p>
            <p class="t-body">{{ e.body }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.title { font-size: clamp(2.2rem, 6vw, 3.6rem); margin: 0.5rem 0 2.2rem; }

.intro {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2.4rem;
  margin-bottom: 4.5rem;
}
.photo { width: 100%; }

.intro-text p { margin: 0 0 1rem; max-width: 60ch; color: var(--ink); }

.facts { margin: 1.4rem 0; padding: 1rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.facts div { display: flex; gap: 1rem; padding: 0.3rem 0; font-size: 0.85rem; }
.facts dt { color: var(--dim); width: 7.5em; flex-shrink: 0; }
.facts dd { margin: 0; }

.actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.4rem; }

.block { margin-bottom: 3.5rem; }
.block-title {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--dim);
  margin: 0 0 1.2rem;
  text-transform: lowercase;
}

.timeline { list-style: none; margin: 0; padding: 0; }
.timeline li {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 0.6rem 1.6rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--line);
}
.timeline li:last-child { border-bottom: 1px solid var(--line); }
.period { color: var(--dim); font-size: 0.82rem; }
.t-title { margin: 0 0 0.3rem; color: var(--white); font-weight: 700; font-size: 0.95rem; }
.t-place { margin: 0 0 0.5rem; color: var(--dim); font-size: 0.82rem; }
.t-body { margin: 0; color: var(--ink); font-size: 0.86rem; max-width: 60ch; }

@media (max-width: 640px) {
  .intro { grid-template-columns: 1fr; }
  .photo { max-width: 200px; }
  .timeline li { grid-template-columns: 1fr; }
}
</style>
