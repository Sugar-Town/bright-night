<template>
  <div class="dashboard-editor-container">
    <el-row class="btn-group">
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">今日订单：123</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn pink-btn">今日成交：123</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn green-btn">今日新增客户：123</span>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="12" class="moneyChart">
        <money-chart></money-chart>
      </el-col>
      
      <el-col :span="12" class="orderChart">
        <order-chart></order-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import moneyChart from './moneyChart.vue';
  import orderChart from './orderChart.vue';
  export default {
    name: 'Dashboard',
    components: { moneyChart, orderChart },
    data() {
      return {
      };
    },
    computed: {
    }
  };
</script>

<style>
  .dashboard-editor-container {
    width: 100%;
    padding-left:50px; 
    margin-top: 50px;
  }
  .btn-group {
    margin-bottom: 100px;
    margin-bottom: 50px;
  }
</style>
