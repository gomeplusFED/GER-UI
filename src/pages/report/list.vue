<template> 
	<div class="report-content">
		<div class="report-charbox"></div>
		<!-- <div class="report-info">
			<div>www.gomeplus.com</div>
			<div class="clearfix">
				<span>今日错误：20</span>
				<span>7日错误：20</span>
				<span>15日错误：20</span>
			</div>
			<div class="clearfix">
				<span>错误类型：20</span>
				<span>报错脚本数：20</span>
				<span>最高错误类型：err msg</span>
			</div>
		</div> -->
		<div class="clearfix report-doway">
			<span>最近：</span>
			<select>
				<option>1天</option>
				<option>2天</option>
				<option>3天</option>
				<option>4天</option>
				<option>5天</option>
				<option>6天</option>
				<option>7天</option>
				<option>8天</option>
				<option>9天</option>
				<option>10天</option>
				<option>11天</option>
				<option>12天</option>
				<option>13天</option>
				<option>14天</option>	
				<option>15天</option>
			</select>
			<a href="javascript:;">按时间排序</a>
			<a href="javascript:;">按错误类型数量排序</a>
			<span>按类型：</span>
			<select class="type-select">
				<option>错误消息</option>
				<option>错误链接</option>
				<option>错误文件</option>
			</select>
			<input type="text" placeholder="请输入搜索关键词"/>
			<a href="javascript:;">搜索</a>
		</div>
		<ul class="ger-list-head clearfix">
            <li class="width-30">错误信息</li>
            <li class="width-15 t-c">时间</li>
            <li class="width-30">页面</li>
            <li class="width-15 t-c">同类型错误数</li>
            <li class="width-10 t-c">操作</li>
        </ul>
        <div class="ger-list-box">
			<ul class="ger-list">
				<li class="clearfix">
					<div class="width-30">
						<div class="list-over">发生的冯绍峰是的是的对方是否发生的冯绍峰是的是的对方是否发生的冯绍峰是的是的对方是否发生的冯绍峰是的是的对方是否发生的冯绍峰是的是的对方是否发生的冯绍峰是的是的对方是否</div>
					</div>
					<div class="width-15 t-c">2017-02-18 99:00</div>
					<div class="width-30">fdsfsfsd发送到发送到</div>
					<div class="width-15 t-c">12</div>
					<div class="width-10 t-c">
						<router-link :to="{ name: 'reportDetail'}">查看更多</router-link>
					</div>
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
</script>