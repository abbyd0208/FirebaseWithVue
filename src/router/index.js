import Vue from "vue";
import Router from "vue-router";
import VueMeta from 'vue-meta';
import About from "@/components/About";
import Missions from "@/components/MissionList";
import Mission from "@/components/Mission";
import Login from "@/components/Login"; 
import Dashboard from "@/components/Dashboard";
import MissionList from "@/components/admin/MissionList";
import MissionAdd from "@/components/admin/MissionAdd";
import MissionPoint from "@/components/admin/ＭissionPoint";
import IndustryManage from "@/components/admin/IndustryManage";
import UserAdmin from "@/components/admin/User.vue"
import NotFound from "@/components/NotFound.vue"
Vue.use(Router);
Vue.use(VueMeta);

export default new Router({
  routes: [
   
    // 讓一進來預設導頁到MissionList
    {
      path: "/",
      redirect:'/missions'
    },
	// 讓一進來預設導頁到MissionList
	{
		path: "/admin",
		redirect:'/login'
	  },
    {
		path: '/about',
		name: 'About',
		component: About
	},
    {
		path: '/missions',
		name: 'missions',
		component: Missions
	},
	{
		path: '/mission/:missionId',
		name: 'mission',
		component: Mission
	},
    {
		path: '/login',
		name: 'Login',
		component: Login
	},
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
			path: 'user-admin',
			name: 'adminAdmin',
			component: UserAdmin,
			meta: { requiresAuth: true}
        },
        {
			path: "mission-list",
			name: "MissionList",
			component: MissionList,
			meta: { requiresAuth: true}
        },
        {
			path: "mission-add",
			name: "MissionAdd",
			component: MissionAdd,
			meta: { requiresAuth: true}
        },
        {
			path: "mission-point",
			name: "MissionPoint",
			component: MissionPoint,
			meta: { requiresAuth: true}
        },
        {
			path: "industry-manage",
			name: "IndustryManage",
			component: IndustryManage,
			meta: { requiresAuth: true}
        },
		{
			path:'*',
			name:'Notfound,',
			component:NotFound
		}
      ]
    }
  ]
});
