<template> 
    <div class="right_area modpwd">
		<div class="clearfix ger-public-top">
            <span class="f-l">用户详情</span>
            <a href="javascript:;" @click="routerBack">返回</a>
        </div>
		<ul>
            <li class="clearfix">
                <label>新密码: </label>
                <input type="password" class="password" autocomplete="off" lazy @change="EDIT_PWD" v-model="info.pwd">
                <span  class="ger-form-notice" v-show="!error.pwd">请输入6-20位字母或数字</span>
                <span class="ger-form-error"  v-show="error.pwd">密码格式错误！</span>
            </li>
            <li class="clearfix">
                <label>确认密码: </label>
                <input type="password" class="password"  autocomplete="off" lazy @change="EDIT_RPWD" v-model="info.rpwd">
                <span class="ger-form-notice"  v-show="!error.rpwd">请再次输入密码</span>
                <span class="ger-form-error"  v-show="error.rpwd">密码输入不一致，请重新输入！</span>
            </li>
        </ul>
        <div class="submit">
            <a href="javascript:;" class="btns" @click="SAVE_PWD">保存</a>
        	<router-link to="/index"  active-class="active" class="btns back">返回</router-link>
        </div>
    </div>
</template> 
<script>
    
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
const modPwd = store.state.modPwd;
export default {
    computed: {
        ...mapState({
            error: state => modPwd.error,
            info: state => modPwd.info
        })
    },
    methods:{
        routerBack(){
            this.$router.go(-1);
        },
        ...mapActions(['EDIT_PWD', 'EDIT_RPWD' ,'SAVE_PWD'])
    }
}
</script>