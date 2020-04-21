<template>
  <div style="width: 100%">
    <div class="title">列车列表</div>
    <el-table
      :data="oneList"
      border
      style="width: 100%;">
      <el-table-column
        prop="murfhbr"
        label="动车组编号"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="mumame"
        label="动车组名称"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="mutype"
        label="动车组类型"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="muegnum"
        label="引擎数量"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="muparaa"
        label="参数a"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="muparab"
        label="参数b"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="muparac"
        label="参数c"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="slope"
        align="center"
        label="操作"
        min-width="15%">
        <template slot-scope="scope">
            <!-- <el-button type="success" size='mini' @click="addList(scope.row)">添加</el-button> -->
            <!-- <el-button type="warning" size='mini' @click="editList(scope.row)">修改动车</el-button> -->
            <el-button type="danger" size='mini' @click="deleteList(scope.row.id)">删除动车</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button stype="success" style="margin-top: 15px;background-color: #67c23a;color: white" @click="addList">添加动车</el-button>
    <el-dialog title="添加动车组" :visible.sync="dialog" center width="450px">
      <el-form :model="currentList" :rules="rules" ref="currentList">
        <!-- <el-form-item label="动车组编号" :label-width="formLabelWidth" prop="murfhbr">
          <el-input v-model="currentList.murfhbr" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item> -->
        <el-form-item label="动车组名称" :label-width="formLabelWidth" prop="mumame">
          <el-input v-model="currentList.mumame" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="动车组类型" :label-width="formLabelWidth" prop="mutype">
          <el-input v-model="currentList.mutype" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="引擎数量" :label-width="formLabelWidth" prop="muegnum">
          <el-input v-model="currentList.muegnum" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="参数a" :label-width="formLabelWidth" prop="muparaa">
          <el-input v-model="currentList.muparaa" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="参数b" :label-width="formLabelWidth" prop="muparab">
          <el-input v-model="currentList.muparab" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="参数c" :label-width="formLabelWidth" prop="muparac">
          <el-input v-model="currentList.muparac" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="realAddList">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, request } from '@/util/request'
export default {
  components: {},
  data() {
    return {
      oneList: [],
      currentList: {},
      dialog: false,
      formLabelWidth: '110px',
      rules: {
        // murfhbr: { required: true, message: '不能为空', trigger: 'blur' },
        mumame: { required: true, message: '不能为空', trigger: 'blur' },
        mutype: { required: true, message: '不能为空', trigger: 'blur' },
        muegnum: { required: true, message: '不能为空', trigger: 'blur' },
        muparaa: { required: true, message: '不能为空', trigger: 'blur' },
        muparab: { required: true, message: '不能为空', trigger: 'blur' },
        muparac: { required: true, message: '不能为空', trigger: 'blur' },
      }
    };
  },
  mounted() { 
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      getList().then(res => {
        this.oneList = res.data.data[0].Multipleunit || []
      })
    },
    handleClick(tab, event) { },
    addList() {
      this.currentList = {}
      this.dialog = true
    },
    editList(e) {
      this.currentList = e
      this.dialog = true
    },
    realAddList() {
      this.$refs.currentList.validate(val => {
        if (!val) return
        request({
          url: '/wsg/multi',
          method: 'POST',
          data: {
            ...this.currentList
          }
        }).then(res => {
          this.handleGetList()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialog = false
        })
      })
    },
    deleteList(id) {
      this.$confirm('此操作将删除该坡道, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // request({
        //   url: '/wsg/train',
        //   methods: 'POST',
        //   data: {
        //     ...this.currentList
        //   }
        // })
        const index = this.oneList.findIndex(item => item.id == id)
        this.oneList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    }
  },
  beforeDestroy() {}
};
</script>


<style scoped>
.title{
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
}
.title::before{
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #409eff;
  margin-right: 8px;
  vertical-align: middle;
}
</style>