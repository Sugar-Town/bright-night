<template>
  <div class="customerInfo">
<!-- 客户管理 -->

<div class="cum_search">
     <el-select v-model="value" placeholder="请选择客户类型">
       <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

  <div class="ads">
  <el-input v-model="input" placeholder="请输入客户编号名称/联系人/电话查询" ></el-input>
  <!-- `checked` 为 true 或 false -->
  <el-checkbox v-model="checked">显示禁用客户</el-checkbox>

  <span class="wrapper">
    <el-button type="success">查询</el-button>
  </span>
  </div>  
</div>

<!-- 新增、禁用等按钮  -->
  <div class="add_btn">
       <el-button type="primary" @click="handleCreate">新增</el-button>
         <el-dialog title="客户信息" :visible.sync="dialogFormVisible">             
              <el-form :model="form">
                <el-form-item label="客户类型" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择客户类型">
                  <el-option label="零售客户" value="零售客户"></el-option>
                  <el-option label="多售客户" value="多售客户"></el-option>
                </el-select>
                </el-form-item>

                <el-form-item label="客户等级" :label-width="formLabelWidth">
                  <el-input v-model="form.level" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户编号" :label-width="formLabelWidth">
                  <el-input v-model="form.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" :label-width="formLabelWidth">
                  <el-input v-model="form.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="销售人员" :label-width="formLabelWidth">
                  <el-input v-model="form.staff" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ/微信/Email" :label-width="formLabelWidth">
                  <el-input v-model="form.chat" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应收款余额" :label-width="formLabelWidth">
                  <el-input v-model="form.money" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="送货地址" :label-width="formLabelWidth">
                  <el-input v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="可用库存" :label-width="formLabelWidth">
                  <el-input v-model="form.inventory" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-input v-model="form.state" auto-complete="off"></el-input>
                </el-form-item>
                
              </el-form>
         <div slot="footer" class="dialog-footer">

        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateSubmit()">确 定</el-button> 
      </div>
    </el-dialog>

       <el-button>禁用</el-button>
       <el-button>启用</el-button>
       <el-button @click="handleDelete">删除</el-button>    
  </div>
<!-- 客户信息表格 -->
 <div class="cum_table">
    <el-table
    ref="multipleTable"
    :data="tableData3"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
      <el-table-column
        prop="type"
        label="客户类型"
        width="95" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="level"
        label="客户等级"
        width="75">
      </el-table-column>
      <el-table-column
        prop="id"
        label="客户编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="客户名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="staff"
        label="销售人员"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="联系人"
        width="95" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机"
        width="100">
      </el-table-column>
      <el-table-column
        prop="chat"
        label="QQ/微信/Email"
        width="100">
      </el-table-column>
      <el-table-column
        prop="money"
        label="应收款余额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="送货地址"
        width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="inventory"
        label="可用库存"
        width="80">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="80" >        
      </el-table-column>
    </el-table>

     <div class="tab_btn" style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData3[0],tableData3[1],tableData3[2]])">全选</el-button>
      <el-button @click="toggleSelection()">取消全选</el-button>
    </div>
    
    <div class="left_btn">
       <el-select v-model="value2" placeholder="请选择">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled">
      </el-option>
  </el-select>
      <el-button>明细账本</el-button>
      <el-button>价格方式</el-button>
    </div>
    <div class="right_btn">
      <el-button>打印</el-button>
      <el-button>退出</el-button>
    </div> 
    </div>   


  </div>
</template>


