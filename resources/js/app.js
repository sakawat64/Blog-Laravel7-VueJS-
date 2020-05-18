/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
//import vue
window.Vue = require('vue');

//for vuex

//import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import storeData from "./store/index.js"
const store = new Vuex.Store(
  storeData
)
//end vuex
//vue-datatable
import DataTable from 'laravel-vue-datatable';
Vue.use(DataTable);
//end-datatable
//moment js for date format

import filter from './filter.js'

//end moment js for date format
//vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import {routes} from './routes.js';
//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('admin-main', require('./components/admin/AdminMaster.vue').default);
//fronted
Vue.component('home-main', require('./components/public/PublicMaster.vue').default);
Vue.component('home-extra', require('./components/public/HomeExtra.vue').default);
const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: 'hash'

  })
//end vue import
//v-form
//import Vue-from 'vue'
import { Form, HasError, AlertError } from 'vform'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.Form = Form;  //for declare globaly
//end v-form
//Sweet Alert2
import Swal from 'sweetalert2'
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
//end sweet alet2
//mark editor
import 'v-markdown-editor/dist/v-markdown-editor.css';
import Editor from 'v-markdown-editor'
Vue.use(Editor);
//end mark editor

// Toast.fire({
//   icon: 'success',
//   title: 'Signed in successfully'
// })
window.Toast = Toast;//for declare globaly
//end sweet-alert2
const app = new Vue({
    el: '#app',
    router, //vue
    store //store
});
