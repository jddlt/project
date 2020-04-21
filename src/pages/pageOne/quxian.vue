<template>
  <div style="width: 100%">
    <div class="title">曲线列表</div>
    <el-table
      :data="oneList"
      border
      style="width: 100%;">
      <el-table-column
        prop="slrfnbr"
        label="ID号"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="murfhbr"
        label="所属动车组"
        align="center"
        min-width="15%">
        <template slot-scope="scope">
          {{ (carsList.find(item => item.murfhbr == scope.row.murfhbr) || {}).muname || '--' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="slvoltageno"
        label="电压编号"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="slspeed"
        label="速度"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="slpower"
        label="力"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="sltype"
        label="类型"
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
    <el-dialog :title="currentList.id ? '编辑路段' : '添加列车'" :visible.sync="dialog" center width="450px">
      <el-form :model="currentList" :rules="rules" ref="currentList">
        <el-form-item label="所属动车组" :label-width="formLabelWidth" prop="murfhbr">
          <el-select v-model="currentList.murfhbr" placeholder="请选择">
            <el-option
              v-for="item in carsList"
              :key="item.murfhbr"
              :label="item.muname"
              :value="item.murfhbr">
            </el-option>
          </el-select>
          <!-- <el-input v-model="currentList.murfhbr" autocomplete="off" placeholder="请输入"></el-input> -->
        </el-form-item>
        <el-form-item label="电压编号" :label-width="formLabelWidth" prop="slvoltageno">
          <el-input v-model="currentList.slvoltageno" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="速度" :label-width="formLabelWidth" prop="slspeed">
          <el-input v-model="currentList.slspeed" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="力" :label-width="formLabelWidth" prop="slpower">
          <el-input v-model="currentList.slpower" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="sltype">
          <el-input v-model="currentList.sltype" autocomplete="off" placeholder="请输入"></el-input>
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
      carsList: [],
      currentList: {},
      dialog: false,
      formLabelWidth: '110px',
      rules: {
        murfhbr: { required: true, message: '不能为空', trigger: 'blur' },
        slvoltageno: { required: true, message: '不能为空', trigger: 'blur' },
        slspeed: { required: true, message: '不能为空', trigger: 'blur' },
        slpower: { required: true, message: '不能为空', trigger: 'blur' },
        sltype: { required: true, message: '不能为空', trigger: 'blur' },
      }
    };
  },
  mounted() { 
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      getList().then(res => {
        this.oneList = res.data.data[0].Specialine || [],
        this.carsList = res.data.data[0].Multipleunit || []
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
          url: '/wsg/spline',
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

        // this.currentList = {
        //   ...this.currentList,
        //   id: Date.now()
        // }
        // this.oneList.push(this.currentList)
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
/deep/.el-select{
  width: 100%;
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