<script>
  export default {
      data () {
          return {
           options: [{
          value: '选项1',
          label: '普通用户'
          }, {
          value: '选项2',
          label: 'VIP用户'
        }],
          value: '',
          input: '',
          checked: false,
           tableData3: [{
              type: '零售客户',
              level: '普通',
              id: '21062564789',
              title: '广州喜洋洋有限公司',
              staff: '李彩娇',
              name: '杨玉环',
              phone: '16598742351',
              chat: '1032658897',
              money: '12222.00',
              address: '河北省石家庄市桥西区东湖街道',
              inventory: '2365件',
              state:'已下单'             
          },{
              type: '多售客户',
              level: 'VIP',
              id: '244452564789',
              title: '阳江哇哈哈有限公司',
              staff: '白展堂',
              name: '方世玉',
              phone: '18956562351',
              chat: '4278538897',
              money: '55555.00',
              address: '广东省湛江市赤坎区寸金街道',
              inventory: '3120件',
              state:'未下单'             
          },{
              type: '零售客户',
              level: 'VIP',
              id: '555552564789',
              title: '阳西喜之郎有限公司',
              staff: '李白',
              name: '西施',
              phone: '13456562351',
              chat: '4678533333',
              money: '44444.00',
              address: '广东省阳江市阳西县',
              inventory: '1120件',
              state:'未下单'             
          }],
          multipleSelection: [],
              options2: [{
              value: '选项1',
              label: '客户类型'
            }, {
              value: '选项2',
              label: '客户名称',
              disabled: true
            }, {
              value: '选项3',
              label: '销售人员'
            }, {
              value: '选项4',
              label: '客户等级'
            }],
            value2: '',
            dialogFormVisible: false,
            form: {             
              type: '',
              level: '',
              id: '',
              title: '',
              staff: '',
              name: '',
              phone: '',
              chat: '',
              money: '',
              address: '',
              inventory: '',
              state:'',
              delivery: false,            
            },
            formLabelWidth: '120px'          
          }
        },
         methods: {
            toggleSelection(rows) {
              if (rows) {
                rows.forEach(row => {
                  this.$refs.multipleTable.toggleRowSelection(row);
                });
              } else {
                this.$refs.multipleTable.clearSelection();
              }
            },
            handleSelectionChange(val) {
              this.multipleSelection = val;
            },
            //重置新增表单
            initForm(){
              let vm = this;
              vm.form = {
                type: '',
                level: '',
                id: '',
                title: '',
                staff: '',
                name: '',
                phone: '',
                chat: '',
                money: '',
                address: '',
                inventory: '',
                state:'',
                delivery: false,        

              }
            },
            // 新增按钮
            handleCreate(){
            //每次新增时，重置新增表单数据，避免双向绑定影响
              this.initForm();
              this.dialogFormVisible = true;
            },
            // 新增功能
            handleCreateSubmit(){
              var vm = this ;
              console.log('新增的信息:',vm.form);
              vm.tableData3.push(vm.form);
              console.log('新增后的信息数据:',vm.tableData3);
              this.dialogFormVisible = false;
              // 提交后弹出成功提示语
              this.$message({
                showClose: true,
                message: '提交成功！',
                type: 'success'
              });
            },
            // 删除数据
            handleDelete(){
              var vm = this ;
              console.log("删除的row",vm.multipleSelection);
              // splice只能删除单条
              this.tableData3.splice(vm.multipleSelection,vm.multipleSelection.length);
              console.log("删除的条数",vm.multipleSelection.length);
              this.tableData3.splice(index,1);
              
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
  /*客户管理*/
 .customerInfo{
    position: absolute;
    /*background:#FEF5E7;*/
    width: 1176px;
  }
  .customerInfo .el-breadcrumb{
    height: 58px;
    line-height: 58px;
  }
  /*查询*/
  .customerInfo .cum_search{
    margin-left: 20px;
  }
  .customerInfo .wrapper span{
    color:#fff;
  }
  .customerInfo .ads
  {
    display: inline;   
  }
  .customerInfo .ads .el-input{
    width: 22%; 
    margin-right: 26px 
  }
 .customerInfo .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ccc; 
    border-color: #ccc;
  }
  .customerInfo .ads .el-button--success {
    background: #75bd5a;
    border: 1px solid #85ae74;
  }
  .customerInfo .el-select-dropdown__item.selected {
    background-color: #ccc;

  }
  .customerInfo .el-select-dropdown__list {
    padding:0; 
  }
  /*客户信息表格*/
  .customerInfo .cum_table .el-button{
    background: #dfe6ec;
  }
  .customerInfo .add_btn{
    float: right;
    margin-bottom: 10px;
  }
  .customerInfo .tab_btn .el-button{
    background: #fff;
    margin-left: 20px;
  }
  .customerInfo .left_btn{
    float: left;
    margin-top: 10px;
    margin-left: 20px;
  }
  .customerInfo .right_btn{
    float: right;
    margin-top: 10px;
  }
</style>