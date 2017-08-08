<template>
  <div class="post">
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <!-- <el-table-column label="ID" width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column> -->
        
        <el-table-column prop="ID" label="ID" width="80">
        </el-table-column>


        <el-table-column prop="name" label="仓库名称" width="100">
        </el-table-column>

        <el-table-column prop="address" label="仓库位置" show-overflow-tooltip width="250">
        </el-table-column>

        <el-table-column prop="detail" label="详细信息" show-overflow-tooltip width="200">
        </el-table-column>

        <el-table-column prop="manager" label="负责人" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="start" label="入仓时间" show-overflow-tooltip width="100">
           <template scope="scope">{{ scope.row.start }}</template>
        </el-table-column>

        <el-table-column prop="deadline" label="到期时间" show-overflow-tooltip width="100">
            <template scope="scope">{{ scope.row.deadline }}</template>
        </el-table-column>

        <el-table-column prop="work" label="操作" show-overflow-tooltip width="150">
            <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData3)" type="text" size="small">
                        移除
                    </el-button>

            </template>
        </el-table-column>

    </el-table>
    
  </div>
</template>
<script>
  export default {
      data () {
          return {
            tableData3: [
                    {
                      ID: '01',
                      name: '总仓库',
                      address: '河北省石家庄长安区裕华路44号',
                      detail:'详细信息',
                      manager:'负责人',
                      start:'2017-8-1',
                      deadline:'2017-8-2',
                      work:'操作'
                    }
            ]
          }
        },
      methods: {
            handleEdit(index, row) {
              console.log(index, row);
            },
            deleteRow(index, rows) {
                    rows.splice(index, 1);
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
</style>