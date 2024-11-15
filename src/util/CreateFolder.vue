<template lang="">
    <div @click="centerDialogVisible = true">
        <slot>

        </slot>
    </div>
    <el-dialog
    v-model="centerDialogVisible"
    title="输入文件夹名"
    width="500"
    align-center
  >
    <div class='input-container'>
      <input  type='text' />
    </div>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false" color="#626aef" plain>取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false" color="#626aef" >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import {ref } from 'vue';
const centerDialogVisible = ref(false)
</script>
<style>




</style>