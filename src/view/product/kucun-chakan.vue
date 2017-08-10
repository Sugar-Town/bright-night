<template>
  <div class="post1">
    <!-- 面包屑
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品库存</el-breadcrumb-item>
      <el-breadcrumb-item>查看</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="one">
      <el-select v-model="value9" multiple filterable remote placeholder="请输入detail属性" :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-button  type="info"><i class="fa fa-search" aria-hidden="true"></i>  搜索</el-button>
      <el-button  type="success" @click="handleCreate"><i class="fa fa-plus-circle" aria-hidden="true"></i>  添加</el-button>
      <el-button  type="success"><i class="fa fa-download" aria-hidden="true" @click="handleDownload"></i>  导出</el-button>
    </div>
    
    <!-- 新增弹窗 -->
    <el-dialog title="表单新增" :visible.sync="dialogFormVisible">

          <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="仓库名称">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>
            <el-form-item label="仓库位置">
              <el-input v-model="temp.address"></el-input>
            </el-form-item>
            <el-form-item label="详细信息">
              <el-input v-model="temp.detail"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input v-model="temp.manager"></el-input>
            </el-form-item>
            <el-form-item label="入仓时间">
              <el-input v-model="temp.start"></el-input>
            </el-form-item> 
            <el-form-item label="单价">
              <el-input v-model="temp.price"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model="temp.amount"></el-input>
            </el-form-item>            
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>           
            <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          </div>
    </el-dialog>

    <div class="two">
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="" height="500" show-summary>

        <el-table-column type="selection" width="55">
        </el-table-column>

        <!-- <el-table-column label="ID" width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column> -->
        
        <el-table-column prop="ID" label="ID" width="80">
            <template scope="scope">
              {{scope.$index}}
            </template>
        </el-table-column>


        <el-table-column prop="name" label="仓库名称" width="100">
        </el-table-column>

        <el-table-column prop="address" label="仓库位置" show-overflow-tooltip width="250">
        </el-table-column>

        <el-table-column prop="detail" label="详细信息" show-overflow-tooltip width="100">
        </el-table-column>

        <el-table-column prop="manager" label="负责人" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="start" label="入仓时间" show-overflow-tooltip width="100">
        </el-table-column>
        
        <el-table-column prop="price" label="单价" sortable show-overflow-tooltip width="100">
        </el-table-column>

        <el-table-column prop="amount" label="数量" sortable show-overflow-tooltip width="100">
        </el-table-column>

        <el-table-column prop="work" label="操作" show-overflow-tooltip width="150">
            <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>

            </template>
        </el-table-column>

    </el-table>
    </div>
    
    <!-- 分页 -->
    <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </div>

  </div>
</template>
<script>
  import {api} from '@/global/api'
  export default {
      data () {
          return {
            tableData3: [                   
            ],
            //搜索框内的对象
            options4: [],
            value9: [],
            list: [],
            loading: false,
            states: [],
            temp: {
                "name": "总仓库",
                "address": "",
                "detail":"",
                "manager":"",
                "start":"",
                "price":"",
                "amount":"",
            },
            dialogFormVisible: false,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
          }
        },
        mounted() {
             var vm = this;
             vm.getList();
           },

      methods: {
            getList: function() {
                var vm = this;
                this.$http.get(api.chakan).then(function(response) {
                    var data = response.body;
                    vm.tableData3 = data.data;

                    //搜索框内的json
                    vm.list = data.data;
                    for(var day of vm.list){
                       vm.states.push(day.detail);
                    }   
                    vm.list = vm.states.map(item => {
                      return { value: item, label: item };
                    });
                    }, function(response) {
                      alert("请求失败了");
                })
            },
            remoteMethod(query) {
              if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                  this.loading = false;
                  this.options4 = this.list.filter(item => {
                    return item.label.toLowerCase()
                      .indexOf(query.toLowerCase()) > -1;
                  });
                }, 200);
              } else {
                this.options4 = [];
              }
            },
            handleEdit(index, row) {
              console.log(index, row);
            },
            //单个删除
            handleDelete(index,row){
                var vm = this;
                console.log('单个删除选择的row：',index,'-----',row);
                //前端删除。
                vm.tableData3.splice(index,1)
            },
            //批量删除
            handleDelAll(){
                var vm = this;
                console.log('批量删除选择的row：',vm.multipleSelection)
            },
            //新增
            handleCreate() {
                this.temp = {
                "name": "",
                "address": "",
                "detail":"",
                "manager":"",
                "start":"",
                "price":"",
                "amount":"",
            };
                this.dialogFormVisible = true;
            },
            //新增提交
            handleCreateSubmit(){
                var vm = this;
                console.log('新增入参：',vm.temp,vm.tableData3)

                //这里作演示用，正式新增 请提交到接口
                vm.tableData3.push(vm.temp)
                console.log('新增后',vm.tableData3)
                
                this.dialogFormVisible = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //导出--未实现
            // handleDownload() {
            //   var vm = this;
            //   require.ensure([], () => {
            //     const { export_json_to_excel } = require('../../vendor/Export2Excel');
            //     const tHeader = ['仓库名称', '仓库位置', '详细信息', '负责人', '入仓时间','单价','数量'];
            //     const filterVal = ['name', 'address', 'detail', 'manager', 'start','price','amount'];
            //     const list = vm.tableData3;
            //     const data = vm.formatJson(filterVal, list);
            //     export_json_to_excel(tHeader, data, '导出的列表excel');
            //   })
            // },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
  .post1{
    margin:20px;
    position: absolute;
  }
  .post1 .one{
    margin-bottom: 10px;
  }
  .post1 .block{
    margin-top: 20px;
  }
  .post1 .dialog-footer{
    clear: both;
  }
</style>