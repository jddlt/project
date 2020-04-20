<template>
  <div style="width: 100%">
    <div class="title">车站列表</div>
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
        prop="road"
        label="所属路段"
        align="center"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="start"
        label="起始路线(Km)"
        align="center"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="long"
        align="center"
        min-width="15%"
        label="长度(Km)">
        </el-table-column>
        <el-table-column
        prop="slope"
        align="center"
        label="坡度(%)"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="slope"
        align="center"
        label="操作"
        min-width="25%">
        <template slot-scope="scope">
            <!-- <el-button type="success" size='mini' @click="addList(scope.row)">添加</el-button> -->
            <el-button type="warning" size='mini' @click="editList(scope.row)">修改坡道</el-button>
            <el-button type="danger" size='mini' @click="deleteList(scope.row.id)">删除坡道</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-button stype="success" style="margin-top: 15px;background-color: #67c23a;color: white" @click="addList">添加坡道</el-button>
    <el-dialog :title="currentList.id ? '编辑坡道' : '添加坡道'" :visible.sync="dialog" center width="450px">
      <el-form :model="currentList" :rules="rules" ref="currentList">
        <el-form-item label="所属路段" :label-width="formLabelWidth" :prop="currentList.id ? '' : 'road'">
          <el-input v-if="!currentList.id" v-model="currentList.road" autocomplete="off" placeholder="请输入所属路段"></el-input>
          <span v-else>{{ currentList.road }}</span>
        </el-form-item>
        <el-form-item label="起始位置(Km)" :label-width="formLabelWidth" prop="start">
          <el-input v-model="currentList.start" autocomplete="off" placeholder="请输入起始位置"></el-input>
        </el-form-item>
        <el-form-item label="长度(Km)" :label-width="formLabelWidth" prop="long">
          <el-input v-model="currentList.long" autocomplete="off" placeholder="请输入长度"></el-input>
        </el-form-item>
        <el-form-item label="坡度(%)" :label-width="formLabelWidth" prop="slope">
          <el-input v-model="currentList.slope" autocomplete="off" placeholder="请输入坡度"></el-input>
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
      oneList: [],
      currentList: {},
      dialog: false,
      formLabelWidth: '110px',
      rules: {
        start: { required: true, message: '请输入起始位置', trigger: 'blur' },
        road: { required: true, message: '请输入所属路段', trigger: 'blur' },
        long: { required: true, message: '请输入长度', trigger: 'blur' },
        slope: { required: true, message: '请输入坡度', trigger: 'blur' },
      }
    };
  },
  mounted() {
    const onelist = localStorage.getItem('oneList')
    if(onelist && JSON.parse(onelist).length) {
      this.oneList = JSON.parse(onelist)
    } else {
      const list = [
        {id: 1, road: '测试路段', start: '0.55', long: '0.125', slope: '20'},
        {id: 2, road: '测试路段', start: '0.4', long: '0.0', slope: '50'},
        {id: 3, road: '测试路段', start: '0.0', long: '0.2', slope: '6'},
        {id: 4, road: '测试路段', start: '0.6', long: '0.125', slope: '-5'}
      ]
      localStorage.setItem('oneList',JSON.stringify(list))
      this.oneList = list
    }
  },
  methods: {
    handleClick(tab, event) { },
    syncList(flag = false) { 
      localStorage.setItem('oneList',JSON.stringify(this.oneList))
      if (flag) {
        const deleteNum = localStorage.getItem('deleteNum')
        if (deleteNum) {
          localStorage.setItem('deleteNum', Number(deleteNum) + 1)
        } else {
          localStorage.setItem('deleteNum', 1)
        }
      }
    },
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
          id: this.oneList.length + 1 + Number((localStorage.getItem('deleteNum') || 0))
        }
        this.oneList.push(this.currentList)
        this.syncList()
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
        this.syncList()
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
        this.syncList(true)
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