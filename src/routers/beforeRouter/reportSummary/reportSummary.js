/**
 * @author jingyu
 * @fileoverview routers index.js
 * @date 2017/12/15
 */
import store from '../../../store';
export default (Vue, to)=>{
  store.state.pageModule.currentName = to.name;

  store.dispatch('RENDER_CHARTS', 7);
};