<script setup>
const channels = [
  {
    ch: '01',
    name: 'AUTOMOBILE',
    body: "Projet en cours sur une Nissan 100NX : conversion E85 (ECU Speeduino, pompe et lignes adaptees, sonde flex-fuel) et exploration d'un swap moteur SR20DE. L'objectif final tourne autour de 300ch avec un compresseur mecanique — mais le plan est pense en gains progressifs, pas en un seul gros coup a la fin. Interet plus large pour la culture JDM et la conduite en montagne (touge).",
  },
  {
    ch: '02',
    name: 'SERVEURS & HOMELAB',
    body: "Un cluster Proxmox a plusieurs noeuds fait tourner mes services perso : Jellyfin, Nextcloud, un reverse proxy Nginx Proxy Manager, et un bastion Firefox isole derriere Authelia (SSO). Tout passe par mon propre nom de domaine, pierre-dev.fr — celui-la meme qui sert ce site. C'est aussi la ou j'experimente : conteneurs Docker, IA auto-hebergee, automatisation.",
  },
  {
    ch: '03',
    name: 'GAMING',
    body: "Je joue sur PC, sous Linux (Pop!_OS) et sur mobile. En ce moment, c'est Wartales qui tourne — un RPG tactique de groupe, exactement le genre de jeu ou la planification compte plus que les reflexes.",
  },
]
</script>

<template>
  <div class="page">
    <p class="prompt">tv --channels</p>
    <h1 class="title">PASSIONS</h1>
    <p class="sub">Ce qui tourne en dehors du code.</p>

    <div class="channels">
      <article v-for="c in channels" :key="c.ch" class="channel">
        <div class="channel-head">
          <span class="ch-num">CH.{{ c.ch }}</span>
          <h2 class="ch-name">{{ c.name }}</h2>
        </div>
        <p class="ch-body">{{ c.body }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.title { font-size: clamp(2.2rem, 6vw, 3.6rem); margin: 0.5rem 0 0.6rem; }
.sub { color: var(--dim); margin: 0 0 2.6rem; }

.channels { display: flex; flex-direction: column; }
.channel {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1.2rem 2rem;
  padding: 2rem 0;
  border-top: 1px solid var(--line);
}
.channel:last-child { border-bottom: 1px solid var(--line); }

.channel-head { display: contents; }
.ch-num {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--dim);
}
.ch-name {
  font-size: clamp(1.4rem, 3.4vw, 2rem);
  grid-column: 2;
}
.ch-body { grid-column: 2; margin: 0; max-width: 62ch; color: var(--ink); font-size: 0.92rem; }

@media (max-width: 560px) {
  .channel { grid-template-columns: 1fr; }
  .ch-name, .ch-body { grid-column: 1; }
}
</style>
