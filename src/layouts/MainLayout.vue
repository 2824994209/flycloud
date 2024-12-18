<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="content">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#7c3aed" d="M16 0L0 8l4.7 1.6L5 15l2.5-2.8L10 16zM7.5 10.4l4.3-5.9l-6.2 4.3l-3-1L14.2 2L9.7 13.8z"/></svg> -->
          <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 56 56">
              <path fill="#9873d9"
                d="M8.99 47.56h22.943c6.128 0 10.878-4.643 10.878-10.623v-.488c6.764-.254 10.92-4.029 12.49-8.12c.699-1.697-.212-3.245-1.867-3.245c-1.272 0-2.31.551-4.558.551c-5.407 0-8.27-2.99-8.27-7.909c0-2.396.742-3.71.742-4.898c0-1.739-1.505-2.608-3.371-1.972c-4.496 1.484-8.312 6.276-8.312 12.15c0 .19.02.382.02.572c-2.565-2.926-6.127-4.622-10.177-4.622c-7.019 0-12.892 5.407-13.592 12.383C2.375 32.442 0 35.495 0 39.354c0 4.771 3.584 8.206 8.99 8.206m23.792-24.639c0-4.092 2.438-7.294 5.216-8.82l.233.169a12.6 12.6 0 0 0-.678 4.092c0 6.086 4.453 10.284 10.602 10.284c1.505 0 2.904-.275 3.88-.594l.127.149c-1.293 2.502-4.601 5.152-9.966 5.152c-1.336-3.583-4.622-6.17-8.82-6.764c-.404-1.145-.594-2.396-.594-3.668M8.906 44.168c-3.605 0-5.513-2.078-5.513-4.729c0-2.248 1.314-4.22 4.431-5.068c1.018-.254 1.4-.72 1.485-1.802c.487-5.937 4.898-10.22 10.199-10.22c4.113 0 7.315 2.268 9.287 6.212c.445.912.976 1.23 2.057 1.23c5.47 0 8.567 3.308 8.567 7.252s-3.224 7.125-7.422 7.125Z" />
            </svg>
          </div>
          <div class='content-input'>
            <el-select v-model="selectedValue" filterable remote reserve-keyword placeholder="search"
              :remote-method="handleSearch" :loading="loading"  @focus="showDropdown = true"
              @blur="handleBlur">
              <el-option v-for="item in options" :key="item.id" :label="item.file_name" :value="item" @click="handleSelect(item)">
                <div class="select-option">
                  <span >{{ item.file_name }}</span>
                  <span class="folder-path" >{{ item.folder_name }}</span>
                </div>
              </el-option>
              <template #loading>
                <svg class="circular" viewBox="0 0 50 50">
                  <circle class="path" cx="25" cy="25" r="20" fill="none" />
                </svg>
              </template>
            </el-select>
            
            <!-- <el-icon class="search-icon">
              <Search />
            </el-icon> -->
          </div>
        </div>

        <!-- <div class="nav-links">主页 | 关于我们 | 服务 | 联系我们</div> -->
      </el-header>

      <el-container class="content-container">
        <el-aside class="dynamic-aside">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
            <div class="radio-container" @click="toggleIcon">
              <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" fill="#626aef">

                <el-radio-button v-if="!isCollapse" :value="isCollapse"
                  style="justify-content: center;padding-top: 10px;">
                  <span style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-right: 10px;">fly
                    cloud</span>
                  <el-icon size="10px">
                    <ArrowLeft />
                  </el-icon>
                </el-radio-button>
                <el-radio-button v-if="isCollapse" :value="isCollapse" style="justify-content: left;padding-top: 10px;">
                  <el-icon>
                    <Menu />
                  </el-icon>
                </el-radio-button>
              </el-radio-group>
            </div>
            <el-menu-item index="/user/personal">
              <el-icon>
                <MostlyCloudy />
              </el-icon>
              <template #title>个人空间</template>
            </el-menu-item>
            <el-menu-item index="/user/share">
              <el-icon>
                <MoonNight />
              </el-icon>
              <template #title>分享列表</template>
            </el-menu-item>
            <el-menu-item index="/user/date">
              <el-icon>
                <Calendar />
              </el-icon>
              <template #title>最近更新</template>
            </el-menu-item>
            <el-menu-item index="/user/setting">
              <el-icon>
                <setting />
              </el-icon>
              <template #title>基本设置</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <!-- 插槽 切换页面 -->
          <slot :searchValue="search_input1">

          </slot>

        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- <OperationFunction /> -->
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, inject } from "vue";
import axiosInstance from '@/config/axiosInstance';
// import axiosInstance from 'axios';
// import OperationFunction from "@/util/OperationFunction.vue";
// import DashboardPage from "@/page/DashboardPage.vue";
// 从 localStorage 读取 isCollapse 的初始值

