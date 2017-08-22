<template>
<div class="inContainer">
  <div class="inbox">
      <div class="con-header">
          <div class="header-rg">
            <el-form>
               <el-form-item label="录制时间：">
                   <el-date-picker  v-model="value1" type="datetime" placeholder="选择时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="单据编号：">
                  <el-input ></el-input>
              </el-form-item>
            </el-form>
         </div>
     </div>
     <div class="gys-list">
         <div class="layoutgr">
               <el-form>
               <el-form-item label="供货单位">
                  <el-input ></el-input>
              </el-form-item>
              <el-form-item label="经手人">
                  <el-input ></el-input>
              </el-form-item>
              <el-form-item label="部门">
                  <el-input ></el-input>
              </el-form-item>
              <el-form-item label="入库仓库 ">
                  <el-input ></el-input>
              </el-form-item>
              <el-form-item label="附加说明">
                  <el-input ></el-input>
              </el-form-item>
            </el-form>
        </div>
    </div>
           
    <div class="grid">
       <div class="layoutitem" style="width:100%;border:none;">
         <el-table :data="IntableList" border style="width: 100%"  :default-sort = "{prop: 'ID', order: 'ascending'}">
            <el-table-column prop="number" label="编号" width="110"></el-table-column>
            <el-table-column prop="ID" label="ID" width="110" sortable> </el-table-column>
            <el-table-column prop="spbh" label="商品编号" width="110"> </el-table-column>
            <el-table-column prop="name" label="商品名称" width="110"> </el-table-column>
            <el-table-column prop="dw" label="单位" width="110"> </el-table-column>
            <el-table-column prop="ck" label="仓库" width="110"> </el-table-column>
            <el-table-column prop="quantity" label="数量" width="110"> </el-table-column>
            <el-table-column prop="rkdj" label="入库单价" width="110"> </el-table-column>
            <el-table-column prop="rkje" label="入库金额" width="110"> </el-table-column>
            <el-table-column prop="bz" label="备注" width="160"> </el-table-column>
       </el-table>
     </div>    
    </div>
    <div class="cellspacing">
         <div class="cell-zd">
          <p>制单人：<span>www</span></p>
         </div>
         <div class="cell-je">
          <el-button type="danger" @click="handleCreate"  icon="edit">添加</el-button>
          <el-button type="primary" @click="handleEdit" icon="edit">编辑</el-button>
         </div>
    </div>
    <el-dialog title="添加基本信息" :visible.sync="dialogCreatVisible">
          <el-form class="small-space" :model="temp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>

            <el-form-item label="编号">
              <el-input v-model="temp.number"></el-input>
            </el-form-item>

            <el-form-item label="ID">
              <el-input v-model="temp.ID"></el-input>
            </el-form-item>

            <el-form-item label="商品编号">
              <el-input v-model="temp.spbh"></el-input>
            </el-form-item>

            <el-form-item label="商品名称">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="temp.dw"></el-input>
            </el-form-item>

           <el-form-item label="仓库">
              <el-input v-model="temp.ck"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model="temp.quantity"></el-input>
            </el-form-item>
            <el-form-item label="入库单价">
              <el-input v-model="temp.rkdj"></el-input>
            </el-form-item>
            <el-form-item label="入库金额">
              <el-input v-model="temp.rkje"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="temp.bz"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCreatVisible = false">取 消</el-button>
           
            <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          </div>
    </el-dialog>
    <el-dialog title="编辑信息" :visible.sync="dialogEditVisible">
            <el-form class="small-space" :model="temp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;' >

              <el-form-item label="编号">
                <el-input v-model="temp.number"></el-input>
              </el-form-item>

              <el-form-item label="ID">
                <el-input v-model="temp.ID"></el-input>
              </el-form-item>

              <el-form-item label="商品编号">
                <el-input v-model="temp.spbh"></el-input>
              </el-form-item>

              <el-form-item label="商品名称">
                <el-input v-model="temp.name"></el-input>
              </el-form-item>
              <el-form-item label="单位">
                <el-input v-model="temp.dw"></el-input>
              </el-form-item>

             <el-form-item label="仓库">
                <el-input v-model="temp.ck"></el-input>
              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model="temp.quantity"></el-input>
              </el-form-item>
              <el-form-item label="入库单价">
                <el-input v-model="temp.rkdj"></el-input>
              </el-form-item>
              <el-form-item label="入库金额">
                <el-input v-model="temp.rkje"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="temp.bz"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditVisible = false">取 消</el-button>
             
              <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
            </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {api} from '@/global/api'
import Vue from 'vue'
  export default {
    data() {
      return {
        value1:'',
        dialogCreatVisible: false,
        dialogEditVisible: false,
        isShow:false,
        checkList: [],
        IntableList: null,
        temp: {
          "number":"" ,
          "ID": 22,
          "spbh":"" ,
          "name":"",
          "dw":"",
          "ck":"",
          "quantity":"",
          "rkdj":"",
          "rkje":"",
          "bz":""
          }
       }
      },
      mounted() {
        var vm = this;
        vm.getData();
      },
      methods: {
        getData () {
          this.$http.get(api.kfData).then(function (response) {
            console.log(response)
            console.log('这是我们需要的json数据', response.data.IntableData)
            this.IntableList = response.data.IntableData;
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
          //新增提交
        handleCreateSubmit(){
          var vm = this;         
          var flag=0;   
          for(var intablelist of vm.IntableList){
           console.log('进入循环flag',flag)
            if(vm.temp.ID!=intablelist.ID){
                console.log('不相等的时候ID',intablelist.ID)
                flag++;
              }
            }
            console.log("退出if后flag",flag)
            if(flag==vm.IntableList.length){
            vm.IntableList.push(vm.temp);
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
          for(var intablelist of vm.IntableList){
            if(vm.temp.ID==intablelist.ID){
              var index=vm.IntableList.indexOf(intablelist)
              console.log("当前索引号",index);
              Vue.set(vm.IntableList,index,vm.temp);
              vm.temp=JSON.parse(JSON.stringify(vm.temp));
              flag++;    
            }
          }
          if (flag==0) {alert("这个ID不存在，请重新输入")};
          this.dialogEditVisible = false;
        }

    }
  }
</script>
<style>

.inContainer{
  float: left;
  width: 1200px;
  position: relative;
  overflow: hidden;
}
.inbox{
  padding: 20px 24px;
}
.con-header {    
  width: 100%;
  overflow: hidden;
}
.header-rg {
  float: right;
  padding-right: 25px;
  display: block;
}
.inbox .el-form-item {
  float: left;
  padding-right: 8px;
}
.inbox .el-form-item .el-form-item__content {
  float: left;
}
.header-rg .el-input__inner {
  height: 30px;
  width: 120px;
}
.layoutgr{
  padding-left: 20px;
}
.inbox .gys-list .layoutgr .el-form-item {
  float: left;
  padding-right: 40px;
  padding-bottom: 5px;
  margin-bottom: 0; 
}
.layoutgr {
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  overflow: hidden;
}
.inbox .gys-list .layoutgr .el-form-item__label {
  width: inherit;
}
.layoutgr .el-input__inner {
  height: 30px;
  width: 120px;
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
.small-space .el-form-item {
  margin-bottom: 10px;
}
.cell-jespan{color: white;}
.inbox .el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: white; 
  background-clip: padding-box; 
}
.inbox .el-input__icon {
  right: 70px;
}
.inbox .el-dialog__footer {
  clear: both;
}
</style>