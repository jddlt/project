<template>
  <div style="width: 100%">
    <div class="title">列车列表</div>
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
        prop="key"
        label="动车组编号"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="name"
        label="列车名称"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="type"
        label="列车类型"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="列车重量"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="long"
        label="列车长度"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="lnumber"
        label="列车数量"
        align="center"
        min-width="15%">
      </el-table-column>t
      <el-table-column
        prop="tnumber"
        label="拖车数量"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="speed"
        label="列车最大速度"
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
    <el-dialog :title="currentList.id ? '编辑路段' : '添加路段'" :visible.sync="dialog" center width="450px">
      <el-form :model="currentList" :rules="rules" ref="currentList">
        <el-form-item label="动车组编号" :label-width="formLabelWidth" prop="key">
          <el-input v-model="currentList.key" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="currentList.name" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车类型" :label-width="formLabelWidth" prop="type">
          <el-input v-model="currentList.type" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车重量" :label-width="formLabelWidth" prop="weight">
          <el-input v-model="currentList.weight" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车长度" :label-width="formLabelWidth" prop="long">
          <el-input v-model="currentList.long" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车数量" :label-width="formLabelWidth" prop="lnumber">
          <el-input v-model="currentList.lnumber" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拖车数量" :label-width="formLabelWidth" prop="tnumber">
          <el-input v-model="currentList.tnumber" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车最大速度" :label-width="formLabelWidth" prop="speed">
          <el-input v-model="currentList.speed" autocomplete="off" placeholder="请输入"></el-input>
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
        { id: 1, key: '4396', name: '盘山公路', type: '和谐号', weight: 20, long: 500, lnumber: 3, tnumber: 5, speed: 120 },
        { id: 2, key: '4396', name: '盘山公路', type: '和谐号', weight: 20, long: 500, lnumber: 3, tnumber: 5, speed: 120 },
        { id: 3, key: '4396', name: '盘山公路', type: '和谐号', weight: 20, long: 500, lnumber: 3, tnumber: 5, speed: 120 },
      ],
      currentList: {},
      dialog: false,
      formLabelWidth: '110px',
      rules: {
        key: { required: true, message: '不能为空', trigger: 'blur' },
        name: { required: true, message: '不能为空', trigger: 'blur' },
        type: { required: true, message: '不能为空', trigger: 'blur' },
        long: { required: true, message: '不能为空', trigger: 'blur' },
        weight: { required: true, message: '不能为空', trigger: 'blur' },
        lnumber: { required: true, message: '不能为空', trigger: 'blur' },
        tnumber: { required: true, message: '不能为空', trigger: 'blur' },
        speed: { required: true, message: '不能为空', trigger: 'blur' }
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