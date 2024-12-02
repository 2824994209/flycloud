<template>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <div class="content">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#7c3aed" d="M16 0L0 8l4.7 1.6L5 15l2.5-2.8L10 16zM7.5 10.4l4.3-5.9l-6.2 4.3l-3-1L14.2 2L9.7 13.8z"/></svg> -->
             <div class="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 56 56"><path fill="#9873d9" d="M8.99 47.56h22.943c6.128 0 10.878-4.643 10.878-10.623v-.488c6.764-.254 10.92-4.029 12.49-8.12c.699-1.697-.212-3.245-1.867-3.245c-1.272 0-2.31.551-4.558.551c-5.407 0-8.27-2.99-8.27-7.909c0-2.396.742-3.71.742-4.898c0-1.739-1.505-2.608-3.371-1.972c-4.496 1.484-8.312 6.276-8.312 12.15c0 .19.02.382.02.572c-2.565-2.926-6.127-4.622-10.177-4.622c-7.019 0-12.892 5.407-13.592 12.383C2.375 32.442 0 35.495 0 39.354c0 4.771 3.584 8.206 8.99 8.206m23.792-24.639c0-4.092 2.438-7.294 5.216-8.82l.233.169a12.6 12.6 0 0 0-.678 4.092c0 6.086 4.453 10.284 10.602 10.284c1.505 0 2.904-.275 3.88-.594l.127.149c-1.293 2.502-4.601 5.152-9.966 5.152c-1.336-3.583-4.622-6.17-8.82-6.764c-.404-1.145-.594-2.396-.594-3.668M8.906 44.168c-3.605 0-5.513-2.078-5.513-4.729c0-2.248 1.314-4.22 4.431-5.068c1.018-.254 1.4-.72 1.485-1.802c.487-5.937 4.898-10.22 10.199-10.22c4.113 0 7.315 2.268 9.287 6.212c.445.912.976 1.23 2.057 1.23c5.47 0 8.567 3.308 8.567 7.252s-3.224 7.125-7.422 7.125Z"/></svg>            
             </div>
            <div class='content-input'>
              <input type="text" style="" placeholder="search" v-model="search_input">
                <el-icon class="search-icon" @click="search">
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
              <el-menu-item index="/user/share">
                <el-icon>
                  <MoonNight />
                </el-icon>
                <template #title>share</template>
              </el-menu-item>
              <el-menu-item
                index="/user/date"
              >
              <el-icon>
                <Calendar />
              </el-icon>
                <template #title>timeline</template>
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
            <slot :searchValue="search_input1" >

            </slot>
  
          </el-main>
        </el-container>
      </el-container>
    </div>
    <!-- <OperationFunction /> -->
  </template>
  
  <script setup>
  import { ref,defineEmits } from "vue";
  // import OperationFunction from "@/util/OperationFunction.vue";
  // import DashboardPage from "@/page/DashboardPage.vue";
  // 从 localStorage 读取 isCollapse 的初始值
  const search_input = ref('')
  const search_input1 = ref('')
  const initialCollapse = localStorage.getItem("isCollapse");
  const isCollapse = ref(initialCollapse !== null ? initialCollapse === 'true' : true);
  const emit = defineEmits(['update']);
  const search = () =>{
    search_input1.value = search_input.value
    console.log("传递前"+search_input1.value)
    emit('update', search_input1.value);
    // console.log(search_input.value)
  }
  const toggleIcon = () => {
    isCollapse.value = !isCollapse.value;
    localStorage.setItem("isCollapse", isCollapse.value);
    
  };
  </script>
  
  <style>
  .svg-container{
    flex-shrink: 0;
    width: 40px;
    margin-left: 10px;
    margin-top: 5px;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    right: 10px; /* 调整图标距离右侧的距离 */
    transform: translateY(-50%);
    cursor: pointer;
  }
  .content-input{
    position: relative;
    margin-left: calc(50% - 210px);
    margin-right: auto;
    max-width: 100%;
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
    transition: width 4s ease;  /* 添加收起/展开动画 */
  }
  .content-container{
    width: 60%;
    margin: 0 auto;
    border-radius: 10px;
    /* border: 2px solid #949492; */
    background-color: rgb(255, 255, 255);
    height: 91.5vh;
  
  }
  
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 6px -4px rgb(244, 240, 240);
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
  