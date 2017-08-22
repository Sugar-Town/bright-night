<template>
        <el-col>
          <el-menu default-active="2" class="menu-demo">

            <router-link to="/index/readme">
                <el-menu-item index="/index/readme" class="home">
                    <i class="fa fa-home menu-icon" style="font-size: 19px;"></i>首页
                </el-menu-item>
            </router-link>

            <el-submenu index="1">
              <template slot="title"><i class="fa fa-university menu-icon"></i>库房管理<i class="el-submenu__icon-arrow el-icon-caret-bottom"></i></template>
                <router-link to="/index/house/instock"><el-menu-item index="1-1">入库单</el-menu-item></router-link>
                <router-link to="/index/house/outstock"><el-menu-item index="1-2">出库单</el-menu-item></router-link>
                <router-link to="/index/house/allocation"><el-menu-item index="1-3">库存分配</el-menu-item></router-link>
                <router-link to="/index/house/remaining"><el-menu-item index="1-4">库存余额</el-menu-item></router-link>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="fa fa-product-hunt menu-icon"></i>产品管理<i class="el-submenu__icon-arrow el-icon-caret-bottom"></i></template>
                <router-link to="/index/product/kucun"><el-menu-item index="2-1">产品库存</el-menu-item></router-link>
                <router-link to="/index/product/chengben"><el-menu-item index="2-2">产品成本</el-menu-item></router-link>
                <router-link to="/index/product/shuxing"><el-menu-item index="2-3">产品属性管理</el-menu-item></router-link>
                <router-link to="/index/product/productList"><el-menu-item index="2-4">产品列表</el-menu-item></router-link>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><i class="fa fa-calendar-minus-o menu-icon"></i>订单管理<i class="el-submenu__icon-arrow el-icon-caret-bottom"></i></template>
                 <router-link to="/index/order/index"><el-menu-item index="3-1">订单报表</el-menu-item></router-link>
                <router-link to="/index/order/orderAccount"><el-menu-item index="3-2">所有订单</el-menu-item></router-link>
                <router-link to="/index/order/orderColleague"><el-menu-item index="3-3">所属员工</el-menu-item></router-link>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title"><i class="fa fa-money menu-icon"></i>财务管理<i class="el-submenu__icon-arrow el-icon-caret-bottom"></i></template>
                <router-link to="/index/finance/jilu"><el-menu-item index="4-1">记录出款和入款</el-menu-item></router-link>
                <router-link to="/index/finance/timeProfits"><el-menu-item index="4-2">计算一段时间的利润</el-menu-item></router-link>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title"><i class="fa fa-address-book menu-icon"></i>客户管理<i class="el-submenu__icon-arrow el-icon-caret-bottom"></i></template>
                <router-link to="/index/customer/customerInfo"><el-menu-item index="5-1">客户基本信息</el-menu-item></router-link>
                <router-link to="/index/customer/customer-vip"><el-menu-item index="5-2">客户销售</el-menu-item></router-link>
                <router-link to="/index/customer/customerOder"><el-menu-item index="5-3">客户订单管理</el-menu-item></router-link>
                <router-link to="/index/customer/customerTranfer"><el-menu-item index="5-4">客户关系管理</el-menu-item></router-link>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title"><i class="fa fa-users menu-icon"></i>员工管理<i class="el-submenu__icon-arrow el-icon-caret-bottom"></i></template>
                <router-link to="/index/user/userInfo"><el-menu-item index="6-1">员工基本信息</el-menu-item></router-link>
                <router-link to="/index/user/power"><el-menu-item index="6-2">员工权限</el-menu-item></router-link>
                <router-link to="/index/user/newUser"><el-menu-item index="6-3">入职新员工</el-menu-item></router-link>
                <router-link to="/index/user/sale"><el-menu-item index="6-4">员工销售额管理</el-menu-item></router-link>
            </el-submenu>
            
          </el-menu>
        </el-col>
</template>

<script>
  export default {
    data() {
      return {
        levelList: null
      }
    },
  }
</script>

<style>
  .menu-icon {
    font-size: 16px;
    padding-right: 15px; 
  }
</style>