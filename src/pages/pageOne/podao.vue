<template>
  <div style="width: 100%">
    <div class="title">坡道列表</div>
    <el-table
        :data="oneList"
        border
        style="width: 100%;">
        <el-table-column
        prop="lfrfnbr"
        label="ID号"
        align="center"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="sgrfnbr"
        label="所属线路"
        align="center"
        min-width="15%">
          <template slot-scope="scope">
            {{ (roadList.find(item => item.sgrfnbr == scope.row.sgrfnbr) || {}).sgname || '--' }}
          </template>
        </el-table-column>
        <el-table-column
        prop="ifposition"
        label="地形起始化置"
        align="center"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="ittype"
        label="地彤类型(amp/curvel)"
        align="center"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="flenlgth"
        align="center"
        min-width="15%"
        label="长度">
        </el-table-column>
        <el-table-column
        prop="ifgradient"
        align="center"
        label="坡度"
        min-width="15%">
        </el-table-column>
        <el-table-column
        prop="lfradius"
        align="center"
        label="半径"
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
        <el-form-item label="地形起始化置" :label-width="formLabelWidth" prop="ifposition">
          <el-input v-model="currentList.ifposition" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="地彤类型" :label-width="formLabelWidth" prop="ittype">
          <el-radio-group v-model="currentList.ittype">
            <el-radio-button label="amp"> amp </el-radio-button>
            <el-radio-button label="curvel"> curvel </el-radio-button>
          </el-radio-group>
          <!-- <el-input v-model="currentList.tstype" autocomplete="off" placeholder="请输入坡度"></el-input> -->
        </el-form-item>
        <el-form-item label="长度" :label-width="formLabelWidth" prop="flenlgth">
          <el-input v-model="currentList.flenlgth" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="坡度" :label-width="formLabelWidth" prop="ifgradient">
          <el-input v-model="currentList.ifgradient" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item> 
        <el-form-item label="半径" :label-width="formLabelWidth" prop="lfradius">
          <el-input v-model="currentList.lfradius" autocomplete="off" placeholder="请输入"></el-input>
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
        ifposition: { required: true, message: '不能为空', trigger: 'blur' },
        ittype: { required: true, message: '不能为空', trigger: 'blur' },
        flenlgth: { required: true, message: '不能为空', trigger: 'blur' },
        ifgradient: { required: true, message: '不能为空', trigger: 'blur' },
        lfradius: { required: true, message: '不能为空', trigger: 'blur' },
      }
    };
  },
  mounted() {
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      getList().then(res => {
        this.oneList = res.data.data[0].Landform || []
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
          url: '/wsg/land',
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