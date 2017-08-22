<template>
<div class="remainContainer">
	<div class="remainbox">
		<el-tabs type="border-card">
		    <el-tab-pane>
		    <span slot="label"><i class="fa fa-home" aria-hidden="true"></i> 总仓库</span>
		    <el-table :data="retableList1" border show-summary  style="width: 100%" sum-text="合计各种类剩余量">
                 <el-table-column prop="id" label="编号"  width="180"> </el-table-column>
                 <el-table-column  prop="metropolis" label="产地"> </el-table-column>
                 <el-table-column label="商品分类"> 
	                 <el-table-column prop="amount1" sortable label="A类剩余量（个）"> </el-table-column>
	                 <el-table-column prop="amount2" sortable label="B类剩余量（个）"> </el-table-column>
	                 <el-table-column prop="amount3" sortable label="C类剩余量（个）"> </el-table-column>
                </el-table-column>
            </el-table>
		  </el-tab-pane>
		  <el-tab-pane>
		    <span slot="label"><i class="fa fa-home" aria-hidden="true"></i> 库房-北京站</span>
		    <el-table :data="retableList2" border show-summary  style="width: 100%" sum-text="合计各种类剩余量">
                 <el-table-column prop="id" label="编号"  width="180"> </el-table-column>
                 <el-table-column  prop="metropolis" label="产地"> </el-table-column>
                 <el-table-column label="商品分类"> 
	                 <el-table-column prop="amount1" sortable label="A类剩余量（个）"> </el-table-column>
	                 <el-table-column prop="amount2" sortable label="B类剩余量（个）"> </el-table-column>
	                 <el-table-column prop="amount3" sortable label="C类剩余量（个）"> </el-table-column>
                </el-table-column>
            </el-table>
		  </el-tab-pane>
		  <el-tab-pane>
		    <span slot="label"><i class="fa fa-home" aria-hidden="true"></i> 库房-广州站</span>
		    <el-table :data="retableList3" border show-summary  style="width: 100%" sum-text="合计各种类剩余量">
                 <el-table-column prop="id" label="编号"  width="180"> </el-table-column>
                 <el-table-column  prop="metropolis" label="产地"> </el-table-column>
                 <el-table-column label="商品分类"> 
	                 <el-table-column prop="amount1" sortable label="A类剩余量（个）"> </el-table-column>
	                 <el-table-column prop="amount2" sortable label="B类剩余量（个）"> </el-table-column>
	                 <el-table-column prop="amount3" sortable label="C类剩余量（个）"> </el-table-column>
                </el-table-column>
            </el-table>
		  </el-tab-pane>
       </el-tabs>
  </div>
</div>
</template>
<script>
  import {api} from '@/global/api'
	export default {
    data() {
      return {
        retableList1:null,
        retableList2:null,
        retableList3:null
      }
    },
    mounted() {
        var vm = this;
        vm.getData();
      },
    methods: {
      getData () {
        this.$http.get(api.kfData).then(function (response) {
          console.log(response)
          console.log('这是我们需要的json数据', response.data.retableData1)
          this.retableList1 = response.data.retableData1;
          this.retableList2 = response.data.retableData2;
          this.retableList3 = response.data.retableData3;
        }, function (response) {
          alert('请求失败了')
        })
      }
  }
}
</script>
<style>
.remainContainer{
  float: left;
  width: 1200px;
  position: relative;
  overflow: hidden;
}
.remainbox{
  padding: 20px 24px;
  width: 1000px;
  margin: 0 auto;
}
.remainbox .el-table th>.cell {
  text-align: center;
}
</style>