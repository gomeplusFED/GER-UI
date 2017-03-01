<template> 
    <div>
        <div class="right_area userdetail">
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
                <!-- <input type="button" class="back" value="返回"> -->
            	<router-link to="/index"  active-class="active" class="back">返回</router-link>
            </div>
        </div>
    </div>
</template> 
<script> 
</script>