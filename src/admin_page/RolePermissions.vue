<template>
	<BackAdmin>
		<div class="role-container"
			style="padding: 15px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);height: calc(100% - 50px);">
			<el-button @click="addRole" type="primary" style="margin-bottom: 10px;">添加角色</el-button>
			<el-table :data="roles" style="width: 100%" :loading="loading" element-loading-text="加载中...">
				<el-table-column prop="Name" label="角色名称" width="180" />
				<el-table-column label="权限" min-width="400">
					<template #default="scope">
						<el-tag v-for="perm in scope.row.Permissions" :key="perm.Id" class="permission-tag">
							{{ perm.Name }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300">
					<template #default="scope">
						<el-button type="primary" @click="handleEdit(scope.row)" size="small" plain
							style="border-radius: 10px !important;">修改</el-button>
						<el-divider direction="vertical" />
						<el-button type="danger" @click="handleDelete(scope.row)" size="small" plain
							style="border-radius: 10px !important;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</BackAdmin>
	<!-- 编辑角色对话框 -->
	<el-dialog v-model="dialogVisible" title="编辑角色" width="50%">
		<el-form :model="currentRole" label-width="120px">
			<el-form-item label="角色名称">
				<el-input v-model="currentRole.Name" />
			</el-form-item>
			<el-form-item label="权限">
				<el-checkbox-group v-model="selectedPermissionIds">
					<el-checkbox v-for="perm in allPermissions" :key="perm.Id" :value="perm.Id">
						{{ perm.Name }}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" @click="saveRole">确定</el-button>
		</template>
	</el-dialog>
	<!-- 添加角色对话框 -->
	<el-dialog v-model="addRoleDialogVisible" title="添加角色" width="500px">
		<el-form :model="currentRole">
			<el-form-item>
				<el-input v-model="currentRole.Name" placeholder="请输入角色名称" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div style="display: flex;justify-content: center;">
				<el-button @click="addRoleDialogVisible = false">取消</el-button>
				<el-button type="primary" @click="qdaddRole">确定</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import BackAdmin from '@/layouts/BackAdmin.vue'
import { ref, onMounted, inject } from 'vue'
import { ElNotification } from 'element-plus'
import axios from 'axios'
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
const roles = ref([])
const dialogVisible = ref(false)
const currentRole = ref({})
const selectedPermissionIds = ref([])
const allPermissions = ref([])
const loading = ref(false)
const addRoleDialogVisible = ref(false)
// 获取角色列表
const fetchRoles = async () => {
	try {
		loading.value = true
		const token = cookies.get('az');
		const response = await axios.get(`${backendAddress}/api/v1/admin/roles`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		if (response.data.code === 200) {
			roles.value = response.data.data
		} else {
			ElNotification.error(response.data.message)
		}
	} catch (error) {
		ElNotification.error('获取角色列表失败')
	} finally {
		loading.value = false
	}
}

// 获取所有权限列表
const fetchAllPermissions = async () => {
	try {
		const token = cookies.get('az');
		const response = await axios.get(`${backendAddress}/api/v1/admin/permissions`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		const data = response.data
		if (data.code === 200) {
			allPermissions.value = data.data
		}
	} catch (error) {
		ElNotification({
			duration: 2000,
			title: 'error',
			message: '获取权限列表失败',
			type: 'error',
			showClose: false
		});
	}
}

// 编辑角色
const handleEdit = (row) => {
	currentRole.value = { ...row }
	selectedPermissionIds.value = row.Permissions.map(p => p.Id)
	dialogVisible.value = true
}

// 删除角色
const handleDelete = async (row) => {
	console.log(row)
	try {
		// await ElMessageBox.confirm('确认删除该角色吗？', '提示', {
		// 	type: 'warning'
		// })
		// 调用删除API
		// await fetch(`/api/v1/admin/roles/${row.Id}`, { method: 'DELETE' })
		ElNotification({
			duration: 2000,
			title: 'success',
			message: '删除角色成功',
			type: 'success',
			showClose: false
		});
		await fetchRoles()
	} catch (error) {
		ElNotification({
			duration: 2000,
			title: 'error',
			message: '删除角色失败',
			type: 'error',
			showClose: false
		});

	}
}

// 保存角色
const saveRole = async () => {
	try {
		const token = cookies.get('az');
		await axios.post(`${backendAddress}/api/v1/admin/roles/${currentRole.value.Id}/permissions`, {
			permission_ids: selectedPermissionIds.value
		}, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		dialogVisible.value = false
		ElNotification({
			duration: 2000,
			title: 'success',
			message: '保存角色成功',
			type: 'success',
			showClose: false
		});
		await fetchRoles()
	} catch (error) {
		ElNotification({
			duration: 2000,
			title: 'error',
			message: '保存角色失败',
			type: 'error',
			showClose: false
		});
	}
}

// 添加角色方法
const addRole = () => {
	currentRole.value = {
		Name: '',
		Permissions: []
	}
	selectedPermissionIds.value = []
	addRoleDialogVisible.value = true
}
const qdaddRole = async () => {
	try {
		const token = cookies.get('az');
		await axios.post(`${backendAddress}/api/v1/admin/roles`, {
			name: currentRole.value.Name
		}, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		ElNotification({
			duration: 2000,
			title: 'success',
			message: '添加角色成功',
			type: 'success',
			showClose: false
		});
	} catch (error) {
		ElNotification({
			duration: 2000,
			title: 'error',
			message: '添加角色失败',
			type: 'error',
			showClose: false
		});
	} finally {
		addRoleDialogVisible.value = false
		await fetchRoles()
	}
}
onMounted(() => {
	fetchRoles()
	fetchAllPermissions()
})
</script>

<style scoped>
.role-container {
	padding: 20px;
}

.permission-tag {
	margin-right: 5px;
	margin-bottom: 5px;
}
</style>