<template> 
    <div >
    	
        list<br/>
        list<br/>
        list<br/>
        list<br/>
        list<br/>
        list<br/>
        list<br/>
        list<br/>
    </div>
</template> 
<script>
/*var obj = new Vue({
	data : {

	},
	method : {
		getList (){
			this.$http.post();
		}
	}
});*/
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
