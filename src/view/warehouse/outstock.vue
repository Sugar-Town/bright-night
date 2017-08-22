<template>
<div class="outContainer">
  <div class="outbox">
    <div class="con-header">
        <div class="header-rg">
          <el-form>
             <el-form-item label="录制时间：" class="luzhi">
                <el-date-picker v-model="value1" type="datetime" placeholder="选择时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="单据编号：">
                <el-input ></el-input>
            </el-form-item>
          </el-form>
       </div>
   </div>
   <div class="gys-list">
       <div class="layoutgr">
             <el-form >
             <el-form-item label="供货单位">
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="经手人">
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="附加说明">
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="摘要" class="main">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="应收余额">
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="应付余额" class="yue">
                <el-input ></el-input>
            </el-form-item>
          </el-form>
      </div>
  </div>
  <div class="grid" style="width:100%">
             <div class="layoutitem" style="width:100%;border:7;" >
               <el-table :data="OuttableList" border style="width: 100%" :default-sort = "{prop: 'number,PaymentID', order: 'ascending'}" >
                  <el-table-column prop="number" label="编号" width="100" sortable></el-table-column>
                  <el-table-column prop="PaymentID" label="收款账户编号" sortable width="210"> </el-table-column>
                  <el-table-column prop="AccountName" label="收款账户名称" width="210"> </el-table-column>
                  <el-table-column prop="ways" label="结算方式" width="210"> </el-table-column>
                  <el-table-column prop="money" label="金额" width="210"> </el-table-column>
                  <el-table-column prop="note" label="备注" width="210"> </el-table-column>
             </el-table>
           </div>    
   </div>
   <div class="cellspacing">
          <div class="cell-zd">
              <p>制单人：<span>www</span></p>
          </div>
          <div class="cell-je">
              <el-button type="danger" @click="handleCreate"  icon="edit">添加</el-button>
              <el-button type="primary" @click="handleEdit"  icon="edit">编辑</el-button>
              <el-button type="primary" @click="handleDelete" class="fa fa-trash-o">删除</el-button>
          </div>
  </div>
       <el-dialog title="添加基本信息" :visible.sync="dialogCreatVisible">
            <el-form class="small-space" :model="temp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>

              <el-form-item label="编号">
                <el-input v-model="temp.number"></el-input>
              </el-form-item>

              <el-form-item label="收款账户编号">
                <el-input v-model="temp.PaymentID"></el-input>
              </el-form-item>

              <el-form-item label="收款账户名称">
                <el-input v-model="temp.AccountName"></el-input>
              </el-form-item>

              <el-form-item label="结算方式">
                <el-input v-model="temp.ways"></el-input>
              </el-form-item>
              <el-form-item label="金额">
                <el-input v-model="temp.money"></el-input>
              </el-form-item>

             <el-form-item label="备注">
                <el-input v-model="temp.note"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogCreatVisible = false">取 消</el-button>
             
              <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
            </div>
      </el-dialog>
      <el-dialog title="编辑信息" :visible.sync="dialogEditVisible">
            <el-form class="small-space" :model="temp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>

              <el-form-item label="编号">
                <el-input v-model="temp.number"></el-input>
              </el-form-item>

              <el-form-item label="收款账户编号">
                <el-input v-model="temp.PaymentID"></el-input>
              </el-form-item>

              <el-form-item label="收款账户名称">
                <el-input v-model="temp.AccountName"></el-input>
              </el-form-item>

              <el-form-item label="结算方式">
                <el-input v-model="temp.ways"></el-input>
              </el-form-item>
              <el-form-item label="金额">
                <el-input v-model="temp.money"></el-input>
              </el-form-item>

             <el-form-item label="备注">
                <el-input v-model="temp.note"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditVisible = false">取 消</el-button>
             
              <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
            </div>
      </el-dialog>
      <el-dialog title="请输入要删除的信息" :visible.sync="dialogDeleteVisible">
            <el-form class="small-space" :model="temp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
              <el-form-item label="收款账户编号">
                <el-input v-model="temp.PaymentID"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogDeleteVisible = false">取 消</el-button>           
              <el-button type="primary" @click="handleDeleteSubmit">确 定</el-button>
            </div>
      </el-dialog>
   </div>
 </div>
