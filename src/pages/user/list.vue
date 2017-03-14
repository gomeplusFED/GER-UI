<template> 
	
    <div class="ger-list-content ger-user">

        <div class="clearfix ger-public-top">
            <span class="f-l">用户列表</span>
            <router-link :to="{ name: 'add'}" >创建用户</router-link>
        </div>
        <ul class="ger-list-head clearfix">
            <li class="width-50">用户名</li>
            <li class="width-25 t-c">创建时间</li>
            <li class="width-25 t-c">操作</li>
        </ul>
        <div  :class = "['ger-list-box', {'ger-noMore': !hasMorePage}]" >
            <ul class="ger-list" v-show="!loading && !isEmpty">
                <li class="clearfix"  v-for="list in lists">
                    <div class="width-50 list-over">
                        <router-link :to="{ name: 'edit', query: { uname: list.name }}">{{list.name}}</router-link>
                    </div>
                    <div class="width-25 t-c"><router-link :to="{ name: 'edit', query: { uname: list.name }}">{{list.time}}</router-link></div>
                    <div class="width-25 t-c">
                        <a href="javascript:;" @click="DELETE_USER(list.name)">删除</a>
                        <router-link :to="{ name: 'edit', query: { uname: list.name }}" active-class="active" class="edit">编辑</router-link>
                    </div>
                </li>
            </ul>
            <div v-show="loading" class="ger-loading">正在加载中，请稍后...</div>
            <div v-show="isEmpty" class="ger-loading">暂无用户，点击<router-link :to="{ name: 'add'}" active-class="active">创建用户</router-link></div>
        </div>
        <div class="ger-list-bottom" v-if="hasMorePage">
            <a href="javascript:;">上一页</a>
            <a href="javascript:;" class="active">1</a>
            <a href="javascript:;">2</a>
            <a href="javascript:;">3</a>
            <a href="javascript:;">4</a>
            <span>....</span>
            <a href="javascript:;">5</a>
            <a href="javascript:;">下一页</a>
        </div>
        
    </div>
</template> 
<script>
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
export default {
    computed: {
        ...mapState({
            userName:state => store.state.initModule.userName,
            lists: state => store.state.userList.list,
            loading: state => store.state.userList.loading,
            isEmpty: state => store.state.userList.isEmpty,
            hasMorePage: state => store.state.userList.hasMorePage
        })
    },
    methods:{
        ...mapActions(['DELETE_USER'])
    }

}

</script>

