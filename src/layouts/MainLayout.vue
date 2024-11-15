<template>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <div class="content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#7c3aed" d="M16 0L0 8l4.7 1.6L5 15l2.5-2.8L10 16zM7.5 10.4l4.3-5.9l-6.2 4.3l-3-1L14.2 2L9.7 13.8z"/></svg>
            <div style="margin:0 auto;border-radius: 5px;" class='content-input'>
              <input type="text" style="" placeholder="search">
                <el-icon class="search-icon">
                <Search />
              </el-icon>
            </div>
          </div>
          
          <!-- <div class="nav-links">主页 | 关于我们 | 服务 | 联系我们</div> -->
        </el-header>
  
        <el-container class="content-container">
          <el-aside class="dynamic-aside">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              :collapse="isCollapse"
              :router="true"
            >
              <div
                class="radio-container"
                @click="toggleIcon"
              >
                <el-radio-group
                  v-model="isCollapse"
                  style="margin-bottom: 20px;"
                  fill="#626aef"
                >
  
                  <el-radio-button
                    v-if="!isCollapse"
                    :value="isCollapse"
                    style="justify-content: center;padding-top: 10px;"
                  >
                  <span style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-right: 10px;" >fly cloud</span>
                    <el-icon size="10px">
                      <ArrowLeft />
                    </el-icon>
                  </el-radio-button>
                  <el-radio-button
                    v-if="isCollapse"
                    :value="isCollapse"
                    style="justify-content: left;padding-top: 10px;"
                  >
                    <el-icon >
                      <Menu />
                    </el-icon>
                  </el-radio-button>
                </el-radio-group>
              </div>
              <el-menu-item index="/user/personal" >
                  <el-icon>
                    <MostlyCloudy />
                  </el-icon>
                  <template #title>personal</template>
              </el-menu-item>
              <el-menu-item >
                <el-icon>
                  <MoonNight />
                </el-icon>
                <template #title>Navigator Two</template>
              </el-menu-item>
              <el-menu-item
                index="3"
                disabled
              >
                <el-icon>
                  <document />
                </el-icon>
                <template #title>Navigator Three</template>
              </el-menu-item>
              <el-menu-item index="/user/setting">
                <el-icon>
                  <setting />
                </el-icon>
                <template #title>setting</template>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main class="main">
            <!-- 插槽 切换页面 -->
            <slot></slot>
  
          </el-main>
        </el-container>
      </el-container>
    </div>
    <OperationFunction />
  </template>
  
  <script setup>
  import { ref } from "vue";
  import OperationFunction from "@/util/OperationFunction.vue";
  // 从 localStorage 读取 isCollapse 的初始值
  const initialCollapse = localStorage.getItem("isCollapse");
  const isCollapse = ref(initialCollapse !== null ? initialCollapse === 'true' : true);
  
  const toggleIcon = () => {
    isCollapse.value = !isCollapse.value;
    localStorage.setItem("isCollapse", isCollapse.value);
  };
  </script>
  
  <style>
  .search-icon {
    position: absolute;
    top: 50%;
    right: 10px; /* 调整图标距离右侧的距离 */
    transform: translateY(-50%);
    cursor: pointer;
  }
  .content-input{
    position: relative;
    display: inline-block;
  }
  .content-input input[type='text'] {
    /* background-color: #f6f0f9;  */
    border: 1px solid transparent; 
    padding: 8px 0;
    outline: none; 
    width: 300px;
    border-radius: 10px; 
    font-size: 15px;
    padding-left: 10px;
  }
  
  a {
    text-decoration: none; color: inherit
  }
  a:hover{
    text-decoration:underline;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* min-height: 400px; */
  }
  
  .dynamic-aside {
    min-width: 50px !important;
    --el-aside-width:100% max-width: none;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1),
                0 1px 15px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    transition: width 1s ease;  /* 添加收起/展开动画 */
  }
  .content-container{
    width: 60%;
    margin: 0 auto;
    border-radius: 10px;
    /* border: 2px solid #949492; */
    background-color: rgb(255, 255, 255);
    height: 91.4vh;
  
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: rgb(255, 255, 255,0.5);
  }
  .header .content{
    display: flex;
    width: 60%;
    margin: 0 auto;
    font-weight: bold;
  }
  
  /* .main{
    background-color: crimson;
  } */
  .common-layout{
    /* background-color: blue; */
    background-image: url('/public/back.jpg');
    background-size: 100% 100%;
  }
  
  .radio-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  </style>
  