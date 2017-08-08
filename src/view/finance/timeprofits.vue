<template>
  <div class="userInfo">
    <div class="timeprofits">

   
    <template> 
    <!-- 选择日期范围 -->
      <div class="block">
        <span class="demonstration"><b>请选择日期范围：</b></span>
        <el-date-picker v-model="dates" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="">确定</el-button>
      </div>


      <!-- 总利润 -->
      <div class="profit">
      <h3>总利润：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;¥</h3><el-input v-model="profits"></el-input>
      </div>


      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-plus">&nbsp;&nbsp;</i>入款单</span>
            <!-- 入款单表格数据显示 -->
            <el-table class="table" :data="tableData" height="600" border style="width: 100%">
              <el-table-column prop="jilu_date" label="录入时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="jilu_input" label="单据编号" sortable width="200">
              </el-table-column>
              <el-table-column prop="pay_name" label="付款方" width="200">
              </el-table-column>
              <el-table-column prop="do_name" label="经手人" width="200">
              </el-table-column>
              <el-table-column prop="region" label="部门" width="200">
              </el-table-column>
              <el-table-column prop="jilu_get" label="收取金额（¥）" width="200">
              </el-table-column>
            </el-table>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"><i class="el-icon-minus">&nbsp;&nbsp;</i>出款单</span>
            <!-- 出款单表格数据显示 -->
            <el-table class="table" :data="tableData2" height="600" border style="width: 100%">
              <el-table-column prop="jilu_date" label="录入时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="jilu_input" label="单据编号" sortable width="200">
              </el-table-column>
              <el-table-column prop="pay_name" label="付款方" width="200">
              </el-table-column>
              <el-table-column prop="do_name" label="经手人" width="200">
              </el-table-column>
              <el-table-column prop="region" label="部门" width="200">
              </el-table-column>
              <el-table-column prop="jilu_get" label="收取金额（¥）" width="200">
              </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>

    </template>



    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 选择日期范围
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dates: '',

        // 总利润
        profits: '0.00',

        // 入款单表格数据显示
        tableData: [{
            jilu_date: '2016-05-03',
            jilu_input: '555',
            pay_name: '上海',
            do_name: '普陀区',
            region: '上海市普陀区金沙江路 1518 弄',
            jilu_get: 4444
          }, {
            jilu_date: '2016-05-02',
            jilu_input: '999',
            pay_name: '香港',
            do_name: '普陀区',
            region: '上海市普陀区金沙江路 1518 弄',
            jilu_get: 4444
          }, {
            jilu_date: '2016-05-04',
            jilu_input: '54564',
            pay_name: '广东',
            do_name: '普陀区',
            region: '上海市普陀区金沙江路 1518 弄',
            jilu_get: 4444
          }],


          // 出款单表格数据显示
          tableData2: [{
              jilu_date: '2016-05-03',
              jilu_input: '666',
              pay_name: '上海',
              do_name: '普陀区',
              region: '上海市普陀区金沙江路 1518 弄',
              jilu_get: 4444
            }, {
              jilu_date: '2016-05-02',
              jilu_input: '66666',
              pay_name: '香港',
              do_name: '普陀区',
              region: '上海市普陀区金沙江路 1518 弄',
              jilu_get: 4444
            }, {
              jilu_date: '2016-05-04',
              jilu_input: '777777',
              pay_name: '广东',
              do_name: '普陀区',
              region: '上海市普陀区金沙江路 1518 弄',
              jilu_get: 4444
            }],





      };
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

  .timeprofits{
    width: 1200px;
    padding-top: 60px;
    padding-left: 30px;
    padding-right: 30px;
    height: 1000px;
  }

  /*选择日期范围*/
  .block{
    margin-bottom: 50px;
  }

  .block .el-button{
    margin-left: 30px;
  }

  /*总利润*/
  .profit{
    margin-top: 60px;
    margin-bottom: 150px;
  }

  .profit h3{
    float: left;
  }

  .profit .el-input{
      width: 26%;
      float: left;
      margin-left: 20px;
  }

</style>