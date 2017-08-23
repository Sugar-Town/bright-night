<!--编辑发货组件-->
<template>
 <div class="createPost-container" v-cloak>
    <div class="createPost-main-container" v-loading="infoLoading">
      <div class="filter-container">
        <el-row :gutter="10">
          <el-col :span="4">
            <span style="font-size: 25px;color: #f96b6b;">已付款</span>
          </el-col>
          <el-col :span="12" style="padding-top:10px;">
            <span style="font-size: 14px;color: #98a8b8;">订单号：{{ orderId }} &nbsp;&nbsp;&nbsp;&nbsp; 订单编码：DH-O-20170721-095606</span>
          </el-col>
          <el-col :span="8">
            <!--发货popover-->
            <el-popover
              ref="sendGoodsPopover"
              placement="top-start"
              width="1000"
              trigger="click"
              v-model="showSendGoodsPopover">
              <el-form label-width="80px" label-position="right" :model="sendGoodsInfo" :rules="rules">
                <el-row>
                  <el-col :span="8">
                    <el-row>
                      <el-col>
                        <el-form-item label="发货日期" prop="sendTime">
                          <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间"
                            clearable
                            size="small" v-model="sendGoodsInfo.sendTime">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="物流公司" prop="logisticsCompany">
                          <el-select v-model="sendGoodsInfo.logisticsCompany" clearable placeholder="请选择" size="small">
                            <el-option
                              v-for="item in selectLogisticsCompany"
                              :key="item.key"
                              :label="item.label"
                              :value="item.key">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="物流单号" prop="logisticsNum">
                          <el-input
                            size="small"
                            placeholder="请输入内容" v-model="sendGoodsInfo.logisticsNum"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="物流备注" prop="logisticsTips">
                      <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        size="small" v-model="sendGoodsInfo.logisticsTips">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
      
                <el-form-item>
                  <el-button type="primary" size="small" @click="getSendInfo">确定</el-button>
                  <el-button size="small" @click="showSendGoodsPopover = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
            <el-button class="filter-item" type="info" v-waves v-popover:sendGoodsPopover>发货
            </el-button>
            
            <el-button class="filter-item" type="danger" v-waves>取消
            </el-button>
            
            <el-button class="filter-item" type="success" v-waves @click="goBack">返回
            </el-button>
          </el-col>
        </el-row>
      </div>
      <!--订单商品展示表格-->
      <div class="table-container">
        <el-table ref="goodTable" :data="goodList" element-loading-text="拼命加载中" fit highlight-current-row style="width: 98%;"
                  show-summary :summary-method="getSummaries">
          <el-table-column align="center" width="100px" label="商品主图">
            <template scope="scope">
              <img :src="scope.row.url" style="width: 60px;height: 60px;padding-top: 5px;"/>
            </template>
          </el-table-column>
      
          <el-table-column align="center" prop="title" min-width="200px" label="商品名称" show-overflow-tooltip>
          </el-table-column>
      
          <el-table-column align="center" min-width="150px" prop="id" label="商品编码">
          </el-table-column>
      
          <el-table-column align="center" width="150px" prop="sku" label="规格">
          </el-table-column>
    
          <el-table-column align="center" width="100px" prop="quantity" label="数量">
          </el-table-column>
    
          <el-table-column align="center" width="100px" prop="unit" label="单位">
          </el-table-column>
          
          <el-table-column align="center" width="100px" prop="unitPrice" label="单价">
          </el-table-column>
    
          <el-table-column align="center" width="100px" prop="total" label="金额小计">
          </el-table-column>
        </el-table>
      </div>
      <!--收货人信息展示-->
      <div class="receive-container">
        <el-row class="receive-container-item">
          <el-col>
            <span style="color: #98a8b8;">收货信息&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>收货人: 乐毅&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>联系方式: 13758087094&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>收货地址: 嘉兴市南湖区富路润300号嘉兴电子商务产业园3号园嘉兴麦云科技&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </el-col>
        </el-row>
        <el-row class="receive-container-item">
          <el-col>
            <span style="color: #98a8b8;">下单时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>2017-8-2 23:28</span>
          </el-col>
        </el-row>
        <el-row class="receive-container-item">
          <el-col :span="2">
            <span style="color: #98a8b8;">备注说明&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <i class="el-icon-plus" @click.prevent.stop="addRemark"></i>
          </el-col>
          <el-col :span="22">
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>   
  </div>
</template>

<script>
  import { api } from '@/global/api'
  import { global } from '@/global/global'
  export default {
    name: 'OrderDetailPane',
    data() {
      return {
        infoLoading: false,
        showSendGoodsPopover: false,
        selectLogisticsCompany: [],
        sendGoodsInfo: {
          sendTime: '',
          logisticsCompany: '',
          logisticsNum: '',
          logisticsTips: ''
        },
        rules: {
          sendTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          logisticsCompany: [
            { type: 'array', required: true, message: '请选择物流公司', trigger: 'blur' }
          ],
          logisticsNum: [
            { required: true, message: '', message: '请填写物流单号', trigger: 'blur' }
          ]
        },
        goodList: []
      };
    },
    props: {
      orderId: {
        type: Number,
        default: 10023789420012
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    mounted() {
      var vm = this;
      vm.getGoodsList();
      vm.logisticsCompanyList();
    },
    methods: {
      //获取商品数据
      getGoodsList: function() {
        var vm = this;
        global.get( api.goods, null, function(response) {
            vm.goodList = response.body.data.goodList;
          }, function(response) {
            alert("请求失败了");
        }, false)
      },
      //获取快递公司列表
      logisticsCompanyList: function() {
        var vm = this;
        global.get( api.logisticsCompany, null, function(response) {
          vm.selectLogisticsCompany = response.body.data.logisticsCompany;           
        }, function(response) {
            alert("请求失败了");
        }, false)
      },
      //获取发货信息
      getSendInfo() {
        var vm = this;
        console.log(vm.sendGoodsInfo);
        if(vm.sendGoodsInfo.sendTime !== '' && vm.sendGoodsInfo.logisticsCompany !== '' && vm.sendGoodsInfo.logisticsNum !== ''){
          vm.$router.push( { path: '/index/order/showSendInfo', query: { sendGoodsInfo: vm.sendGoodsInfo } } );
        }else{
          showSendGoodsPopover = true;
        };
      },
      //计算总金额
      getSummaries(param) {
        let { columns, data } = param;
        let sums = [];
        let excludeCol = [0, 1, 2, 3, 5];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '应付金额';
            return;
          }
          if (excludeCol.indexOf(index) !== -1) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        });
        return sums;
      }, 
      goBack() {
        this.$router.push('/index/order/orderAccount'); 
      }
    }
  };
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.createPost-container {
  padding-left: 25px;
  padding-top: 30px;
}
.table-container {
  margin-top: 20px;
}
.receive-container {
  margin-top: 20px;
}
.receive-container>div {
  padding-left: 15px;
  margin-top: 15px;
}
</style>