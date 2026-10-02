<script setup>
// Les services d'admin (dashboard, acces distant) n'ont pas de lien cliquable
// direct : ils restent en ligne et proteges par SSO, mais ce site public ne
// doit pas servir de raccourci vers l'interface d'administration.
const services = [
  {
    host: 'cloud.pierre-dev.fr',
    name: 'Nextcloud',
    desc: 'Stockage et synchronisation de fichiers',
    url: 'https://cloud.pierre-dev.fr/',
    public: true,
  },
  {
    host: 'media.pierre-dev.fr',
    name: 'Jellyfin',
    desc: 'Serveur de streaming media personnel',
    url: 'https://media.pierre-dev.fr/',
    public: true,
  },
  {
    host: 'dashboard.pierre-dev.fr',
    name: 'Homelab Dashboard',
    desc: 'Supervision du cluster Proxmox (app .NET maison)',
    public: false,
  },
  {
    host: 'remote.pierre-dev.fr',
    name: 'Bastion distant',
    desc: "Acces web isole pour administrer l'infra a distance",
    public: false,
  },
]
</script>

<template>
  <div class="page">
    <p class="prompt">tree pierre-dev.fr</p>
    <h1 class="title">SERVICES</h1>
    <p class="sub">Ce qui tourne en permanence sur mon cluster Proxmox, derriere mon propre nom de domaine.</p>

    <div class="tree">
      <div class="tree-root">pierre-dev.fr</div>
      <ul class="tree-list">
        <li v-for="(s, i) in services" :key="s.host" class="tree-item">
          <span class="branch">{{ i === services.length - 1 ? '└── ' : '├── ' }}</span>
          <div class="node">
            <div class="node-head">
              <component
                :is="s.public ? 'a' : 'span'"
                v-bind="s.public ? { href: s.url, target: '_blank', rel: 'noopener' } : {}"
                class="host"
                :class="{ linked: s.public }"
              >{{ s.host }}</component>
              <span class="status"><span class="status-dot"></span>en ligne</span>
              <span v-if="!s.public" class="lock">prive — SSO</span>
            </div>
            <p class="node-name">{{ s.name }}</p>
            <p class="node-desc">{{ s.desc }}</p>
          </div>
        </li>
      </ul>
    </div>

    <p class="note">
      Dashboard et bastion restent volontairement sans lien direct ici : ils sont
      bien en ligne et proteges par SSO (Authelia), mais ce site public n'a pas
      vocation a servir de raccourci vers mes outils d'administration.
    </p>
  </div>
</template>

<style scoped>
.title { font-size: clamp(2.2rem, 6vw, 3.6rem); margin: 0.5rem 0 0.6rem; }
.sub { color: var(--dim); margin: 0 0 2.6rem; max-width: 60ch; }

.tree { font-family: var(--font-mono); }
.tree-root { color: var(--white); font-size: 0.95rem; margin-bottom: 0.4rem; }

.tree-list { list-style: none; margin: 0; padding: 0; }
.tree-item { display: flex; padding: 1.1rem 0; }
.branch { color: var(--line); white-space: pre; font-size: 0.95rem; }

.node { flex: 1; min-width: 0; }
.node-head { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.host { color: var(--ink); font-size: 0.9rem; text-decoration: none; border-bottom: 1px solid transparent; }
.host.linked { color: var(--white); }
.host.linked:hover { border-bottom-color: var(--white); }

.status { display: inline-flex; align-items: center; gap: 0.4em; color: var(--dim); font-size: 0.72rem; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--white); }
.lock { color: var(--dim); font-size: 0.72rem; border: 1px solid var(--line); padding: 0.1em 0.5em; }

.node-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--white);
  margin: 0.6rem 0 0.2rem;
}
.node-desc { margin: 0; color: var(--ink); font-size: 0.85rem; max-width: 50ch; }

.note {
  margin: 2.4rem 0 0;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line);
  color: var(--dim);
  font-size: 0.8rem;
  max-width: 62ch;
}

@media (max-width: 560px) {
  .branch { display: none; }
}
</style>
