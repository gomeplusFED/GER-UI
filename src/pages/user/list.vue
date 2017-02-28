<template> 
    <div class="ger-cotent">
        <div class="right_area userlist">
            <ul class="list-group" v-if="items">
            	<li v-for="item in items">
					<a :data-id="item.id" href="#">{{ item.message }}</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            	<!-- 
            	<li class="list-group-item">
            		<a href="#">1. 用户名 user-1 创建时间:2017-02-01</a>
            		<input type="button" value="删除" class="btn delete fr">
            		<input type="button" value="编辑" class="btn edit fr">
            	</li> 
            	-->
            </ul>
        </div>
    </div>
</template> 
<script>
var obj = new Vue({
	data : {

	},
	method : {
		getList (){
			this.$http.post();
		}
	}
});
/*import store from '../../store';
import { mapState, mapActions } from 'vuex';

let msgInfoList = store.state.msgInfoList;
let initModule = store.state.initModule;

export default {
    computed: {
        ...mapState({
            msgList: state => msgInfoList.msgList,
            uid: state => initModule.imid,
            userInfo: state => msgInfoList.userInfo,
            userId: state => initModule.userInfo.userId,
            local: state => initModule.local,
            myAvatar: state => initModule.userInfo.myAvatar
        })
    },
    methods:{
      ...mapActions(['ADUIO_PLAY', 'showMask', 'RETRY_SEND'])
    }
}*/
</script>