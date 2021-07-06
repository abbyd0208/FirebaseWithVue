import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login"; 
import Dashboard from "@/components/Dashboard";
import MissionList from "@/components/admin/MissionList";
import MissionAdd from "@/components/admin/MissionAdd";
import MissionPoint from "@/components/admin/ＭissionPoint";
import IndustryManage from "@/components/admin/IndustryManage";
import UserAdmin from "@/components/admin/User.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
			path: '/login',
			name: 'Login',
			component: Login
		},
    // 讓一進來預設導頁到MissionList
    {
      path: "/",
      redirect:'/login'
    },
   
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: '/user-admin',
          name: 'adminAdmin',
          component: UserAdmin
        },
        {
          path: "mission-list",
          name: "MissionList",
          component: MissionList,
          meta: { requiresAuth: true }
        },
        {
          path: "mission-add",
          name: "MissionAdd",
          component: MissionAdd,
          meta: { requiresAuth: true }
        },
        {
          path: "mission-point",
          name: "MissionPoint",
          component: MissionPoint,
          meta: { requiresAuth: true }
        },
        {
          path: "industry-manage",
          name: "IndustryManage",
          component: IndustryManage,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
