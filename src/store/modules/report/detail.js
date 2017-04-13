

import Vue from  'vue';
const state = {
    lists: {},
    isError: false,
    loading: true,
    message: {},
    ext: {},
    messageKeys: ['msg', 'targetUrl', 'rowNum', 'colNum', 'title', 'host', 'currentUrl', 'referer', 'projectType', 'screenSize', 'flashVer', 'userAgent', 'log_master'],
    map: {
        column: 0,
        line: 0,
        name: '',
        source: ''
    },
    isMapShow: false,
    isMapError: false
};

const mutations = {
    'REPORT_REGET': () => {
     	window.location.reload();
    },
    'FILE_CHANGE': (state, e) => {
        let files = e.target.files;
        if(files.length){
            let file = files[0];
            if( file.name.split('.').pop() !== 'map' ){
                alert('请上传.map文件');
                return;
            }

            let formData = new FormData();
            formData.append('map', files[0]);
            formData.append('rowNum', state.message.rowNum);
            formData.append('colNum', state.message.colNum);
            Vue.http.post('/upload',formData).then(result=>{
                console.log(result);
                if( result.body.code === 200 ){
                    state.isMapShow = true;
                    state.map = result.body.data;
                }else{
                    state.isMapError = true;
                }
            }, () => {
                state.isMapError = true;
            });
        }
    }
};

const actions = {
    'REPORT_REGET': store => {
    	store.commit( 'REPORT_REGET');
    },
    'FILE_CHANGE': (store, e) => {
        store.commit('FILE_CHANGE', e);
    }
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;