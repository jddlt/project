<template>
  <div>
    <div class="contain">
      <div class="input-block">
        <div class="title">基础资料</div>
        <div class="my-input">
          <div><span style="width: 150px; display: inline-block">请选择列车: </span>
            <el-select v-model="car" placeholder="请选择列车" @change="handleChange">
              <el-option
                v-for="item in carList"
                :key="item.tirfnbr"
                :label="item.tmame"
                :value="item.tirfnbr">
              </el-option>
            </el-select>
          </div>
          <div style="margin: 18px 0;"><span style="width: 150px; display: inline-block">列车长度(m): </span>
            {{ currentList.tilength || '-' }}
          </div>
          <div style="margin: 18px 0;"><span style="width: 150px; display: inline-block">列车速度(m): </span>
            {{ currentList.tiaimspeed || '-' }}
          </div>
          <div style="margin: 18px 0;"><span style="width: 150px; display: inline-block">制动响应时间(S): </span>
            {{ currentList.tiaimspeed ? '2' : '-' }}
          </div>
          <div style="margin: 18px 0;"><span style="width: 150px; display: inline-block">牵引切断时间(S): </span>
            {{ currentList.tiaimspeed ? '0.5' : '-' }}
          </div>
        </div>
      </div>
      <div class="input-block">
        <div class="title">区间</div>
        <div class="my-input">
          <div>
            <span style="width: 150px; display: inline-block">安全防护距离(m): </span>
            <el-input v-model="baseInfo2.long" placeholder="请输入列车长度"></el-input>
          </div>
          <div>
            <span style="width: 200px; display: inline-block; margin-top: 30px">区域追踪间隔时间时间(S): </span>
            <span style="color: red">{{ leftNum }}</span>
          </div>
          <div>
            <el-button type="success" style="margin-top: 72px" @click="handleBaseInfo2"> 计算 </el-button>
          </div>
        </div>
      </div>
      <div class="input-block">
        <div class="title">车站</div>
        <div class="my-input">
          <div>
            <span style="width: 150px; display: inline-block">车站停车距离(m): </span>
            <el-input v-model="baseInfo3.stationLength" placeholder="请输入车站停车距离"></el-input>
          </div>
          <div>
            <span style="width: 150px; display: inline-block">保护区距离(m): </span>
            <el-input v-model="baseInfo3.saveLength" placeholder="请输入保护区距离"></el-input>
          </div>
          <div>
            <span style="width: 200px; display: inline-block; margin-top: 30px">车站追踪间隔时间时间(S): </span>
            <span style="color: red">{{ rightNum }}</span>
          </div>
          <div>
            <el-button type="success" style="margin-top: 30px" @click="handleBaseInfo3"> 计算 </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="main-block">
      <div class="title">折返计算</div>
      <div>
        <div class="my-input dd" style="margin-bottom: 20px">
          <label><span>保护区长度 </span><el-input v-model="baseInfo4.a"></el-input></label>
          <label><span>站台长度 </span><el-input v-model="baseInfo4.b"></el-input></label>
          <label><span>渡线长度 </span><el-input v-model="baseInfo4.c"></el-input></label>
          <label><span>折返线长度 </span><el-input v-model="baseInfo4.d"></el-input></label>
          <label style="margin-left: 30px; color: red"><span>折返时间： </span><span>{{ time || '-' }}</span></label>
          <el-button type="success" size="small" style="float: right" @click="handleBaseInfo4">计算</el-button>
        </div>
        <el-table
          :data="computeList"
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
import { request, getList } from '@/util/request'
export default {
  components: {},
  data() {
    return {
      baseInfo: {},
      baseInfo2: {},
      baseInfo3: {},
      currentList: {},
      time: '',
      car: '',
      baseInfo4: {},
      computeList: [],
      carList: [],
      leftNum: '-',
      rightNum: '-'
    };
  },
  mounted() {
    getList().then(res => {
      // this.oneList = res.data.data[0].Traininfo || [],
      this.carList = res.data.data[0].Traininfo || []
      console.log(this.carList);
      
    })
  },
  methods: {
    handleChange(e) {
      const item = this.carList.find(item => item.tirfnbr === e)
      this.currentList = item
    },
    handleBaseInfo2() {
      const { long } = this.baseInfo2
      if (long) {
        request({
          url: `/wsg/section/${long}`
        }).then(res => {
          this.leftNum = res.data.data
        })
      } else{
          this.$message({
            message: '参数不全',
            type: 'error'
          })
      }
    },
    handleBaseInfo3() {
      const { stationLength, saveLength } = this.baseInfo3
      if (stationLength && saveLength) {
        request({
          url: `/wsg/station/${stationLength}/${saveLength}`
        }).then(res => {
          this.rightNum = res.data.data
        })
      } else{
          this.$message({
            message: '参数不全',
            type: 'error'
          })
      }
    },
    handleBaseInfo4() {
      const { a, b, c, d } = this.baseInfo4
      if ( a && b && c && d) {
        this.time = ''
        request({
          url: `/wsg/zhefan/${a}/${b}/${c}/${d}`
        }).then(res => {
          const arr = []
          Object.entries(res.data.data[0]).forEach(item => {
            const [key, value] = item
            if (key !== '折返时间'){
              arr.push({ car: key, time: value })
            } else {
              this.time = value
            }
          })
          this.computeList = arr
          console.log(this.computeList);
        })
      } else{
          this.$message({
            message: '参数不全',
            type: 'error'
          })
      }
    }
  },
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