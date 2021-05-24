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

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

window.$ = $


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
