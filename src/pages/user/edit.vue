<template> 
<div>
    
    <div class="right_area userdetail" v-if="hasUser">
        <div class="clearfix ger-public-top">
            <span class="f-l">用户详情</span>
            <a href="javascript:;" @click="routerBack">返回</a>
        </div>
        <ul>
            <li class="clearfix">
                <label for="username">用户名: </label>
                <input class="username" type="text" id="username" autocomplete="off" readonly="readonly" v-model = 'userInfo.name' lazy>
            </li>
            <li class="clearfix">
                <label>密　码: </label>
                <input class="password"  type="password"  autocomplete="off" v-model = 'userInfo.pwd' lazy  @change="EDIT_PWD">
                <span v-show="!error.pwd" class="ger-form-notice">请输入6-20位字母或数字</span>
                <span class="ger-form-error" v-show="error.pwd">密码格式错误！</span>
            </li>
            <li class="clearfix">
                <label>确认密码: </label>
                <input class="password"  type="password"autocomplete="off" v-model = 'userInfo.rpwd' lazy @blur="EDIT_RPWD">
                <span v-show="!error.rpwd" class="ger-form-notice">请再次输入密码</span>
                <span class="ger-form-error" v-show="error.rpwd">密码输入不一致，请重新输入！</span>
            </li>
            <li class="clearfix">
                <label class="fl" >域名组: </label>
                <textarea class="domains"  v-model='userInfo.watchUrl' lazy @blur="EDIT_WATCHURL"></textarea>
                <span class="ger-form-notice" v-show="!error.watchUrl">请输入域名，以回车分割，终端名称以|分割 pc/mobile<br>eg: www.gomeplus.com|pc  或  www.gomeplus.com|mobile </span>
                <span class="ger-form-error" v-show="error.watchUrl">域名输入格式错误，请重新输入</span>
            </li>
        </ul>
        <div class="submit">
            <a class="btns" href="javascript:;" @click="SAVE_INFO">保存</a>
            <router-link to="/index"  active-class="active" class="btns back">返回</router-link>
        </div>
    </div>
    <div v-if="!hasUser && !loading" class="ger-loading">
        当前管理员下无此账号，请查看后重试<br/> <span>{{second}}</span>秒后跳至用户列表，点击<router-link :to="{ name: 'user'}" active-class="active">用户列表</router-link>返回
    </div>
    <div v-show="loading" class="ger-loading">
        正在加载，请稍后...
    </div>
</div>
</template> 
<script>

import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
const userInfoModule = store.state.userInfo;
export default {
    computed: {
        ...mapState({
            hasUser: state => userInfoModule.hasUser,
            loading: state => userInfoModule.loading,
            second: state => userInfoModule.second,
            userInfo: state => userInfoModule.userInfo,
            error: state => userInfoModule.error
        })
    },
    methods:{
      	routerBack(){
        	this.$router.go(-1);
      	},
        ...mapActions(['EDIT_PWD', 'EDIT_RPWD', 'EDIT_WATCHURL', 'SAVE_INFO'])
    }
}
</script>
