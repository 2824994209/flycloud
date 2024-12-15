<template>
    <div @click="centerDialogVisible = true">
        <slot>
        </slot>
    </div>
    <el-dialog
        v-model="centerDialogVisible"
        title="是否退出"
        width="30%"
    >
        <div class="dialog-content">
            <div class="icon-circle">
                <el-icon class="dialog-icon"><SwitchButton /></el-icon>
            </div>
            <span class="dialog-text">确定要退出吗？</span>
        </div>
        
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="logout" color="#626aef">确定</el-button>
                <el-button @click="centerDialogVisible = false" plain color="#626aef">取消</el-button>
                
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';

const { cookies } = useCookies();
const router = useRouter();
const centerDialogVisible = ref(false);
const logout = () => {
    centerDialogVisible.value = false;
    cookies.remove('az');
    cookies.remove('currentFolderId');
    cookies.remove('rootfolderid');
    router.push('/login');
};
</script>

<style>
.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}

.icon-circle {
    width: 50px;
    height: 50px;
    background-color: #fff2f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.dialog-icon {
    font-size: 24px;
    color: #ff4d4f;
}

.dialog-text {
    font-size: 16px;
    color: #333;
}

.dialog-footer {
    text-align: center;
}

.logout-icon {
    cursor: pointer;
    font-size: 20px;
    color: #626aef;
}

.logout-icon:hover {
    color: #ff4d4f;
}

.input-container {
    margin: 10px 0;
}
</style>