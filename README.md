# Portfolio — pierre-dev.fr

Site vitrine personnel. Vue 3 + Vite, style terminal/CRT retro noir et blanc.
Routage cote client en hash (`/#/projects`) pour fonctionner en statique pur,
sans configuration serveur particuliere.

## Stack

- **Vue 3** (Composition API, `<script setup>`) + **Vue Router 4**
- **Vite** pour le build
- **Docker** multi-stage (build Node -> Nginx statique), image publiee sur
  **GitHub Container Registry** (ghcr.io)
- **GitHub Actions** : build a chaque PR, build & push de l'image a chaque
  merge sur `main`

## Developpement local

```bash
npm install
npm run dev
```

## Deploiement (homelab)

Sur le CT dedie au portfolio (Debian 12 + Docker) :

```bash
mkdir -p /opt/portfolio && cd /opt/portfolio
# copier docker-compose.yml de ce repo ici
docker compose pull
docker compose up -d
```

Le conteneur ecoute sur le port `8089` (HTTP, statique). NPM (sur un autre
CT du LAN) route `pierre-dev.fr` vers `CT_IP:8089`.

Si le package GHCR `portfolio2` est prive, il faut se logger une fois sur le
CT avant le premier `pull` :

```bash
echo "<PAT_avec_scope_read:packages>" | docker login ghcr.io -u pierre3150 --password-stdin
```

Plus simple : passer le package en **public** depuis GitHub
(Package settings -> Change visibility) puisqu'il n'y a aucune donnee
sensible dans un site vitrine statique.

## Configuration NPM (reverse proxy)

Proxy Host classique, sans SSO (contrairement a dashboard.pierre-dev.fr) :

- **Domain** : `pierre-dev.fr` (+ `www.pierre-dev.fr` si besoin)
- **Forward Hostname/IP** : IP du CT portfolio
- **Forward Port** : `8089`
- **SSL** : Let's Encrypt, Force SSL + HTTP/2 actives
