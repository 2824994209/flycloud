<template>
  <div @click="centerDialogVisible = true">
    <slot></slot>
  </div>
  <el-dialog v-model="centerDialogVisible" title="输入文件夹名" width="500px">
    <div class="content-share">
      <el-input v-model="folderName" placeholder="请输入文件夹名称" />
      <div class="button-group">
        <el-button color="#626aef" @click="createFolder" :disabled="!folderName">
          创建
        </el-button>
        <el-button color="#626aef" plain @click="handleCancel">
          取消
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, inject } from 'vue';
import { ElNotification } from 'element-plus';
import axiosInstance from '@/config/axiosInstance';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
const centerDialogVisible = ref(false)
const folderName = ref('')
const fetchFolderData = inject('fetchFolderData');

const handleCancel = () => {
  centerDialogVisible.value = false;
  folderName.value = '';
}

const createFolder = async () => {
  try {
    const token = cookies.get('az')
    const currentFolderId = cookies.get('currentFolderId')
    const res = await axiosInstance.post(`${backendAddress}/api/v1/fs/folder`, {
      name: folderName.value,
      parent_id: currentFolderId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    console.log(res)
    fetchFolderData();
    folderName.value = null;
    centerDialogVisible.value = false;
    if (res.data.code === 200) {
      ElNotification({
        duration: 2000,
        title: 'success',
        message: res.data.message,
        type: 'success',
        showClose: false
      });
    }else{
      ElNotification({
        duration: 2000,
        title: 'error',
        message: res.data.msg,
        type: 'error',
        showClose: false
      });
    }
  } catch (error) {
    console.error('创建文件夹失败:', error);
    ElNotification({
      duration: 2000,
      title: 'Error',
      message: '创建文件夹失败',
      type: 'error',
      showClose: false
    });
  }
}
</script>

<style scoped>
.content-share {
  padding: 20px 40px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 10px);
  max-width: 100%;
  box-sizing: border-box;
}
.button-group {
  text-align: center;
  padding-top: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 10px !important;
  box-shadow: none;
  border: 1px solid #dcdfe6;
}

:deep(.el-input__wrapper:focus-within) {
  border-color: #626aef !important;
  box-shadow: 0 0 0 1px #626aef !important;
}
</style>