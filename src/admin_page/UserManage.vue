<template>
    <BackAdmin>
        <el-button type="primary" @click="openCreateDialog">新建用户</el-button>
        <el-table :data="computedUsers" style="width: 100%">
            <el-table-column prop="uid" label="UID" width="80"></el-table-column>
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-tag>{{ scope.row.role }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="capacity" label="容量"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template #default="scope">
                    <el-tag type="success">{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" v-model="dialogVisible" :close-on-click-modal="true" width="500px">
            <el-form :model="form" label-width="80px" class="dialog-form">
                <el-form-item label="账号">
                    <el-input v-model="form.account" placeholder="请输入邮箱作为账号"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码，留空则不修改"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.role" placeholder="请选择角色">
                        <el-option label="管理员" value="管理员"></el-option>
                        <el-option label="用户" value="用户"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="容量">
                    <el-input v-model="form.capacity" placeholder="请输入容量"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="form.status" active-text="启用" inactive-text="停用"></el-switch>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveUser">保存</el-button>
            </template>
        </el-dialog>
    </BackAdmin>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue';
import BackAdmin from '@/layouts/BackAdmin.vue';

const users = ref([
    {
        uid: 1,
        account: 'admin',
        nickname: 'Admin',
        role: '管理员',
        capacity: '2048',
        status: '启用',
        time: '2024-11-13 21:53:38',
    },
]);
const computedUsers = computed(() => {
    return users.value.map(user => ({
        ...user,
        capacity: (parseInt(user.capacity) / 1024) + 'G'
    }));
});


const dialogVisible = ref(false);
const dialogTitle = ref('新建用户');
const form = ref({
    account: '',
    nickname: '',
    passworcd: '',
    role: '',
    capacity: '',
    status: false,
});

const openCreateDialog = () => {
    dialogTitle.value = '新建用户';
    form.value = {
        account: '',
        nickname: '',
        password: '',
        role: '',
        capacity: localStorage.getItem("capacity")+"MB",
        status: false,
    };
    dialogVisible.value = true;
};

const openEditDialog = (user) => {
    dialogTitle.value = '编辑用户';
    form.value = { ...user, password: '' };
    dialogVisible.value = true;
};

const handleSaveUser = () => {
    if (dialogTitle.value === '新建用户') {
        console.log('创建用户', form.value);
    } else {
        console.log('编辑用户', form.value);
    }
    dialogVisible.value = false;
};

const deleteUser = (user) => {
    console.log('删除用户', user);
    // 添加删除用户的逻辑
};
onMounted(() => {
    console.log(localStorage.getItem("register"))
})  
</script>

<style scoped>
.dialog-form {
    padding: 20px;
}

.el-dialog__header {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ebeef5;
}

.el-dialog__footer {
    text-align: right;
    padding: 10px 20px;
    border-top: 1px solid #ebeef5;
}

.el-button {
    margin-left: 10px;
}
</style>