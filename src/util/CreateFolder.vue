<template>
  <div @click="centerDialogVisible = true">
    <slot>

    </slot>
  </div>
  <el-dialog v-model="centerDialogVisible" title="输入文件夹名" width="500" align-center>
    <div class='input-container'>
      <input v-model="folderName" type='text' />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false" color="#626aef" plain>取消</el-button>
        <el-button type="primary" @click="createFolder" color="#626aef">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, inject } from 'vue';
import { ElNotification } from 'element-plus';
import axiosInstance from 'axios';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const backendAddress = inject('backendAddress');
const centerDialogVisible = ref(false)
const folderName = ref('')
const createFolder = () => {
  centerDialogVisible.value = false
  const token = cookies.get('az')
  const currentFolderId = cookies.get('currentFolderId')
  axiosInstance.post(`${backendAddress}/api/v1/fs/folder`, {
    name: folderName.value,
    parent_id: currentFolderId
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    if (res.data.code === 200) {
      ElNotification({
        duration: 2000,
        title: 'success',
        message: res.data.message,
        type: 'success',
        showClose: false
      });
    }
  })
}
</script>
<style></style>