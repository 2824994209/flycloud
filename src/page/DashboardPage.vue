<template>
  <MainLayout @update="handleUpdate">
    <div class="main_header">
      <span class="header-title">personal</span>
      <div class="header_left">
        <div class="typesetting">
          <button class="icon-button" @click="rowHeight = 30">
            <el-icon>
              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                focusable="false">
                <g xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5H21V7H3V5ZM3 9H21V11H3V9ZM3 17H21V19H3V17Z"></path>
                  <path d="M21 13H3V15H21V13Z"></path>
                </g>
              </svg>
            </el-icon>
          </button>

          <button class="icon-button" @click="rowHeight = 50">
            <el-icon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <g xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
                </g>
              </svg>
            </el-icon>

          </button>
          <button class="icon-button">
            <el-icon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
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
    <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          class="breadcrumb-item"
          @click="goToHome"
        >
          <!-- 首页 -->
           <span >&nbsp;</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="index"
          @click="handleBreadcrumbClick(item)"
          class="breadcrumb-item"
        >
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div ref="tableContainer" class="table-container">
      <el-table 
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-background="rgba(255, 255, 255, 1)"
        :data="tableData" 
        style="width: 100%; height: 500px;" 
        :row-style="{ height: rowHeight + 'px' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Name">
          <template #default="{ row }">
            <el-icon>
              <component :is="row.type === 'folder' ? Folder : Document" />
            </el-icon>
            <a class="el-table-column-a" @click="openFolder(row)" href="#">{{ row.name || row.file_name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="Size" width="130">
          <template #default="{ row }">
            <span v-if="row.type === 'file'">{{ formatFileSize(row.size) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Modified" width="130">
          <template #default="{ row }">
            <el-tooltip class="item" :content="formatTimestamp(row.UpdatedAt || row.updated_at)" placement="top">
              <span class="tooltip-text">{{ row.modifiedTimeElapsed }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column property="actions" label="Actions" width="90">
          <template #default="{ row }">
            <div style="display: flex;">
              <button class="actions-icon-button" @click="open1(row.file_name||row.name)">
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
                            <!-- 分享 -->
                            Share
                          </div>

                        </template>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <template #default>
                          <div class="xlcdList" @click="dropdownDownload(row)">
                            <el-icon>
                              <Download />
                            </el-icon>
                            <!-- 下载 -->
                            Download
                          </div>

                        </template>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <template #default>
                          <div class="xlcdList" @click="openDelete(row)">
                            <el-icon>
                              <Delete />
                            </el-icon>
                            Delete
                          </div>

                        </template>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <template #default>
                          <div class="xlcdList" @click="showDetails(row)">
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
      <!-- <div v-if="tableData.length === 0" class="no-data-message">No Data</div> -->
    </div>
  </MainLayout>
  <el-dialog 
    v-model="dropdownDelete" 
    :title="dropdownSelecteDelete?.type === 'folder' ? '删除文件夹' : '删除文件'" 
    width="500" 
    align-center
  >
    是否删除{{ dropdownSelecteDelete?.type === 'folder' ? dropdownSelecteDelete.name : dropdownSelecteDelete.file_name }}
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dropdownDelete = false" color="#626aef" plain>取消</el-button>
        <el-button type="primary" @click="deleteSuccessfully" color="#626aef">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <OperationFunction />

  <!-- 添加详情弹窗 -->
  <el-dialog 
    v-model="detailsVisible" 
    :title="detailsData.type === 'folder' ? '文件夹详情' : '文件详情'"
    width="400px"
  >
    <div class="details-content">
      <div class="detail-item">
        <span class="label">名称：</span>
        <span>{{ detailsData.type === 'folder' ? detailsData.name : detailsData.file_name }}</span>
      </div>
      <div class="detail-item">
        <span class="label">类型：</span>
        <span>{{ detailsData.type === 'folder' ? '文件夹' : '文件' }}</span>
      </div>
      <div class="detail-item">
        <span class="label">创建时间：</span>
        <span>{{ formatTimestamp(detailsData.CreatedAt) }}</span>
      </div>
      <div class="detail-item">
        <span class="label">修改时间：</span>
        <span>{{ formatTimestamp(detailsData.UpdatedAt || detailsData.updated_at) }}</span>
      </div>
      <template v-if="detailsData.type === 'folder'">
        <div class="detail-item">
          <span class="label">文件数量：</span>
          <span>{{ detailsData.file_count || 0 }}</span>
        </div>
        <div class="detail-item">
          <span class="label">子文件夹数量：</span>
          <span>{{ detailsData.sub_folder_count || 0 }}</span>
        </div>
      </template>
      <template v-else>
        <div class="detail-item">
          <span class="label">文件大小：</span>
          <span>{{ formatFileSize(detailsData.size) }}</span>
        </div>
      </template>
    </div>
  </el-dialog>
</template>
<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { ref, onMounted, inject, provide } from 'vue'
import { ElNotification } from 'element-plus'
import { Download } from '@element-plus/icons';
import axiosInstance from 'axios';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
import { Folder, Document } from '@element-plus/icons';
const backendAddress = inject('backendAddress');
import OperationFunction from '@/layouts/OperationFunction.vue';
// import { ElNotification } from 'element-plus';
// import UploadFile from '@/util/UploadFile.vue';
// import HelloWorld from '@/components/HelloWorld.vue';

const receivedData = ref('');
function calculateTimeElapsed(modifiedTimestamp) {
  if (!modifiedTimestamp) {
    return 'Unknown';
  }
  
  const currentTimestamp = Date.now();
  const diff = currentTimestamp - new Date(modifiedTimestamp).getTime();
  
  if (isNaN(diff)) {
    return 'Unknown';
  }
  
  const positiveDiff = Math.max(0, diff);
  
  if (positiveDiff < 1000 * 60) {
    // const seconds = Math.floor(positiveDiff / 1000);
    // return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    return `now`
  }
  if (positiveDiff < 1000 * 60 * 60) {
    const minutes = Math.floor(positiveDiff / (1000 * 60));
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  if (positiveDiff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(positiveDiff / (1000 * 60 * 60));
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  const days = Math.floor(positiveDiff / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

function formatFileSize(size) {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}
const handleUpdate = (data) => {
  //处理搜索框传过来的数据
  receivedData.value = data;
  console.log("接收到的数据：" + receivedData.value)
  fetchFolderData(receivedData.value,token.value)
};

//数据存放
const isEmpty = ref(false);
const tableData = ref([]);
const breadcrumbs = ref([]);

const rowHeight = ref(30); // 默认行高
const showMore = (row) => {
  console.log(row)
};

const open1 = (row) => {
  ElNotification({
    message: '成功复制' + row + '分享连接',
    type: 'success',
    plain: true,
  })
};

// dropdown
// 下载
const dropdownDownload = (row) => {
  // 检查是否为文件夹
  if (row.type === 'folder') {
    ElNotification({
      title: '提示',
      message: '文件夹不允许下载',
      type: 'warning',
      duration: 2000,
      showClose: false
    });
    return;
  }

  axiosInstance.get(`${backendAddress}/api/v1/fs/file/${row.id}`, {
    headers: {
      'Authorization': `Bearer ${token.value}`
    },
    responseType: 'blob'  // 设置响应类型为blob
  }).then(response => {    
    // 创建blob链接
    const blob = new Blob([response.data], { 
      type: response.headers['content-type'] 
    });
    const url = window.URL.createObjectURL(blob);
    
    // 创建一个临时的a标签来触发下载
    const link = document.createElement('a');
    link.href = url;
    link.download = row.file_name; // 使用文件原始名称
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }).catch(error => {
    console.error('下载失败:', error);
    ElNotification({
      title: '错误',
      message: '文件下载失败',
      type: 'error',
      duration: 2000,
      showClose: false
    });
  });
};

// 删除文件
const dropdownSelecteDelete = ref({
  type: '',
  name: '',
  file_name: ''
});
const dropdownDelete = ref(false)
const openDelete = (row) => {
  dropdownDelete.value = true
  console.log(row)
  dropdownSelecteDelete.value = row

}

const token = ref(cookies.get('az'))
const deleteSuccessfully = () => {
  dropdownDelete.value = false;
  axiosInstance.delete(`${backendAddress}/api/v1/fs/file/${dropdownSelecteDelete.value.id}`, {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  })
  .then(res => {
    if (res.data.code === 200) {
      //刷新
      fetchFolderData(cookies.get('currentFolderId'),token.value)
      ElNotification({
        duration: 2000,
        title: '',
        message: '删除文件成功',
        type: 'success',
        showClose: false
      });
    }else if(res.data.code === 500){
      ElNotification({
        duration: 2000,
        title: '',
        message: "文件删除失败",
        type: 'error',
        showClose: false
      });
    }
  })
  .catch(error => {
    console.log(error)
    ElNotification({
        duration: 2000,
        title: '',
        message: '删除文件失败',
        type: 'error',
        showClose: false
      });
  });
}
const rootfolderid = ref('')
const loading = ref(false);
const rootfolder = async (token) => {
  loading.value = true;
  try {
    const res = await axiosInstance.get(`${backendAddress}/api/v1/user/info`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.status === 200) {
      if(res.data.code === 200){
        rootfolderid.value = res.data.data.rootfolderid;
        cookies.set('rootfolderid', rootfolderid.value, '1d');
        cookies.set('currentFolderId', rootfolderid.value, '1d');
        await requestsRootfolder(token);
      } else {
        ElNotification({
          duration: 2000,
          title: 'error',
          message: res.data.message,
          type: 'error',
          showClose: false
        });
      }
    }
  } catch (error) {
    console.error('请求错误', error);
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '根目录信息请求失败',
      type: 'error',
      showClose: false
    });
  } finally {
    loading.value = false;
  }
};
const requestsRootfolder = async (token) => {
  const rootfolderid = cookies.get('rootfolderid');
  if (!rootfolderid) {
    console.error('请求错误');
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '根目录信息请求失败',
      type: 'error',
      showClose: false
    });
    return;
  }
  try {
    const res = await axiosInstance.get(`${backendAddress}/api/v1/fs/folder/${rootfolderid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.status === 200) {
      const data = res.data.data;
      // 修改这里的数据处理逻辑
      tableData.value = [
        ...(data.folders || []).map(folder => ({
          ...folder,
          type: 'folder',
          modifiedTimeElapsed: calculateTimeElapsed(folder.updated_at || folder.UpdatedAt)
        })),
        ...(data.files || []).map(file => ({
          ...file,
          type: 'file',
          modifiedTimeElapsed: calculateTimeElapsed(file.updated_at || file.UpdatedAt)
        }))
      ];
      
      breadcrumbs.value = data.breadcrumbs;
      isEmpty.value = tableData.value.length === 0;
    }
  } catch (error) {
    console.error('请求错误', error);
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '根目录信息请求失败',
      type: 'error',
      showClose: false
    });
  }
};

//更新触发

const upload = () =>{
  fetchFolderData(cookies.get('currentFolderId'),token.value)
}
provide('fetchFolderData', upload);

const fetchFolderData = async (folderId, token) => {
  loading.value = true;
  try {
    const res = await axiosInstance.get(`${backendAddress}/api/v1/fs/folder/${folderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.status === 200) {
      const data = res.data.data;
      // 只在获取数据时计算一次时间
      tableData.value = [
        ...(data.folders || []).map(folder => ({
          ...folder,
          type: 'folder',
          // 计算一次时间后就不再更新
          modifiedTimeElapsed: calculateTimeElapsed(folder.updated_at)
        })),
        ...(data.files || []).map(file => ({
          ...file,
          type: 'file',
          // 计算一次时间后就不再更新
          modifiedTimeElapsed: calculateTimeElapsed(file.UpdatedAt)
        }))
      ];
      
      breadcrumbs.value = data.breadcrumbs;
      isEmpty.value = tableData.value.length === 0;
    }
  } catch (error) {
    console.error('请求错误', error);
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '目录信息请求失败',
      type: 'error',
      showClose: false
    });
  } finally {
    loading.value = false;
  }
};

const openFolder = (row) => {
  if (row.type === 'folder') {
    // localStorage.setItem('currentFolderId', row.id);
    cookies.set('currentFolderId',row.id,'1d')
    const token = cookies.get('az')
    fetchFolderData(row.id,token);
  }
};

const handleBreadcrumbClick = (item) => {
  cookies.set('currentFolderId', item.id,'1d')
  const token = cookies.get('az');
  fetchFolderData(item.id, token);
};

const goToHome = () => {
  const rootFolderId = cookies.get('rootfolderid');
  cookies.set('currentFolderId', rootFolderId, '1d');
  const token = cookies.get('az');
  fetchFolderData(rootFolderId, token);
};

// 添加详情弹窗相关的响应式变量
const detailsVisible = ref(false);
const detailsData = ref({});

// 显示详情的方法
const showDetails = (row) => {
  detailsData.value = row;
  detailsVisible.value = true;
};

onMounted(() => {
  console.log('DashboardPage')
  
  console.log('请求地址', backendAddress)
  const token = cookies.get('az')
  //请求获取rootfolderid,记入到cookie
  rootfolder(token)
  //用rootfolderid请求根目录文件
  
  


})
</script>

<style>
.common-layout {
  --el-border-radius-base: 10px;
}

/* 去掉列表滚动条 */
.el-scrollbar .el-scrollbar__bar.is-vertical .el-scrollbar__thumb {
    display: none;
  }

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-data-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* 与表格高度一致 */
  font-size: 18px;
  color: #999;
}
:root {
  --popper-overflow: hidden;
  /* 默认值 */
}

.el-popper {
  overflow: var(--popper-overflow);
}

.custom-popper {
  --popper-overflow: auto;
  /* 只在这个下拉菜单中设置为 auto */
}

.no-triangle::after {
  display: none;
}

.xlcdList {
  color: #d7adfe;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
  padding: 2px 0;
}

.xlcdList:hover {
  color: #805ea0;
}

.shangc {
  display: flex;
}

.custom-dropdown .el-dropdown-item:hover {
  background-color: #478068;
  /* 粉色背景 */
  color: white;
  /* 鼠标悬停时文字变为白色 */
}

/* .custom-dropdowna li{
  color: rgb(255, 145, 0);
  transition: background-color 0.3s, color 0.3s;
  background-color: transparent; 

} */
.custom-dropdowna {
  position: relative;
  display: inline-block;
  width: 150px;
  max-width: 200px;
  /* 根据需要调整宽度 */
  white-space: nowrap;
  /* 防止换行 */
  /* margin-left: 50px; */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  /* 让下拉框在按钮下方显示 */
  left: 0;
  background: white;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  /* 确保下拉框在其他元素之上 */
  margin-top: 5px;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

* {
  z-index: 1
}


.shangc {
  padding: 10px 0;
  margin: 10px 0;
}

.icon-bold {
  font-weight: bold;
}

.button-with-icon {
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

.actions-icon-button {
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
  border: 2px solid rgb(114, 118, 119);
  color: rgb(114, 118, 119);
  width: 35px;
  padding: 5px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: none;
}

.icon-button:last-child {
  border-right: 2px solid rgb(114, 118, 119);

  border-radius: 0 5px 5px 0;
}

.icon-button:first-child {
  border-radius: 5px 0 0 5px;
}

.icon-button:hover {
  background-color: #e0e0e0;
}

.settings-button {
  margin-left: 8px;
  background: none;
  color: rgb(114, 118, 119);
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
.el-table-column-a{
  padding-left: 10px;

}



.details-content {
  padding: 10px;
}

.detail-item {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
}

.detail-item .label {
  width: 100px;
  color: #606266;
  font-weight: 500;
}




</style>
