<template >
    <BackAdmin>
        <div class="system-header">
        <span>系统信息</span>
    </div>
    <div class="info">
        <div>
            <!-- 系统说明 -->
             <SystemExplain />
        </div>
        <div>
            <!-- 整体数据 -->
        </div>
        <div>
            <!-- 服务器占用率 -->
        </div>
    </div>
    <div>
        <div >
            <!-- cpu和内存占用率 -->
        </div>
        <div>
            <!-- 磁盘信息 -->
        </div>
    </div>
    </BackAdmin>
    
</template>
<script setup>
import BackAdmin from '@/layouts/BackAdmin.vue';
import SystemExplain from '@/admin_util/SystemExplain.vue';
</script>
<style >
    .info{
        display: flex;
    }   
</style>