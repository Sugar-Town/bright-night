<template>
  <div class="userInfo">
    <!-- 面包屑
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品库存</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="post2">
    <div class="one">
      <el-button  type="success"><i class="fa fa-plus-circle" aria-hidden="true"></i>  添加</el-button>
      <el-button  type="info"><i class="fa fa-pencil" aria-hidden="true"></i>  修改</el-button>
      <el-button  type="danger"><i class="fa fa-times" aria-hidden="true"></i>  删除</el-button>
    </div>
    <div class="two">
      <ul>
        <li><img src="../../assets/kf01.png"><p>总库存</p><p><router-link to="./kucun-chakan">查看</router-link></p>
        </li>
        <li><img src="../../assets/kf02.png"><p>库房-河北站</p><p><router-link to="#">查看</router-link></p>
        </li>
        <li><img src="../../assets/kf03.png"><p>库房-北京站</p><p><router-link to="#">查看</router-link></p>
        </li>
        <li><img src="../../assets/kf04.png"><p>库房-天津站</p><p><router-link to="#">查看</router-link></p>
        </li>
        <li><img src="../../assets/kf-add.png"><p>添加仓库</p>
        </li>
      </ul>
    </div>
   </div>
  </div>
</template>
<script>
  export default {
      data () {
          return {
            name: 'yayin'
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
  .post2{
    margin:20px;
  }
  .post2 .two ul li{
    list-style: none;
    width: 150px;
    height: 182px;
    float: left;
    margin-right: 30px;
    border: 1px solid #fff;
  }
  .post2 .two ul li:hover{
    border: 1px solid blue;
    cursor: pointer;
  }
  .post2 .two{
    margin-top: 50px;
  }
  .post2 .two img{
    margin: 8px;
  }
  .post2 .two p{
    text-align: center;
  }

</style>