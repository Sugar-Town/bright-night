<template>
<div class="f_echart">
    <div class="back">
       <router-link to="./timeprofits"><el-button type="success" @click="">返回</el-button></router-link>
    </div>

    <section class="chart-container">
        <el-row>            
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                chartLine: null,
            }
        },
        methods: {
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    title: {
                        text: '财务情况'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['总利润', '收入', '支出']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '总利润',
                            type: 'line',
                            stack: '总量',
                            data: [170, 100, 101, 80, 200, 230, 220]
                        },
                        {
                            name: '收入',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 302, 234, 390, 330, 430]
                        },
                        {
                            name: '支出',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 100, 210]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawLineChart()
                // this.drawColumnChart()
                // this.drawBarChart()
                
                // this.drawPieChart()
            },
        },
        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .f_echart .chart-container {
        width: 90%;
        position: absolute;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/
    .f_echart .el-col {
        padding: 30px 20px;
    }

    .f_echart .back{
        margin-left: 32px;
        margin-top: 20px;
    }
</style>