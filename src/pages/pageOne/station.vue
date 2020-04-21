<template>
  <div style="width: 100%">
    <div class="title">车站列表</div>
    <el-table
        :data="oneList"
        border
        style="width: 100%;">
        <el-table-column
        prop="tsrfhbr"
        label="ID号"
        align="center"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="sgrfnbr"
        label="所属路段"
        align="center"
        min-width="15%">
          <template slot-scope="scope">
            {{ (roadList.find(item => item.sgrfnbr == scope.row.sgrfnbr) || {}).sgname || '--' }}
          </template>
        </el-table-column>
        <el-table-column
        prop="tsname"
        label="车站名称"
        align="center"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="tsposition"
        align="center"
        min-width="15%"
        label="车站中心位胃">
        </el-table-column>
        <el-table-column
        prop="tsstoptime"
        align="center"
        label="停站时间"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="tstype"
        align="center"
        label="类型D/M/E"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="slope"
        align="center"
        label="操作"
        min-width="25%">
        <template slot-scope="scope">
            <!-- <el-button type="success" size='mini' @click="addList(scope.row)">添加</el-button> -->
            <!-- <el-button type="warning" size='mini' @click="editList(scope.row)">修改坡道</el-button> -->
            <el-button type="danger" size='mini' @click="deleteList(scope.row.id)">删除坡道</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-button stype="success" style="margin-top: 15px;background-color: #67c23a;color: white" @click="addList">添加坡道</el-button>
    <el-dialog :title="currentList.id ? '编辑坡道' : '添加坡道'" :visible.sync="dialog" center width="450px">
      <el-form :model="currentList" :rules="rules" ref="currentList">
        <el-form-item label="所属路段" :label-width="formLabelWidth" prop="sgrfnbr">
          <el-select v-model="currentList.sgrfnbr" placeholder="请选择">
            <el-option
              v-for="item in roadList"
              :key="item.sgrfnbr"
              :label="item.sgname"
              :value="item.sgrfnbr">
            </el-option>
          </el-select>
          <!-- <el-input v-if="!currentList.id" v-model="currentList.road" autocomplete="off" placeholder="请输入所属路段"></el-input>
          <span v-else>{{ currentList.road }}</span> -->
        </el-form-item>
        <el-form-item label="车站名称" :label-width="formLabelWidth" prop="tsname">
          <el-input v-model="currentList.tsname" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="车站中心位胃" :label-width="formLabelWidth" prop="tsposition">
          <el-input v-model="currentList.tsposition" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="停站时间" :label-width="formLabelWidth" prop="tsstoptime">
          <el-input v-model="currentList.tsstoptime" autocomplete="off" placeholder="请输入坡度"></el-input>
        </el-form-item> 
        <el-form-item label="类型D/M/E" :label-width="formLabelWidth" prop="tstype">
          <el-radio-group v-model="currentList.tstype">
            <el-radio label="D"> D </el-radio>
            <el-radio label="M"> M </el-radio>
            <el-radio label="E"> E </el-radio>
          </el-radio-group>
          <!-- <el-input v-model="currentList.tstype" autocomplete="off" placeholder="请输入坡度"></el-input> -->
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
      roadList: [],
      currentList: {},
      dialog: false,
      formLabelWidth: '110px',
      rules: {
        // tsname: { required: true, message: '不能为空', trigger: 'blur' },
        sgrfnbr: { required: true, message: '不能为空', trigger: 'blur' },
        tsposition: { required: true, message: '不能为空', trigger: 'blur' },
        tsname: { required: true, message: '不能为空', trigger: 'blur' },
        tsstoptime: { required: true, message: '不能为空', trigger: 'blur' },
        tstype: { required: true, message: '不能为空', trigger: 'blur' },
      }
    };
  },
  mounted() {
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      getList().then(res => {
        this.oneList = res.data.data[0].Trainstation || []
        this.roadList = res.data.data[0].Sectiongeneral || []
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
          url: '/wsg/station',
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