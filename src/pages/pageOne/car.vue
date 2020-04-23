<template>
  <div style="width: 100%">
    <div class="title">列车列表</div>
    <el-table
      :data="oneList"
      border
      style="width: 100%;">
      <el-table-column
        prop="tirfnbr"
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
        prop="tmame"
        label="列车名称"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="tztype"
        label="列车类型"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="tiweight"
        label="列车重量"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="tilength"
        label="列车长度"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="tidragcount"
        label="列车数量"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="tibedragedcount"
        label="拖车数量"
        align="center"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="tiaimspeed"
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
            <el-button type="danger" size='mini' @click="deleteList(scope.row.tirfnbr)">删除</el-button>
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
        <el-form-item label="列车名称" :label-width="formLabelWidth" prop="tmame">
          <el-input v-model="currentList.tmame" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车类型" :label-width="formLabelWidth" prop="tztype">
          <el-input v-model="currentList.tztype" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车重量" :label-width="formLabelWidth" prop="tiweight">
          <el-input v-model="currentList.tiweight" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车长度" :label-width="formLabelWidth" prop="tilength">
          <el-input v-model="currentList.tilength" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车数量" :label-width="formLabelWidth" prop="tidragcount">
          <el-input v-model="currentList.tidragcount" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拖车数量" :label-width="formLabelWidth" prop="tibedragedcount">
          <el-input v-model="currentList.tibedragedcount" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="列车最大速度" :label-width="formLabelWidth" prop="tiaimspeed">
          <el-input v-model="currentList.tiaimspeed" autocomplete="off" placeholder="请输入"></el-input>
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
        tmame: { required: true, message: '不能为空', trigger: 'blur' },
        tztype: { required: true, message: '不能为空', trigger: 'blur' },
        tilength: { required: true, message: '不能为空', trigger: 'blur' },
        tiweight: { required: true, message: '不能为空', trigger: 'blur' },
        tidragcount: { required: true, message: '不能为空', trigger: 'blur' },
        tibedragedcount: { required: true, message: '不能为空', trigger: 'blur' },
        tiaimspeed: { required: true, message: '不能为空', trigger: 'blur' }
      }
    };
  },
  mounted() { 
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      getList().then(res => {
        this.oneList = res.data.data[0].Traininfo || [],
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
          url: '/wsg/train',
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
      this.$confirm('此操作将删除该列车， 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: `/wsg/deleteByTrain/${id}`,
          data: {}
        }).then(() => {
          this.handleGetList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
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