<template>
  <div class="post">
    <el-row class="siderBar">
      <sideBar></sideBar>
    </el-row>
    <div class="rightBody">
      <div class="navBar"><navBar></navBar></div>
      <levelbar></levelbar>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import levelbar from '@/view/layout/Levelbar'
import sideBar from '@/view/layout/SideBar'
import navBar from '@/view/layout/NavBar'
export default {
  components: { levelbar, sideBar, navBar },
  data() {
     return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  }
 }
</script>

<style>
  body {
    overflow-x: hidden; 
  }
  * { 
    padding: 0;
    margin: 0;
  }
  a, span  {
    text-decoration: none;
    font-size: 14px;
  }
  .home {
    color: #c5d1de; 
    font-size: 14px;
    font-weight: bold;
  }
  .home:hover {
    color: #48576a;
  }

  .siderBar {
    float: left;
    width: 13%;
  }
  .rightBody {
    width: 87%; 
    float:left;
  }
  .navBar {
    background: #eef1f6; 
    width:100%; 
    height: 46px;
    margin-bottom: 5px;
  }
  .post {
    width: 100%;
  }
  .menu-demo {
    height: 794px;
    min-width: 130px;
    background-color:#324157;
  }
  .el-submenu .el-menu-item {
       min-width: 90px; 
  }
  .el-submenu__title {
    color: #c5d1de;
  }
  .el-submenu__title:hover {
    color: #48576a;
  }
</style>
