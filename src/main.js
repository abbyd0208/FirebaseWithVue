// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 你可以指定所需要的插件
import $ from 'jquery'
import 'bootstrap'

import './bus'


import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

window.$ = $

import VueGoodTablePlugin from 'vue-good-table';

// import the styles 
import 'vue-good-table/dist/vue-good-table.css'
import {fb} from './firebase/firebase';

Vue.use(VueGoodTablePlugin);


// const bootstrap = require('bootstrap') 
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

// 檢查登入的狀態
router.beforeEach((to, from, next) => { 
  // 判斷要到達的頁面是否帶有 requiresAuth  沒有就直接放行， 有的話要經過驗證的API
    if(to.meta.requiresAuth){
      fb.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          next();
          console.log(uid)
          // ...
        } else {
            alert('您尚未登入');
            next({
              path:'/login'
            });
        }
      });

    }else{
      next();
    }
  
  })