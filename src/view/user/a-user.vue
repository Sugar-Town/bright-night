<template>
  <div class="post">

    <!-- 面包屑导航 -->
     <!-- <div class="bre-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>  
        </el-breadcrumb>
     </div> -->

    <router-view></router-view>
  </div>
</template>
<script>
  export default {
      data () {
          return {
            message: 'Hello'
          }
        }
   }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .post{
    float: left;
  }
  .bre-crumb{
    margin: 20px 10px;
  }
</style>