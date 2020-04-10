<el-dialog title="添加管理员" :visible.sync="dialogFormVisible" center width="400px">
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="账号" :label-width="formLabelWidth" prop="name">
      <el-input v-model="form.name" autocomplete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="psd">
      <el-input v-model="form.psd" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addAdmin">添 加</el-button>
  </div>
</el-dialog>