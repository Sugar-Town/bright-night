<template>
  <div class="power">
     <!-- 面包屑导航 -->
     <!-- <div class="bre-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>员工权限</el-breadcrumb-item>  
        </el-breadcrumb>
     </div> -->

     <!-- 新增角色 -->
     <div class="newRole">
        <el-button type="primary" icon="edit" @click="handleCreate">新增角色</el-button>
     </div>

     <!-- 表格内容 -->
     <div class="info-con"> 
       <el-table ref="multipleTable" :data="tableData1"  border tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
           <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column algin="center" label="序号" width="120">
              <template scope="scope">
                 <template >
                      <span >{{ scope.$index  }} &nbsp; &nbsp;</span>
                 </template > 
              </template>
           </el-table-column>
           <el-table-column prop="roleName" label="角色" width="120" ></el-table-column>
           <el-table-column label="对应用户" width="300">
              <template scope="scope">
                 <template v-for="item in scope.row.userList">
                      <span >{{ item.userName  }} &nbsp; &nbsp;</span>
                 </template > 
              </template>
           </el-table-column>
         
           <el-table-column label="操作" width="400">
             <template scope="scope">
               <el-button v-waves icon="edit" size="small" @click="setPermissions(scope.$index, scope.row)" >设置权限</el-button>
               <el-button v-waves icon="edit" size="small" @click="setUser(scope.$index, scope.row)">设置成员</el-button>
               <el-button v-waves icon="edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
               <el-button v-waves icon="delete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
             </template>
           </el-table-column>
       </el-table>
       <div style="margin-top: 20px">
          <el-button v-waves @click="toggleSelection([tableData1[0], tableData1[1],tableData1[2],tableData1[3],tableData1[4],tableData1[5],tableData1[6]])">全选</el-button>
          <el-button v-waves @click="toggleSelection()">取消全选</el-button>
       </div>
     </div>

     <!-- 新增角色 -->
     <div class="add">
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

        <el-dialog title="角色新增" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.remark" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"  @click="handleCreateSubmit">确 定</el-button>
          </div>
        </el-dialog>
     </div>

     <!-- 设置权限 -->
     <div class="setPermission">
        <el-dialog title="设置权限" :visible.sync="dialogPermissionsVisible">
              <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 100%; '>
               <!-- <el-checkbox-group v-model="smMenuBeanDtoList"> -->
                <template v-for="item in permissionMenuList">
                    <el-checkbox  label="item.url" name="type" style="margin:0 15px 15px 0;"  v-model="item.checked">{{ item.menuName }}</el-checkbox> 
                </template>
                  
                <!-- </el-checkbox-group> -->
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPermissionsVisible = false">取 消</el-button>
                <el-button type="primary" @click="setPermissionsSubmit">确 定</el-button>
              </div>
        </el-dialog>
     </div>

      <!-- 分页 -->
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
      data () {
          return {
              //表格数据 
              tableData1: null,
              multipleSelection: [],//选中多行的属性
              //新增角色
              dialogFormVisible: false,
              //设置权限菜单
              permissionMenuList:[
                  {menuName:"库房管理",checked:true},
                  {menuName:"产品管理",checked:true},
                  {menuName:"订单管理",checked:true},
                  {menuName:"财务管理",checked:true},
                  {menuName:"客户管理",checked:true},
                  {menuName:"员工管理",checked:true}
              ],
              //设置权限弹框的可见性
              dialogPermissionsVisible: false,
              form: {
                     roleName: '',
                     remark: ''
                     },
              formLabelWidth: '120px',
              // 表尾分页
              currentPage4: 4
            
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

          this.$http.get(api.power).then(function(response){
              // alert(1);
            console.log('response',response)
            // console.log("这是我们需要的json数据",response.data.tableData1)
            this.tableData1 = response.data.tableData1;

          }, function(response){
            alert("请求失败了")
          })
         },

        //重置新增角色form
        initForm(){
           let vm = this;
           vm.form = {
                    roleName: '',
                    remark: ''   
           }
        },
        //新增角色
        handleCreate(){
          this.initForm();
          console.log("已新增了角色！");
          this.dialogFormVisible = true;
        },
        //新增角色提交
        handleCreateSubmit(){
          let vm = this;
          console.log('新增的入参：',vm.form);
          vm.tableData1.push(vm.form);
          console.log('新增后的所有数据：',vm.tableData1);
          this.dialogFormVisible = false;

        },
        //重置权限设置弹框
        initpermissionMenuList(){
          let vm = this;
          vm. permissionMenuList = [
                  {menuName:"库房管理",checked:true},
                  {menuName:"产品管理",checked:true},
                  {menuName:"订单管理",checked:true},
                  {menuName:"财务管理",checked:true},
                  {menuName:"客户管理",checked:true},
                  {menuName:"员工管理",checked:true}
              ]
        },
        //设置权限
        setPermissions(){
          console.log("已设置权限！");
          this.initpermissionMenuList();

          this.dialogPermissionsVisible = true;
        },
        //设置权限提交
        setPermissionsSubmit(){
          console.log("权限设置成功！");
          this.$message({
            message:"动态修改权限成功，实际开发请把参数提交到后端数据！",
            type:'success'

          });
          this.dialogPermissionsVisible = false;//提交后，让弹框消失
        },
        //设置成员
        setUser(){
          console.log("已设置成员！");
          this.$message({
            message:"设置成员未完成，具体思路可参考设置权限！",
            type:'warning'

          });

        },
        //操作中的编辑
        handleEdit(index, row) {
           console.log(index, row);
        },
        //操作中的单个删除
        handleDelete(index, row) {
           console.log("单个删除的index：",index);
           console.log("单个删除的row：",row);
            // console.log(index, row);
           this.tableData1.splice(index,1);

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
          this.multipleSelection = val;
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
  .power{
    position: absolute;
  }
  .newRole{
    margin: 40px 20px;
  }
  .info-con{
    margin: 20px 10px;
    text-align: left;
  }
  .info-footer{
    margin-top: 50px;
  }
 
</style>