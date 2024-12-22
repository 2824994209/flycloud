<template>
	<BackAdmin>
		<div style="padding: 15px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);height: calc(100% - 50px);">
			<el-table :data="computedUsers" style="width: 100%" v-loading="loading">
				<el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="quotaDisplay" label="容量"></el-table-column>
				<el-table-column prop="roleNames" label="角色">
					<template #default="scope">
						<el-tag class="role-tag">
							{{ scope.row.roleNames }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间"></el-table-column>

				<el-table-column label="操作" width="300">
					<template #default="scope">
						<el-button type="primary" @click="openRoleDialog(scope.row)" size="small" plain
							style="border-radius: 10px !important;">角色绑定</el-button>
						<el-divider direction="vertical" />
						<el-button color="#ff9900" @click="openEditDialog(scope.row)" size="small" plain
							style="border-radius: 10px !important;">信息修改</el-button>
						<el-divider direction="vertical" />
						<el-button type="danger" @click="deleteUser(scope.row)" size="small" plain
							style="border-radius: 10px !important;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</BackAdmin>
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
				<el-form-item label="密码" prop="password">
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
	<!-- 角色绑定弹窗 -->
	<el-dialog title="角色绑定" v-model="roleDialogVisible" width="500px">
		<el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
			<el-form-item label="角色">
				<el-select v-model="form.role" placeholder="请选择角色">
					<el-option v-for="role in roles" :key="role.Id" :label="role.Name" :value="role.Id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="roleDialogVisible = false">取消</el-button>
				<el-button type="primary" @click="roleBinding">确定</el-button>
			</span>
		</template>
	</el-dialog>
	<!-- 删除确认弹窗 -->
	<el-dialog title="删除确认" v-model="deleteDialogVisible" width="400px">
		<div class="delete-confirm-content">
			<p>确定要删除该用户吗？此操作不可恢复。</p>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="deleteDialogVisible = false">取消</el-button>
				<el-button type="danger" @click="confirmDelete">确定</el-button>
			</span>
		</template>
	</el-dialog>
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
const roles = ref([]);
const roleDialogVisible = ref(false);
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

const loading = ref(false);

const fetchUsers = async () => {
	loading.value = true;
	try {
		const token = cookies.get('az');
		const response = await axios.get(`${backendAddress}/api/v1/admin/users`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if (response.data.code === 200) {
			users.value = response.data.data;
		}
	} catch (error) {
		console.error('获取用户列表失败:', error);
	} finally {
		loading.value = false;
	}
};

const dialogVisible = ref(false);
const form = ref({
	id: undefined,
	email: '',
	username: '',
	password: '',
	role: undefined,
	userId: undefined
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
		role: undefined
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
		if (response.data.code === 200) {
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
	} finally {
		
		dialogVisible.value = false;
	}
};

const deleteDialogVisible = ref(false);
const userToDelete = ref(null);

const deleteUser = (user) => {
	userToDelete.value = user;
	deleteDialogVisible.value = true;
};

const confirmDelete = async () => {
	try {
		const token = cookies.get('az');
		const response = await axios.delete(`${backendAddress}/api/v1/admin/users/${userToDelete.value.id}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		if (response.data.code === 200) {
			ElNotification({
				duration: 2000,
				title: 'success',
				message: '删除用户成功',
				type: 'success',
			});
			await fetchUsers(); // 刷新用户列表
		} else {
			ElNotification({
				duration: 2000,
				title: 'Error',
				message: response.data.message || '删除失败',
				type: 'error',
			})
		}
	} catch (error) {
		ElNotification({
			title: 'Error',
			message: error.message || '删除失败',
			type: 'error',
		})
	} finally {
		deleteDialogVisible.value = false;
	}
};

const openRoleDialog = async (user) => {
	form.value = {
		...form.value,
		userId: user.id,
		role: undefined
	};
	roleDialogVisible.value = true;
	const token = cookies.get('az');
	const res = await axiosInstance.get(`${backendAddress}/api/v1/admin/roles`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	roles.value = res.data.data;
}

const roleBinding = async () => {
	const token = cookies.get('az');
	try {
		const res = await axios.post(`${backendAddress}/api/v1/admin/users/${form.value.userId}/roles`, {
			role_id: form.value.role
		}, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if (res.data.code === 200) {
			ElNotification({
				duration: 2000,
				title: 'success',
				message: '绑定成功',
				type: 'success',
			})
			await fetchUsers();
		} else {
			ElNotification({
				duration: 2000,
				title: 'Error',
				message: res.data.message || '绑定失败',
				type: 'error',
			})
		}
	} catch (error) {
		ElNotification({
			title: 'Error',
			message: error.message || '绑定失败',
			type: 'error',
		})
	} finally {
		console.log('角色绑定操作完成:', {
			username: form.value.username,
			userId: form.value.userId,
			roleId: form.value.role
		});
		roleDialogVisible.value = false;
	}
}


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