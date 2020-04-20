<template>
  <div style="width: 100%">
    <div class="title">路段列表</div>
    <el-table
      :data="oneList"
      border
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID号"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="name"
        label="路段名称"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="路段描述"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="slope"
        align="center"
        label="操作"
        min-width="25%">
        <template slot-scope="scope">
            <!-- <el-button type="success" size='mini' @click="addList(scope.row)">添加</el-button> -->
            <el-button type="warning" size='mini' @click="editList(scope.row)">修改路段</el-button>
            <el-button type="danger" size='mini' @click="deleteList(scope.row.id)">删除路段</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button stype="success" style="margin-top: 15px;background-color: #67c23a;color: white" @click="addList">添加路段</el-button>
    <el-dialog :title="currentList.id ? '编辑路段' : '添加路段'" :visible.sync="dialog" center width="450px">
      <el-form :model="currentList" :rules="rules" ref="currentList">
        <el-form-item label="路段名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="currentList.name" autocomplete="off" placeholder="请输入路段名称"></el-input>
        </el-form-item>
        <el-form-item label="路段描述" :label-width="formLabelWidth" prop="detail">
          <el-input v-model="currentList.detail" autocomplete="off" placeholder="请输入路段描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button v-if="!currentList.id" type="primary" @click="realAddList">添 加</el-button>
        <el-button v-else type="primary" @click="realEditList">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      oneList: [
        { id: 1, name: '盘山公路', detail: '好弯啊!!' },
        { id: 1, name: '盘山公路', detail: '好弯啊!!' },
        { id: 1, name: '盘山公路', detail: '好弯啊!!' }
      ],
      currentList: {},
      dialog: false,
      formLabelWidth: '110px',
      rules: {
        name: { required: true, message: '请输入路段名', trigger: 'blur' },
        detail: { required: true, message: '请输入路段描述', trigger: 'blur' }
      }
    };
  },
  mounted() { },
  methods: {
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
        this.currentList = {
          ...this.currentList,
          id: Date.now()
        }
        this.oneList.push(this.currentList)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialog = false
      })
    },
    realEditList() {
      this.$refs.currentList.validate(val => {
        if (!val) return
        const index = this.oneList.findIndex(item => item.id == this.currentList.id)
        this.oneList.splice(index, 1, this.currentList)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.dialog = false
      })
    },
    deleteList(id) {
      this.$confirm('此操作将删除该坡道, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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