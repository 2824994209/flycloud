<template>
	<div @click="MergeDeletecontent()">
		<slot></slot>
	</div>
	<el-dialog v-model="dropdownDelete" :title="'确定删除'" width="500px">
		<div class="delete-confirm-content">
			<div class="warning-icon-circle">
				<el-icon class="warning-icon">
					<Warning />
				</el-icon>
			</div>
			<span class="delete-text">
				合并删除{{ selectedFiles.length }}个文件？
			</span>
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button type="primary" @click="deleteCycle()" color="#626aef">
					确定
				</el-button>
				<el-button @click="dropdownDelete = false" color="#626aef" plain>取消</el-button>

			</div>
		</template>
	</el-dialog>
</template>
<script setup>
import { ref,inject } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
const selectedFiles = inject('selectedFiles', []);
const fetchFolderData = inject('fetchFolderData');

import { ElNotification } from 'element-plus'
import axiosInstance from '@/config/axiosInstance';
// import axiosInstance from 'axios';

const dropdownDelete = ref(false);
const MergeDeletecontent = () => {
	if(selectedFiles.value.length == 0){
		ElNotification({
			title: '请选择文件',
			message: '请选择文件',
			type: 'warning',
		});
		return;
	}
	dropdownDelete.value = true;
	console.log('MergeDeletecontent');
};
const deleteCycle = () => {
	selectedFiles.value.forEach((file) => {
		deleteJudgment(file.id);
	});
};
const deleteJudgment = async (files_id) => {
	const token = cookies.get('az');
	try {
		const response = await axiosInstance.delete(`${backendAddress}/api/v1/fs/file/${files_id}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});

		if (response.data.code === 200) {
			ElNotification({
				title: '删除成功',
				message: '文件已成功删除',
				type: 'success',
			});
			dropdownDelete.value = false;
			fetchFolderData();
		} else {
			ElNotification({
				title: '删除失败',
				message: response.data.message,
				type: 'error',
			});
		}
	} catch (error) {
		console.error(error);
		ElNotification({
			title: '删除失败',
			message: '文件删除失败',
			type: 'error',
		});
	}
};
</script>
<style></style>