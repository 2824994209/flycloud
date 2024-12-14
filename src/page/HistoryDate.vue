<template>
  <MainLayout>
    <div>
      <span class="header-title">最近更新</span>
    </div>
    <div class="shangc"></div>
    <div class="timeline-container" style="height: 490px;overflow: auto;">
      <el-timeline>
        <el-timeline-item
          v-for="file in fileList"
          :key="file.id"
          :timestamp="formatDate(file.created_at)"
          placement="top"
        >
          <el-card>
            <h4>{{ file.file_name }}</h4>
            <p>文件大小: {{ formatFileSize(file.size) }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted,inject } from 'vue';
import axios from 'axios';
import { ElNotification } from 'element-plus';
import MainLayout from '@/layouts/MainLayout.vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
const fileList = ref([]);

// 获取最近更新列表
const getRecentUpdates = async () => {
  try {
    const token = cookies.get('az');
    const { data } = await axios.get(`${backendAddress}/api/v1/fs/recent-updates`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (data.code === 200) {
      fileList.value = data.data.files;
    }
  } catch (error) {
    console.error('获取最近更新列表失败:', error);
    ElNotification.error('获取最近更新列表失败');
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

onMounted(() => {
  getRecentUpdates();
});
</script>

<style scoped>
.timeline-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  /* margin: 20px; */
  max-width: 800px;
}



.el-timeline-item__content {
  width: 100%;
}

.el-card {
  margin-bottom: 10px;
}

.el-card h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.el-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
.shangc {
  height: 10px;
}
</style>