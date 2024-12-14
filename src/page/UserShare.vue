<template>
  <MainLayout>
    <div>
      <span class="header-title">分享列表</span>
    </div>
    <div class="shangc"></div>
    <div class="table-container">
      <el-table :data="shareList" style="width: 100%; height: 510px;" v-loading="loading"
        element-loading-text="Loading..." element-loading-background="rgba(255, 255, 255, 1)">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="code" label="分享码" width="120" />
        <el-table-column prop="expire_time" label="过期时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.expire_time) }}
          </template>
        </el-table-column>
        <el-table-column label="下载" width="60">
          <template #default="scope">
            {{ scope.row.download_num }}/{{ scope.row.max_download }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="copyShareLink(scope.row.code)" color="#626aef" plain>复制链接</el-button>
            <el-button size="small" @click="describeShare(scope.row)" color="#626aef">详细</el-button>
            <el-button size="small" type="danger" @click="deleteShare(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </MainLayout>
  <OperationFunction />
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import { ElNotification } from 'element-plus';
import axios from 'axios';
import OperationFunction from '@/layouts/OperationFunction.vue';
import MainLayout from '@/layouts/MainLayout.vue';
const backendAddress = inject('backendAddress');
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const shareList = ref([]);
const describeShare = (row) => {
  console.log(row);
}
const loading = ref(false);
// 获取分享列表
const getShareList = async () => {
  loading.value = true; // 开始加载时设置
  try {
    const token = cookies.get('az');
    const { data } = await axios.get(`${backendAddress}/api/v1/share/list`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (data.code === 200) {
      shareList.value = data.data.shares;
    }
  } catch (error) {
    console.error('获取分享列表失败:', error);
    ElNotification.error('获取分享列表失败');
  } finally {
    loading.value = false; // 完成后关闭
  }
};

// 格式化日期
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('zh-CN');
};

// 复制分享链接
const copyShareLink = (code) => {
  const link = `${backendAddress}/api/v1/public/share/${code}/download`
  navigator.clipboard.writeText(link).then(() => {
    ElNotification.success('链接已复制到剪贴板');
  });
};

// 删除分享
const deleteShare = async (id) => {
  try {
    const { data } = await axios.delete(`/api/v1/share/${id}`);
    if (data.code === 200) {
      ElNotification.success('删除成功');
      getShareList(); // 重新加载列表
    } else {
      ElNotification.error(data.msg || '删除失败');
    }
  } catch (error) {
    console.error('删除失败:', error);
    ElNotification.error('删除失败');
  }
};

onMounted(() => {
  getShareList();
});
</script>
<style scoped>
.shangc {
  height: 15px;
}
</style>
