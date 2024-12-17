<template>
	<BackAdmin>
		<div style="padding: 15px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);height: calc(100% - 50px);">
			<el-table :data="computedUsers" style="width: 100%">
				<el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="quotaDisplay" label="容量"></el-table-column>
				<el-table-column prop="created_at" label="创建时间"></el-table-column>
				<el-table-column prop="roleNames" label="角色"></el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button type="primary" @click="openEditDialog(scope.row)" size="small" plain style="border-radius: 10px !important;">修改</el-button>
						<el-divider direction="vertical" />
						<el-button type="danger" @click="deleteUser(scope.row)" size="small" plain style="border-radius: 10px !important;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 修改用户信息的弹窗 -->
			<el-dialog title="修改用户信息" v-model="dialogVisible" width="500px">
				<div class="dialog-form">
					<el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
						<el-form-item label="邮箱">
							<el-input v-model="form.email"></el-input>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input v-model="form.username"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input v-model="form.password" type="password" show-password></el-input>
						</el-form-item>
					</el-form>
				</div>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogVisible = false">取消</el-button>
						<el-button type="primary" @click="handleSaveUser">确定</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</BackAdmin>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import BackAdmin from '@/layouts/BackAdmin.vue';
import axios from 'axios';
import axiosInstance from '@/config/axiosInstance';
import { useCookies } from 'vue3-cookies';
import { ElNotification } from 'element-plus';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
const users = ref([]);

// 格式化容量显示
const formatQuota = (bytes) => {
	const gb = bytes / (1024 * 1024 * 1024);
	return `${gb.toFixed(2)}GB`;
};

const computedUsers = computed(() => {
	return users.value.map(user => ({
		...user,
		quotaDisplay: formatQuota(user.quota),
		roleNames: user.roles.map(role => role.Name).join(', ')
	}));
});

const fetchUsers = async () => {
	try {
		const token = cookies.get('az');
		const response = await axiosInstance.get(`${backendAddress}/api/v1/admin/users`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if (response.data.code === 200) {
			users.value = response.data.data;
		}
	} catch (error) {
		console.error('获取用户列表失败:', error);
	}
};

const dialogVisible = ref(false);
const form = ref({
	email: '',
	username: '',
	password: '',
});

const formRef = ref(null);

const rules = {
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
	]
};

const openEditDialog = (user) => {
	form.value = {
		email: user.email,
		username: user.username,
		password: '',
	};
	dialogVisible.value = true;
};

const handleSaveUser = async () => {
	try {
		await formRef.value.validate();
		const token = cookies.get('az');
		const body = {
			email: form.value.email,
			name: form.value.username,
			password: form.value.password,
		}
		const response = await axios.put(`${backendAddress}/api/v1/admin/users`, body, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if(response.data.code === 200){
			ElNotification({
				duration: 2000,
				title: 'success',
				message: '保存成功',
				type: 'success',
			})
			dialogVisible.value = false;
			await fetchUsers(); // 刷新用户列表
		}
	} catch (error) {
		ElNotification({
			title: 'Error',
			message: error.message || '保存失败',
			type: 'error',
		})
	}
};

const deleteUser = async (user) => {
	console.log(user)
	// 这里需要实现删除用户的逻辑
	await fetchUsers(); // 刷新用户列表
};

onMounted(() => {
	fetchUsers();
});
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

.permission-tags {
	display: flex;
	gap: 5px;
}

.permissions-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;
	padding: 10px 0;
	padding-top: 0;
}

.permission-item {
	display: flex;
	align-items: center;
	/* gap: 10px; */
}

.permission-label {
	font-size: 14px;
	padding-left: 10px;
	color: #606266;
}
</style>