import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Online from '../views/Online.vue'
import Services from '../views/Services.vue'
import Passions from '../views/Passions.vue'
import About from '../views/About.vue'
import Skills from '../views/Skills.vue'

// Hash history: the whole site is a single static bundle (no server-side
// route rewriting needed), which keeps deployment to a plain Nginx
// container trivial - exactly how this ships on the homelab.
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: Home, meta: { cmd: '~' } },
    { path: '/projects', name: 'projects', component: Projects, meta: { cmd: '~/projects' } },
    { path: '/online', name: 'online', component: Online, meta: { cmd: '~/online' } },
    { path: '/services', name: 'services', component: Services, meta: { cmd: '~/services' } },
    { path: '/passions', name: 'passions', component: Passions, meta: { cmd: '~/passions' } },
    { path: '/about', name: 'about', component: About, meta: { cmd: '~/about' } },
    { path: '/skills', name: 'skills', component: Skills, meta: { cmd: '~/skills' } },
  ],
})

export default router
