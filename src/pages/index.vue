<template>
  <div class="main">
    <header class="head">移动闭塞原理的列车追踪运行仿真</header>
    <div id="app" class="page">
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="width: 200px"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>基础数据模块</span>
          </template>
          <router-link to="podao" tag="div" index="1-1">
            <el-menu-item index="1-1">
                <span slot="title">坡道列表</span>
            </el-menu-item>
          </router-link>
          <router-link to="car" tag="div">
            <el-menu-item index="1-2">
                <span slot="title">列车列表</span>
            </el-menu-item>
          </router-link>
          <router-link to="cars" tag="div">
            <el-menu-item index="1-3">
                <span slot="title">动车组列表</span>
            </el-menu-item>
          </router-link>
          <router-link to="road" tag="div">
            <el-menu-item index="1-4">
                <span slot="title">路段列表</span>
            </el-menu-item>
          </router-link>
          <router-link to="quxian" tag="div">
            <el-menu-item index="1-5">
                <span slot="title">曲线列表</span>
            </el-menu-item>
          </router-link>
          <router-link to="station" tag="div">
            <el-menu-item index="1-6">
                <span slot="title">车站列表</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="compute" tag="div">
          <el-menu-item index="2">
            <i class="el-icon-user-solid"></i>
            <span slot="title">追踪间隔时间的计算</span>
          </el-menu-item>
        </router-link>
        <router-link to="run" tag="div">
          <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <span slot="title">列车运行仿真</span>
          </el-menu-item>
        </router-link>
      </el-menu>
      <div style="padding: 20px; box-size: border-box; width: 100%">
        <router-view />
      </div>3
    </div>
  </div>
</template>

<script>
import pageOne from '@/pages/pageOne'
import pageTwo from '@/pages/pageTwo'
import pageThree from '@/pages/pageThree'

export default {
  components: { pageOne, pageTwo, pageThree }
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