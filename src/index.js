import './css/main.css';
import './css/user.css';
import Vue from 'vue';
import App from './app.vue';
import store from './store';
import vueRouter from 'vue-router';
import drouters from './routers/routerModule';
import beforeRouter from './routers/beforeRouter';
import vueResource from 'vue-resource';
Vue.use(vueRouter);
Vue.use(vueResource);
const router = new vueRouter({
	hashbang: false, 
	mode:'history',
  	routes: drouters
})
router.beforeEach((to, from, next) => {
    //设置title
    document.title = to.meta.title;
    //权限处理
    if( to.meta.needCompetence && !store.state.initModule.isAdmin ){
        next({
            path: '/report'
        });
    }else{
        if( beforeRouter[to.name] ){
            beforeRouter[to.name](Vue, to);
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