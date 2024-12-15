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
        <el-table-column prop="code" label="分享码"  />
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
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="copyShareLink(scope.row.code)" color="#626aef" plain>复制</el-button>
            <!-- <el-button size="small" @click="describeShare(scope.row)" color="#626aef">详细</el-button> -->
            <el-button size="small" type="danger" @click="deleteShare(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </MainLayout>
  <OperationFunction />
  <el-dialog v-model="dialogVisible" title="分享详情" width="50%">
    <div class="share-detail">
      <div class="detail-item">
        <span class="label">分享码：</span>
        <span>{{ shareDetail.code }}</span>
      </div>
      <div class="detail-item">
        <span class="label">创建时间：</span>
        <span>{{ formatDate(shareDetail.created_at) }}</span>
      </div>
      <div class="detail-item">
        <span class="label">过期时间：</span>
        <span>{{ formatDate(shareDetail.expire_time) }}</span>
      </div>
      <div class="detail-item">
        <span class="label">下载次数：</span>
        <span>{{ shareDetail.download_num }}/{{ shareDetail.max_download }}</span>
      </div>
      
      <!-- 文件列表 -->
      <div v-if="shareDetail.files && shareDetail.files.length > 0">
        <div class="section-title">文件列表：</div>
        <div v-for="file in shareDetail.files" :key="file.id" class="file-item">
          <el-icon><Document /></el-icon>
          <span>{{ file.file_name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
        </div>
      </div>
      
      <!-- 文件夹列表 -->
      <div v-if="shareDetail.folders && shareDetail.folders.length > 0">
        <div class="section-title">文件夹列表：</div>
        <div v-for="folder in shareDetail.folders" :key="folder.id" class="file-item">
          <el-icon><Folder /></el-icon>
          <span>{{ folder.name }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import { ElNotification } from 'element-plus';
import axios from 'axios';
import OperationFunction from '@/layouts/OperationFunction.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { Document, Folder } from '@element-plus/icons-vue';
const backendAddress = inject('backendAddress');
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const shareList = ref([]);
const dialogVisible = ref(false);
const shareDetail = ref({});

// const describeShare = async (row) => {
//   try {
//     var data = JSON.stringify({
//       "share_id": row.id
//     });
//     const token = cookies.get('az');
//     const res = await axios.get(`${backendAddress}/api/v1/share`, {
//       data: data,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });
    
//     if (res.code === 200) {
//       shareDetail.value = res.data;
//       dialogVisible.value = true;
//     }
//   } catch (error) {
//     console.error('获取分享详情失败:', error);
//     ElNotification.error('获取分享详情失败');
//   }
// };

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
  const textToCopy = `分享码：${code}\n链接：${link}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    ElNotification.success('分享码和链接已复制到剪贴板');
  });
};

// 删除分享
const deleteShare = async (id) => {
  try {
    const token = cookies.get('az');
    const { data } = await axios.delete(`${backendAddress}/api/v1/share/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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

// 文件大小格式化
const formatFileSize = (size) => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
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

.share-detail {
  padding: 20px;
}

.detail-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.detail-item .label {
  width: 100px;
  color: #606266;
  font-weight: 500;
}

.section-title {
  margin: 20px 0 10px;
  font-weight: 500;
  color: #303133;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #EBEEF5;
}

.file-item .el-icon {
  margin-right: 8px;
  color: #909399;
}

.file-size {
  margin-left: auto;
  color: #909399;
  font-size: 13px;
}
</style>
