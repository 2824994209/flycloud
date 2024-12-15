<template>
  <div @click="dialogVisible = true">
    <slot></slot>
  </div>
  <el-dialog v-model="dialogVisible" title="上传分享文件" width="500px">
    <div class="content-share">
      <el-input v-model="input" placeholder="请输入分享code" />
      <div class="button-group">
        <el-button color="#626aef" @click="handleUpload" :disabled="!input">
          上传
        </el-button>
        <el-button color="#626aef" plain @click="handleCancel">
          取消
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref,inject } from 'vue';
import { ElNotification } from 'element-plus';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const backendAddress = inject('backendAddress');
const fetchFolderData = inject('fetchFolderData');

const handleCancel = () => {
  dialogVisible.value = false;
  input.value = '';
}
const dialogVisible = ref(false);
const input = ref('');

const handleUpload = async () => {
  if (!input.value) {
    ElNotification({
      title: '提示',
      message: '请输入分享码',
      type: 'warning'
    })
    return
  }

  try {
    
    const token = cookies.get('az')
    const target_dir_id = cookies.get('currentFolderId')
    const body = {
      code: input.value,
      target_dir_id: target_dir_id
    }
    

    const res = await axios.post(`${backendAddress}/api/v1/share/import`, body,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (res.data.code === 200) {
      ElNotification({
        title: '成功',
        message: '导入成功',
        type: 'success'
      })
      dialogVisible.value = false
      // 刷新当前目录
      fetchFolderData()
    } else {
      ElNotification({
        title: '错误',
        message: res.data.msg || '导入失败',
        type: 'error'
      })
    }
  } catch (error) {
    console.error('导入失败:', error)
    ElNotification({
      title: '错误',
      message: error.data.msg,
      type: 'error'
    })
  }
}
</script>

<style scoped>
.content-share {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 10px);
  max-width: 100%;
  box-sizing: border-box;
}

.button-group {
  text-align: left;
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