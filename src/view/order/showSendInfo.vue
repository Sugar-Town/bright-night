<template>
	<div class="waitedReceiveBox"  v-cloak>
		<el-row>
			<el-steps :space="240" :active="4">
			  <el-step title="买家下单"></el-step>
			  <el-step title="买家付款"></el-step>
			  <el-step title="发货"></el-step>
			  <el-step title="买家确认收货"></el-step>
			  <el-step title="评价" style="width: 70px;"></el-step>
			</el-steps>
		
			<!--等待买家收货提示popover-->
			<div class="infoBigBox" style="border: 1px solid lightpink">
			  <ul class="waitedReceiveTips">
			  	<li><h5>当前订单状态： 商家已发货， 等待买家确认</h5></li>
			  	<li><h5>买家（张爱玲）还有来完成本次交易的"确认到货"。如果期间买家没有“确认到货”， 也没有申请退款， 本次交易将自动结束， 支付宝将把货款支付给您</h5></li>
			  	<li><h5>如果买家表示为收到货或者收到货物有问题， 请及时联系买家积极处理， 友好协商。</h5></li>
			  </ul>
			</div>
		</el-row>	

		<div class="infoBigBox">
	        <el-tabs v-model="activeName" type="card" style="padding: 20px;">
	            <el-tab-pane label="用户管理" name="first">
					<div style="border-top: 1px solid #d1dbe5; margin-top:15px;"></div>
	            	<el-row>
	            	    <el-col :span="12">
		            	    <div class="infoBox">
		            			<ul>
		            				<li><h4>买家信息</h4></li>
		            				<li><p>昵称： 张爱玲</p></li>
		            				<li><p>所在地区</p></li>
		            				<li><p>邮件：***发送站内心</p></li>
		            			</ul>  	
		            	    </div>
	            	    </el-col>
	            	    <el-col :span="12">
		            	    <div class="infoBox">
		            			<ul>
		            				<li><p>提醒买家</p></li>
		            				<li><p>联系电话： 13412****71</p></li>
		            				<li><p>支付宝：1***付款给买家</p></li>
		            			</ul>  		
		            	    </div>
	            	    </el-col>
	            	</el-row>
					<div style="border-top: 1px solid #d1dbe5; margin-top:15px;"></div>
					<div class="table-container">
		        		<el-table ref="goodTable" :data="goodList" element-loading-text="拼命加载中" fit highlight-current-row style="width: 100%;"
		                  show-summary :summary-method="getSummaries">
		        			<el-table-column align="center" width="100px" label="商品主图">
			            		<template scope="scope">
			              		<img :src="scope.row.url" style="width: 60px;height: 60px;padding-top: 5px;"/>
			            		</template>
		          			</el-table-column>
				        <el-table-column align="center" prop="title" min-width="150px" label="商品名称" show-overflow-tooltip></el-table-column>
				        <el-table-column align="center" prop="title" min-width="150px" label="商品属性" show-overflow-tooltip></el-table-column>
				        <el-table-column align="center" prop="title" min-width="100px" label="状态" show-overflow-tooltip></el-table-column>
				        <el-table-column align="center" width="100px" prop="unitPrice" label="单价"></el-table-column>
				        <el-table-column align="center" width="100px" prop="quantity" label="数量"></el-table-column>
				        <el-table-column align="center" width="100px" prop="total" label="商品总价"></el-table-column>
		        		</el-table>
		     		</div>
	            </el-tab-pane>
	            <el-tab-pane label="收货和物流" name="second">收货和物流</el-tab-pane>
	        </el-tabs>
		</div>	
	</div>
</template>
<script>
	export default {
	  data() {
	    return {
	    	infoLoading: false,
	        showWaitedReceivePopover: true,
	   	    activeName: 'first',
	    };
	  },
	};
</script>
<style>
	li {
		list-style: none;
	}
	.waitedReceiveBox {
		margin-top: 20px;
		margin-left: 60px;
	}
	.infoBigBox {
		width:995px; 
		border: 1px solid #d1dbe5; 
		margin-top: 30px;
	}
	.waitedReceiveTips {
		display: block;
		background: lightpink;
		padding:10px 30px;
	}
	.waitedReceiveTips>li {
		display: block;
		padding: 5px 0;
	}
	.infoBox {
		padding-top: 20px;
		padding-left: 20px;
	}
	.infoBox>ul>li>p {
		font-size: 13px;
		padding-top: 5px;
	}
</style>