<template>
  <div class="post1">
    <!-- 面包屑
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品成本</el-breadcrumb-item>
    </el-breadcrumb> -->
    
    <el-tabs v-model="activeName2" @tab-click="">

        <el-tab-pane label="销售" name="first">
           <!-- 表单 -->
          <el-form ref="form" :model="form">
            <el-form-item label="状态">
              <el-select v-model="form.state" placeholder="请选择">
                <el-option label="已发货" value="选项1"></el-option>
                <el-option label="未发货" value="选项2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售单类别">
              <el-select v-model="form.classes" placeholder="销售单类别">
                <el-option label="家居类" value="选项1"></el-option>
                <el-option label="奢侈品" value="选项2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售单价">
              <el-input v-model="form.salesprice" placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item label="业务员">
              <el-input v-model="form.salesman" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.phonenumber" placeholder="请输入号码"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-select v-model="form.number" placeholder="序号">
                <el-option label="1" value="选项1"></el-option>
                <el-option label="2" value="选项2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="divider">收款信息
            </el-form-item>
            <el-form-item label="收款金额">
              <el-input v-model="form.received"></el-input>
            </el-form-item>
            <el-form-item label="应收总额">
              <el-input v-model="form.total"></el-input>
            </el-form-item>
            <el-form-item label="成本总价">
              <el-input v-model="form.cost"></el-input>
            </el-form-item>
            <el-form-item label="毛利">
              <el-input v-model="form.profit"></el-input>
            </el-form-item>
            <el-form-item label="未收总额">
              <el-input v-model="form.not"></el-input>
            </el-form-item>
            <el-form-item label="已开票">
              <el-input v-model="form.Has"></el-input>
            </el-form-item>
            <el-form-item label="销售评价" class="block">
              <el-rate v-model="value1"></el-rate>
            </el-form-item>
            <el-form-item class="clear"></el-form-item><el-form-item></el-form-item>
            <el-form-item>
                <el-button type="primary" @click="open1">提交</el-button>
                <el-button @click="allset">重置</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane label="入货" name="second">
          <div class="pane2 block">
            <ul>
            <li><span class="span2">货品名称</span><el-input v-model="name" style="width:100px;"></el-input></li>
            <li><span class="span2">货品主色</span><el-color-picker v-model="color1"></el-color-picker></li>
            <li><span class="span2">货品数量</span><el-slider v-model="value2" show-input></el-slider></li>
            </ul>
            <div class="span3">图片展示</div>
            
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in img" :key="item.id">
                  <img :src="item.ImgUrl2"><!-- 绑定图片 -->
                </el-carousel-item>
            </el-carousel>
            
          </div>
        </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import Img1 from '../../assets/light.jpg'
  import Img2 from '../../assets/light03.jpg'
  import Img3 from '../../assets/light04.jpg'
  import Img4 from '../../assets/light05.jpg'
  export default {
      data () {
          return {
            activeName2: 'first',
            form: {
              user: '',
              state:'',
              classes:'',
              number:'',
              salesprice:'',
              phonenumber:'',
              received:'',
              total:'',
              cost:'',
              profit:'',
              not:'',
              Has:''
            },
            value1: null,
            color1: '#20a0ff',
            color2: null,
            name:'',
            value2: 0,           
            img:[
              {ImgUrl2:Img1},
              {ImgUrl2:Img2},
              {ImgUrl2:Img3},
              {ImgUrl2:Img4}
            ]
          }
      },
     methods: {
       open1() {
         this.$confirm('此操作将提交该文件, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.$message({
             type: 'success',
             message: '提交成功!'
           });
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消提交'
           });          
         });
       },
       allset(){
         // this.form.not="";
         // this.form.classes="";
         this.form={
              user: '',
              state:'',
              classes:'',
              number:'',
              salesprice:'',
              phonenumber:'',
              received:'',
              total:'',
              cost:'',
              profit:'',
              not:'',
              Has:''
            };
        this.value1=null;
       }
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
  .post1{
    margin:20px;
    position: absolute;
  }
  .post1 .el-tabs{
    margin: 20px;
  }
  .post1 .el-tab-pane{
    /*border: 1px solid;*/
    width: 900px;
  }
  .post1 .el-form-item{
    float: left;
    width: 300px;
  }
  .post1 .el-form-item label{
    width: 100px;
    text-align: left;
  }
  .post1 .el-form-item .el-select{
    width: 150px;
  }
  .post1 .el-form-item .el-input{
    width: 150px;
  }
  .post1 .divider{
    width: 900px !important;
    background: #20A0FF;
    color: #fff;
    clear: both;
  }
  .post1 .el-rate{
    padding-top: 7px;
  }
  .post1 .clear{
    clear: both;
    background: red;
  }
  .post1 .span2{
    padding-right: 20px;
  }
  .post1 .pane2 li{
    margin-bottom: 5px;
    height: 50px;
  }
  .post1 .span3{
    margin: 50px 0px 20px 0px;
    width: 900px !important;
    height: 30px;
    background: gray;
    color: #fff;
  }
  .post1 .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    
    .post1 .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .post1 .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
</style>


