import './css/main.css';
import './css/user.css';
import Vue from 'vue';
import App from './app.vue';
import store from './store';
import vueRouter from 'vue-router';
import drouters from './routers/routerModule';
import beforeRouter from './routers/beforeRouter';
Vue.use(vueRouter);
const router = new vueRouter({
	hashbang: false, 
	mode:'history',
  	routes: drouters
})
router.beforeEach((to, from, next) => {
    //设置title
    document.title = to.meta.title;
    //权限处理
    if( to.fullPath.indexOf('/user') !== -1 && to.fullPath.indexOf('/user/modpwd') === -1){
        next({
            path: '/report'
        })
    }else{
        if( beforeRouter[to.name] ){
            beforeRouter[to.name](to);
        }
        next();
    }
})

let vueApp = new Vue({
	store,
    el: '#ger-ui',
   	...App,
   	router
});