<template>
  <div class="post">
    <div class="post1">
    <div class="one">
      <el-tabs type="border-card">

        <el-tab-pane label="产品属性管理">
          <el-row :gutter="20">
            <el-col :span="8">                
                <div class="user_img" >
                    <!-- <img :src="ImgUrl" alt="产品样式" > -->
                    <el-tooltip class="item" effect="dark" content="单击上传新图片" placement="bottom-start">   
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar"><!-- 上传图片 -->
                          <img v-else :src="ImgUrl" class="avatar"><!-- 默认图片 -->
                          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                        </el-upload>
                    </el-tooltip>
                </div>               
            </el-col>
            
            <el-col :span="16">
                <div class="user_info">
                    <h2>产品信息 <el-button size="small" v-if="!editable" @click="editable = true" style="float:right;" icon="edit">编辑</el-button> </h2>
                    <div class="user_info_form" v-if="editable">
                      
                        <el-form label-position="right" label-width="100px" :model="personalInfo">
                              <el-form-item label="产品名称:">
                                <el-input v-model="personalInfo.name"></el-input>
                              </el-form-item>
                              <el-form-item label="尺寸大小:">
                                <el-input v-model="personalInfo.Size"></el-input>
                              </el-form-item>
                              <el-form-item label="仓库地址:" >
                                <el-input v-model="personalInfo.address"></el-input>
                              </el-form-item>
                              <el-form-item label="功能简介:">
                                <el-input type="textarea" v-model="personalInfo.introduction"></el-input>
                              </el-form-item>
                              <el-form-item label="价格:">
                                <el-input v-model="personalInfo.price"></el-input>
                              </el-form-item>
                              <el-form-item>
                                 <el-button type="primary" @click="submitForm1()">提交</el-button>
                                 <el-button @click="resetForm()">取消</el-button>
                               </el-form-item>
                        </el-form>

                    </div>

                    <div class="user_info_text" v-else>
                        <el-form label-position="right" label-width="100px" :model="personalInfo">
                              <el-form-item label="产品名称:">
                                {{ personalInfo.name }}
                              </el-form-item>
                              <el-form-item label="尺寸大小:">
                                {{ personalInfo.Size }}                              
                              </el-form-item>
                              <el-form-item label="仓库地址:">
                                {{ personalInfo.address }}                               
                              </el-form-item>
                              <el-form-item label="功能简介:">
                                {{ personalInfo.introduction }}                               
                              </el-form-item>
                              <el-form-item label="价格:">
                                {{ personalInfo.price }}                              
                              </el-form-item>                            
                        </el-form>
                    </div>
                </div>

            </el-col>

          </el-row>
        </el-tab-pane>

        <el-tab-pane label="配送管理">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="客户名称">
               <el-input v-model="ruleForm.name"></el-input>
             </el-form-item>
             <el-form-item label="配送时间" required>
               <el-col :span="11">
                 <el-form-item >
                   <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                 </el-form-item>
               </el-col>
               <el-col class="line" :span="1">-</el-col>
               <el-col :span="11">
                 <el-form-item >
                   <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                 </el-form-item>
               </el-col>
             </el-form-item>
             <el-form-item label="配送区域">
               <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                 <el-option
                   v-for="item in regoin"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
                 </el-option>
               </el-select>
             </el-form-item>

             <el-form-item label="配送地址">
               <el-select v-model="ruleForm.address" placeholder="请选择">
                 <el-option
                   v-for="item in options2"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
                 </el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="即时配送">
               <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
             </el-form-item>
             <el-form-item label="配送性质">
               <el-checkbox-group v-model="ruleForm.type">
                 <el-checkbox label="一般物品" name="type"></el-checkbox>
                 <el-checkbox label="易碎品" name="type"></el-checkbox>
                 <el-checkbox label="易爆品" name="type"></el-checkbox>
                 <el-checkbox label="易腐蚀" name="type"></el-checkbox>
                 <el-checkbox label="易风化" name="type"></el-checkbox>
               </el-checkbox-group>
             </el-form-item>
             <el-form-item label="购买保修">
               <el-radio-group v-model="ruleForm.resource">
                 <el-radio label="是"></el-radio>
                 <el-radio label="否"></el-radio>
               </el-radio-group>
             </el-form-item>
             <el-form-item label="备注信息">
               <el-input type="textarea" v-model="ruleForm.desc"></el-input>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="submitForm2('ruleForm')">提交</el-button>
               <el-button @click="resetForm('ruleForm')">重置</el-button>
             </el-form-item>
           </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    </div>
  </div>
