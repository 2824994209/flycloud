<template>
	<MainLayout>
		<div class="content-container">
			<div class="grid-row">
				<div class="shadow-box">
					<h3>用户信息</h3>
					<div class="user-info">
						<span>用户名：{{ userInfo }}</span>
						<div style="margin-bottom: 10px;"></div>
						<span>邮箱：{{ userEmail }}</span>
					</div>
					<div class="button-group">
						<el-button color="#626aef" @click="showUsernameDialog">修改用户名</el-button>
						<el-button color="#626aef" @click="showPasswordDialog">修改密码</el-button>
					</div>
				</div>
				<div class="shadow-box">
					<h3>文件类型分布</h3>
					<div ref="typeChartRef" style="height: 300px"></div>
				</div>
			</div>

			<div class="grid-row">
				<div class="shadow-box">
					<h3>文件统计</h3>
					<div ref="statsChartRef" style="height: 300px"></div>
				</div>
				<div class="shadow-box">
					<h3>存储空间</h3>
					<div ref="quotaChartRef" style="height: 300px"></div>
				</div>
			</div>
		</div>

		<!-- 对话框部分保持不变 -->
		<el-dialog v-model="usernameDialogVisible" title="修改用户名" width="30%" center>
			<el-input v-model="newUsername" placeholder="请输入新的用户名" maxlength="20" show-word-limit />
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="updateUsername" color="#626aef">
						确认
					</el-button>
					<el-button @click="usernameDialogVisible = false">取消</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 添加修改密码对话框 -->
		<el-dialog v-model="passwordDialogVisible" title="修改密码" width="30%" center>
			<el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef">
				<el-form-item prop="oldPassword">
					<el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入原密码" show-password />
				</el-form-item>
				<el-form-item prop="newPassword">
					<el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" show-password />
				</el-form-item>
				<el-form-item prop="confirmPassword">
					<el-input v-model="passwordForm.confirmPassword" type="password" placeholder="��确认新密码" show-password />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="updatePassword" color="#626aef">
						确认
					</el-button>
					<el-button @click="closePasswordDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { ref, onMounted, inject } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
import { ElNotification } from 'element-plus'
const backendAddress = inject('backendAddress');

const typeChartRef = ref(null);
const statsChartRef = ref(null);
const quotaChartRef = ref(null);
const userInfo = ref("");
const userEmail = ref("");
const usernameDialogVisible = ref(false);
const passwordDialogVisible = ref(false);
const newUsername = ref('');
const passwordFormRef = ref(null);
const passwordForm = ref({
	oldPassword: '',
	newPassword: '',
	confirmPassword: ''
});

const showUsernameDialog = () => {
	usernameDialogVisible.value = true;
};
const showPasswordDialog = () => {
	passwordDialogVisible.value = true;
};

