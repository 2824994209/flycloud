<template>
    <BackAdmin>
        <div class="setting-item">
            关闭新用户注册
            <el-switch v-model="register" />
        </div>
        <div class="setting-item">
            <div style="margin-bottom: 10px;">
                <span style="margin-bottom: 10px;">新用户初始容量</span><span>单位：MB</span>
            </div>
            <el-input v-model="capacity" />
        </div>
        <el-button type="primary" @click="save">保存</el-button>
    </BackAdmin>
</template>
<script setup>
import BackAdmin from '@/layouts/BackAdmin.vue'
import { ref,onMounted } from 'vue'
import { ElNotification } from 'element-plus'
const register = ref(localStorage.getItem("register") === "true")
const capacity = ref(localStorage.getItem("capacity") || 2048)
const save = () => {
    console.log(register.value,capacity.value)
    localStorage.setItem("register",register.value)
    localStorage.setItem("capacity",capacity.value)
    ElNotification({
        duration: 2000,
        title: 'success',
        message: '保存成功',
        type: 'success',
    })
}
onMounted(() => {
    console.log("ces")
})
</script>
<style>
.setting-item {
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
}

.setting-item el-switch,
.setting-item el-input {
    margin-left: 10px;
}
</style>