</template>
<script>
  import Img from '../../assets/light02.jpg' //图片的封装
  import { mapGetters } from 'vuex';         //编辑
  import {api} from '@/global/api'
  export default {
      data () {
          return {
             ImgUrl:Img,
             imageUrl:'',
             editable:false,
             personalInfo:{
              "name":"小台灯",
              "Size":"34*43",
              "address": "河北省石家庄长安区裕华路44号",
              "introduction":"光线柔和,节能省电",
              "price":"50"
             },
             ruleForm: {
               name: '',
               region: '',
               date1: '',
               date2: '',
               delivery: false,
               type: [],
               resource: '',
               desc: '',
               address:''
             },
             rules: {
               name: [
                 { required: true, message: '请输入活动名称', trigger: 'blur' },
                 { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
               ],
               region: [
                 { required: true, message: '请选择活动区域', trigger: 'change' }
               ],
               date1: [
                 { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
               ],
               date2: [
                 { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
               ],
               type: [
                 { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
               ],
               resource: [
                 { required: true, message: '请选择活动资源', trigger: 'change' }
               ],
               desc: [
                 { required: true, message: '请填写活动形式', trigger: 'blur' }
               ]
             },
             options2: [
               {key:"01", value:"江苏"},{key:"01", value:"浙江"}
               ],
             props: {
               value: 'label',
               children: 'cities'
             },
             regoin: [{key:"01", value:"区域一"},{key:"01", value:"区域二"}],
          };
      },
      computed: {
            ...mapGetters({
                personalInfo_init:'userInfo'
            })
      },
      mounted() {
        var vm = this;
        vm.resetForm();
      },
      methods: {
        //修改产品图片
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        //提交表单
        submitForm1() {
            var vm = this;
            vm.editable = false;
            var par = {
                "account":  vm.personalInfo.account,
                "name": vm.personalInfo.name,
                "Size": vm.personalInfo.Size ,
                "sex": vm.personalInfo.sex,
                "address": vm.personalInfo.address,
                "introduction": vm.personalInfo.introduction,
            };

            console.log('修改信息入参为：',par)
        },
        //重置表单
        resetForm() {
            var vm = this;
            vm.editable = false;
            // vm.personalInfo = JSON.parse( JSON.stringify(vm.personalInfo_init) ) ;
        },
        //配送管理面板
        submitForm2(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //配送管理面板中的选择配送地址的方法
        // resetForm(formName) {
        //   this.$refs[formName].resetFields();
        // },
        handleItemChange(val) {
          console.log('active item:', val);
          setTimeout(_ => {
            if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
              this.options2[0].cities = [{
                label: '南京'
              }];
            } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
              this.options2[1].cities = [{
                label: '杭州'
              }];
            }
          }, 300);
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
  .post1 .one{
    margin: 20px;
  }
  /*.user_img img{
    max-width: 200px;
    max-height: 200px;
  }*/

  /*上传图片框的样式*/
  .post1 .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  .post1 .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
  }
  .post1 .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
  }
  .post1 .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .post1 .el-tab-pane{
    width: 900px;
    height: 530px;
  }
  /*消息提示的样式*/
  .post1 .item {
    margin: 0px;
  }
  /*编辑信息框的样式*/
  .post1 .user_info{
    padding-bottom: 20px;
    border: 1px solid #dee1e2;
  }
  .post1 h2{
    margin: 5px;
    padding: 10px 20px;
    border-bottom: 1px solid #dee1e2;            
  }
  .post1 .i_edit{
    float: right;
    font-size: 16px;
    color: #7ab8ed;
  }
  .post1 .user_info_form,.post1 .user_info_text{
      padding: 20px;
  }

</style>
