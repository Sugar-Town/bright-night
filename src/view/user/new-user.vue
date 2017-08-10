<template>
  <div class="new-user">
    <!-- 面包屑导航 -->
   <!--  <div class="bre-crumb">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>入职新员工</el-breadcrumb-item>  
       </el-breadcrumb>
    </div> -->

    <!-- 验证表单 -->
    <div class="ruleForm">
      <h1 class="title">入职新员工信息收集表</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="应聘职位" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择应聘职位">
            <el-option label="主管" value="leader"></el-option>
            <el-option label="普通员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="安排住宿" prop="delivery">
          <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="应聘岗位" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="人事行政" name="type"></el-checkbox>
            <el-checkbox label="销售" name="type"></el-checkbox>
            <el-checkbox label="策划" name="type"></el-checkbox>
            <el-checkbox label="总经理助理" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="员工性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="员工生日" prop="birthday">
          <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>
        <el-form-item label="个人特长" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
  export default {
      data () {
          return {
            ruleForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            sex: '',
            birthday: '',
            desc: ''
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
              sex: [
                { required: true, message: '请选择员工性别', trigger: 'change' }
              ],
              birthday: [
                { type: 'date', required: true, message: '请选择员工生日', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
            },
            pickerOptions0: {
                     disabledDate(time) {
                       return time.getTime() < Date.now() - 8.64e7;
                     }
                   }

          };
        },
        methods:{
            submitForm(formName) {
                 this.$refs[formName].validate((valid) => {
                   if (valid) {
                     alert('submit! 具体信息请到控制台查看');
                     console.log("此新员工的基本信息为：",JSON.stringify(this.ruleForm));
                   } else {
                     console.log('error submit!!');
                     return false;
                   }
                 });
               },
               resetForm(formName) {
                 this.$refs[formName].resetFields();
               }
         }

        }

      

</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .new-user{
    position: absolute;
  }
  .new-user .title{
    text-align: center;
    margin-bottom: 50px;
  }
  .new-user .el-col-2{
    text-align: center;
  }
  .new-user .btn{
    margin-left: 100px;
  }

  
</style>