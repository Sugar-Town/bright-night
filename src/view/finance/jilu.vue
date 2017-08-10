<template>
  <div class="userInfo">
    <div class="jilu">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="入款单" name="first">
           <div class="jilu_news">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <!-- 日期 -->
                  <div class="jilu_top">
                    <div class="block">
                        <span class="demonstration">录入时间：</span>
                        <el-date-picker @change="setDate" 
                          v-model="ruleForm.jilu_date"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions0">
                        </el-date-picker>
                    </div>

                  <!-- 单据编号 -->
<!--                     <div class="listnum">
                      <span class="demonstration">单据编号：</span>
                      <el-input v-model="ruleForm.input" placeholder="请输入单据编号"></el-input>
                    </div> -->

                    <el-form-item label="单据编号：" prop="jilu_input">
                      <el-input v-model="ruleForm.jilu_input"></el-input>
                    </el-form-item>
                  </div>


                  <!-- 付款单位、经手人等信息 -->
      
                  <div class="jilu_content">
                    <el-form-item label="付款方：" prop="pay_name">
                      <el-input v-model="ruleForm.pay_name"></el-input>
                    </el-form-item>

                    <el-form-item label="经手人：" prop="do_name">
                      <el-input v-model="ruleForm.do_name"></el-input>
                    </el-form-item>

                    <el-form-item label="部门：" prop="region">
                      <el-select v-model="ruleForm.region" placeholder="请选择部门">
                        <el-option label="部门一" value="部门一"></el-option>
                        <el-option label="部门二" value="部门二"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>


                  <div class="jilu_one">
                    <span class="demonstration">附加说明：</span>
                    <el-input v-model="ruleForm.jilu_add"></el-input>


                    <span class="demonstration">摘要：</span>
                    <el-input v-model="ruleForm.jilu_part"></el-input>
                    </div>

                    <el-form-item class="jilu_two" label="收取金额：¥ " prop="jilu_get">
                      <el-input v-model="ruleForm.jilu_get"></el-input>
                    </el-form-item>

                    <br/><br/><br/><br/>
                      <el-form-item class="jilu_two">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </div>


                  <div class="jilu_table">
                    <el-table :data="tableData" border style="width: 100%" max-height="600">
