<template> 
    <div class="ger-menu">
        <ul>
            <li >
                <a href="">添加列表{{character}}</a>
            </li>
            <li>
                <a href="">错误列表</a>
            </li>
        </ul>
    </div>
</template> 
<script> 

import store from '../../store';
//console.log(store)
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;

export default {
   
}
</script>