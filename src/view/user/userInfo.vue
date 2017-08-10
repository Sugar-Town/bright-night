<template>
  <div class="userInfo">
    <!-- 面包屑导航 -->
    <!--  <div class="bre-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>员工基本信息</el-breadcrumb-item>  
        </el-breadcrumb>
     </div> -->
    <!-- 表头 -->
    <div class="info-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.region" placeholder="请选择员工类型">
            <el-option label="主管" value="leader"></el-option>
            <el-option label="普通员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="请输入员工编号名称/联系人/电话查询"></el-input>
        </el-form-item>
        <el-button type="primary" v-waves icon="search" @click="handleSearch">查询</el-button>
        <el-button type="primary" v-waves icon="edit" @click="handleCreate">新增</el-button>
        <el-button type="primary" v-waves icon="edit" @click="handleDelAll">批量删除</el-button>
        <el-button type="primary" v-waves icon="document" @click="handleDownload">导出</el-button>

        </el-form-item>
      </el-form>
    </div>
    
    <!-- 表头的新增操作 -->
    <div class="add">
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="员工编号ID" :label-width="formLabelWidth">
              <el-input v-model="form.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工类别" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择活动区域">
              <el-option label="主管" value="主管"></el-option>
              <el-option label="普通员工" value="普通员工"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="家庭地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
              <el-input v-model="form.date" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-waves @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="handleCreateSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <router-view></router-view>
    </div>

    <!-- 表格内容 -->
    <div class="info-con"> 
      <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%"
       @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-model="form.id" prop="id" label="ID" width="60"></el-table-column>
          <el-table-column v-model="form.name" prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column v-model="form.type" prop="type" label="员工类型" width="120"></el-table-column>
          <el-table-column v-model="form.phoneNumber" prop="phoneNumber" label="手机号码" width="130"></el-table-column>
          <el-table-column v-model="form.address" prop="address" label="家庭地址" width="240" show-overflow-tooltip></el-table-column>
          <el-table-column v-model="form.date" label="入职时间" width="120"> <template scope="scope">{{ scope.row.date }}</template></el-table-column>
          <el-table-column label="操作" width="150">
            <template scope="scope">
              <el-button v-waves size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button v-waves size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button v-waves @click="toggleSelection([tableData3[0], tableData3[1],tableData3[2],tableData3[3],tableData3[4],tableData3[5],tableData3[6]])">全选</el-button>
        <el-button v-waves @click="toggleSelection()">取消全选</el-button>
      </div>
    </div>

    <!-- 表格中的编辑操作 -->
    <div class="add">
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible1">
        <el-form :model="editForm">
          <el-form-item label="员工编号ID" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工类别" :label-width="formLabelWidth">
            <el-select v-model="editForm.type" placeholder="请选择活动区域">
              <el-option label="主管" value="主管"></el-option>
              <el-option label="普通员工" value="普通员工"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input v-model="editForm.phoneNumber" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="家庭地址" :label-width="formLabelWidth">
              <el-input v-model="editForm.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
              <el-input v-model="editForm.date" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         
            <el-button v-waves @click="dialogFormVisible1 = false">取消编辑</el-button>
            <el-button v-waves type="primary" @click="handledoneEdit()">完成编辑</el-button>
          
        </div>
      </el-dialog>
      <router-view></router-view>
    </div>

    <div class="info-footer">
        <div class="block">
           <span class="demonstration"></span>
           <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page="currentPage4"
             :page-sizes="[25, 50, 75, 100]"
             :page-size="25"
             layout="total, sizes, prev, pager, next, jumper"
             :total="100">
           </el-pagination>
         </div>

    </div>

  </div>
 
</template>

