<template>
  <div class="sale">
      <!-- 面包屑导航 -->
    <!--  <div class="bre-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>员工权限</el-breadcrumb-item>  
        </el-breadcrumb>
     </div> -->

     <!-- 表头 要搜索的选项 -->
     <div class="info-top">
       <el-form :inline="true" :model="searchOption" class="demo-form-inline">
           <el-form-item label="请选择：">
             <el-select v-model="searchOption.kinds"  placeholder="商品种类">
               <el-option label="商品A" value="a"></el-option>
               <el-option label="商品B" value="b"></el-option>
               <el-option label="商品C" value="c"></el-option>
               <el-option label="商品D" value="d"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item>
           <el-form-item label="请输入：">
             <el-input v-model="searchOption.employeeName" placeholder="您要搜索的员工编号/名字"></el-input>
           </el-form-item>
           <el-button type="primary" v-waves icon="search" @click="onSubmit">查询</el-button>
         </el-form-item>
       </el-form>
     </div>

     <!-- 表头  日期时间选择器 -->
     <div class="datePicker inline-block">
        <span class="demonstration">录入时间</span>
        <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" align="right"
         :picker-options="pickerOptions1"></el-date-picker>
      </div>

     <!-- 员工销售数据明细 -->
     <div class="info-con">
        <el-table :data="tableData" border show-summary style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
           <el-table-column prop="date" label="销售时间" sortable width="180"></el-table-column>
           <el-table-column prop="saleMan" label="销售人员" width="180"></el-table-column>
           <!-- <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column> -->
           <el-table-column prop="goods" label="商品" width="180"></el-table-column>
           <el-table-column prop="saleQuantity" label="销售量/月" sortable width=""></el-table-column>
           <el-table-column prop="saleAmount" label="销售额/万" sortable width=""></el-table-column>
        </el-table>
     </div>

     <div class="sale-more">
        <router-link to="./echarts"><img src="../.././assets/sale-more.jpg"><span>查看更多</span></router-link>
     </div>

  </div>
</template>
<script>
  import {api} from '@/global/api'
  export default {
      data () {
          return {
            //表头 输入搜索条件
            inputName: '',
            inputGood:'',
            searchOption:{
                kinds:'',
                employeeName:''
            },
            //员工销售数据明细表
            tableData: null,
            //时间日期选择器
            pickerOptions1: {
                   shortcuts: [{
                     text: '今天',
                     onClick(picker) {
                       picker.$emit('pick', new Date());
                     }
                   }, {
                     text: '昨天',
                     onClick(picker) {
                       const date = new Date();
                       date.setTime(date.getTime() - 3600 * 1000 * 24);
                       picker.$emit('pick', date);
                     }
                   }, {
                     text: '一周前',
                     onClick(picker) {
                       const date = new Date();
                       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                       picker.$emit('pick', date);
                     }
                   }]
            },
            value2: ''

          }
        },
        mounted:function(){
         var vm=this;
         vm.getData();//获取JSON数据
        },
        methods:{

          //获取动态数据（json也有可能接口）
           getData(){
            // return this.bb;

            this.$http.get(api.sale).then(function(response){
                // alert(1);
              console.log('response',response)
              // console.log("这是我们需要的json数据",response.data.tableData)
              this.tableData = response.data.tableData;

            }, function(response){
              alert("请求失败了")
            })
           },

          onSubmit(){
            console.log("已提交查询条件到后台数据！");
          },
          //销售明细表  格式化内容
          // formatter(row, column) {
          //   return row.address;
          // }

         

        }
   }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .sale{
    position: absolute;
  }
  .info-top{
    margin: 20px 100px;
  }
  .info-top .el-form--inline .el-form-item{
    margin-right: 50px;
  }
  .datePicker{
    text-align: right;
  }
  .info-con{
    margin: 20px 10px;
  }
  .sale-more{
    margin: 20px;
  }
  .sale-more img{
    width: 50px;
    height: 50px;

  }
  .sale-more span{
    display: block;
  }
</style>