import store from '../../index.js';
import Vue from  'vue';
const state = {
    list:[],
    hasMorePage: false,
    isEmpty: false,
    loading: true
};

const mutations = {
	'DELETE_USER': (state, name) => {
		store._vm.$http.post( '/user/delete', {
			superName: store.state.initModule.userName,
			userName: name
		}).then((res) => {
			if(res.body.code === 200){
				window.location.reload();
			}
		},() => {
			console.log(arguments);
		});
	},
	'CHANGE_USER_LIST_PAGE': (state, num) =>{
		Vue.http.post('/user/getlist', {
            pageNum: num,
            superName: store.state.initModule.superName
        }).then(result=>{
            let rBody = result.body;
            if( rBody.code === 200 ){
                let pageModule = store.state.pageModule;
                let lists = rBody.data;
                pageModule.pages = rBody.page;
                pageModule.hasMorePage = rBody.page.pages;
                state.list = rBody.data;
                state.buckets = rBody.data.buckets;
                state.total = rBody.data.total;
                if( lists.length === 0 ){
                    state.listNormal = true;
                }
            }else{
                state.isError = true;
            }
            state.loading = false;
        },()=>{
            state.isError = true;
            state.loading = false;
        });
	}
};

const actions = {
	'DELETE_USER': (store, name) => {
		store.commit( 'DELETE_USER', name );
	}
};
const userList = {
    state,
    mutations,
    actions
};
export default userList;