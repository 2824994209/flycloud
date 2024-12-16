<template>
	<BackAdmin>
		<el-button type="primary" @click="openCreateDialog">新建用户</el-button>
		<el-table :data="computedUsers" style="width: 100%">
			<el-table-column prop="email" label="邮箱"></el-table-column>
			<el-table-column prop="username" label="用户名"></el-table-column>
			<el-table-column prop="capacity" label="容量"></el-table-column>
			<el-table-column prop="time" label="时间"></el-table-column>
			<el-table-column label="权限">
				<template #default="scope">
					<div class="permission-tags">
						<el-tag v-if="scope.row.permissions.upload">上传</el-tag>
						<el-tag v-if="scope.row.permissions.share">分享</el-tag>
						<el-tag v-if="scope.row.permissions.download">下载</el-tag>
						<el-tag v-if="scope.row.permissions.delete">删除</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
					<el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="dialogTitle" v-model="dialogVisible" :close-on-click-modal="true" width="500px">
			<el-form :model="form" label-width="80px" class="dialog-form">
				<el-form-item label="邮箱">
					<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="form.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" v-model="form.password" placeholder="请输入密码，留空则不修改"></el-input>
				</el-form-item>
				<el-form-item label="容量">
					<el-input v-model="form.capacity" placeholder="请输入容量"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<div class="permissions-switches">
						<div class="permission-row">
							<el-switch v-model="form.permissions.upload" active-text="上传"></el-switch>
							<el-switch v-model="form.permissions.share" active-text="分享"></el-switch>
						</div>
						<div class="permission-row">
							<el-switch v-model="form.permissions.download" active-text="下载"></el-switch>
							<el-switch v-model="form.permissions.delete" active-text="删除"></el-switch>
						</div>
					</div>
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
import { ref, onMounted, computed } from 'vue';
import BackAdmin from '@/layouts/BackAdmin.vue';

const users = ref([
	{
		email: 'admin@example.com',
		username: 'Admin',
		capacity: '2048',
		time: '2024-11-13 21:53:38',
		permissions: {
			upload: true,
			share: true,
			download: true,
			delete: true
		}
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
	email: '',
	username: '',
	password: '',
	capacity: '',
	permissions: {
		upload: false,
		share: false,
		download: false,
		delete: false
	}
});

const openCreateDialog = () => {
	dialogTitle.value = '新建用户';
	form.value = {
		email: '',
		username: '',
		password: '',
		capacity: localStorage.getItem("capacity") + "MB",
		permissions: {
			upload: false,
			share: false,
			download: false,
			delete: false
		}
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

.permission-tags {
	display: flex;
	gap: 5px;
}

.permissions-switches {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.permission-row {
	display: flex;
	gap: 20px;
}
</style>