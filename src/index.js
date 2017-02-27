// Import a couple modules for testing.
import './css/main.css';
import Vue from 'vue';
import App from './app.vue';
/*import User from './modules/user.vue';
import Report from './modules/Report.vue';*/
import vueRouter from 'vue-router';

Vue.use(vueRouter)
const router = new vueRouter({
	hashbang: false, 
	mode:'history',
  	routes: [
	    /*{ path: '/user', component: User },
	    { path: '/error', component: Report }*/
  	]
})


let vueApp = new Vue({
    el: '#ger-ui',
   	...App,
   	router
});