</template>
<script>
import {api} from '@/global/api'
import Vue from 'vue'
  export default {
      data () {
          return {
            dialogCreatVisible: false,
            dialogEditVisible: false,
            dialogDeleteVisible:false,
            value1:'',
            OuttableList:null,
            dialogCreatVisible: false,
            temp: {
              "number":"" ,
              "PaymentID": "00",
              "AccountName":"" ,
              "ways":"",
              "money":"",
              "note":""
              }
          }
        },
      mounted() {
        var vm = this;
        vm.getData();
       },
      methods: {
          getData () {
            this.$http.get(api.kfData, {params: {'key': this.inputValue}}).then(function (response) {
              console.log(response)
              console.log('这是我们需要的json数据', response.data.OuttableData)
              this.OuttableList = response.data.OuttableData;
            }, function (response) {
              alert('请求失败了')
            })
          },
          handleCreate() {      
            this.dialogCreatVisible = true;
          },
          handleEdit(){
          this.dialogEditVisible = true;
          },
          handleDelete(){
          this.dialogDeleteVisible = true;
          },
          //新增提交
          handleCreateSubmit(){
            var vm = this;         
             var flag=0;   
             for(var outtablelist of vm.OuttableList){
             console.log('进入循环flag',flag)
              if(vm.temp.PaymentID!=outtablelist.PaymentID){
                  console.log('不相等的时候ID',outtablelist.ID)
                  flag++;
                }
              }
              console.log("退出if后flag",flag)
              if(flag==vm.OuttableList.length){
              vm.OuttableList.push(vm.temp);
              vm.temp=JSON.parse(JSON.stringify(vm.temp));
              }
              else{
                alert('ID重复了,请重新输入');
              }        
            this.dialogCreatVisible = false;
          },
           //编辑提交
          handleEditSubmit(){
            var vm = this;          
            var flag=0;
            for(var outtablelist of vm.OuttableList){
              if(vm.temp.PaymentID==outtablelist.PaymentID){
                var index=vm.OuttableList.indexOf(outtablelist)
                console.log("当前索引号",index);
                Vue.set(vm.OuttableList,index,vm.temp);
                vm.temp=JSON.parse(JSON.stringify(vm.temp));
                flag++;    
              }
            }
            if (flag==0) {alert("这个收款账户编号不存在，请重新输入")};
            this.dialogEditVisible = false;
          },
          //删除提交
          handleDeleteSubmit(){
            var vm = this;          var flag=0;
            for(var outtablelist of vm.OuttableList){
            if(vm.temp.PaymentID==outtablelist.PaymentID){
              var index=vm.OuttableList.indexOf(outtablelist)
                console.log("当前索引号",index);
                vm.OuttableList.splice(index,1)
                vm.temp=JSON.parse(JSON.stringify(vm.temp));
                flag++;
            }         
          } 
          if (flag==0) {alert("这个收款账户编号不存在，请重新输入")};
          this.dialogDeleteVisible = false;
          }

    }
   }
</script>

<style>
.outContainer{
  width: 1200px;
  overflow: hidden;
}
.outbox{
  padding: 20px 24px;
}
 .outbox .con-header {    
  width: 100%;
  overflow: hidden;
}
 .outbox .header-rg {
  float: right;
  display: block;
}
 .outbox .header-rg .el-form-item {
  float: left;
  padding-right: 8px;
}
 .outbox .header-rg .luzhi{
  margin-right: -60px;
}
 .outbox .el-form-item__content {
  float: left;
}
 .outbox .header-rg .el-input__inner {
  height: 30px;
  width: 120px;
}
 .outbox .layoutgr{
  padding-left: 20px;
  border-bottom: none;
}
 .outbox .gys-list .layoutgr .el-form-item {
  float: left;
  padding-right: 80px;
  padding-bottom: 5px;
  margin-bottom: 0; 
}
 .outbox .layoutgr .el-form-item .el-input__inner{
  width: 150px;
  height: 25px;
  }
 .outbox .layoutgr {
  margin-bottom: 20px;
  overflow: hidden;
}
.outbox .el-input__icon {
  right: 70px;
}
 .outbox .layoutgr .main .el-input__inner{
  width: 420px
}
 .outbox .grid.layoutitem .el-table th,.outbox .grid.layoutitem .el-table__header-wrapper thead div {
  background: #f2f2f2;
}
.cellspacing {
  margin-top: 10px;
}
.cell-zd {
  float: left;
  display: inline-block;
}
.cell-je {
  float: right;
  padding-right: 12px;
}
 .outbox .grid .layoutitem .el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: white; 
  background-clip: none; 
}
 .outContainer .outbox .grid .layoutitem .el-table--border td,.outContainer .outbox .grid .layoutitem .el-table--border th,.outContainer .outbox .grid .layoutitem .el-table td, .outContainer .outbox .grid .layoutitem .el-table th.is-leaf{
 border-right: 1px solid #898989;
 border-bottom: 1px solid #898989;
}
 .outbox .layoutitem .el-table{
  border-color: #898989;
}
 .outbox .layoutitem .el-input__icon {
  right: 70px;
}
.fa span{
  padding-left: 4px;
}
 .outbox .layoutitem .el-table--fit {
  border-bottom: 1px solid #898989;
}
.outbox .el-dialog__footer {
  clear: both;
}
.outbox .el-form-item__label {
  width: 100px;
}
</style>