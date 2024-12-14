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
import { ref } from 'vue';
const handleCancel = () => {
  dialogVisible.value = false;
  input.value = '';
}
const dialogVisible = ref(false);
const input = ref('');

const handleUpload = () => {
  if (input.value) {
    console.log(input.value);
    dialogVisible.value = false;
    input.value = '';
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