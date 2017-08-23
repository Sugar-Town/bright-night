<!--商品列表组件-->
<template>
  <div class="product-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <el-button-group>
            <el-button size="small" type="success" icon="plus" @click="handleCreate">新增</el-button>
            <el-button size="small" type="info" icon="arrow-up">上架</el-button>
            <el-button size="small" type="warning" icon="arrow-down">下架</el-button>
            <el-button size="small" type="danger" icon="delete">删除</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="16">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"
                    placeholder="请输入商品名称/编码/规格/关键字" v-model="productListQuery.title" size="small">
          </el-input>
          
          <el-cascader class="filter-item"
                       expand-trigger="hover"
                       :options="lightList"
                       :show-all-levels="false"
                       size="small" placeholder="请选择商品分类">
          </el-cascader>
          <el-select clearable style="width: 100px" class="filter-item" v-model="productListQuery.status" placeholder="状态"
                     size="small">
            <el-option v-for="item in goodStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索
          </el-button>
          
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
                    <el-input size="small" placeholder="请输入商品名称/编码/规格/关键字" style="width: 300px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品分类">
                    <el-cascader
                      expand-trigger="hover"
                      :options="lightList"
                      :show-all-levels="false"
                      size="small">
                    </el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row>
                <el-col :span="24">
                  <el-form-item label="商品标签">
                    <el-checkbox size="small" :indeterminate="isIndeterminateTag" v-model="checkAllTag"
                                 @change="handleCheckAllTagChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedTags" @change="handleCheckedTagsChange"
                                       style="display: inline-block;margin-left: 15px;">
                      <el-checkbox size="small" v-for="tag in tags" :label="tag.id" :key="tag.id">{{tag.name}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row>
                <el-col :span="24">
                  <el-form-item label="商品状态">
                    <el-checkbox size="small" :indeterminate="isIndeterminateStatus" v-model="checkAllStatus"
                                 @change="handleCheckAllStatusChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedStatuss" @change="handleCheckedStatusChange"
                                       style="display: inline-block;margin-left: 15px;">
                      <el-checkbox size="small" v-for="status in goodStatus" :label="status.value" :key="status.value">
                        {{status.label}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item>
                <el-button type="primary" size="small">确定</el-button>
                <el-button size="small" @click="showAdvancedSearchPopover = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-popover>
          <el-button class="filter-item" type="primary" v-waves icon="menu" v-popover:advancedSearchPopover size="small"
                     style="margin-left: 0;">高级搜索
          </el-button>
        </el-col>
      </el-row>
    
    </div>
    <!--表格-->
    <div class="tableList">
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" border stripe fit
                highlight-current-row style="width: 100%">
        <el-table-column align="center"
                         type="selection"
                         width="55">
        </el-table-column>
        
        <el-table-column align="center" width="120px" label="商品编码" prop="id" sortable>
        </el-table-column>

        <el-table-column align="center" width="150px" label="商品名称" prop="title">
        </el-table-column>
        
        <el-table-column align="center" width="100px" label="商品规格" prop="sku">
        </el-table-column>
        
        <el-table-column align="center" width="70px" label="单位" prop="unit">
        </el-table-column>
        
        <el-table-column align="center" width="100px" label="市场价" prop="marketPrice" sortable>
        </el-table-column>
        
        <el-table-column align="center" width="100px" label="成本价" prop="costPrice" sortable>
        </el-table-column>
        
        <el-table-column align="center" width="100px" label="库存" prop="stock" sortable>
        </el-table-column>
        
        <el-table-column align="center" width="180px" label="新增时间" prop="createTime" sortable>
        </el-table-column>
        
        <el-table-column align="center" label="状态" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '已上架' : '待上架'}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150">
          <template scope="scope">
            <el-row style="margin-bottom: 3px;">
              <el-button size="small" type="info" class="edit">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" class="delete">删除
              </el-button>
            </el-row>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="productListQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="productListQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { global } from '@/global/global'
  const tags = [{id: 1, name: '新品上架'}, {id: 2, name: '热卖促销'}, {id: 3, name: '新客优惠'}];
  import {api} from '@/global/api'
  export default {
    data() {
      return {
        tableHeight: 0,
        tableList: null,
        total: null,
        listLoading: false,
        productListQuery: {
          currPage: 1,
          pageSize: 15,
          title: undefined,
          status: undefined
        },
        goodStatus: [{label: '上架', value: 1}, {label: '下架', value: 0}],
        lightList: [
            {
                value: 1,
                label: '路灯',
                children: [
                  {
                    value: 4,
                    label: '高杆灯',
                    children: [
                      { value: 10, label: '白炽灯' }, 
                      { value: 11, label: '暖光灯' }
                    ]
                  },
                {
                    value: 5,
                    label: '中杆灯',
                    children: [
                      { value: 12, label: '格栅灯' }, 
                      { value: 13, label: '天花灯'},
                      { value: 14, label: '日光灯'}
                    ]
                },
                ]
            }, 
            {
                value: 2,
                label: '步道与庭院灯',
                children: [
                  {   value: 6, 
                    label: '景观灯',
                    children: [
                      { value: 15, label: '格栅灯' }, 
                      { value: 16, label: '天花灯'},
                      { value: 17, label: '筒灯'}
                    ]
                  }, 
                  {   value: 7, 
                    label: '面板灯',
                    children: [
                      { value: 18, label: '洗墙灯' }, 
                      { value: 19, label: '天花灯'},
                      { value: 20, label: '水晶灯'},
                      { value: 21, label: '台灯'}
                    ]
                  }
                ]
            }, 
            {
                value: 3,
                label: '埋地灯',
                children: [
                  { value: 8, label: '指示灯' }, 
                  { value: 9, label: '工程灯'}
                ]
            }],
        checkAllTag: true,
        checkedTags: [1, 2],
        tags: tags,
        isIndeterminateTag: true,
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        isIndeterminateStatus: false,
        showAdvancedSearchPopover: false
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        var vm = this;
        //在控制台输出查询条件
        console.log("=====", JSON.stringify(vm.productListQuery));
        global.get( api.productList, { params: vm.productListQuery }, function(response) {
            var data = response.body;
            vm.tableList = data.data.productList;
            vm.productListQuery.currPage = data.data.currPage;
            vm.productListQuery.pageSize = data.data.pageSize;
            vm.total = data.data.total;
            vm.listLoading = false;   
          }, function(response) {
            alert("请求失败了");
        }, false)
      },
      //搜索
      handleFilter() {
        this.getList();
      },
      //分页
      handleSizeChange(val) {
        this.productListQuery.pageSize = val;
        this.getList();
      },
      //分页
      handleCurrentChange(val) {
        this.productListQuery.currPage = val;
        this.getList();
      },
      //商品标签全选
      handleCheckAllTagChange(event) {
        let tags = [];
        for (let tag of this.tags) {
          tags.push(tag.id);
        }
        this.checkedTags = event.target.checked ? tags : [];
        this.isIndeterminateTag = false;
      },
      //商品标签复选框
      handleCheckedTagsChange(value) {
        let checkedCount = value.length;
        this.checkAllTag = checkedCount === this.tags.length;
        this.isIndeterminateTag = checkedCount > 0 && checkedCount < this.tags.length;
      },
      //商品状态全选
      handleCheckAllStatusChange(event) {
        let statuss = [];
        for (let tag of this.goodStatus) {
          statuss.push(tag.value);
        }
        this.checkedStatuss = event.target.checked ? statuss : [];
        this.isIndeterminateStatus = false;
      },
      //商品状态复选框
      handleCheckedStatusChange(value) {
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.goodStatus.length;
        this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.goodStatus.length;
      },
      //新增
      handleCreate() {
        var vm = this;
        this.$router.push('/index/product/addProduct');
      },
      //单个删除
      handleDelete(index,row){
        var vm = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除
        vm.tableList.splice(index,1);
      },
    },
  };
</script>

<style>
  .product-container {
    padding-left: 10px;
  }
  .product-container .good-manage-list.menu-popper-class {
    min-width: 60px !important;
  }
  .product-container .filter-container {
    margin-bottom: 15px;
  }
  .product-container .pagination-container {
    margin-top: 1px;
    margin-bottom: 15px;
  }
  .product-container .edit {
    float: left;
  }
  .product-container .delete {
    float: right;
  }
</style>