<script>
     import {api} from '@/global/api'
     export default {
       data() {
         return {
           formInline: {
             user: '',
             region: ''
           },
           editIndex: null,
           editRow: null,
           delIndex: null,
           tableData3:null,//用来接收来自JSon文件数据
           // 表头的新增操作
           dialogFormVisible: false,
           dialogFormVisible1: false,
           form: {
                 id: '',
                 name: '',
                 type: '',
                 phoneNumber: '',
                 address: '',
                 date: ''
           },
           editForm: {
                 id: '',
                 name: '',
                 type: '',
                 phoneNumber: '',
                 address: '',
                 date: ''
           },
           formLabelWidth: '120px',
           //表单数据（已在JSon文件中引用）
          
          multipleSelection: [],//定义选中多行的属性，用于函数的传参
          // 表尾分页
          currentPage4: 4

         }
       },
       mounted:function(){
        var vm=this;
        vm.getData();//获取JSON数据
       },
       methods: {
        //获取动态数据（json也有可能接口）
         getData(){
          // return this.bb;

          this.$http.get(api.userInfo).then(function(response){
              // alert(1);
            console.log('response',response)
            // console.log("这是我们需要的json数据",response.data.tableData3)
            this.tableData3 = response.data.tableData3;

          }, function(response){
            alert("请求失败了")
          })

         },
         //表头  查询
         handleSearch() {
           // console.log('submit!');
           var vm = this;
           // 假查询
           this.$http.get(api.userInfo2,{params:vm.formInline}).then(function(response){
               // alert(1);
             console.log('response',response)
             // console.log("这是我们需要的json数据",response.data.tableData3)
             this.tableData3 = response.data.tableData3;

           }, function(response){
             alert("请求失败了")
           })



           // for(var i = 0; i < vm.tableData3.length+1; i++){//第二次筛选

           //     for(var item of vm.tableData3){//第一次筛选
           //         // console.log(item)
           //         if(vm.formInline.user != item.id){
           //            var index = vm.tableData3.indexOf(item);
           //            console.log(index)
           //            vm.tableData3.splice(index,1);//把index和id不相等的记录删除，删位置index

           //          }
           //     }
           // }

         },
         //重置新增表单form
         initForm(){
            let vm = this;
            vm.form = {
                    id: '',
                    name: '',
                    type: '',
                    phoneNumber: '',
                    address: '',
                    date: ''
            }
         },
         // 新增
         handleCreate(){
           //每次新增时，重置下新增表单数据，避免双向绑定影响
           this.initForm();

            this.dialogFormVisible = true;
         },
         // 新增提交
         handleCreateSubmit(){
            var vm = this;
            console.log('新增的入参：',vm.form);
            vm.tableData3.push(vm.form);//
            console.log('新增后的所有数据：',vm.tableData3);
            this.dialogFormVisible = false;
         },
         //操作中的编辑
         handleEdit(index, row) {
             this.dialogFormVisible1 = true;
            // console.log("选中的条数：",index, "选中的row属性：",row);
           
            // this.editForm = row;//=表示赋值、引用（浅拷贝）指向同一内存地址
            this.editForm = JSON.parse(JSON.stringify(row)); //对传参row进行深度拷贝
            // this.$forceUpdate()//强制渲染
             this.editIndex = index;

          
         },
         //操作中的编辑提交
         handledoneEdit(){
           // console.log("已完成编辑！");
              
            console.log(this.editIndex);
            console.log(this.editForm)
            var vm = this;
             // // vm.tableData3.push(vm.editForm);
            vm.tableData3[this.editIndex] = this.editForm;
            vm.tableData3.splice(this.editIndex,1,this.editForm);//解除了深拷贝带来的影响，可以渲染到视图层了（此处搞了N久，哈哈哈，终于拿下它了！）
            // console.log(vm.tableData3[this.editIndex]);
            // store.dispatch(vm.tableData3[this.editIndex]);
            this.dialogFormVisible1 = false;

         },
         //操作中的单个删除
         handleDelete(index, row) {  
            console.log("单个删除的index：",index);
            console.log("单个删除的row：",row);
             // console.log(index, row);
            this.tableData3.splice(index,1);//

         },
         //批量删除
         handleDelAll(){
            let vm = this;
            console.log("批量删除的row：",vm.multipleSelection);//对象数组
            //实际开发，不需要使用splice，我们只需要对 vm.multipleSelection 进行for循环，然后拿到每一条id，拼接成一个数组传给接口即可，例如[1,3,5]
            for(var i = 0; i < vm.multipleSelection.length; i++){
              console.log(vm.multipleSelection[i]);//循环遍历出数组中的每一条对象
              // console.log(vm.multipleSelection[i].id);
              var ids = this.multipleSelection.map(item => item.id).join()
              //获取所有选中行的id组成的字符串，以逗号分隔
              //  //对象转数组
              // ids = Array.prototype.slice.call(ids);
              // console.log(ids instanceof Array);
             

            }
            console.log("获取到所有选中的id，组成新的数组是：",ids);

            //未实现（下面为有dug代码）
            // this.tableData3.splice(vm.multipleSelection,vm.multipleSelection.length);
            // console.log("删除的条数：",vm.multipleSelection.length);


            // 未实现
            // let arr = [];
            // var len = vm.multipleSelection.length;
            // console.log(vm.multipleSelection.indexOf(i));//-1
            // for (var i = 0; i < len; i++) {
            //   if (vm.multipleSelection.indexOf(i)>=0) {
            //     console.log(vm.multipleSelection.indexOf(i))
            //   }else{
            //     arr.push(vm.multipleSelection[i])
            //   }
            // }
            // vm.multipleSelection = arr;
            // this.multipleSelection = [];                                                                                                 

         },
         //表头的导出
         handleDownload(){
            console.log("表头已导出！（未实现）");
         },

         //切换选中状态
         toggleSelection(rows) {
           if (rows) {
             rows.forEach(row => {
               this.$refs.multipleTable.toggleRowSelection(row);
             });
           } else {
             this.$refs.multipleTable.clearSelection();
           }
         },
         //选择改变
         handleSelectionChange(val) {
           this.multipleSelection = val; //[]
         },
         //表尾分页
         handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
         },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
         },



       }
     }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .userInfo{
    position: absolute;
  }
  .info-top{
    margin: 20px 10px;
  }
  .info-con{
    margin: 20px 10px;
  }
 
</style>