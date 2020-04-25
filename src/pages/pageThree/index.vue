<template>
  <div>
    <div class="header">
      <div class="title">模拟运行</div>
      <div class="my-input">
        <label v-if="!type">
          <span>前车速度:</span>
          <el-input v-model="baseInfo.before" placeholder="请输入前车速度"></el-input>
        </label>
        <label v-if="!type && baseInfo.before">
          <span>后车速度:</span>
          <el-input v-model="baseInfo.after" placeholder="请输入后车速度"></el-input>
        </label>
        <label>
          <el-button v-if="!type" type="primary" @click="startRun">开始</el-button>
          <el-button v-else-if="type == 1" type="primary" @click="startRun1">开始</el-button>
          <el-button v-else-if="type == 3" type="primary" @click="startRun3">开始</el-button>
          <el-button v-else type="primary" @click="startRun2">开始</el-button>
        </label>
        <label>
          <el-button type="primary" @click="reset">复原</el-button>
        </label>
        <label v-if="type != 3">
          <el-button type="warning" @click="type3">前车突然停车</el-button>
        </label>
        <label v-if="type != 1">
          <el-button type="warning" @click="type1">车站追踪</el-button>
        </label>
        <label v-if="type != 2">
          <el-button type="warning" @click="type2">折返追踪</el-button>
        </label>
        <label>
          <el-button type="info" @click="type = null" style="margin: 17px 0 0 0">返回</el-button>
        </label>
      </div>
    </div>
    <div v-if="type != 2" class="road" ref='road'>
      <div v-if="type == 1" class="pot1">1</div>
      <div v-if="type == 1" class="pot2">2</div>
      <div v-if="type == 1" class="station">车站</div>
      <div class="car car1" :style="car1">前车</div>
      <div class="car car2" :style="car2">后车</div>
    </div>
    <div v-else class="road2" >
      <div class="line">
        <div class="h">H</div>
        <div class="g">G</div>
        <div class="f">F</div>
      </div>
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3">
        <div class="d">D</div>
        <div class="d2">D`</div>
      </div>
      <div class="line4">
        <div class="e">E</div>
        <div class="e2">E`</div>
      </div>
      <div class="line5"></div>
      <div class="line6"></div>
      <div class="a">A</div>
      <div class="b">B</div>
      <div class="c">C</div>
      <!-- <div class="line2"></div> -->
      <div class="car car1" :style="car1">前车</div>
      <div class="car car2" :style="car2">后车</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      baseInfo: {},
      car1: { left: '300px', bottom: '15px' },
      car2: { left: '0', bottom: '15px' },
      roadWidth: 1000,
      type: 0
    };
  },
  watch: {
    baseInfo: {
      handler(val) {
        if(!val.before) {
          this.baseInfo.after = ''
        } else {
          this.baseInfo = val
        }
      },
      deep: true
    }
  },
  methods: {
    type1() {
      this.type = 1
      this.car1.left = '650px'
      this.reset()
    },
    type2() {
      this.type = 2
      this.car1.left = 0.4 * this.roadWidth + 'px'
      this.reset()
    },
    type3() {
      this.type = 3
      this.car1.left = '300px'
      this.reset()
    },
    startRun3() {
      clearInterval(this.timer4)
      const style1 = this.car1
      const style2 = this.car2
      let speed1 = 5
      let speed2 = 5
      style1.left = '300px'
      style2.left = '0'
      this.timer4 = setInterval(() => {
        if (parseFloat(style1.left) >= 850) {
          if (speed2 <= 0) {
            speed2 = 0
            clearInterval(this.timer4)
          } else {
            style1.left = '850px'
            speed2 -= 0.1
          }
        } else {
          style1.left = parseFloat(style1.left) + speed1 + 'px'
        }
        style2.left = parseFloat(style2.left) + speed2 + 'px'
      }, 20)
    },
    startRun() {
      const { before: v1, after: v2 } = this.baseInfo
      if ((!v1 && !v2) || (v1 && !/^\d+$/.test(v1)) || (v2 && !/^\d+$/.test(v2))) { this.$message({ message: '请输入小车速度(数字类型)', type: 'warning' }); return }
      clearInterval(this.timer)
      this.car1.left = '300px'; 
      this.car2.left = '0'
      const baseSpeed = 5
      let car1Speed = 5
      let car2Speed = 5
      if (v1 && !v2) {
        this.timer = setInterval(() => {
          if (parseInt(this.car1.left) >= this.roadWidth - 100) { 
            clearInterval(this.timer) 
          } else {
            this.car1.left = parseInt(this.car1.left) + car1Speed + 'px'
          }
        }, 20)
      } else if (v2 && !v1) {
        this.timer = setInterval(() => {
          if (parseInt(this.car2.left) >= this.roadWidth - 100) { 
            clearInterval(this.timer) 
          } else {
            this.car2.left = parseInt(this.car2.left) + car2Speed + 'px'
          }
        }, 20)
      } else {
        if (v1 > v2) { car1Speed += 3 } else if (v1 < v2) { car2Speed += 3 }
        this.timer = setInterval(() => {
          if ((car2Speed).toFixed(1) > 5) { car2Speed -= 0.05 }
          this.car1.left = (parseInt(this.car1.left) + car1Speed) + 'px'
          this.car2.left = (parseInt(this.car2.left) + car2Speed) + 'px'
          if(parseInt(this.car1.left) > this.roadWidth - 100 || parseInt(this.car2.left) > this.roadWidth - 100) { clearInterval(this.timer) }
        }, 20)
      }
    },
    startRun1() {
      clearInterval(this.timer)
      this.car1.left = '650px'; 
      this.car2.left = '0'
      const baseSpeed = 5
      let car1Speed = 3
      let car2Speed = 3
      this.timer = setInterval(() => {
        if ( parseInt(this.car2.left) >= 650 ) { this.car2.left = '650px' } else {
          this.car2.left = (parseInt(this.car2.left) + car2Speed) + 'px'
        }
        if(parseInt(this.car2.left) > 200) {
          car2Speed -= 0.01
        }
        if ( parseInt(this.car2.left) > 300 ) {
          this.car1.left = (parseInt(this.car1.left) + car1Speed) + 'px'
          if ( parseInt(this.car1.left) > 900 ) { car2Speed = 3 }
        }
        if(parseInt(this.car1.left) > this.roadWidth - 100 || parseInt(this.car2.left) > this.roadWidth - 100) { clearInterval(this.timer) }
      }, 20)
    },
    startRun2() {
      clearInterval(this.timer)
      this.car1.left = 0.4 * this.roadWidth + 'px'
      this.car2.left = '0'
      const style1 = this.car1
      const style2 = this.car2
      let speed1 = 6
      let speed2 = 3
      this.timer = setInterval(() => {
        // car2
        if (parseInt(style2.left) >= (this.roadWidth/2 - 100)) { 
          style2.left = (this.roadWidth / 2 - 100) + 'px'
          clearInterval(this.timer)
          this.runNext()
        } else {
          style2.left = parseInt(style2.left) + speed2 + 'px'
        } 

        // car1
        if (parseInt(style1.left) >= (this.roadWidth/2 - 80)) {
          if (parseInt(style1.left) > 0.5*this.roadWidth + 130) {
            if (parseInt(style1.left) >= this.roadWidth - 100) {
              style1.left = this.roadWidth - 100 + 'px'
            } else {
              style1.transform = 'rotate(0)'
              style1.left = parseInt(style1.left) + speed1 + 'px'
              style1.bottom = '213px'
            }
          } else {
            style1.left = parseInt(style1.left) + speed1 / 1.5 + 'px'
            style1.bottom = parseInt(style1.bottom) + speed1 / 1.5 + 'px'
            style1.transform = 'rotate(-45deg)'
          }
        } else {
          style1.left = parseInt(style1.left) + speed1 + 'px'
        }
      }, 20) 
    },
    runNext() {
      clearInterval(this.timer2)
      const style1 = this.car1
      const style2 = this.car2
      let speed1 = 5
      let speed2 = 5
      this.timer2 = setInterval(() => {
        // car1
        if (parseInt(style1.left) <= (this.roadWidth/2 + 178)) {
          if (parseInt(style1.left) <= (this.roadWidth/2)) {
            if (parseInt(style1.left) <= 0 ) {
              style1.left = 0
            } else {
              style1.transform = 'rotate(0)'
              style1.left = parseInt(style1.left) - speed1 + 'px'
              style1.bottom = '315px'
            }
          } else {
            style1.left = parseInt(style1.left) - speed1 / 1.5 + 'px'
            style1.bottom = parseFloat(style1.bottom) + speed1 / 2.7 + 'px'
            style1.transform = 'rotate(27deg)'
          }
        } else {
          style1.left = parseInt(style1.left) - speed1 + 'px'
        }

        //car2
        if (parseInt(style2.left) > (0.5*this.roadWidth + 130)) {
          if (parseInt(style2.left) >= this.roadWidth - 100) {
            style2.left = this.roadWidth - 100 + 'px'
            clearInterval(this.timer2)
            this.nextRun()
          } else {
            style2.transform = 'rotate(0)'
            style2.left = parseInt(style2.left) + speed2 + 'px'
            style2.bottom = '118px'
          }
        } else {
          if (parseInt(style2.left) > (0.5*this.roadWidth - 75)) {
            style2.transform = 'rotate(-27deg)'
            style2.left = parseInt(style2.left) + speed2 / 1.5 + 'px'
            style2.bottom = parseFloat(style2.bottom) + speed2 / 3.1 + 'px'
            console.log(style2);
          } else {
            style2.left = parseInt(style2.left) + speed2 + 'px'
          }
        }
      }, 20)
    },
    nextRun() {
      clearInterval(this.timer3)
      const style2 = this.car2
      const style1 = this.car1
      let speed2 = 5
      let speed1 = 5
      this.timer3 = setInterval(() => {
        //car1 
        if (parseInt(style1.left) <= 0) {
          style1.left = 0
        } else {
          style1.left = parseInt(style1.left) - speed1 + 'px'
        }

        // car2
        if (parseInt(style2.left) <= (this.roadWidth/2 + 178)) {
          if (parseInt(style2.left) <= (this.roadWidth/2 - 10)) {
            if (parseInt(style2.left) <= 0 ) {
              style2.left = 0
              clearInterval(this.timer3)
            } else {
              style2.transform = 'rotate(0)'
              style2.left = parseInt(style2.left) - speed2 + 'px'
              style2.bottom = '315px'
            }
          } else {
            style2.left = parseInt(style2.left) - speed2 / 3 + 'px'
            style2.bottom = parseFloat(style2.bottom) + speed2 / 2.35 + 'px'
            style2.transform = 'rotate(44deg)'
          }
        } else {
          style2.left = parseInt(style2.left) - speed2 + 'px'
        }
      }, 20)
    },
    reset() {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      clearInterval(this.timer3)
      clearInterval(this.timer4)
      this.car1.left = this.type == 1 ? '650px' : this.type == 2 ? '40%' : '300px'
      this.car2.left = '0'
      this.car1.bottom = '15px'
      this.car2.bottom = '15px'
      this.car1.transform = 'rotate(0)'
      this.car2.transform = 'rotate(0)'
    }
  },
  mounted() {
    this.roadWidth = this.$refs.road.offsetWidth
  },
  beforeDestroy() {}
};
</script>


