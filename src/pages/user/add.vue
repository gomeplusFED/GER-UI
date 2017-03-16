<template> 
<div>
    
    <div class="right_area userdetail">
        <div class="clearfix ger-public-top">
            <span class="f-l">用户详情</span>
            <a href="javascript:;" @click="routerBack">返回</a>
        </div>
        <ul>
            <li class="clearfix">
                <label for="username">用户名: </label>
                <input class="username" type="text" id="username" autocomplete="off"  v-model = 'userInfo.name' lazy @change="EDIT_NAME">
                <span v-show="!error.name && !isRepeat" class="ger-form-notice">请输入6-20位字母</span>
                <span class="ger-form-error" v-show="error.name">用户名格式错误</span>
                <span class="ger-form-error" v-show="isRepeat && !error.name">用户名重复</span>
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
                <span class="ger-form-notice" v-show="!error.watchUrl">请输入域名，以回车分割</span>
                <span class="ger-form-error" v-show="error.watchUrl">域名输入格式错误，请重新输入</span>
            </li>
        </ul>
        <div class="submit">
            <a class="btns" href="javascript:;" @click="SAVE_INFO">保存</a>
            <router-link to="/index"  active-class="active" class="btns back">返回</router-link>
        </div>
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
            userInfo: state => userInfoModule.userInfo,
            error: state => userInfoModule.error,
            isRepeat: state => userInfoModule.isRepeat
        })
    },
    methods:{
        routerBack(){
            this.$router.go(-1);
        },
        ...mapActions(['EDIT_NAME', 'EDIT_PWD', 'EDIT_RPWD', 'EDIT_WATCHURL', 'SAVE_INFO'])
    }
}
</script>
