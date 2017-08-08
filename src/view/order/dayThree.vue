<template>
	<div class="bigDiv">
		<div class="top">
			<div class="weather_bg">
				<div class="left">
					<div class="top-day"><h4>{{ day }}</h4></div>
					<div class="bg-box"><img src=""></div>
					<div class="top-day"><h1>{{ high }}</h1></div>
				</div>
				<div class="right">
					<span class="high-low">{{ low }} ~ {{ high }}</span><br />
					<span class="type">{{ type }}</span><br />
					<span class="fengli">{{ fengli }}</span><br />
					<span class="fengxiang">{{ fengxiang }}</span><br />
				</div>
			</div>
		</div>
		<div class="middle">
			<ul v-for="forcast in forecasts" @click="showEachday(forcast)">
				<li>{{ forcast.type }}</li>
				<li><img :src="forcast.img"></li>
				<li>{{ forcast.date }}</li>
				<li>{{ forcast.high }}</li>
				<li>{{ forcast.low }}</li>
				<li>{{ forcast.fengxiang }}</li>
				<li>{{ forcast.fengli }}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
	    data() {
	        return {
		        fengxiang: "南偏东",
					fengli: "微风级",
					high: "高温 20℃",
					type: "多云",
					low: "低温 14℃",
					day: "27日星期一",
					img: "",
					forecasts: []
	    	}
	  	},
	  	mounted: function() {
			this.getData();
		},
		methods: {
			getData: function() {
				let innerThis = this;
				this.$http.get('.././static/dataJson/weather_mini.json').then(function(response) {
					innerThis.forecasts = response.data.data.forecast;
				}, function(response) {
					alert("请求失败了");
				})
			},
			showEachday: function(forcast) {
				this.fengxiang = forcast.fengxiang;
				this.fengli = forcast.fengli;
				this.high = forcast.high;
				this.type = forcast.type;
				this.low = forcast.low;
				this.day = forcast.date;
				this.img = forcast.img;
			}
		}
	}
</script>
<style>
	* {
		padding: 0;
		margin: 0;
	}
	
	li {
		list-style: none;
	}

	body {
		background: #e9e9e9;
	}
	
	.bigDiv {
		margin-left: 50px;
		margin-top: 30px;
		text-align: center;
	}
	
	.top .city {
		margin-bottom: 10px;
	}
	
	.weather_bg {
		width: 920px;
		height: 224px;
		background: lightblue;
		margin-bottom: 10px;
	}
	
	.left {
		width: 300px;
		height: 170px;
		text-align: center;
		float: left;
		padding-left: 100px;
		padding-top: 15px;
	}
	
	.left>div {
		padding-top: 15px;
	}
	
	.right {
		width: 400px;
		height: 200px;
		float: right;
		padding: 20px 0 0 100px;
	}
	
	.right span {
		display: block;
		color: darkslategrey;
		font-size: 21px;
	}
	
	.right .high-low {
		font-size: 34px;
	}
	
	.bg-box {
		width: 165px;
		height: 50px;
	}
	
	.top-day {
		width: 200px;
		color: aliceblue;
		font-size: 20px;
	}
	
	.middle {
		width: 920px;
		height: 510px;
		text-align: center;
		margin-bottom: 20px;
		background: lightskyblue;
	}
	
	.middle ul {
		width: 183px;
		height: 510px;
		float: left;
		border-right: 1px solid gainsboro;
		display: block;
		cursor: pointer;
	}
	
	.middle ul li {
		margin-top: 40px;
	}
</style>