<style scoped>
.a{
  position: absolute;
  bottom: -30px;
  left: 0;
  font-size: 20px;
}
.b{
  position: absolute;
  bottom: -30px;
  left: 25%;
  font-size: 20px;
}
.c{
  position: absolute;
  bottom: -30px;
  left: 50%;
  font-size: 20px;
}
.h{
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 20px;
}
.g{
  position: absolute;
  top: -30px;
  left: 25%;
  font-size: 20px;
}
.f{
  position: absolute;
  top: -30px;
  left: 50%;
  font-size: 20px;
}
.road2{
  margin-top: 100px;
  width: 100%;
  height: 350px;
  position: relative;
  border-bottom: 1px solid #000;
}
.line{
  width: 100%;
  height: 1px;
  background-color: #000;
  position: absolute;
  left: 0;
  top: 50px;
}
.line1{
  width: 280px;
  height: 1px;
  background-color: #000;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform-origin: left;
  transform: rotate(-45deg)
}
.line2{
  width: 280px;
  height: 1px;
  background-color: #000;
  position: absolute;
  top: 50px;
  left: 50%;
  transform-origin: left;
  transform: rotate(45deg)
}
.line3{
  width: calc(50% - 198px);
  height: 1px;
  background-color: #000;
  position: absolute;
  bottom: 198px;
  left: calc(50% + 198px);
}
.line4{
  width: calc(50% - 198px);
  height: 1px;
  background-color: #000;
  position: absolute;
  top: 248px;
  left: calc(50% + 198px);
}
.line5{
  width: 223px;
  height: 1px;
  background-color: #000;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform-origin: left;
  transform: rotate(-27deg)
}
.d{
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 20px;
}
.d2{
  position: absolute;
  top: -30px;
  right: 0;
  font-size: 20px;
}
.e{
  position: absolute;
  bottom: -30px;
  left: 0;
  font-size: 20px;
}
.e2{
  position: absolute;
  bottom: -30px;
  right: 0;
  font-size: 20px;
}
.line6{
  width: 223px;
  height: 1px;
  background-color: #000;
  position: absolute;
  top: 50px;
  left: 50%;
  transform-origin: left;
  transform: rotate(27deg)
}




