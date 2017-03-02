<template> 
    <div class="ger-menu">
        <ul>
            <li v-if="isAdmin">
                <router-link :to="{name:'user'}" active-class="active">添加列表</router-link>
            </li>
            <li>
                <router-link :to="{name: 'report'}"  active-class="active">错误列表</router-link>
            </li>
        </ul>
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
            isAdmin:state =>store.state.initModule.isAdmin
        })
    }
   
}
</script>