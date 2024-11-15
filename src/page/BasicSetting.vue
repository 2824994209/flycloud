<template>
    <MainLayout>
        <div class="main_header">

            <span class="header-title">setting</span>
        </div>
        <div class="shangc">

        </div>
        <div class="content">
            <label for="">修改用户名</label>
            <div class='input-container' style="width: 40%;">
                <input type='text'  />
            </div>
            <label for="" :v-model="password">更改密码</label>
            <div class='input-container' style="width: 40%;">
                <input type='text'  />
            </div>
            <label for="">确认密码</label>
            
            
            <el-tooltip :visible="visible" >
                <template #content >
                <span >重复您刚输入的密码</span>
                </template>
                <div class='input-container' style="width: 40%;">
                    <input type='text' :v-model="apassword" @focus="visible = true" @blur="visible = false"/>
                </div>
            </el-tooltip>
            <div style="margin: 20px 0 ;"></div>
            <el-button color="#626aef" >保存</el-button>
        </div>
    </MainLayout>
</template>
<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { ref } from 'vue'
console.log(ref, MainLayout)
const visible = ref(false)
const password = ref()
const apassword = ref()
</script>
<style lang="">

</style>