import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueWaves from '../directive/waves'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueWaves)

import Readme from '@/view/index/readme'

import User from '@/view/user/a-user'
import UserInfo from '@/view/user/userInfo'
import NewUser from '@/view/user/new-user'
import Power from '@/view/user/power'
import Sale from '@/view/user/sale'
import Echarts from '@/view/user/echarts'

import House from '@/view/warehouse/a-house'
import Instock from '@/view/warehouse/instock'
import Outstock from '@/view/warehouse/outstock'
import Allocation from '@/view/warehouse/allocation'
import Remaining from '@/view/warehouse/remaining'

import Product from '@/view/product/a-product'
import Chengben from '@/view/product/product-chengben'
import Kucun from '@/view/product/product-kucun'
import Shuxing from '@/view/product/product-shuxing'
import KucunChakan from '@/view/product/kucun-chakan'
import ProductList from '@/view/product/productList'

import Finance from '@/view/finance/a-finance'
import Jilu from '@/view/finance/jilu'
import TimeProfits from '@/view/finance/timeProfits'

import Customer from '@/view/customer/a-customer'
import CustomerVip from '@/view/customer/customerVip'
import CustomerInfo from '@/view/customer/customerInfo'
import CustomerOder from '@/view/customer/customerOder'
import CustomerTranfer from '@/view/customer/customerTranfer'

import Order from '@/view/order/a-order'
import Index from '@/view/order/index'
import OrderAccount from '@/view/order/orderAccount'
import EditOrder from '@/view/order/editOrder'
import ShowSendInfo from '@/view/order/showSendInfo'
import OrderColleague from '@/view/order/orderColleague'
import DayThree from '@/view/order/dayThree'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/readme',
    },
    { 
      path: '/index/readme', 
      component: Readme, 
      name: '系统说明' 
    },
    { 
      path: '/user', 
      component: User,
      children: [
        { path: 'userInfo', component: UserInfo, name: '员工基本信息'  },
        { path: 'newUser', component: NewUser, name: '入职新员工'  },
        { path: 'power', component: Power, name: '员工权限'  },
        { path: 'sale', component: Sale, name: '员工销售额管理'  },
        { path: 'echarts', component: Echarts, name: '员工报表'  }
      ]
    },
    { 
      path: '/house', 
      component: House,
      children: [
        { path: 'instock', component: Instock, name: '入库单'  },
        { path: 'outstock', component: Outstock, name: '出库单'  },
        { path: 'allocation', component: Allocation, name: '库存分配'  },
        { path: 'remaining', component: Remaining, name: '库存余额'  }
      ]
    },
    { 
      path: '/product', 
      component: Product,
      children: [
        { path: 'chengben', component: Chengben, name: '产品库存'  },
        { path: 'kucun', component: Kucun, name: '产品成本'  },
        { path: 'shuxing', component: Shuxing, name: '产品属性管理'  },
        { path: 'kucun-chakan', component: KucunChakan, name: '库存查看' },
        { path: 'productList', component: ProductList, name: '产品列表' }
      ]
    },
    { 
      path: '/finance', 
      component: Finance,
      children: [
        { path: 'jilu', component: Jilu, name: '记录出款可入款'  },
        { path: 'timeProfits', component: TimeProfits, name: '计算一段时间的利润'  }
      ]
    },
    { 
      path: '/customer', 
      component: Customer,
      children: [
        { path: 'customer-vip', component: CustomerVip, name: '客户基本信息' },
        { path: 'customerInfo', component: CustomerInfo, name: '客户销售'  },
        { path: 'customerOder', component: CustomerOder, name: '客户订单管理'  },
        { path: 'customerTranfer', component: CustomerTranfer, name: '客户关系管理'  }
      ]
    },
    { 
      path: '/order', 
      component: Order,
      children: [
        { path: 'index', component: Index, name: '订单报表' },
        { path: 'orderAccount', component: OrderAccount, name: '所有订单' },
        { path: 'editOrder', component: EditOrder, name: '编辑发货' },
        { path: 'showSendInfo', component: ShowSendInfo, name: '发货信息' },
        { path: 'orderColleague', component: OrderColleague, name: '所属员工' },
        { path: 'dayThree', component: DayThree, name: '第三天' }
      ]
    },
  ]
})
