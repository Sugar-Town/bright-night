<template>
<div class="housecontainer">
    <div id="table_box">
        <div id="box_header">
            <ul class="ul_left">
              <li>价格方式：<span>库存成本价</span></li>
            </ul>
            <ul class="ul_right">
               <li>
                 <el-checkbox-group v-model="checkList" @change="change($event)">
                    <el-checkbox label="显示停用商品"></el-checkbox>
                 </el-checkbox-group>
               </li>
               <li>
                  <span>过滤
                     <el-select v-model="type" placeholder="请选择" @change="fil($event)">
                       <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" > </el-option>
                     </el-select>
                  </span>
              </li>
           </ul>
        </div>
        <div class="show_message_box">
             <div class="show_message">
                <el-table :data="altableData" border style="width: 100%" :default-sort = "{prop: 'id', order: 'ascending'}">
                <el-table-column prop="id" label="序号" width="40" sortable></el-table-column>

                <el-table-column label="商品信息" style="text-align:center;color:red;">
                  <el-table-column  prop="No" label="产品编号"  width="95"></el-table-column>
                  <el-table-column prop="name"label="商品名称" width="179"></el-table-column>
                  <el-table-columnprop="size" label="规格" width="95"></el-table-column>
                  <el-table-column prop="version" label="型号" width="95"></el-table-column>
                  <el-table-column prop="manu" label="产地" width="95"></el-table-column>
                  <el-table-column prop="danwei" label="单位" width="95"></el-table-column>
                </el-table-column>

                <el-table-column label="总仓库">
                  <el-table-column prop="quantity" label="数量" width="95"></el-table-column>
                  <el-table-column prop="money" label="金额"  width="95"></el-table-column>
                </el-table-column>

                <el-table-column label="库房-北京站">
                  <el-table-column prop="quantity2" label="数量" width="95"></el-table-column>
                  <el-table-column prop="money2" label="金额" width="95"></el-table-column>
                </el-table-column>

                <el-table-column label="库房-广州站">
                  <el-table-column prop="quantity3" label="数量" width="95"></el-table-column>
                  <el-table-column prop="money3" label="金额" width="95"></el-table-column>
                </el-table-column>

              </el-table>
            </div>

            <div class="rem"> 共<i>{{leng}}</i>条记录</div>

        </div>
      </div>

      <div class="tab-btn">
            <div class="bt-f">
              <ul><li><button class="button-li">查询条件</button></li>
                <li><button class="button-li">明细账本</button></li>
                <li><button class="button-li">价格方式</button></li>
              </ul>
            </div>
            <div class="bt-rg">
               <ul>
                <li><button>打印</button></li>
                <li><button>退出</button></li>
               </ul>
            </div>
      </div>

</div>

</template>

<script>
  import {api} from '@/global/api'
  export default {
    data() {
      return {
        type:'',
        isShow:false,
        checkList: ['显示停用商品'],
        altableData: null,
        options:null,
        leng:null,
        showList:[{
          "id": "",
          "No": "",
          "name": "",
          "size": "",
          "version": "",
          "manu":"",
          "danwei":"",
          "quantity":"",
          "money":null,
          "quantity2":"",
          "money2":"",
          "quantity3":"",
          "money3":""
        }],
        newArray:[
        {
          "id": "",
          "No": "",
          "name": "",
          "size": "",
          "version": "",
          "manu":"",
          "danwei":"",
          "quantity":"",
          "money":null,
          "quantity2":"",
          "money2":"",
          "quantity3":"",
          "money3":""
        }
        ],
        numArray:[]
      }
    },
    mounted() {
      var vm = this;
      vm.getData();     
      setTimeout(function(){
        vm.showList=JSON.parse(JSON.stringify(vm.showList));
         for(var a of vm.altableData){
            if (a.isUsed===false) {
              vm.showList.push(a)
            }
          }
        console.log('showList',vm.showList);
        vm.leng=vm.altableData.length;
      },30) 
   },
   methods: {
    getData (){
            this.$http.get(api.kfData).then(function (response){
              console.log(response)
              console.log('这是我们需要的json数据', response.data.altableData)
              this.altableData = response.data.altableData;
              var len=response.data.altableData.length;
              this.options= response.data.options;
            }, function(response){
              alert('请求失败了')
            })
          },
    //选择是否显示全部
    fil(type){ 
      var vm=this;
      if(type==='选项1'){
          for(var arr of vm.newArray)
            if(arr.money!=null)
              vm.altableData.push(arr);
            console.log('altableData',vm.altableData) 
            console.log('newArray',vm.newArray) 
            vm.altableData=vm.altableData;   
      }
      else{
        vm.newArray=[
        {
          "id": "",
          "No": "",
          "name": "",
          "size": "",
          "version": "",
          "manu":"",
          "danwei":"",
          "quantity":null,
          "money":null,
          "quantity2":null,
          "money2":null,
          "quantity3":null,
          "money3":null
        }
        ]
      for(var i=0;i<vm.altableData.length+1;i++){
         for (var re of vm.altableData){
            if(re.money2==0&&re.quantity2==0&&re.money3==0&&re.quantity3==0){
               for(var arr of vm.newArray){
                  if(re.money2!=arr.money2&&re.quantity2!=arr.quantity2&&re.money3!=arr.money3&&re.quantity3!=arr.quantity3)
                    vm.newArray.push(re);         
         } 
            var index=vm.altableData.indexOf(re);
            vm.altableData.splice(index,1);
          } 
        }
      }
       console.log('当前newArray的id',vm.newArray);

      }
      this.leng=vm.altableData.length;
    },
    //是否显示停用商品
    change(type){  
      var vm=this;
       vm.showList=JSON.parse(JSON.stringify(vm.showList));
         console.log('函数里面的',vm.showList);
      if(type[0]==="显示停用商品"&&type.length==1){
      for(var s of vm.showList){
        if(s.id!="")  
      vm.altableData.push(s)
      }
    }
      if(type.length==0){
         for(var i=0;i<vm.altableData.length+1;i++){
         for(var r of vm.altableData){
            if (r.isUsed===false) 
              vm.altableData.splice(vm.altableData.indexOf(r),1)
          }
        }
      }
    console.log("type",type)
    this.leng=vm.altableData.length;
    }
  }
}
</script>

<style>
.housecontainer{
  overflow: hidden;
  padding-bottom: 20px;
  float: left;
}
#table_box{
  padding: 20px 24px;
  overflow: hidden;
}
.housecontainer .show_message_box{
  border: 1px solid #ddd;
  overflow: hidden;
}
.show_message{
  height:700px;
}
.show_message .el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: white; 
  background-clip: padding-box; 
}
.show_message .el-table tr { 
  background: #f6fcff;
}
.show_message .el-table th>.cell {
  text-align: center;
}
li{
  list-style: none;
}
#box_header{
  line-height: 40px;
}
.ul_left{
  display: inline-block;
}
.ul_right{
  float: right;
}
.ul_right li{
  display: inline-block;
  }
.ul_right li .el-checkbox {
  padding-right: 30px;
}
.ul_right .el-input__icon {
  right: 0px;
}
.housecontainer .el-input__inner {
  height: 30px;
}
.rem{
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding-right: 65px;
}
.tab-btn {
  padding:0 24px;
}
.bt-f {
  float: left;
}
.bt-rg {
  float: right;
}
.tab-btn li {
  float: left;
  margin: 0 8px;
}
</style>