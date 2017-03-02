<template> 
	
    <div class="ger-list-content">
        <ul class="ger-list-head">
            <li class="width-50">用户名</li>
            <li class="width-25 t-c">创建时间</li>
            <li class="width-25 t-c">操作</li>
        </ul>
            
        
        <div class="ger-list-box">
            <ul class="ger-list">
                <li class="clearfix">
                    <div class="width-50">
                        <router-link :to="{ name: 'edit', query: { uname: userName }}">1. 用户名 user-1</router-link>
                    </div>
                    <div class="width-25 t-c"><router-link :to="{ name: 'edit', query: { uname: userName }}">创建时间:2017-02-01</router-link></div>
                    <div class="width-25 t-c">
                        <a href="#">删除</a>
                        <router-link :to="{ name: 'edit', query: { uname: userName }}" active-class="active" class="edit">编辑</router-link></div>
                </li>
                <li class="clearfix">
                    <div class="width-50">
                        <router-link :to="{ name: 'edit', query: { uname: userName }}">1. 用户名 user-1</router-link>
                    </div>
                    <div class="width-25 t-c"><router-link :to="{ name: 'edit', query: { uname: userName }}">创建时间:2017-02-01</router-link></div>
                    <div class="width-25 t-c"><a href="#">删除</a>
                        <router-link :to="{ name: 'edit', query: { uname: userName }}" active-class="active" class="edit">编辑</router-link></div>
                </li>
                <li class="clearfix">
                    <div class="width-50">
                        <router-link :to="{ name: 'edit', query: { uname: userName }}">1. 用户名 user-1</router-link>
                    </div>
                    <div class="width-25 t-c"><router-link :to="{ name: 'edit', query: { uname: userName }}">创建时间:2017-02-01</router-link></div>
                    <div class="width-25 t-c"><a href="#">删除</a>
                        <router-link :to="{ name: 'edit', query: { uname: userName }}" active-class="active" class="edit">编辑</router-link></div>
                </li>
            </ul>
        </div>
        <div class="ger-list-bottom">
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
            test: state =>store.state.initModule.test,
            test1: state => store.state.initModule.test1
        })
    },
    methods: {
        ...mapActions(['EDIT_TEST','EDIT_TEST1'])
    }
}

</script>

