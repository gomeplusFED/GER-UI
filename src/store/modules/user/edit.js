import store from '../../index.js';

const state = {
    userInfo: {
    	name: '',
    	pwd: '',
    	rpwd: '',
    	watchUrl: ''
    },
    error: {
    	name: false,
    	pwd: false,
    	rpwd: false,
    	watchUrl: false
    },
    submit: true,
    hasUser: false,
    loading: true,
    second: 3,
    isRepeat: false
};

const mutations = {
    'EDIT_NAME': (state) => {
        state.isRepeat = false;
        let name = state.userInfo.name;
        if( /^[a-zA-Z]{6,20}$/.test(name) ){
            state.error.name = false;
            state.submit = true;
        }else{
            state.error.name = true;
            state.submit = false;
        }

    },
	'EDIT_PWD': ( state ) => {
		let pwd = state.userInfo.pwd;
		if( /^[0-9a-zA-Z]{6,20}$/.test(pwd) ){
			state.error.pwd = false;
			state.submit = true;
		}else{
			state.error.pwd = true;
			state.submit = false;
		}

    },
    'EDIT_RPWD': ( state ) => {
    	state.error.rpwd = state.userInfo.pwd === state.userInfo.rpwd ? false : true ; 
    },
    'EDIT_WATCHURL': ( state ) => {
    	var watchUrl = state.userInfo.watchUrl;
		if( /^[A-Za-z0-9|/\r|\/n|/\r/\n|\.]+$/.test(watchUrl) ){
            let watchUrlArr = watchUrl.split(/[\r\n]/);
            function isThrough(arr){
                let n = 0;
                for(var i = 0; i < arr.length; i++){
                    if(arr[i].indexOf('|') != -1 ){
                        if(/(\|pc)|(\|mobile)$/.test(arr[i])){
                            n ++;
                        }
                    }else{
                        n ++;
                    }
                };
                return n == arr.length;
            }
            if(isThrough(watchUrlArr)){
                state.error.watchUrl = false;
                state.submit = true;
            }else{
                state.error.watchUrl = true;
                state.submit = false;
            }
		}else{
			state.error.watchUrl = true;
			state.submit = false;
		}
    },
    'SAVE_INFO': (state) => {
    	let userInfo = state.userInfo;
    	let error = state.error;
    	for( let key in userInfo ){

            if ( userInfo.hasOwnProperty( key ) ) {
                if( !userInfo[key] ){
                    state.submit = false;
                    error[key] = true;
                }
            }
    		
    	}
    	if( userInfo.pwd !== userInfo.rpwd ){
    		state.error.rpwd = true;
    		state.submit = false;
    	}
    	if( state.submit && !state.isRepeat ){
            let options = {
                superName: store.state.initModule.superName,
                userName: state.userInfo.name,
                pwd: state.userInfo.pwd,
                watchUrl: state.userInfo.watchUrl,
                type: state.userInfo.type
            };
    		store._vm.$http.post( '/user/edit', options).then((res) => {
    			if(res.body.code === 200){
    				window.location.href = "/user";
    			}else if(res.body.code === 409 ){
                    state.isRepeat = true;
                }
    		},() => {
    			console.log(arguments);
    		});
    	}
    }
};

const actions = {

    'EDIT_NAME': ( store ) => {

        store.commit( 'EDIT_NAME' );

    },
    'EDIT_PWD': ( store ) => {

        store.commit( 'EDIT_PWD' );

    },
    'EDIT_RPWD': ( store ) => {

    	store.commit( 'EDIT_RPWD' );

    },
    'EDIT_WATCHURL': ( store ) => {

    	store.commit( 'EDIT_WATCHURL' );
    },
    'SAVE_INFO': (store) => {
    	store.commit('SAVE_INFO');
    }
};

const userInfo = {
    state,
    mutations,
    actions
};
export default userInfo;