import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProductsList from '@/components/ProductsList'
import Dashboard from '@/components/Dashboard'
import About from '@/components/About'
import MissionAdd from '@/components/admin/MissionAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
        children:[
          {
            path: 'product-list',
            name: 'ProductsList',
            component: ProductsList
          },
          {
            path: 'about',
            name: 'About',
            component: About
          },
        ]
    },
    
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
				{
					path: 'mission-add',
					name: 'MissionAdd',
					component: MissionAdd,
				},
			]
    }
  ]
})