<!--                   <el-table-column prop="jilu_date" label="录入时间" sortable width="130">
                       </el-table-column> -->
                       <el-table-column prop="jilu_date" label="录入时间" sortable width="130">
                          <template scope="scope">
                            {{scope.row.jilu_date}}
                          </template>
                       </el-table-column>
                       <el-table-column prop="jilu_input" label="单据编号" sortable width="120">
                       </el-table-column>
                       <el-table-column prop="pay_name" label="付款方" width="110">
                       </el-table-column>
                       <el-table-column prop="do_name" label="经手人" width="110">
                       </el-table-column>
                       <el-table-column prop="region" label="部门" width="120">
                       </el-table-column>
                       <el-table-column prop="jilu_add" label="附加说明" width="180">
                       </el-table-column>
                       <el-table-column prop="jilu_part" label="摘要" width="170">
                       </el-table-column>
                       <el-table-column prop="jilu_get" label="收取金额(¥)" width="120">
                       </el-table-column>
                       <el-table-column fixed="right" label="操作" width="150">
                         <template scope="scope">
                         <el-button size="small" @click="editData(scope.row,scope.$index)">编辑</el-button>
                         <el-button size="small" type="danger" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                      <!--<el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                             移除
                          </el-button> -->
                         </template>
                       </el-table-column>
                     </el-table>
                  </div>

              <br/><br/><br/><br/><br/><br/>


              <!-- =========== 编辑弹出框 ============ -->
              <div class="Modals">
              <el-dialog title="内容编辑" :visible.sync="dialogFormVisible">
              <el-form :model="ModalsForm" :rules="rules" ref="ModalsForm" label-width="100px" class="demo-ModalsForm">
                    <!-- 日期 -->
                    <div class="jilu_top">
                      <div class="block">
                          <span class="demonstration">录入时间：</span>
                          <el-date-picker @change="setDate2" 
                            v-model="ModalsForm.jilu_date"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0">
                          </el-date-picker>
                      </div>

                    <!-- 单据编号 -->
                      <el-form-item label="单据编号：" prop="jilu_input">
                        <el-input v-model="ModalsForm.jilu_input"></el-input>
                      </el-form-item>
                    </div>


                    <!-- 付款单位、经手人等信息 -->
                      <el-form-item class="Modals_one" label="付款方：" prop="pay_name">
                        <el-input v-model="ModalsForm.pay_name"></el-input>
                      </el-form-item>

                      <el-form-item label="经手人：" prop="do_name">
                        <el-input v-model="ModalsForm.do_name"></el-input>
                      </el-form-item>

                      <el-form-item label="部门：" prop="region">
                        <el-select v-model="ModalsForm.region" placeholder="请选择部门">
                          <el-option label="部门一" value="部门一"></el-option>
                          <el-option label="部门二" value="部门二"></el-option>
                        </el-select>
                      </el-form-item>

                      <div class="Modals_two">
                      <span class="demonstration">附加说明：</span>
                      <el-input v-model="ModalsForm.jilu_add"></el-input>


                      <span class="demonstration">摘要：</span>
                      <el-input v-model="ModalsForm.jilu_part"></el-input>
                      </div>

                      <el-form-item class="jilu_two" label="收取金额：¥ " prop="jilu_get">
                        <el-input v-model="ModalsForm.jilu_get"></el-input>
                      </el-form-item>

                      <br/><br/><br/><br/>
                        <el-form-item class="jilu_two">
                          <el-button type="primary" @click="submitEdit('ModalsForm')">确认修改</el-button>
                          <el-button @click="resetEdit('ModalsForm')">重置</el-button>
                        </el-form-item>
                      </el-form>
              </el-dialog>
              </div>
        <!-- ====================================== -->

          </el-tab-pane>




