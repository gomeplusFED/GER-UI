<template> 
    <div class="ger-menu">
        <ul>
            <li v-if="isAdmin">
                <a href="">添加列表</a>
            </li>
            <li>
                <a href="">错误列表</a>
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
            character:state =>store.state.initModule.character
        }),
        isAdmin(){
            return this.character === 'admin';
        }
    }
}
</script>