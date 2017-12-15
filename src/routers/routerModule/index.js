/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/02/27
 */

import report from './report';
import user from './user';
import reportSummary from './reportSummary';
export default  Array.prototype.concat.call(user,report,reportSummary);