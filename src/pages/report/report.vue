<template> 
    <div >
    	{{test}}
    	<br/>
        {{test1}}
        <br/>
        {{test2}}
        <br/>
        <a href="javascript:;" @click="EDIT_TEST">点击我</a>
    	<br/>
        <a href="javascript:;" @click="EDIT_TEST1">点击我test1</a>
    	
    </div>
</template> 
<script type="text/javascript">
	
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
export default {
    computed: {
        ...mapState({
            test:state =>store.state.initModule.test,
            test1: state => store.state.initModule.test1
        }),
        test2: function(){
            return 'eqqeqweqeqwqwewqeq';
        }
    },
    methods: {
        ...mapActions(['EDIT_TEST','EDIT_TEST1'])
    }

   
}

</script>