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
                <a href="#" class="btns">修改</a>
            	<router-link to="/index"  active-class="active" class="btns back">返回</router-link>
            </div>
        </div>
    </div>
</template> 