<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入订单号" v-model="listQuery.orderId">
      </el-input>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  orderStatus" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <!--高级搜索popover-->
      <el-popover
        ref="advancedSearchPopover"
        placement="top-start"
        width="1000"
        trigger="click"
        v-model="showAdvancedSearchPopover">
        <el-form label-width="80px" label-position="right">
          <el-row>
            <el-col :span="10">
              <el-form-item label="关键词">
                <el-input size="small" placeholder="请输入订单号" v-model="listQuery.orderId" style="width: 300px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下单时间">
                <el-date-picker
                  type="datetimerange"
                  placeholder="选择时间范围"
                  clearable
                  align="right" v-model="listQuery.orderTime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
      
          <el-row>
            <el-col :span="10">
              <el-form-item label="收货人信息">
                <el-input size="small" placeholder="请输入收货人/收货电话" v-model="listQuery.customerInfo" style="width: 300px;"></el-input>
              </el-form-item>
            </el-col>
        
            <el-col :span="10">
              <el-form-item label="商品信息">
                <el-input size="small" placeholder="请输入商品名称/编码" v-model="listQuery.goodsInfo" style="width: 300px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
 
          <el-select clearable class="filter-item" style="width: 150px; margin-left:80px; margin-bottom: 20px;" v-model="listQuery.type" placeholder="类型">
            <el-option v-for="item in  orderStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
      
          <el-form-item>
            <el-button type="primary" size="small" @click="handleFilter">确定</el-button>
            <el-button size="small" @click="showAdvancedSearchPopover = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-popover>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="search" v-popover:advancedSearchPopover size="small">高级搜索</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="document">导出</el-button>    
    </div>  
    <div class="top-distance">
      <el-row>
        <el-button class="filter-item" type="primary" v-waves @click="handleFilter">全部订单</el-button>
        <el-button class="filter-item" type="primary" v-waves @click="handleWaitedPay">等待买家付款订单</el-button>
        <el-button class="filter-item" type="primary" v-waves @click="handleWaitedSend">等待发货</el-button>
        <el-button class="filter-item" type="primary" v-waves @click="handleSended">已发货</el-button>
        <el-button class="filter-item" type="primary" v-waves @click="handleSuccess">成功的订单</el-button>
        <el-button class="filter-item" type="primary" v-waves @click="handleClose">关闭的订单</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="edit" @click="handleSendAll">批量发货</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="edit" @click="handleDelAll">批量删除</el-button>
      </el-row>
    </div>  
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="55">
         </el-table-column>

          <!-- <el-table-column align="center" label='序号' width="90">
            <template scope="scope">
              {{scope.$index}}
            </template>
          </el-table-column> -->

          <el-table-column label="订单编号">
            <template scope="scope">
              {{scope.row.orderId}}
            </template>
          </el-table-column>

          <el-table-column align="center"  label="宝贝">
              <template scope="scope">
                <span>{{scope.row.goods}}</span>
              </template>
          </el-table-column>

          <el-table-column align="center"  label="单价">
              <template scope="scope">
                <span>{{scope.row.money}}</span>
              </template>
          </el-table-column>

          <el-table-column label="买家">
            <template scope="scope">
              <span>{{scope.row.realName}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="created_at" label="预定日期" width="170">
            <template scope="scope">
              <span>{{scope.row.orderDay}}</span>
            </template>
          </el-table-column>

            <el-table-column align="center"  label="预定数量">
                <template scope="scope">
                  <span>{{scope.row.orderNum}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center"  label="实收款">
                <template scope="scope">
                  <span>{{scope.row.collectionMoney}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center"  label="订单状态">
                <template scope="scope">
                  <el-tag :type="scope.row.orderStatus | statusFilter">{{scope.row.orderStatus | statusFilterTip}}</el-tag>
                </template>
            </el-table-column>


            <el-table-column align="center"  label="操作" width="150">
                <template scope="scope">
                   <el-button class="edit" size="small" v-waves @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
  import {api} from '@/global/api'
  export default {
    data() {
      return {
        list: null,//表格list
        total: null,
        listLoading: false,
        showAdvancedSearchPopover: false,
        isIndeterminateStatus: false,
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        listQuery: { //查询条件
          currPage: 1,
          pageSize: 10,
          orderId: '',
          orderTime: null,
          customerInfo: null,
          goodsInfo: null,
          type: null,     
        },
        orderStatus: [{label: '待付款', value: 1}, {label: '待发货', value: 2}, {label: '已发货', value: 3}, {label: '已取消', value: 4}, {label: '已完成', value: 5}],
        dialogFormVisible: false,
        multipleSelection: []  //批量删除
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
      //获取列表数据, 查看全部订单
      getList: function() {
        var vm = this;
        //在控制台输出查询条件
        console.log("所有订单请求订单信息json——————",JSON.stringify(vm.listQuery));
        this.$http.get(api.orderInfo,{params: vm.listQuery}).then(function(response) {
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
      //handleWaitedPay handleWaitedSend handleSuccess handleClose
      //查看等待买家付款订单
      handleWaitedPay: function() {
        var vm = this;
        this.$http.get(api.waitedPay,{params: vm.listQuery}).then(function(response) {
            var data = response.body;
            vm.list = data.data.data;
            vm.listQuery.currPage = data.data.currPage;
            vm.listQuery.pageSize = data.data.pageSize;
            vm.total = data.data.total; 
          }, function(response) {
            alert("请求失败了");
        })
      },
      //查看等待发货订单
      handleWaitedSend: function() {
        var vm = this;
        this.$http.get(api.waitedSend,{params: vm.listQuery}).then(function(response) {
            var data = response.body;
            vm.list = data.data.data;
            vm.listQuery.currPage = data.data.currPage;
            vm.listQuery.pageSize = data.data.pageSize;
            vm.total = data.data.total; 
          }, function(response) {
            alert("请求失败了");
        })
      },
      //查看已发货发货订单
      handleSended: function() {
        var vm = this;
        this.$http.get(api.sended,{params: vm.listQuery}).then(function(response) {
            var data = response.body;
            vm.list = data.data.data;
            vm.listQuery.currPage = data.data.currPage;
            vm.listQuery.pageSize = data.data.pageSize;
            vm.total = data.data.total; 
          }, function(response) {
            alert("请求失败了");
        })
      },
      //查看已完成订单
      handleSuccess: function() {
        var vm = this;
        this.$http.get(api.success,{params: vm.listQuery}).then(function(response) {
            var data = response.body;
            vm.list = data.data.data;
            vm.listQuery.currPage = data.data.currPage;
            vm.listQuery.pageSize = data.data.pageSize;
            vm.total = data.data.total; 
          }, function(response) {
            alert("请求失败了");
        })
      },
      //查看已关闭订单
      handleClose: function() {
        var vm = this;
        this.$http.get(api.close,{params: vm.listQuery}).then(function(response) {
            var data = response.body;
            vm.list = data.data.data;
            vm.listQuery.currPage = data.data.currPage;
            vm.listQuery.pageSize = data.data.pageSize;
            vm.total = data.data.total; 
          }, function(response) {
            alert("请求失败了");
        })
      },
      //详情
      handleEdit(index,row){
        var vm = this;
        console.log('编辑的row：',index,'-----',row);
        //跳页面进行修改
        //this.$router.push('/example/form'); 
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
      //批量发货
      handleSendAll() {
        var vm = this;
        console.log('批量发货选择的row：',vm.multipleSelection);
        this.$router.push('/index/order/editOrder' ); //带参跳转
      },
      //搜索
      handleFilter() {
        this.showAdvancedSearchPopover = false;
        this.getList();
      },
      //高级搜索
      handleCheckAllStatusChange(event) {
        let statuss = [];
        for (let tag of this.orderStatus) {
          statuss.push(tag.value);
        }
        this.checkedStatuss = event.target.checked ? statuss : [];
        this.isIndeterminateStatus = false;
      },
      handleCheckedStatusChange(value) {
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.orderStatus.length;
        this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.orderStatus.length;
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
    padding-top: 25px;
  } 
  @media only screen and (max-width: 1400px) {
    .app-container {
      width: 1120px;
      padding-top: 20px;
    } 
  }
  .app-container .el-table {
    margin-top: 20px;
  } 
  .app-container .edit {
    float: left;
  }
  .app-container .delete {
    float: right;
  }
  .app-container .pagination-container {
    margin-top: 15px;
  }
  .app-container .top-distance {
    margin-top: 15px;
  }
</style>