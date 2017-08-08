<template>
  <div class="post">
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
  a {
    text-decoration: none;
  }
  .el-breadcrumb{
    margin: 20px;
  }
</style>