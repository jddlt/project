<template>
  <div class="main">
    <header class="head">移动闭塞原理的列车追踪运行仿真</header>
    <div id="app" class="page">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="width: 200px"
        @select="changeTaber"
      >
        <el-menu-item index="1">
          <i class="el-icon-document-remove"></i>
          <span slot="title">基础数据模块</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-user-solid"></i>
          <span slot="title">追踪间隔时间的计算</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-user-solid"></i>
          <span slot="title">列车运行仿真</span>
        </el-menu-item>
      </el-menu>
      <div class="container adad" v-if="activeIndex == 1">
        <page-one></page-one>
      </div>
      <div class="container" v-else-if="activeIndex == 2">
        <page-two></page-two>
      </div>
      <div class="container" v-else-if="activeIndex == 3">
        <page-three></page-three>
      </div>
    </div>
  </div>
</template>

<script>
import pageOne from '@/pages/pageOne'
import pageTwo from '@/pages/pageTwo'
import pageThree from '@/pages/pageThree'

export default {
  components: { pageOne, pageTwo, pageThree },
  data() {
    return { 
      activeIndex: 1
     }
  },
  methods: {
    changeTaber(index) {
      this.activeIndex = index
    }
  }
};
</script>


<style>
.main{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.page{
  width: 100%;
  min-height: 100%;
  display: flex;
}
.container{
  flex: 1;
  height: 100%;
  background-color: #f5f5f5;
  padding: 30px;
  box-sizing: border-box;
}
.head{
  width: 100%;
  height: 70px;
  background-color: rgb(64, 158, 255, 0.9);
  text-align: center;
  line-height: 70px;
  font-size: 30px;
  letter-spacing: 4px;
  font-weight: bolder;
  color: #fff;
}
.el-menu-vertical-demo{
  width: 150px;
  /* height: 100%; */
}
.date{
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between
}
.flex{
  display: flex
}
.ac{
  align-items: center;
}
</style>