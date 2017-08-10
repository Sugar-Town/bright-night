<template>
  <div class="customervip">
    <h2 style="background:#4dc2e6;color: #fff;line-height: 45px;">客户销售</h2>
    <div class="cum_list">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="客户列表" name="first">
        <el-table
    :data="tableData2"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
    </el-tab-pane>

    <el-tab-pane label="客户统计" name="second">
        <el-table
    ref="multipleTable":data="tableData3" border tooltip-effect="dark" style="margin-bottom: 19px;" @selection-change="">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">     
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="140">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量"
      width="100">
    </el-table-column>
    <el-table-column
      prop="total"
      label="总价（元）"
      width="120">
    </el-table-column>
    <el-table-column
      prop="payS_shipS"
      label="付款状态/发货状态"
      width="170">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建日期">
  <!-- 添加这句让时间显示 -->
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
     </el-table>
    </el-tab-pane>

    <el-tab-pane label="共享客户" name="third">
         <el-table
      :data="tableData1"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="客户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="character"
        label="客户性质">
      </el-table-column>
      <el-table-column
        prop="cum_time"
        label="多久没联系">
      </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="海选客户" name="fourth">
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="客户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="cum_time"
        label="多久没联系">
      </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  </div>
</div>
</template>
<script>
  export default {
      data () {
          return {
            activeName2: 'first',
            tableData: [{
            name: '安顺经济技术开发区',
            address: '广东省深圳市龙岗区爱联',
            cum_time:'153天'
          }, {
            name: '香港樱花国际有限公司',
            address: '上海市普陀区金沙江路 1517 弄',
            cum_time:'233天'
          }, {
            name: '腾讯QQ',
            address: '广东省深圳市龙岗区爱联',
            cum_time:'163天'
          }, {
            name: '成都优秀科技',
            address: '上海市普陀区金沙江路 1516 弄',
            cum_time:'234天'
          }],
          tableData1: [{
            name: '安顺经济技术开发区',
            address: '广东省深圳市龙岗区爱联',
            character:'经销商',
            cum_time:'153天'
          }, {
            name: '香港樱花国际有限公司',
            address: '上海市普陀区金沙江路 1517 弄',
            character:'工程商',
            cum_time:'233天'
          }, {
            name: '腾讯QQ',
            address: '广东省深圳市龙岗区爱联',
            character:'经销商',
            cum_time:'163天'
          }, {
            name: '成都优秀科技',
            address: '上海市普陀区金沙江路 1516 弄',
                character:'经销商',
            cum_time:'234天'
          }],
          tableData3: [{
              name: '陈小红',
              phone:'0662-5738292',
              number:'22',
              total:'123.00',
              payS_shipS:'已付款/已发货',
              status:'未处理',
              date: '2017-08-01',
              operate:''                                      
            }, {
              name: '李小东',
              phone:'0662-23568887',
              number:'12',
              total:'88.00',
              payS_shipS:'已付款/未发货',
              status:'已取消',
              date: '2017-08-02',
              operate:''  
            }, {
              name: '程小明',
              phone:'1345678905',
              number:'33',
              total:'243.00',
              payS_shipS:'未付款/未发货',
              status:'未处理',
              date: '2017-08-03',
              operate:''  
            }, {
              name: '王小兰',
              phone:'1589275612',
              number:'9',
              total:'17.00',
              payS_shipS:'未付款/未发货',
              status:'未处理',
              date: '2017-08-04',
            }],
            tableData2: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }]
           
          }
        },
         methods: {
           handleClick(tab, event) {
           console.log(tab, event);
           },
           tableRowClassName(row, index) {
             if (index === 1) {
             return 'info-row';
           } else if (index === 3) {
             return 'positive-row';
           }
             return '';
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
  .customervip .el-table .info-row {
    background: #c9e5f5;
  }

  .customervip .el-table .positive-row {
    background: #e2f0e4;
  }
  .customervip .cum_list{
    width: 1223px;
  }
</style>