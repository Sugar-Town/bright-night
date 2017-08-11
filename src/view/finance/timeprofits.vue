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

      <div class="t_middle">
      <!-- 搜索 -->
      <div class="search">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="单据编号：" prop="jilu_input">
              <el-input v-model="ruleForm.jilu_input"></el-input>
            </el-form-item>
        </el-form>
      </div>

      <el-button type="primary" icon="search" @click="search('ruleForm')" class="btn_search"></el-button>
      <el-button type="warning" icon="document" @click="getData(),getData2()" class="btn_recovery">恢复数据</el-button>

      <!-- 查看盈利情况 -->
      <div class="graph">
         <router-link to="./echart"><el-button type="success" @click="">查看盈利情况</el-button></router-link>
      </div>
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
              <el-table-column prop="jilu_charge" label="收取金额（¥）" width="200">
              </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>

    </template>



    </div>
  </div>
</template>
<script>
  import {api} from '@/global/api'
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

        //单据编号
        ruleForm:{
          jilu_input: '',
        },

        //单据编号验证
        rules:{
            jilu_input: [
              { required: true, message: '请输入单据编号', trigger: 'blur' },
              { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
            ]
        },

        // 入款单表格数据显示
        tableData: [{
            jilu_date: '',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_get: 0
          }],


          // 出款单表格数据显示
          tableData2: [{
              jilu_date: '',
              jilu_input: '',
              pay_name: '',
              do_name: '',
              region: '',
              jilu_charge: 0
            }],

      };
    },
    mounted(){
      var vm = this;
      vm.getData();
      vm.getData2();
    },
    methods:{
      //获取入款单表格数据
      getData(){
        this.$http.get(api.cwData_in,{params:{'key':this.jilu_input}}).then(function(response){ 
          // console.log(response);
          // console.log('这是我们需要的json数据',response.data.tableList)
          this.tableData = response.data.tableList;
        },function(response){
          alert('请求失败了')
        })
      },

      //获取出款单表格数据
      getData2(){
        this.$http.get(api.cwData_out,{params:{'key':this.jilu_input}}).then(function(response){ 
          // console.log(response);
          // console.log('这是我们需要的json数据',response.data.tableList)
          this.tableData2 = response.data.tableList2;
        },function(response){
          alert('请求失败了')
        })
      },


      //搜索数据
      search(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var vm = this;

            //v-for 遍历数据，把不相等的数据删去
            for(var i=0; i<vm.tableData.length+2;i++){
              for(var searchlist of vm.tableData){
                if(vm.ruleForm.jilu_input != searchlist.jilu_input){
                  // console.log(vm.ruleForm.jilu_input)
                  // console.log(searchlist.jilu_input)
                  var index = vm.tableData.indexOf(searchlist);
                  vm.tableData.splice(index,1);
                  console.log(index);
                }
              }
            }



            //假查询，请求cwData_out2的json数据
            this.$http.get(api.cwData_out2,{params:vm.ruleForm}).then(function(response){ 
              // console.log(response);
              // console.log('这是我们需要的json数据',response.data.tableList)
              this.tableData2 = response.data.tableList2;
            },function(response){
              alert('请求失败了')
            })
            

            // for(var i=0; i<vm.tableData2.length+1;i++){
            //   for(var searchlist2 of vm.tableData2){
            //     if(vm.ruleForm.jilu_input != searchlist2.jilu_input){
            //       // console.log(vm.ruleForm.jilu_input)
            //       // console.log(searchlist.jilu_input)
            //       var index = vm.tableData2.indexOf(searchlist2);
            //       vm.tableData2.splice(index,1);
            //       console.log(index);
            //     }
            //   }
            // }

          } else{
            console.log('提交失败!!');
            return false;
          }

        });

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

  .timeprofits{
    width: 1200px;
    padding-top: 60px;
    padding-left: 30px;
    padding-right: 30px;
    height: 1000px;
  }

  /*选择日期范围*/
  .timeprofits .block{
    margin-bottom: 50px;
    float: left;
  }

  .timeprofits .block .el-button{
    margin-left: 30px;
  }

  /*总利润*/
  .timeprofits .profit{
    /*margin-top: 60px;*/
    margin-bottom: 86px;
  }

  .timeprofits .profit h3{
    float: left;
    margin-left: 126px;
  }

  .timeprofits .profit .el-input{
      width: 26%;
      float: left;
      margin-left: 20px;
  }

  /*搜索*/
  .timeprofits .t_middle{
    height: 82px;
  }

  .timeprofits .search{
    float: left;
  }

  .timeprofits .btn_search{
    margin-left: 20px;
    float: left;
  }

  .timeprofits .btn_recovery{
    margin-left: 26px !important;
    float: left;
  }

  /*查看盈利情况*/
  .timeprofits .graph{
    /*margin-bottom: 42px;*/
    float: left;
    margin-left: 160px;
  }

</style>