const search_input1 = ref('')
const initialCollapse = localStorage.getItem("isCollapse");
const isCollapse = ref(initialCollapse !== null ? initialCollapse === 'true' : true);
const emit = defineEmits(['update']);
const options = ref([]);
const showDropdown = ref(false);
const backendAddress = inject('backendAddress');
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const token = ref(cookies.get('az'))
const loading = ref(false);
const selectedValue = ref(null);
// 修改搜索方法
const handleSearch = async (query) => {
  if (!query) {
    options.value = [];
    return;
  }

  loading.value = true;
  try {
    const res = await axiosInstance.get(`${backendAddress}/api/v1/fs/search?keyword=${query}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    if (res.data.code === 200) {
      options.value = res.data.data.files;
    }
  } catch (error) {
    console.error('搜索失败:', error);
    options.value = [];
  } finally {
    loading.value = false;
  }
};

// 处理选择
const handleSelect = (value) => {
  if (value) {
    emit('update', value.folder_id);
    selectedValue.value = null;
  }
};

// 处理失焦
const handleBlur = () => {
  setTimeout(() => {
    selectedValue.value = null;
  }, 200);
};

const toggleIcon = () => {
  isCollapse.value = !isCollapse.value;
  localStorage.setItem("isCollapse", isCollapse.value);

};
</script>

<style>


.svg-container {
  flex-shrink: 0;
  width: 40px;
  margin-left: 10px;
  margin-top: 5px;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  /* 调整图标距离右侧的距离 */
  transform: translateY(-50%);
  cursor: pointer;
}





a {
  text-decoration: none;
  color: inherit
}

a:hover {
  text-decoration: underline;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 400px; */
}

.dynamic-aside {
  min-width: 50px !important;
  --el-aside-width: 100% max-width: none;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1),
                0 1px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  transition: width 4s ease;
  /* 添加收起/展开动画 */
}

.content-container {
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

.header .content {
  display: flex;
  width: 60%;
  margin: 0 auto;
  font-weight: bold;
}

/* .main{
    background-color: crimson;
  } */
.common-layout {
  /* background-color: blue; */
  background-image: url('/public/back.jpg');
  background-size: 100% 100%;
}

.radio-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* 下拉框样式 */
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 300px;
  margin-top: 5px;
  z-index: 1000;
}

.select-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.folder-path {
  color: #909399;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

/* 确保下拉框在其他元素之上 */
.el-select-dropdown {
  z-index: 3000 !important;
}

.content-input {
  position: relative;
  margin-left: calc(50% - 210px);
  margin-right: auto;
  max-width: 100%;
}

/* 美化el-select样式 */
.content-input .el-select {
  width: 300px;
}

.content-input .el-select .el-input__wrapper {
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: none !important;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  padding: 0 8px;
  height: 32px;
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
}

.content-input .el-select .el-input__inner {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #606266;
  flex-grow: 1; /* 允许输入框扩展 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号 */
  white-space: nowrap; /* 不换行 */
}

/* 下拉选项样式 */
.el-select-dropdown {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.el-select-dropdown__item {
  padding: 6px 12px;
  height: 32px;
  line-height: 20px;
}

.select-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.select-option span:first-child {
  color: #303133;
  font-weight: 500;
  font-size: 13px;
}

.folder-path {
  color: #909399;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

/* 搜索图标样式 */
.search-icon {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  color: #909399;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.search-icon:hover {
  color: #626aef;
}

/* 加载动画样式优化 */
.circular {
  height: 20px;
  width: 20px;
  animation: loading-rotate 2s linear infinite;
}

.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #626aef;
  stroke-linecap: round;
}

/* 空状态样式 */
.el-select-dropdown__empty {
  padding: 8px;
  text-align: center;
  color: #909399;
  font-size: 13px;
}

/* 动画效果 */
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

/* 滚动条美化 */
.el-select-dropdown__wrap {
  scrollbar-width: thin;
  scrollbar-color: #909399 #f5f7fa;
}

.el-select-dropdown__wrap::-webkit-scrollbar {
  width: 6px;
}

.el-select-dropdown__wrap::-webkit-scrollbar-track {
  background: #f5f7fa;
  border-radius: 3px;
}

.el-select-dropdown__wrap::-webkit-scrollbar-thumb {
  background-color: #909399;
  border-radius: 3px;
}

/* 修改el-select内部input的样式 */
.content-input .el-select .el-select__input {
  min-width: 150px !important; /* 设置最小宽度 */
  width: auto !important; /* 允许自动扩展 */
  flex: 1; /* 允许填充剩余空间 */
  /* margin-left: 8px; */
}

/* 确保输入框容器有足够空间 */
.content-input .el-select .el-input__wrapper {
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: none !important;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  /* padding: 0 8px; */
  height: 32px;
  display: flex;
  align-items: center;
  /* gap: 8px;  */
}



/* 确保下拉框宽度与输入框一致 */
.el-select__popper {
  min-width: 300px !important;
  max-width: 400px !important;
}

/* 选中状态下的图标颜色 */
.el-menu-item.is-active .el-icon {
  color: #9873d9 !important;
}

/* 选中状态下的文字颜色 */
.el-menu-item.is-active {
  color: #9873d9 !important;
}


/* 选中状态的背景色 */
.el-menu-item.is-active {
  background-color: #f0f2f5 !important;
}
.el-menu-tooltip__trigger:hover{
  background-color: #f0f2f5 !important;
}


</style>