<!-- ============================================== 出款单 =================================================== -->


          <el-tab-pane label="出款单" name="second">
            <div class="jilu_news">
            <el-form :model="paragraphList" :rules="rules" ref="paragraphList" label-width="100px" class="demo-paragraphList">
                   <!-- 日期 -->
                   <div class="jilu_top">
                     <div class="block">
                         <span class="demonstration">录入时间：</span>
                         <el-date-picker @change="p_setDate" 
                           v-model="paragraphList.jilu_date"
                           type="date"
                           placeholder="选择日期"
                           :picker-options="pickerOptions0">
                         </el-date-picker>
                     </div>

                   <!-- 单据编号 -->
                     <el-form-item label="单据编号：" prop="jilu_input">
                       <el-input v-model="paragraphList.jilu_input"></el-input>
                     </el-form-item>
                   </div>

                  <div class="jilu_content">
                   <!-- 付款单位、经手人等信息 -->
                     <el-form-item label="支出人：" prop="pay_name">
                       <el-input v-model="paragraphList.pay_name"></el-input>
                     </el-form-item>

                     <el-form-item label="收款方：" prop="do_name">
                       <el-input v-model="paragraphList.do_name"></el-input>
                     </el-form-item>

                     <el-form-item label="部门：" prop="region">
                       <el-select v-model="paragraphList.region" placeholder="请选择部门">
                         <el-option label="部门一" value="部门一"></el-option>
                         <el-option label="部门二" value="部门二"></el-option>
                       </el-select>
                     </el-form-item>
                  </div>

                     <div class="jilu_one">
                     <span class="demonstration">附加说明：</span>
                     <el-input v-model="paragraphList.jilu_add"></el-input>


                     <span class="demonstration">摘要：</span>
                     <el-input v-model="paragraphList.jilu_part"></el-input>
                     </div>

                     <el-form-item class="jilu_two" label="支出金额：¥ " prop="jilu_charge">
                       <el-input v-model="paragraphList.jilu_charge"></el-input>
                     </el-form-item>

                     <br/><br/><br/><br/>
                       <el-form-item class="jilu_two">
                         <el-button type="primary" @click="submitForm2('paragraphList')">提交</el-button>
                         <el-button @click="resetForm2('paragraphList')">重置</el-button>
                       </el-form-item>
                     </el-form>
                   </div>


                   <div class="jilu_table">
                     <el-table :data="tableData2" border style="width: 100%" max-height="600">
                        <el-table-column prop="jilu_date" label="录入时间" sortable width="130">
                        <template scope="scope">
                          {{scope.row.jilu_date}}
                        </template>
                        </el-table-column>
                        <el-table-column prop="jilu_input" label="单据编号" sortable width="120">
                        </el-table-column>
                        <el-table-column prop="pay_name" label="支出人" width="110">
                        </el-table-column>
                        <el-table-column prop="do_name" label="收款方" width="110">
                        </el-table-column>
                        <el-table-column prop="region" label="部门" width="120">
                        </el-table-column>
                        <el-table-column prop="jilu_add" label="附加说明" width="180">
                        </el-table-column>
                        <el-table-column prop="jilu_part" label="摘要" width="170">
                        </el-table-column>
                        <el-table-column prop="jilu_charge" label="支出金额(¥)" width="120">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                          <template scope="scope">
                          <el-button size="small" @click="editData2(scope.row,scope.$index)">编辑</el-button>
                          <el-button size="small" type="danger" @click.native.prevent="deleteRow(scope.$index, tableData2)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                   </div>

               <br/><br/><br/><br/><br/><br/>


               <!-- =========== 编辑弹出框 ============ -->
               <div class="Modals">
               <el-dialog title="内容编辑" :visible.sync="dialogFormVisible2">
               <el-form :model="ModalsForm2" :rules="rules" ref="ModalsForm2" label-width="100px" class="demo-ModalsForm">
                     <!-- 日期 -->
                     <div class="jilu_top">
                       <div class="block">
                           <span class="demonstration">录入时间：</span>
                           <el-date-picker @change="p_setDate2" 
                             v-model="ModalsForm2.jilu_date"
                             type="date"
                             placeholder="选择日期"
                             :picker-options="pickerOptions0">
                           </el-date-picker>
                       </div>

                     <!-- 单据编号 -->
                       <el-form-item label="单据编号：" prop="jilu_input">
                         <el-input v-model="ModalsForm2.jilu_input"></el-input>
                       </el-form-item>
                     </div>


                     <!-- 付款单位、经手人等信息 -->
                       <el-form-item class="Modals_one" label="付款方：" prop="pay_name">
                         <el-input v-model="ModalsForm2.pay_name"></el-input>
                       </el-form-item>

                       <el-form-item label="经手人：" prop="do_name">
                         <el-input v-model="ModalsForm2.do_name"></el-input>
                       </el-form-item>

                       <el-form-item label="部门：" prop="region">
                         <el-select v-model="ModalsForm2.region" placeholder="请选择部门">
                           <el-option label="部门一" value="部门一"></el-option>
                           <el-option label="部门二" value="部门二"></el-option>
                         </el-select>
                       </el-form-item>

                       <div class="Modals_two">
                       <span class="demonstration">附加说明：</span>
                       <el-input v-model="ModalsForm2.jilu_add"></el-input>


                       <span class="demonstration">摘要：</span>
                       <el-input v-model="ModalsForm2.jilu_part"></el-input>
                       </div>

                       <el-form-item class="jilu_two" label="收取金额：¥ " prop="jilu_charge">
                         <el-input v-model="ModalsForm2.jilu_charge"></el-input>
                       </el-form-item>

                       <br/><br/><br/><br/>
                         <el-form-item class="jilu_two">
                           <el-button type="primary" @click="submitEdit2('ModalsForm2')">确认修改</el-button>
                           <el-button @click="resetEdit2('ModalsForm2')">重置</el-button>
                         </el-form-item>
                       </el-form>
               </el-dialog>
               </div>

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

          // -------------------------------------- 入款单 ----------------------------------------------
          //页面开始显示第一个tab页
          activeName: 'first',

          //日期选择，返回值
          pickerOptions0: {
            disabledDate(time) {
               return time.getTime() < Date.now() - 8.64e7;
             }
          },

          //入款单增添数据表单
          ruleForm: {
            jilu_date:'',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add:'',
            jilu_part:'',
            jilu_get: ''
          },

          //入款单表格数据
          tableData: [{
            jilu_date: '',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add: '',
            jilu_part: '',
            jilu_get: 0
          }],


          // ----- 编辑弹出框 ------
          dialogFormVisible: false,

          ModalsForm: {
            jilu_date:'',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add:'',
            jilu_part:'',
            jilu_get: ''
          },
          formLabelWidth: '120px',
          //----------------------


          //-----------------------------------------------------------------------------------------------------

          //数据校验
          rules: {
            jilu_input: [
              { required: true, message: '请输入单据编号', trigger: 'blur' },
              { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
            ],
            pay_name: [
              { required: true, message: '请输入付款方名称', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ],
            do_name: [
              { required: true, message: '请输入经手人名称', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择部门', trigger: 'blur' }
            ],
            jilu_get: [
              // { required: true, message: '收取金额不能为空', trigger: 'blur'},
              // { value!=^[0-9]*$ , message: '收取金额必须为数字值'}

              // 自定义校验规则
              //数字校验
              {validator:(rule,value,callback)=>{
                if (!value) {
                  return callback(new Error('收取金额不能为空'));
                }
                else if(/^\d+$/.test(value) == false){
                  callback(new Error("收取金额必须为数字值"));
                }else{
                  callback();
                }
              }, trigger:'blur'}

            ],

            jilu_charge: [
              // { required: true, message: '收取金额不能为空', trigger: 'blur'},
              // { value!=^[0-9]*$ , message: '收取金额必须为数字值'}

              // 自定义校验规则
              //数字校验
              {validator:(rule,value,callback)=>{
                if (!value) {
                  return callback(new Error('收取金额不能为空'));
                }
                else if(/^\d+$/.test(value) == false){
                  callback(new Error("收取金额必须为数字值"));
                }else{
                  callback();
                }
              }, trigger:'blur'}

            ]
          },


          // ---------------------------------------- 出款单 ---------------------------------------------
          //出款单增添数据表单
          paragraphList: {
            jilu_date:'',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add:'',
            jilu_part:'',
            jilu_charge: ''
          },

          //出款单表格数据
          tableData2: [{
            jilu_date: '',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add: '',
            jilu_part: '',
            jilu_charge: 0
          }],

          // 出款单弹窗
          ModalsForm2: {
            jilu_date:'',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add:'',
            jilu_part:'',
            jilu_charge: ''
          },

          dialogFormVisible2: false,


          //----------------------------------------------------------------------------------------------




        };
      },
      mounted(){
        var vm = this;

        //获取json数据
        vm.getData();
        vm.getData2();
      },

      methods: {
        //tab切换
        handleClick(tab, event) {
          console.log(tab, event);
        },

        //获取入款单表格数据
        getData(){
          this.$http.get(api.cwData_in,{params:{'key':this.jilu_input}}).then(function(response){ 
            // console.log(response);
            // console.log('这是我们需要的json数据',response.data.tableList)
            this.tableData = response.data.tableList;
          },function(response){
            alert('请求失败了')
          })
        },

        //获取出款单表格数据
        getData2(){
          this.$http.get(api.cwData_out).then(function(response){ 
            // console.log(response);
            // console.log('这是我们需要的json数据',response.data.tableList2)
            this.tableData2 = response.data.tableList2;
          },function(response){
            alert('请求失败了')
          })
        },


//-------- 入款单 -------
        // @change 时间格式转换
        //入款单增添数据表单时间
        setDate(val) {
          this.ruleForm.jilu_date=val;
          // this.tableData.jilu_date=val;
          // this.ModalsForm.jilu_date=val;
        },

        //入款单编辑数据表单时间
        setDate2(val){
          this.ModalsForm.jilu_date=val;
          
          this.tableData.jilu_date = this.ModalsForm.jilu_date;
          // console.log(this.ModalsForm.jilu_date)
          // console.log(this.tableData.jilu_date)
        },

        //重置新增表单ruleForm
        initForm(){
          let vm = this;
          vm.ruleForm = {
            jilu_date:'',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add:'',
            jilu_part:'',
            jilu_get: ''
          }
        },


        //增添入款单数据
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var vm = this;
              var flag = 0;
              console.log('新增入参：',vm.ruleForm);

              // 判断单据编号是否重复
              for(var addlist of vm.tableData){
                if(vm.ruleForm.jilu_input == addlist.jilu_input){
                  alert("单据编号已存在！请重新输入！")
                  flag = 1;
                  return flag;
                  // break;
                }
              }
              
              if(flag!=1){
              //这里作演示用，正式新增 请提交到接口
              vm.tableData.push(vm.ruleForm)
              console.log('新增后',vm.tableData)
              
              // this.dialogFormVisible = false;

              alert('提交成功!');
              this.initForm();
              }

            } else {
              console.log('提交失败!!');
              return false;
            }
          });

        },

        // 重置入款单增添数据表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
          //重置下新增表单数据，避免双向绑定
          this.initForm();
        },


        // 删除记录
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },

        // 入款单编辑弹出框
        editData(row,_index){
          // alert(0);
          let vm = this;
          //显示弹窗
          vm.dialogFormVisible = true;
          
          // vm.ModalsForm.push(vm.tableData);
          // console.log("弹出表格",vm.ModalsForm);

          //记录索引
          this.listIndex=_index;
          //记录数据
          // this.ModalsForm=row;
          // this.ModalsForm=JSON.parse(JSON.stringify(row));

          //深拷贝，无数据双向绑定
          this.ModalsForm=Object.assign({}, row);
        },

        // 提交修改
        submitEdit(formName) {
          // var set = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let _index=this.listIndex;
              //根据索引，赋值到list制定的数
              this.tableData[_index]=this.ModalsForm;
              //根据索引，删除当前行的值，并用修改的数据替换当前行的值
              this.tableData.splice(_index,1,this.ModalsForm);

              alert('提交成功!');
              //关闭弹窗
              this.dialogFormVisible=false;
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },

        //重置新增表单ModalsForm
        initForm2(){
          let vm = this;
          // let _index=this.listIndex;
          vm.ModalsForm = {
            jilu_date:'',
            jilu_input: '',
            pay_name: '',
            do_name: '',
            region: '',
            jilu_add:'',
            jilu_part:'',
            jilu_get: ''
          }
        },

        //重置修改表单
        resetEdit(formName) {
          this.$refs[formName].resetFields();
          this.initForm2();
        },
    //-----------------------------------


    //------------------ 出款单 ----------------
    // @change 时间格式转换
    //出款单增添数据表单时间
    p_setDate(val) {
      this.paragraphList.jilu_date=val;
    },

    //出款单编辑数据表单时间
    p_setDate2(val) {
      this.ModalsForm2.jilu_date=val;
      
      this.tableData2.jilu_date = this.ModalsForm2.jilu_date;
    },


    //重置新增表单paragraphList
    initForm3(){
      let vm = this;
      vm.paragraphList = {
        jilu_date:'',
        jilu_input: '',
        pay_name: '',
        do_name: '',
        region: '',
        jilu_add:'',
        jilu_part:'',
        jilu_charge: ''
      }
    },


    //出款单提交新增数据
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var vm = this;
          var flag = 0;
          console.log('新增入参：',vm.paragraphList);

          // 判断单据编号是否重复
          for(var addlist2 of vm.tableData2){
            if(vm.paragraphList.jilu_input == addlist2.jilu_input){
              alert("单据编号已存在！请重新输入！")
              flag = 1;
              return flag;
              // break;
            }
          }

          if(flag!=1){
          //这里作演示用，正式新增 请提交到接口
          vm.tableData2.push(vm.paragraphList)
          console.log('新增后',vm.tableData2)
          
          // this.dialogFormVisible = false;

          alert('提交成功!');
          this.initForm3();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },



    // 重置表单
    resetForm2(formName) {
      this.$refs[formName].resetFields();
      //重置下新增表单数据，避免双向绑定
      this.initForm3();
    },



      // 编辑弹出框
      editData2(row,_index){
        // alert(0);
        let vm = this;
        //显示弹窗
        vm.dialogFormVisible2 = true;

        //记录索引
        this.listIndex=_index;
        //记录数据
        // this.ModalsForm2=row;
        //深拷贝，无数据双向绑定
        this.ModalsForm2=Object.assign({}, row);
      },

      // 出款单提交修改数据
      submitEdit2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert(1);
            let _index=this.listIndex;
            //根据索引，赋值到list制定的数
            this.tableData2[_index]=this.ModalsForm2;
            //根据索引，删除当前行的值，并用修改的数据替换当前行的值
            this.tableData2.splice(_index,1,this.ModalsForm2);

            alert('提交成功!');
            this.dialogFormVisible2=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      //重置新增表单ModalsForm
      initForm4(){
        let vm = this;
        // let _index=this.listIndex;
        vm.ModalsForm2 = {
          jilu_date:'',
          jilu_input: '',
          pay_name: '',
          do_name: '',
          region: '',
          jilu_add:'',
          jilu_part:'',
          jilu_charge: ''
        }
      },

      //重置修改表单
      resetEdit2(formName) {
        this.$refs[formName].resetFields();
        this.initForm4();
      },



    //------------------------------------------



      }
    };
