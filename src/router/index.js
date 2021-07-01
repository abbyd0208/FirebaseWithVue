import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import ProductsList from "@/components/ProductsList";
import Dashboard from "@/components/Dashboard";
import About from "@/components/About";
import MissionList from "@/components/admin/MissionList";
import MissionAdd from "@/components/admin/MissionAdd";
import MissionPoint from "@/components/admin/ＭissionPoint";
import IndustryManage from "@/components/admin/IndustryManage";

Vue.use(Router);

export default new Router({
  routes: [
    // 讓一進來預設導頁到MissionList
    {
      path: "/",
      redirect:'/mission-list'
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "mission-list",
          name: "MissionList",
          component: MissionList
        },
        {
          path: "mission-add",
          name: "MissionAdd",
          component: MissionAdd
        },
        {
          path: "mission-point",
          name: "MissionPoint",
          component: MissionPoint
        },
        {
          path: "industry-manage",
          name: "IndustryManage",
          component: IndustryManage
        }
      ]
    }
  ]
});
