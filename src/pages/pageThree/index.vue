<template>
  <div>
    <div class="header">
      <div class="title">模拟运行</div>
      <div class="my-input">
        <label>
          <span>路段:</span>
          <el-select v-model="baseInfo.car" placeholder="请选择路段"></el-select>
        </label>
        <label>
          <span>列车:</span>
          <el-select v-model="baseInfo.long" placeholder="请选择列车"></el-select>
        </label>
        <label>
          <span>发车间隔(s):</span>
          <el-input v-model="baseInfo.speed" placeholder="请输入发车间隔"></el-input>
        </label>
      </div>
    </div>
    <div class="echart">
      <div class="echart-button" @click="$forceUpdate()">
        <div class="ball" @click="changeOption(0)">
          S(X)-V(Y)
          <br />生成仿真图
        </div>
        <div class="ball" @click="changeOption(1)">
          T(X)-V(Y)
          <br />生成仿真图
        </div>
        <div class="ball" @click="changeOption(2)">
          T(X)-S(Y)
          <br />生成仿真图
        </div>
      </div>
      <div class="echart-show">
        <chart width="500px" ref="chart1" :options="options" :auto-resize="true"></chart>
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
      options: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      }
    };
  },
  methods: {
    changeOption(num) {
      if (num == 0) {
        this.options = {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true
            }
          ]
        };
      } else if (num == 1) {
        this.options = {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)"
              }
            }
          ]
        };
      } else {
        this.options = {
          backgroundColor: "#2c343c",

          title: {
            text: "Customized Pie",
            left: "center",
            top: 20,
            textStyle: {
              color: "#ccc"
            }
          },

          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 274, name: "联盟广告" },
                { value: 235, name: "视频广告" },
                { value: 400, name: "搜索引擎" }
              ].sort(function(a, b) {
                return a.value - b.value;
              }),
              roseType: "radius",
              label: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              labelLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },

              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
      }
    }
  },
  beforeDestroy() {}
};
</script>


<style scoped>
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