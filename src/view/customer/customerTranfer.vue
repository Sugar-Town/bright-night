<template>
  <div class="customerTranfer">
    <div class="myChart">
       <div id="myChart" style="width:1000px;height:500px;"></div>
    </div>
    <div class="chartPie">
      <div id="chartPie" style="width: 500px;height: 500px;"></div>
   </div>
  </div>
</template>
<script>

 // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
// 之所以使用 require 而不是 import，是因为 require 可以直接从 node_modules 中查找，而 import 必须把路径写全
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')


export default {
  name: 'hello',
  data() {
    return {
       chartPie: null
    }
  },
  mounted() {
      //柱状图
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '客户业绩排行榜' },
        tooltip: {},
        xAxis: {
          data: ["哇哈哈有限公司", "喜之郎有限公司", "加多宝有限公司", "和其正有限公司", "德芙集团", "不二家集团"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [1440, 2000, 3600, 2500, 4200, 1800]
        }]
      });
     
    /*ECharts饼状图*/
      var chartPie = echarts.init(document.getElementById('chartPie'));
        chartPie.setOption({
          title : {
            text: '客户访问来源',
            subtext: '纯属虚构',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                    {value:400, name:'搜索引擎'},
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'}
              ],
          itemStyle: {
              emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }

        }
        ]
    })
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
  .customerTranfer{
    position: absolute;
  }
  .customerTranfer .myChart{
    margin: 25px 30px;
 }
 .customerTranfer .chartPie{
    margin-top: 50px;
    margin-left: 105px;
 }
</style>