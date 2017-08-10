<template>
  <div class="customerOrder">
  <div class="cum_header">
    <span style="font-size: 20px;">处理订单</span>
    <span class="Csearch">
      <!-- <el-input v-model="formInline.cum" placeholder="请输入要查询的编号"></el-input> -->
   <!--    <el-button type="primary" @click="handleSearch">搜索</el-button> -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.cum" placeholder="请输入要查询的编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </span>
  </div>
<!-- 订单表格 -->
  <el-table
    ref="multipleTable":data="tableData3" border tooltip-effect="dark" style="width: 100%;margin-bottom: 19px;" @selection-change="">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="编号"
      width="70">     
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
      label="创建日期"
      width="120">
  <!-- 添加这句让时间显示 -->
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column label="操作">
    <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click.native.prevent="handdeleteRow(scope.$index, tableData3)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-button style="background:#dfe6ec;" @click="handleCreate">添加订单</el-button>
  <!-- 新增功能 -->
    <el-dialog title="填写订单信息" :visible.sync="dialogeditFormVisible"> 
              <el-form :model="form">
                <el-form-item label="编号" :label-width="formLabelWidth">
                  <el-input v-model="form.id" auto-complete="off"></el-input>
                </el-form-item>           
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                  <el-input v-model="form.number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="总价（元）" :label-width="formLabelWidth">
                  <el-input v-model="form.total" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="付款状态/发货状态" :label-width="formLabelWidth">
                  <el-input v-model="form.payS_shipS" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-input v-model="form.status" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" :label-width="formLabelWidth">
                <el-date-picker v-model="form.date" type="date" placeholder="选择日期"  @change="dateChange" :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-form>
        <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="handleCreateOrder">确 定</el-button> 
      </div>
  </el-dialog>
  <!-- 编辑功能 -->
   <el-dialog title="填写订单信息" :visible.sync="dialogFormVisible"> 
              <el-form :model="editForm">
                <el-form-item label="编号" :label-width="formLabelWidth">
                  <el-input v-model="editForm.id" auto-complete="off"></el-input>
                </el-form-item>           
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                  <el-input v-model="editForm.number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="总价（元）" :label-width="formLabelWidth">
                  <el-input v-model="editForm.total" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="付款状态/发货状态" :label-width="formLabelWidth">
                  <el-input v-model="editForm.payS_shipS" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-input v-model="editForm.status" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.date" auto-complete="off"></el-input> -->
                  <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期"  @change="dateChange" :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-form>
        <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="handledoneEdit">确 定</el-button> 
      </div>
  </el-dialog>
    

  </div>
</template>
<script>
  import {api} from '@/global/api'
  export default {
      data () {
          return {
            input: '',
            tableData3: [],
            multipleSelection: [],
            formInline:{
              cum: ''
            },
     
       dialogFormVisible: false,
       dialogeditFormVisible: false,
       form: {  
              id:'',           
              name: '',
              phone:'',
              number:'',
              total:'',
              payS_shipS:'',
              status:'',
              date: '',
              operate:'' ,
              delivery: false,           
            },
        editForm: {  
              id:'',           
              name: '',
              phone:'',
              number:'',
              total:'',
              payS_shipS:'',
              status:'',
              date: '',
              operate:'' ,
              delivery: false,           
            },
            formLabelWidth: '140px' ,
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            }
          }        
    }, 
        mounted(){
          var vm = this ;
          vm.getList();
        },
        methods: {
          //通过json导入数据
          getList:function(){
            var vm = this ;
            this.$http.get(api.customerOrder).then(function(response){
              console.log(response)
              vm.tableData3 = response.data.tableData3;
            })
          },
          
          //通过编号查询
          handleSearch(){
          console.log("1111")
            var vm = this ;
            for(var i = 0;i < vm.tableData3.length+1;i++){//二次筛选
               for(var item of vm.tableData3){//一次筛选
                  if(vm.formInline.cum != item.id){
                    var index = vm.tableData3.indexOf(item);
                    console.log(index)
                    vm.tableData3.splice(index,1);//把index和id不相等的记录删除，删位置index
                  }
                }
            }
          },
          //不用json导入
          // toggleSelection(rows) {
          //   if (rows) {
          //     rows.forEach(row => {
          //       this.$refs.multipleTable.toggleRowSelection(row);
          //     });
          //   } else {
          //     this.$refs.multipleTable.clearSelection();
          //   }
          // },
          // handleSelectionChange(val) {
          //   this.multipleSelection = val;
          // },
           // 删除单条
          handdeleteRow(index, rows) {
            rows.splice(index, 1);
          },
          //重置添加订单表单
          initForm(){
            let vm = this;
            vm.form = {
              id:'',
              name: '',
              phone:'',
              number:'',
              total:'',
              payS_shipS:'',
              status:'',
              date: '',
              operate:'' ,
              delivery: false,        
            }
          },
          // 添加订单按钮
          handleCreate(){
          //每次新增时，重置新增表单数据，避免双向绑定影响
            this.initForm();
            this.dialogeditFormVisible = true;
          },
          //（添加订单）新增功能
          handleCreateOrder(){
            var vm = this ;
            console.log('新增的信息:',vm.form);
            vm.tableData3.push(vm.form);
            console.log('新增后的信息数据:',vm.tableData3);
            this.dialogeditFormVisible = false;
            // 提交后弹出成功提示语
            
           
          },
          // 编辑功能
          handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.editForm = row;  //表示赋值、引用（浅拷贝）指向同一内存地址
            this.editIndex = index;
          },
          //编辑中的提交
          handledoneEdit(){
             console.log(this.editIndex);
             console.log(this.editForm);
             var vm = this ;
             vm.tableData3[this.editIndex] = this.editForm;
             this.dialogFormVisible = false ;//设置false为不可见
             // 提交后弹出成功提示语
            this.$message({
              showClose: true,
              message: '提交成功！',
              type: 'success'
            });
          },
          
          //转换时间格式方法
          dateChange(val) {
            this.form.date=val;
          }
        }
  }
</script>

<style>
  .customerOrder{
    position: absolute;
    width: 1178px;
  }
  .customerOrder .cum_header{
    font-size: 20px;
    color: #fff;
    background: #13ce66;
    line-height: 39px;
    padding: 9px 25px;
  }
  .customerOrder .Csearch{
    display: inline-block;
    margin-left: 674px;
  }
  .customerOrder .Csearch.el-input,.customerOrder .Csearch .el-input__inner {
    width: 258px;
  }
  .customerOrder .el-date-editor.el-input {
    width: 253px;
  }
 
</style>