<template>
<div class="customerVip">
<div class="log">
<!-- 登录管理 -->
  <div class="loginImg">
    <img src="./../../assets/login.jpg" style="width: 406px;height:364px;">
  </div>
  <div class="login" style="margin-top: 36px;">
    <span style="color:#2894FF;font-size: 28px; padding-left: 190px;">登录</span>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="name">
      <i class="fa fa-user-circle-o" aria-hidden="true" style="font-size: 26px;"></i>
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off" style="width: 81%;margin-bottom: 12px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
      <i aria-hidden="true" class="fa fa-lock" style="font-size: 30px;margin-right: 4px;"></i>
        <el-input type="password" v-model="ruleForm2.pass" @keyup.enter.native="submitForm('ruleForm2')"  auto-complete="off" style="width: 81%;">
        </el-input>
        <p style="color:#2894FF; padding-left: 40px; font-size: 12px">测试账号：123/123123</p>
      </el-form-item>
      
      <div class="sub">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')" style="margin-left: 66px;">退出</el-button>
        </el-form-item>
      </div>

    </el-form>    
  </div>
</div>

</div>
</template>
<script>
 

 export default {
      data () {
        var validateName = (rule, value, callback) => {
           if (value === '') {
            callback(new Error('请输入账号'));
          }
          if (value !== '123') {
                callback(new Error('帐号不存在！'));
           }
          else {
            if (this.ruleForm2.pass !== '') {
              this.$refs.ruleForm2.validateField('pass');
            }
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else if (value !== '123123') {
            callback(new Error('密码错误!'));
          } else {
            callback();
          }
        };
        const validatePass1 = (rule, value, callback) => {
            if (value.length < 6) {
              callback(new Error('密码不能小于6位'));
            } else {
              callback();
            }
          };
            return {
             ruleForm2: {
            name: '',
            pass: ''
          },
          rules2: {
            name: [
              { validator: validateName, trigger: 'blur' }
            ],
            pass: [
              { required: true, trigger: 'blur', validator: validatePass1 },
              { validator: validatePass, trigger: 'blur' }
            ]
          }
        };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/index/readme');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .customerVip{
    position: absolute;
  }
  .customerVip .log{
    background: #D0E9FF;
    width:900px;
    height: 364px;
    margin: 124px 160px;
  }
  .customerVip .loginImg{
    float: left;
  }
  .customerVip .login{
    float: left;
  }
  .customerVip .login .el-form-item__content {
    margin-left: 156px;
  }
  .customerVip .login.el-input,.customerVip .login .el-input__inner {
    width: 121%;
  }
  .customerVip .login .el-form{
    margin-top: 43px;
  }
  .customerVip .sub .el-form-item{
    margin-top: 28px;
  }
  .customerVip .login .el-form-item__label {
    padding: 8px 12px 11px 0;
  }
  .customerVip .login .el-form-item__error{
    margin-left: 29px;
  }
  .customerVip .login .el-form-item.is-required .el-form-item__label:before {
    content: '';
  }
</style>