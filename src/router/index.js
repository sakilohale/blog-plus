import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hobby from '../views/Hobby'
import Person from '../views/person'
import About from '../views/About'
import Blog from '../views/Blog'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hobby',
    name: 'Hobby',
    component: Hobby
  },
  {
    path: '/person',
    name: 'Person',
    component: Person
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
  ,{
    path: '/blog/:id',
    name: 'Blog',
    component: Blog

  }
]

const router = new VueRouter({
  routes
})

export default router
