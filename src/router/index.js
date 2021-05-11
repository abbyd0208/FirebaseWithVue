import Vue from 'vue'
import Router from 'vue-router'
import ProductsList from '@/components/ProductsList'
import Dashboard from '@/components/Dashboard'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: ProductsList
    },
    {
      path: '/product-list',
      name: 'ProductsList',
      component: ProductsList
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
