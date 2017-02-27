<template>
    <div class="ger-body">
        <topBox></topBox>
        <div class="ger-middle">
           <leftMenu></leftMenu>
           <rightcontent></rightcontent>   
        </div>
    </div>

  <!-- <div>
 
  <p>
    <router-link to="/user">/user/foo</router-link>
    <router-link to="/error">/user/bar</router-link>
  </p>
  <router-view></router-view>
  </div> -->
</template>
<script> 

import topBox from './pages/public/header.vue';
import leftMenu from './pages/public/menu.vue';
import rightcontent from './pages/public/content.vue';

export default {
  components: {
    topBox,
    leftMenu,
    rightcontent
  }
}
</script>