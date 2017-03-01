<template> 
    <header class="header clearfix">
        <div class="f-l">GER错误监控系统</div>
        <div class="f-r">
            <router-link :to="{ name: 'modpwd', query: { uname: userName }}" active-class="active">修改密码</router-link>
            <a href="/logout"> 退出</a>
        </div>
    </header>
</template>
<script type="text/javascript">
	import store from '../../store';
	import vuex from 'vuex';
	const mapState = vuex.mapState;
	const mapActions = vuex.mapActions;
	export default {
	    computed: {
	        ...mapState({
	            userName:state => store.state.initModule.userName
	        })
	    }
	   
	}
</script>