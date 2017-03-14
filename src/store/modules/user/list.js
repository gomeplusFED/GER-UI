import store from '../../index.js';

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
				window.location.reload() 
			}
		},() => {
			console.log(arguments);
		})
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