.road{
  width: 100%;
  height: 30px;
  margin-top: 200px;
  border-bottom: 1px solid #000;
  position: relative;
}
.pot1{
  position: absolute;
  bottom: -30px;
  left: 500px;
  font-size: 20px;
}
.pot2{
  position: absolute;
  bottom: -30px;
  left: 900px;
  font-size: 20px;
}
.car{
  width: 100px;
  height: 60px;
  position: absolute;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.station{
  width: 60px;
  height: 40px;
  position: absolute;
  bottom: -50px;
  left: 670px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 183, 255);
  color: #fff;
  font-weight: bold;
}
.car::before{
  content: '';
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  left: 10px;
  bottom: -15px;
  background-color: rgb(0, 183, 255);
}
.car::after{
  content: '';
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  right: 10px;
  bottom: -15px;
  background-color: rgb(0, 183, 255);
}
.car1{
  left: 300px;
  border: 1px solid rgb(0, 183, 255);
}
.car2{
  left: 0;
  border: 1px solid rgb(204, 0, 255);
}
.car2::before,
.car2::after{
  background-color: rgb(204, 0, 255);
}


.my-input > label {
  margin-right: 20px;
}
canvas {
  width: 800px;
  height: 500px;
}
.ball {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  /* background-color: #67c23a;
  border: 4px solid #7ef045; */
  margin: 30px 0 15px 0;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  text-align: center;
  color: #409eff;
  background: #ecf5ff;
  border: 2px solid #b3d8ff;
  padding: 15px;
  box-sizing: border-box;
}
.ball:hover {
  background-color: #409eff;
  color: #fff;
  letter-spacing: 1px;
}
.echart-button {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.echart-show {
  flex: 1;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.header {
  width: 100%;
  background-color: #eee;
  padding: 32px;
  border-radius: 10px;
  box-sizing: border-box;
}
.echart {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}
.title::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #409eff;
  margin-right: 8px;
  vertical-align: middle;
}
/deep/.el-input {
  width: 300px;
}
</style>