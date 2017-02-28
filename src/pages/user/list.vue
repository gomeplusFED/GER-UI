<template> 
	<div>
    	<!-- {{test}}
    	<input type="button" value="aaa" @click="EDIT_TEST"/> -->
    	<!-- list -->
        <!-- <div class="right_area userlist">
        	<p class="content_title">用户列表</p>
            <ul class="list-group" v-if="items">
            	<li v-for="item in items">
					<a :data-id="item.id" href="#">{{ item.message }}</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            </ul>
            <ul class="list-group">
            	<li>
					<a href="#">1. 用户名 user-1 创建时间:2017-02-01</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            	<li>
					<a href="#">2. 用户名 user-2 创建时间:2017-02-02</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            	<li>
					<a href="#">3. 用户名 user-3 创建时间:2017-02-01</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            	<li>
					<a href="#">4. 用户名 user-4 创建时间:2017-02-02</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            	<li>
					<a href="#">5. 用户名 user-5 创建时间:2017-02-01</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            	<li>
					<a href="#">6. 用户名 user-6 创建时间:2017-02-02</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            </ul>
        </div> -->
        <!-- add -->
        <!-- <div class="right_area useradd">
        	<p class="content_title">添加用户</p>
            <label for="username">用户名: </label><input type="text" id="username" class="username">
            <div class="submit">
                <input type="button" class="create" value="创建">
                <input type="button" class="back" value="返回">
            </div>
        </div> -->
        <!-- detail -->
        <!-- <div class="right_area userdetail">
        	<p class="content_title">用户详情</p>
        	<ul>
                <li>
                    <label for="username">用户名: </label><input type="text" id="username" class="username">
                </li>
                <li>
                    <label for="password">密　码: </label><input type="password" id="password" class="password">
                </li>
                <li class="clearfix">
                    <label class="fl" for="domains">域名组: </label>
                    <textarea class="domains" id="domains"></textarea>
                </li>
            </ul>
            <div class="submit">
                <input type="button" class="create" value="创建">
                <input type="button" class="back" value="返回">
            </div>
        </div> -->
        <!-- changepass -->
        <!-- <div class="right_area userdetail">
			<p class="content_title">修改密码</p>
			<ul>
                <li>
                    <label for="password">新密码: </label><input type="password" id="password" class="password">
                </li>
                <li>
                    <label for="password">确认密码: </label><input type="password" id="password" class="password">
                </li>
            </ul>
            <div class="submit">
                <input type="button" class="change" value="修改">
                <input type="button" class="back" value="返回">
            </div>
        </div> -->
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
            test: state =>store.state.initModule.test,
            test1: state => store.state.initModule.test1
        })
    },
    methods: {
        ...mapActions(['EDIT_TEST','EDIT_TEST1'])
    }
}
</script>
