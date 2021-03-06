import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import NoviOglas from '../views/NoviOglas.vue'
import Apartmani from '../views/Apartmani.vue'
import ApartmaniDetaljno from '../views/ApartmaniDetaljno.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/apartmani',
    name: 'Apartmani',
    component: Apartmani
  },
  {
    path: '/apartmani/:id',
    name: 'ApartmaniDetaljno',
    component: ApartmaniDetaljno,
    props: true
  },
  {
    path: '/novi-oglas',
    name: 'NoviOglas',
    component: NoviOglas
  },
  {
    path: '/:notFound(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
