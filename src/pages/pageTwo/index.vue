<template>
  <div>
    <div class="contain">
      <div class="input-block">
        <div class="title">基础资料</div>
        <div class="my-input">
          <div><span style="width: 150px; display: inline-block">列车: </span><el-input v-model="baseInfo.car" placeholder="请选择列车"></el-input></div>
          <div><span style="width: 150px; display: inline-block">列车长度(m): </span><el-input v-model="baseInfo.long" placeholder="请输入列车长度"></el-input></div>
          <div><span style="width: 150px; display: inline-block">列车速度(m): </span><el-input v-model="baseInfo.speed" placeholder="请输入列车速度"></el-input></div>
          <div><span style="width: 150px; display: inline-block">制动响应时间(S): </span><el-input v-model="baseInfo.stoptime" placeholder="请输入制动响应时间"></el-input></div>
          <div><span style="width: 150px; display: inline-block">牵引切断时间(S): </span><el-input v-model="baseInfo.slicetime" placeholder="请输入牵引切断时间"></el-input></div>
        </div>
      </div>
      <div class="input-block">
        <div class="title">区间</div>
        <div class="my-input">
          <div>
            <span style="width: 150px; display: inline-block">安全防护距离(m): </span>
            <el-input v-model="baseInfo.long" placeholder="请输入列车长度"></el-input>
          </div>
          <div>
            <span style="width: 200px; display: inline-block; margin-top: 30px">区域追踪间隔时间时间(S): </span>
            <span style="color: red">{{ leftNum }}</span>
          </div>
          <div>
            <el-button type="success" style="margin-top: 72px" @click="leftNum = (Math.random() * 100).toFixed(1)"> 计算 </el-button>
          </div>
        </div>
      </div>
      <div class="input-block">
        <div class="title">车站</div>
        <div class="my-input">
          <div>
            <span style="width: 150px; display: inline-block">车站停车距离(m): </span>
            <el-input v-model="baseInfo.long" placeholder="请输入列车长度"></el-input>
          </div>
          <div>
            <span style="width: 150px; display: inline-block">保护区距离(m): </span>
            <el-input v-model="baseInfo.long" placeholder="请输入列车长度"></el-input>
          </div>
          <div>
            <span style="width: 200px; display: inline-block; margin-top: 30px">车站追踪间隔时间时间(S): </span>
            <span style="color: red">{{ rightNum }}</span>
          </div>
          <div>
            <el-button type="success" style="margin-top: 30px" @click="rightNum = (Math.random() * 200).toFixed(1)"> 计算 </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="main-block">
      <div class="title">折返计算</div>
      <div>
        <div class="my-input dd" style="margin-bottom: 20px">
          <label><span>保护区长度 </span><el-input v-model="baseInfo.car"></el-input></label>
          <label><span>站台长度 </span><el-input v-model="baseInfo.long"></el-input></label>
          <label><span>渡线长度 </span><el-input v-model="baseInfo.speed"></el-input></label>
          <label><span>折返线长度 </span><el-input v-model="baseInfo.stoptime"></el-input></label>
          <el-button type="success" size="small" style="float: right">计算</el-button>
        </div>
        <el-table
          :data="twoList"
          border
          style="width: 100%;">
          <el-table-column
            prop="car"
            label="列车1"
            align="center"
            min-width="12.5%">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            align="center"
            min-width="12.5%">
          </el-table-column>
          <el-table-column
            prop="car"
            label="列车2"
            align="center"
            min-width="12.5%">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            min-width="12.5%"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="car"
            align="center"
            label="列车3"
            min-width="12.5%">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="时间"
            min-width="12.5%">
          </el-table-column>
          <el-table-column
            prop="car"
            align="center"
            label="列车4"
            min-width="12.5%">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="时间"
            min-width="12.5%">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      baseInfo: {},
      twoList: [
        { car: 't10', time: 20.5 },
        { car: 't20', time: 23.4 },
        { car: 't30', time: 34.6 },
      ],
      leftNum: (Math.random() * 100).toFixed(1),
      rightNum: (Math.random() * 200).toFixed(1)
    };
  },
  methods: {},
  beforeDestroy() {}
};
</script>


<style scoped>
/deep/.el-input{
  width: 300px;
}
/deep/.dd>label .el-input{
  width: 120px;
  height: 30px;
}
/deep/.dd>label .el-input__inner{
  height: 30px;
}
.dd>label{
  margin-right: 8px;
}
.my-input>div{
  margin-bottom: 4px;
}
.input-block{
  background-color: #eaeaea;
  padding: 35px;
  border-radius: 15px;
}
.main-block{
  width: 100%;
  margin-top: 25px;
  background-color: #eaeaea;
  padding: 32px;
  border-radius: 10px;
  box-sizing: border-box;
}
.contain{
  display: flex;
  justify-content: space-between;
}
.container>div{
  flex: 1;
}
.title{
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
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