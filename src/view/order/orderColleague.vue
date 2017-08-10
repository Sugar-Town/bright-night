<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入员工编号" v-model="listQuery.orderId">
      </el-input>

      <el-input style="width: 200px;" class="filter-item" placeholder="请输入员工姓名" v-model="listQuery.orderId">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="edit" @click="handleDelAll">批量删除</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="document">导出</el-button>    
    </div> 
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column label="员工编号">
            <template scope="scope">
              {{scope.row.colleagueId}}
            </template>
        </el-table-column>

        <el-table-column align="center"  label="员工姓名">
            <template scope="scope">
           		<span>{{scope.row.colleagueName}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center"  label="订单编号">
            <template scope="scope">
            <span>{{scope.row.orderId}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center"  label="成交日期">
            <template scope="scope">
            <span>{{scope.row.orderDay}}</span>
            </template>
        </el-table-column>

		<el-table-column align="center"  label="金额">
		    <template scope="scope">
		      <span>{{scope.row.money}}</span>
		    </template>
		</el-table-column>

        <el-table-column label="订单状态">
            <template scope="scope">
            	<el-tag :type="scope.row.orderStatus | statusFilter">{{scope.row.orderStatus | statusFilterTip}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column align="center"  label="审核人">
            <template scope="scope">
              <span>{{scope.row.auditor}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center"  label="操作" width="150">
            <template scope="scope">
               <el-button class="edit" size="small" v-waves @click="handleEdit(scope.$index, scope.row)">查看</el-button>
               <el-button class="delete" size="small" v-waves type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
	//员工编号 员工姓名 订单编号 成交日期 金额 订单状态 审核人 	
  import {api} from '@/global/api'
  export default {
    data() {
      return {
        list: null,//表格list
        total: null,
        listLoading: false,
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        listQuery: { //查询条件
          currPage: 1,
          pageSize: 10,
          orderId: '',   
        },
        multipleSelection: [],  //批量删除
        orderStatus: [{label: '待付款', value: 1}, {label: '待发货', value: 2}, {label: '已发货', value: 3}, {label: '已取消', value: 4}, {label: '已完成', value: 5}],
      }
    },
    filters: {
        parseTime(time) {
        	return parseTime(time);
        },
        statusFilter(status) {
            const statusMap = ['primary', 'success', 'warning', 'danger', 'gray'];
            return statusMap[status - 1];
        },
        statusFilterTip(status) {
            const statusMap = ['待付款', '待发货', '已发货', '已取消', '已完成'];
            return statusMap[status - 1];
        }
    },
    mounted() {
        var vm = this;
        vm.getList();
    },
    methods: {
        //获取列表数据
        getList: function() {
        	var vm = this;
	        //在控制台输出查询条件
	        console.log(JSON.stringify(vm.listQuery));
	        this.$http.get(api.orderColleague ,{params: vm.listQuery}).then(function(response) {
	            var data = response.body;
	            vm.list = data.data.data;
	            vm.listQuery.currPage = data.data.currPage;
	            vm.listQuery.pageSize = data.data.pageSize;
	            vm.total = data.data.total;
	            vm.listLoading = false;   
	          }, function(response) {
	            alert("请求失败了");
        	})
     	 },
        //查看
        handleEdit(index,row){
	        var vm = this;
	        console.log('编辑的row：',index,'-----',row);
	        //跳页面进行查看
	        this.$router.push( { path: '/index/order/editOrder', query: { id: row.orderId } } ); //带参跳转
        },
        //单个删除
        handleDelete(index,row){
            var vm = this;
            console.log('单个删除选择的row：',index,'-----',row);
            //前端删除。
            vm.list.splice(index,1)
        },
        //批量删除
        handleDelAll(){
            var vm = this;
            console.log('批量删除选择的row：',vm.multipleSelection);
        },
        //搜索
        handleFilter() {
        	this.getList();
        },
        //操作分页
        handleSizeChange(val) {
	        this.listQuery.pageSize = val;
	        this.getList();
        },
        //操作分页
        handleCurrentChange(val) {
	        //console.log('--------',val)
	        this.listQuery.currPage = val;
	        this.getList();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
      // handleDownload() {
      //   var vm = this;
      //   require.ensure([], () => {
      //     const { export_json_to_excel } = require('vendor/Export2Excel');
      //     const tHeader = ['订单编号', '宝贝', '单价', '买家', '预定日期', '预定数量', '实收款', '订单状态'];
      //     const filterVal = ['orderId', 'goods', 'money', 'realName', 'orderDay', 'orderNum', 'collectionMoney', 'orderStatus'];
      //     const list = vm.list;
      //     const data = vm.formatJson(filterVal, list);
      //     export_json_to_excel(tHeader, data, '导出的列表excel');
      //   })
      // },
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map(v => filterVal.map(j => v[j]))
      // }
    }
  };
</script>
<style>
  .app-container {
    width: 1210px;
    padding-left: 20px;
    padding-top: 15px;
  } 
  @media only screen and (max-width: 1400px) {
    .app-container {
      width: 1120px;
      padding-top: 20px;
    } 
  }
  .el-table {
    margin-top: 20px;
  } 
  .edit {
    float: left;
  }
  .delete {
    float: right;
  }
  .pagination-container {
    margin-top: 15px;
  }
  .top-distance {
    margin-top: 15px;
  }
</style>