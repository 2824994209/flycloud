<template>
	<MainLayout>
		<div class="main_header">
			<span class="header-title">personal</span>
			<div class="header_left">
				<div class="typesetting">
					<button class="icon-button" @click="rowHeight = 30">
						<el-icon>
							<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true" focusable="false">
								<g xmlns="http://www.w3.org/2000/svg">
									<path d="M3 5H21V7H3V5ZM3 9H21V11H3V9ZM3 17H21V19H3V17Z"></path>
									<path d="M21 13H3V15H21V13Z"></path>
								</g>
							</svg>
						</el-icon>
					</button>

					<button class="icon-button" @click="rowHeight = 50">
						<el-icon>
							<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
								focusable="false">
								<g xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
								</g>
							</svg>
						</el-icon>

					</button>
					<button class="icon-button">
						<el-icon>
							<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
								focusable="false">
								<g xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path
										d="M6.5 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm.5 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm10-10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z">
									</path>
								</g>
							</svg>
						</el-icon>

					</button>
				</div>
				<!-- <button class="settings-button">
					<el-dropdown trigger="click" :hide-on-click="false">
						<span class="el-dropdown-link">
							<el-icon size="20px">
								<Setting />
							</el-icon>
						</span>
						<template #dropdown>
							<el-dropdown-menu class="custom-dropdown">
								<el-dropdown-item command="a">
									<template #default>
										Items per page
										<div class="custom-select-container">
											<select v-model="itemsPerPage" :placeholder="itemsPerPage"
												class="custom-select">
												<option value="10">10</option>
												<option value="20">20</option>
												<option value="50">50</option>
												<option value="100">100</option>
											</select>
										</div>
									</template>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>

				</button> -->
			</div>

		</div>
		<div class="shangc">
		<el-breadcrumb :separator-icon="ArrowRight">

			<el-breadcrumb-item
				v-for="(item, index) in breadcrumbList"
				:key="index"
				:to="item.to"
				
			>
			<span @click="handleBreadcrumbClick(item)">
				{{ item.label }}
				</span>
			</el-breadcrumb-item>
		</el-breadcrumb>
		</div>
		<div style="">
			<el-table :data="currentFolder" style="width: 100%;height: 500px;" :row-style="{ height: rowHeight + 'px' }">
				<el-table-column type="selection" width="55" />
				<el-table-column  label="Name" >
					<template #default="{ row }">
						<a class="el-table-column-a"  @click="openFolder(row)" href="#">{{ row.name }}</a>
					</template>
				</el-table-column>
				<el-table-column property="size" label="Size" width="90" />
				<el-table-column label="Modified" width="130">
					<template #default="{ row }">
						<el-tooltip class="item" :content="formatTimestamp(row.modified)" placement="top">
							<span class="tooltip-text">{{ row.modifiedTimeElapsed }}</span>
						</el-tooltip>
					</template>
				</el-table-column>

				<el-table-column property="actions" label="Actions" width="90">
					<template #default="{ row }">
						<div style="display: flex;">
							<button class="actions-icon-button" @click="open1(row.name)">
								<el-icon>
									<Link />
								</el-icon>

							</button>
							<button class="actions-icon-button" @click="showMore(row.name)">
								<el-dropdown trigger="click" placement="bottom-end">
									<span class="el-dropdown-link">
										<el-icon>
											<More />
										</el-icon>
									</span>
									<template #dropdown>
										<el-dropdown-menu class="custom-dropdowna">
											<el-dropdown-item>
												<template #default>
													<div class="xlcdList">
														<el-icon>
															<Share />
														</el-icon>
														Share
													</div>

												</template>
											</el-dropdown-item>
											<el-dropdown-item>
												<template #default>
													<div class="xlcdList">
														<el-icon>
															<Download />
														</el-icon>
														Download
													</div>

												</template>
											</el-dropdown-item>
											<el-dropdown-item>
												<template #default>
													<div class="xlcdList">
														<el-icon>
															<Delete />
														</el-icon>
														Delete
													</div>

												</template>
											</el-dropdown-item>
											<el-dropdown-item>
												<template #default>
													<div class="xlcdList">
														<el-icon>
															<InfoFilled />
														</el-icon>
														Details
													</div>

												</template>
											</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</MainLayout>
