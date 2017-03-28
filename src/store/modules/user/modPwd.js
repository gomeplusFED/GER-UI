import store from '../../index.js';

const state = {
    info:{
        name: '',
        pwd: '',
        rpwd: ''   
    },
    error: {
        pwd: false,
        rpwd: false
    },
    submit: true
};

const mutations = {
	'EDIT_PWD': ( state ) => {
		let pwd = state.info.pwd;
		if( /^[0-9a-zA-Z]{6,20}$/.test(pwd) ){
			state.error.pwd = false;
			state.submit = true;
		}else{
			state.error.pwd = true;
			state.submit = false;
		}

    },
    'EDIT_RPWD': ( state ) => {
        if(state.info.pwd === state.info.rpwd){
           state.error.rpwd = false;
           state.submit = true;
        }else{
            state.error.rpwd = true;
            state.submit = false;
        }
    },
    'SAVE_PWD': (state) => {
    	
        let info = state.info;
        let error = state.error;
        for( let key in info ){

            if ( info.hasOwnProperty( key ) ) {
                if( !info[key] ){
                    state.submit = false;
                    error[key] = true;
                }
            }
        }
        if( info.pwd !== info.rpwd ){
            state.error.rpwd = true;
            state.submit = false;
        }
        if( state.submit){
            
            store._vm.$http.post( '/user/modPwd', {
                userName: state.info.name,
                pwd: state.info.pwd
            }).then((res) => {
                if(res.body.code === 200){
                    window.location.href = "/index";
                }else{
                    alert('保存失败，请重试！');
                }
            },() => {
                console.log(arguments);
            });
        }
    }
};

const actions = {

    'EDIT_PWD': ( store ) => {

        store.commit( 'EDIT_PWD' );

    },
    'EDIT_RPWD': ( store ) => {

    	store.commit( 'EDIT_RPWD' );

    },
    'SAVE_PWD': ( store ) => {

    	store.commit( 'SAVE_PWD' );
    }
};

const modPwd = {
    state,
    mutations,
    actions
};
export default modPwd;