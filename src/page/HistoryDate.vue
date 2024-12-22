<template>
  <MainLayout>
    <div>
      <span class="header-title">最近更新</span>
    </div>
    <div class="shangc">
        <div @click="scrollToTop" style="display: block; align-items: center; color: #606266;" class="back-to-top-container">
          <el-icon 
          class="back-to-top" 
        >
          <ArrowUpBold />
        </el-icon>
        <span style="font-size:14px;color: #c7c0c0;cursor: pointer;color: #606266;">回到顶部</span>
        </div>
        
    </div>
    <div 
      v-loading="isLoading"
      element-loading-background="rgba(255, 255, 255, 0.3)"
      class="timeline-container" 
      style="height: calc(100vh - 240px);overflow: auto;"
      @scroll="handleScroll"
    >
      <el-timeline>
        <el-timeline-item
          v-for="file in fileList"
          :key="file.id"
          :timestamp="formatDate(file.created_at)"
          placement="top"
          :type="getRandomType()"
        >
          <div class="timeline-content">
            <div class="file-name">{{ file.file_name }}</div>
            <div class="file-size">{{ formatFileSize(file.size) }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted,inject } from 'vue';
import axios from '@/config/axiosInstance';
// import axios from 'axios';
import { ElNotification } from 'element-plus';
import MainLayout from '@/layouts/MainLayout.vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
const fileList = ref([]);
const isLoading = ref(false);
const page = ref(1);
const hasMore = ref(true);
const isLoadingMore = ref(false);
// 添加控制按钮显示的变量
const showBackToTop = ref(false);
// 获取最近更新列表
const getRecentUpdates = async (loadMore = false) => {
  if (!loadMore) {
    isLoading.value = true;
  } else {
    isLoadingMore.value = true;
  }
  
  try {
    const token = cookies.get('az');
    const { data } = await axios.get(`${backendAddress}/api/v1/fs/recent-updates?page_size=5&page=${page.value}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (data.code === 200) {
      if (loadMore) {
        fileList.value = [...fileList.value, ...data.data.files];
      } else {
        fileList.value = data.data.files;
      }
      hasMore.value = data.data.files.length === 5;
      window.location.hash = `page=${page.value}`;

    }
  } catch (error) {
    console.error('获取最近更新列表失败:', error);
    ElNotification.error('获取最近更新列表失败');
  } finally {
    if (!loadMore) {
      isLoading.value = false;
    } else {
      isLoadingMore.value = false;
    }
  }
};

// 格式化日期
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('zh-CN');
};

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 添加一个随机类型函数来让时间线更有趣
const getRandomType = () => {
  const types = ['primary', 'success', 'warning', 'info'];
  return types[Math.floor(Math.random() * types.length)];
};

// 修改滚动处理函数
const handleScroll = async (e) => {
  const { scrollHeight, scrollTop, clientHeight } = e.target;
  // 控制回到顶部按钮的显示
  showBackToTop.value = scrollTop > 300;
  
  if (scrollHeight - scrollTop - clientHeight < 50 && hasMore.value && !isLoadingMore.value) {
    page.value++;
    await getRecentUpdates(true);
  }
};

// 添加回到顶部函数
const scrollToTop = () => {
  const container = document.querySelector('.timeline-container');
  if (container) {
    container.scrollTop = 0;
  }
};

onMounted(() => {
  getRecentUpdates();
});
</script>

<style scoped>
.timeline-container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.3);

  border-radius: 8px;
  /* box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1); */
  /* margin: 20px; */
  max-width: 800px;
}

.timeline-content {
  padding: 8px 12px;
  transition: all 0.3s ease;
  border-radius: 10px;
  background-color: transparent;
}

.timeline-content:hover {
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  /* transform: translateX(4px); */
  transform: scale(1.02);
}

.file-name {
  font-size: 15px;
  color: #303133;
  margin-bottom: 4px;
  font-weight: 500;
}

.file-size {
  font-size: 13px;
  color: #909399;
}

:deep(.el-timeline-item__node) {
  width: 12px;
  height: 12px;
}

:deep(.el-timeline-item__tail) {
  border-left: 2px solid #e4e7ed;
}

:deep(.el-timeline-item__timestamp) {
  font-size: 13px;
  color: #909399;
}




.timeline-container::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.timeline-container::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}

.shangc {
  height: 13px;
}
.back-to-top{
  color: #c7c0c0;
  font-size: 20px;
  cursor: pointer;
  /* padding-top: -5px; */
  padding-left: 5px;
}
.back-to-top-container:hover{
  color: #c7c0c0;
  text-decoration:underline;
}
.header-title{
  font-size: 15px;
}
</style>