</template>
<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import {ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
// import { ElNotification } from 'element-plus';
// import UploadFile from '@/util/UploadFile.vue';
// import HelloWorld from '@/components/HelloWorld.vue';

//数据存放
const tableData = ref([
  {
    name: 'Folder 1',
    type: 'folder',
    modified: '1730893521000',
  },
  {
    name: 'Folder 2',
    type: 'folder',
    modified: '1730893521000',
  },
  {
    name: 'File 2',
    type: 'file',
	size: '10GB',
    modified: '1730893521000',
  },
])
const folderData = ref([
  {
    name: 'test1',
    type: 'folder',
    modified: '1730893521000',
  },
  {
    name: 'test2',
    type: 'folder',
    modified: '1730893521000',
  },
  {
    name: 'File 2',
    type: 'file',
	size: '10GB',
    modified: '1730893521000',
  },
])

const breadcrumbList= ref([
      { label: '首页', to: '/user/personal' },
    ])
const currentFolder = ref(tableData.value); // 初始为根文件夹

const openFolder = (folder) => {
	console.log(folder.name)
  if (folder.type == 'folder') {
    currentFolder.value = folderData.value
	breadcrumbList.value.push({ label: folder.name, to: `#${folder.name}`, });
  }
};
const handleBreadcrumbClick = (item) => {
  console.log(`Clicked on: ${item.label}`);
  // 找到点击的面包屑项的索引
  const index = breadcrumbList.value.findIndex(b => b.label === item.label);
  // 截取到该索引为止的面包屑
  breadcrumbList.value = breadcrumbList.value.slice(0, index + 1);
};

//对比文件最后修改的时间
const currentTimestamp = Date.now()
function calculateTimeElapsed(modifiedTimestamp) {
  const diff = currentTimestamp - modifiedTimestamp;
  if (diff < 1000 * 60) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds} second ago`;
  }
  if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minute ago`;
  }
  if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hour ago`;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} day ago`;
}
tableData.value.forEach(item =>{
	item.modifiedTimeElapsed = calculateTimeElapsed(item.modified);
})
const formatTimestamp = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  return date.toLocaleString();
}

const rowHeight = ref(30); // 默认行高
const showMore = (row) =>{
	console.log(row)
};

const open1 = (row) => {
	ElNotification({
    message: '成功复制'+row+'下载连接',
    type: 'success',
    plain: true,
  })
};
</script>

<style >
:root {
    --popper-overflow: hidden; /* 默认值 */
}

.el-popper {
    overflow: var(--popper-overflow);
}

.custom-popper {
    --popper-overflow: auto; /* 只在这个下拉菜单中设置为 auto */
}

.no-triangle::after {
  display: none;
}
.xlcdList{
	color: #d7adfe;
	width: 100%;
	height: 100%;
	transition: background-color 0.3s ease;
	padding: 2px 0;
}
.xlcdList:hover{
	color: #805ea0;
}

.shangc {
  /* padding: 10px 0;
  margin: 5px 0; */
  /* 确保没有 overflow: hidden; */
  display: flex;
}
.custom-dropdown .el-dropdown-item:hover {
  background-color: #478068; /* 粉色背景 */
  color: white; /* 鼠标悬停时文字变为白色 */
}
/* .custom-dropdowna li{
  color: rgb(255, 145, 0);
  transition: background-color 0.3s, color 0.3s;
  background-color: transparent; 

} */
.custom-dropdowna  {
  position: relative;
  display: inline-block;
  width: 150px;
  max-width: 200px; /* 根据需要调整宽度 */
  white-space: nowrap; /* 防止换行 */
  /* margin-left: 50px; */
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* 让下拉框在按钮下方显示 */
  left: 0;
  background: white;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 确保下拉框在其他元素之上 */
  margin-top: 5px;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

*{
	z-index: 1
}


.shangc{
	padding: 10px 0;
	margin: 10px 0;
}
.icon-bold{
	font-weight:bold;
}
.button-with-icon{
	padding-top: 13px;
	padding-bottom: 13px;
	height: 35px;
}
/* .button-with-icon:last-child:hover{
	background-color: #d0d2fa;
	border: none;
} */
.main_header {
  display: flex;
  
  align-items: center;
	/* background-color: aquamarine; */
}

.header-title {
  flex: 1;
  text-align: left;
  font-size: 15px;
  height: 30px;
}

.header_left {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.typesetting {
  display: flex;
  /* border-radius: 10px; */
  overflow: hidden;
  /* background-color: #f0f0f0; */
}
.actions-icon-button{
	background: none;
	width: 35px;
  padding: 5px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none; 
	padding-left: 0;
	margin-left: 0;
}
.icon-button {
  background: none;
  border: 2px solid rgb(114,118,119);
	color: rgb(114,118,119);
	width: 35px;
  padding: 5px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: none; 
}

.icon-button:last-child {
  border-right: 2px solid rgb(114,118,119);
	
	border-radius: 0 5px 5px 0;
}
.icon-button:first-child{
	border-radius: 5px 0 0 5px;
}

.icon-button:hover {
  background-color: #e0e0e0;
}
.settings-button {
  margin-left: 8px;
	background: none;
	color: rgb(114,118,119);
  border: 0px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
	
}
.settings-button:hover {
  background-color: #e0e0e0;
}

</style>