const token = cookies.get('az');
// 获取用户信息
const getUserInfo = async () => {
	try {
		const res = await axios.get(`${backendAddress}/api/v1/user/info`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		userInfo.value = res.data.data.username;
		userEmail.value = res.data.data.email;
		console.log("userInfo", userInfo.value)
	} catch (error) {
		console.error('获取用户信息失败', error);
	}
};

// 初始化文件类型图表
const initTypeChart = async () => {
	try {
		const res = await axios.get(`${backendAddress}/api/v1/fs/types`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		const types = res.data.data.types;

		const colors = ['#626aef', '#6c8ff7', '#95a7fb', '#bdc4fd'];
		const barData = types.map((type, index) => ({
			name: type,
			value: 1,
			itemStyle: {
				color: colors[index],  // 为每个条形设置不同的颜色
				borderRadius: [0, 4, 4, 0]  // 右侧圆角
			}
		}));

		const chart = echarts.init(typeChartRef.value);
		chart.setOption({
			tooltip: {
				show: false
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '10%',
				containLabel: true
			},
			xAxis: {
				show: false,
				type: 'value'
			},
			yAxis: {
				type: 'category',
				data: types.map(type => type.toLowerCase()),
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: '#333',
					fontSize: 14,
					margin: 20,
					fontWeight: 500  // 加粗文字
				}
			},
			series: [
				{
					type: 'bar',
					data: barData,
					barWidth: '30%',
					label: {
						show: false
					}
				}
			]
		});

		window.addEventListener('resize', () => {
			chart.resize();
		});

	} catch (error) {
		console.error('获取文件类型数据失败', error);
	}
};

// 初始化文件统计图表
const initStatsChart = async () => {
	try {
		const res = await axios.get(`${backendAddress}/api/v1/fs/stats`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		const typeStats = res.data.data.type_stats;
		const totalFiles = res.data.data.total_files;

		const pieData = typeStats.map(item => ({
			name: item.type.toLowerCase(),
			value: item.count,
			itemStyle: {
				borderRadius: 5
			}
		}));

		const chart = echarts.init(statsChartRef.value);
		chart.setOption({
			title: {
				text: `总文件数：${totalFiles}`,
				left: 'center',
				top: '1%',
				textStyle: {
					color: '#333',
					fontSize: 14,
					fontWeight: 'normal'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: '{b}: {c} 个文件 ({d}%)'
			},
			// legend: {
			// 	orient: 'vertical',
			// 	left: 'left',
			// 	top: 'middle',
			// 	itemWidth: 10,
			// 	itemHeight: 10,
			// 	itemGap: 15,
			// 	formatter: name => {
			// 		const item = typeStats.find(s => s.type.toUpperCase() === name);
			// 		return `${name}: ${item.count}个`;
			// 	}
			// },
			series: [
				{
					name: '文件统计',
					type: 'pie',
					radius: ['40%', '70%'],
					center: ['50%', '50%'],
					avoidLabelOverlap: true,
					itemStyle: {
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: false
					},
					emphasis: {
						label: {
							show: false
						},
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.2)'
						}
					},
					labelLine: {
						show: false
					},
					data: pieData
				}
			],
			color: [
				'#626aef',
				'#6c8ff7',
				'#95a7fb',
				'#bdc4fd'
			]
		});

		window.addEventListener('resize', () => {
			chart.resize();
		});

	} catch (error) {
		console.error('获取文件统计数据失败', error);
	}
};

// 添加初始化配额图表的方法
const initQuotaChart = async () => {
	try {
		const res = await axios.get(`${backendAddress}/api/v1/user/quota`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		
		const { quota, used_size } = res.data.data;
		const usedGB = (used_size / 1024 / 1024 / 1024).toFixed(2);
		const totalGB = (quota / 1024 / 1024 / 1024).toFixed(2);
		
		const chart = echarts.init(quotaChartRef.value);
		chart.setOption({
			title: {
				text: `已使用：${usedGB}GB / ${totalGB}GB`,
				left: 'center',
				top: '1%',
				textStyle: {
					color: '#333',
					fontSize: 14,
					fontWeight: 'normal'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: '{b}: {c}GB ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				top: 'middle',
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 15,
				formatter: name => {
					if (name === '已使用') {
						return `已使用`;
					}
					return `剩余空间`;
				}
			},
			series: [
				{
					name: '存储空间',
					type: 'pie',
					radius: ['40%', '70%'],
					center: ['50%', '50%'],
					avoidLabelOverlap: true,
					itemStyle: {
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: false
					},
					emphasis: {
						label: {
							show: false
						},
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.2)'
						}
					},
					data: [
						{
							value: usedGB,
							name: '已使用',
							itemStyle: { color: '#626aef' }
						},
						{
							value: (totalGB - usedGB).toFixed(2),
							name: '剩余空间',
							itemStyle: { color: '#bdc4fd' }
						}
					]
				}
			]
		});

		window.addEventListener('resize', () => {
			chart.resize();
		});

	} catch (error) {
		console.error('获取配额信息失败', error);
	}
};

// 更新用户名的方法
const updateUsername = async () => {
	if (!newUsername.value) {
		ElNotification({
			duration: 2000,
			title: 'error',
			message: '用户名不能为空',
			type: 'error',
			showClose: false,
		});
		return;
	}

	try {
		const res = await axios.put(`${backendAddress}/api/v1/user/username`, {
			username: newUsername.value
		}, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if (res.data.code === 200) {
			ElNotification({
				duration: 2000,
				title: 'success',
				message: '用户名修改成功',
				type: 'success',
				showClose: false,
			});
			userInfo.value = newUsername.value;
			usernameDialogVisible.value = false;
		}
	} catch (error) {
		console.error('更新用户名失败', error);
	}
};

// 密码验证规���
const passwordRules = {
	oldPassword: [
		{ required: true, message: '请输入原密码', trigger: 'blur' }
	],
	newPassword: [
		{ required: true, message: '请输入新密码', trigger: 'blur' },
		{ min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
	],
	confirmPassword: [
		{ required: true, message: '请确认新密码', trigger: 'blur' },
		{
			validator: (rule, value, callback) => {
				if (value !== passwordForm.value.newPassword) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			},
			trigger: 'blur'
		}
	]
};

// 关闭对话框并重置表单
const closePasswordDialog = () => {
	passwordDialogVisible.value = false;
	passwordFormRef.value?.resetFields();
};

// 更新密码的方法
const updatePassword = async () => {
	if (!passwordFormRef.value) return;

	await passwordFormRef.value.validate(async (valid) => {
		if (valid) {
			try {
				const res = await axios.put(`${backendAddress}/api/v1/user/password`, {
					old_password: passwordForm.value.oldPassword,
					new_password: passwordForm.value.newPassword
				}, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});

				if (res.data.code === 200) {
					ElNotification({
						duration: 2000,
						title: 'success',
						message: '密码修改成功',
						type: 'success',
						showClose: false,
					});
					closePasswordDialog();
				}
			} catch (error) {
				console.error('修改密码失败', error);
				ElNotification({
					duration: 2000,
					title: 'error',
					message: '修改密码失败',
					type: 'error',
					showClose: false,
				});
			}
		}
	});
};

onMounted(() => {
	getUserInfo();
	initTypeChart();
	initStatsChart();
	initQuotaChart();
});
</script>

<style scoped>
.content-container {
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	height: calc(100% - 10px);
	max-width: 100%;
	box-sizing: border-box;
}

.grid-row {
	display: flex;
	gap: 20px;
	justify-content: center;
	height: calc(60% - 10px);
}

.shadow-box {
	flex: 1;
	max-width: 600px;
	min-width: 280px;
	max-height: 230px;
	padding: 25px;
	border-radius: 12px;
	background-color: #fff;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	height: 100%;
}

.chart-box>div {
	flex: 1;
	min-height: 0;
}

.info-box,
.chart-box {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.button-group {
	margin-top: auto;
	padding-top: 20px;
}

h3 {
	margin-bottom: 15px;
	color: #333;
	font-size: 16px;
}

@media screen and (max-width: 1200px) {
	.grid-row {
		gap: 15px;
	}

	.shadow-box {
		min-width: 250px;
	}
}

@media screen and (max-width: 768px) {
	.grid-row {
		flex-direction: column;
		align-items: stretch;
		height: auto;
	}

	.shadow-box {
		max-width: 100%;
		height: 300px;
	}
}


:deep(.el-input__wrapper) {
  border-radius: 10px !important;
  box-shadow: none;
  border: 1px solid #dcdfe6;
}

:deep(.el-input__wrapper:focus-within) {
  border-color: #626aef !important;
  box-shadow: 0 0 0 1px #626aef !important;
}
</style>