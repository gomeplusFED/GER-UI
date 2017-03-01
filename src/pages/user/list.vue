<template> 
	<div>
    	<!-- {{test}}
    	<input type="button" value="aaa" @click="EDIT_TEST"/> -->
    	<!-- list -->
        <div class="right_area userlist">
        	<p class="content_title">用户列表</p>
            <ul class="list-group" v-if="items">
            	<li v-for="item in items">
					<a :data-id="item.id" href="#">{{ item.message }}</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            </ul>
            <div class="table_box">
                <table align="center">
                    <thead>
                        <tr>
                            <th>用户名</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        <tr>
                            <td><router-link :to="{ name: 'edit', query: { uname: userName }}">1. 用户名 user-1</router-link></td>
                            <td><router-link :to="{ name: 'edit', query: { uname: userName }}">创建时间:2017-02-01</router-link></td>
                            <td>
                                <a href="#">删除</a>
                                <router-link :to="{ name: 'edit', query: { uname: userName }}" active-class="active" class="edit">编辑</router-link>
                            </td>
                        </tr>
                        <tr>
                            <td><router-link :to="{ name: 'edit', query: { uname: userName }}">2. 用户名 user-2</router-link></td>
                            <td><router-link :to="{ name: 'edit', query: { uname: userName }}">创建时间:2017-02-01</router-link></td>
                            <td>
                                <a href="#">删除</a>
                                <router-link :to="{ name: 'edit', query: { uname: userName }}" active-class="active" class="edit">编辑</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
    }/*,
    created: {

        let trs = document.getElementsByTagName('tr');
        console.log(trs.length);
    }*/
}

</script>

