<template>
    <div @click="centerDialogVisible = true">
        <slot>

        </slot>
    </div>
    <el-dialog
    v-model="centerDialogVisible"
    title="是否退出"
    width="500"
    align-center
  >
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false" color="#626aef" plain>取消</el-button>
        <el-button type="primary" @click="logout" color="#626aef" >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import {ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';
const { cookies } = useCookies();
const router = useRouter();
const centerDialogVisible = ref(false)
const logout = () => {
  centerDialogVisible.value = false
  cookies.remove('az')
  cookies.remove('currentFolderId')
  cookies.remove('rootfolderid')
  router.push('/login')
}
</script>
<style>
.input-container {
  margin: 10px 0; /* 上下边距 */
}

.input-container input[type='text'] {
  background-color: #f6f0f9; 
  border: 1px solid transparent; 
  padding: 10px;
  outline: none; 
  transition: border 0.3s; 
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px; 
}

.input-container input[type='text']:focus {
  border: 1px solid #8a2be2;
  border-radius: 5px;
}



</style>