</script>







<style>
  * {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
  }

  .jilu{
    width: 1200px;
    /*margin-left: 200px;*/
    /*background-color: #ccc;*/
  }

  /*-------------------入款单----------------------------*/

  /*日期*/
  .jilu .jilu_top{
    width: 100%;
    height: 40px;
    /*margin-bottom: 26px;*/
    /*background-color: red;*/
  }



  .jilu .block{
    float: left;
    margin-left: 30px;
  }


  .jilu .el-tabs__header{
    padding-left: 6%;
  }

  /*单据编号*/
  .jilu .listnum{
    float: left;
    margin-left: 22px;
  }

  .jilu .listnum .el-input{
      width: 72%;
  }


  /*付款单位、经手人等信息*/
  .jilu .jilu_content{
    width: 100%;
    height: 40px;
    margin-top: 46px;
    margin-bottom: 30px;
  }

  .jilu .jilu_news .el-form-item{
    float: left;
  }

  .jilu .jilu_news .jilu_one{
    margin-left: 30px;
    margin-bottom: 30px;
  }
  

  .jilu .jilu_news .jilu_one .el-input{
    width: 16%;
  }

  .jilu .jilu_news .jilu_two{
    margin-left: 20px;
  }

  /*记录表格*/
  .jilu .jilu_table{
    width: 100%;
    margin-top: 70px;
    height:100%;
    margin-left: 20px;
    /*background-color: red;*/
  }


  /*编辑弹出框*/
  .jilu .Modals .block{
      width: 100%;
      margin-bottom: 20px;
  }

  .jilu .Modals .Modals_one{
      margin-top: 70px;
  }

  .jilu .Modals .Modals_two{
      margin-left: 20px;
  }

  .jilu .Modals .Modals_two .el-input{
    width: 86%;
    margin-bottom: 27px;
  }

  .jilu .Modals .el-form-item__content{
    z-index: 1;
  }

  .jilu .Modals .el-date-editor.el-input{
    z-index: 2;
  }

  /*-------------------------------------------*/


  /*-------------------------- 出款单 -----------------------*/





  /*---------------------------------------------------------*/

</style>