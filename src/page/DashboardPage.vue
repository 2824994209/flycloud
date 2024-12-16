<template>
  <MainLayout @update="handleUpdate">
    <div class="main_header">
      <span class="header-title">个人空间</span>
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
        
      </div>

    </div>
    <div class="shangc">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="breadcrumb-item" @click="goToHome">
          <!-- 首页 -->
          <span>&nbsp;</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" @click="handleBreadcrumbClick(item)"
          class="breadcrumb-item">
          <!-- <a href="#">{{ item.name }}</a> -->
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div ref="tableContainer" class="table-container">
      <el-table v-loading="loading" element-loading-text="Loading..."
        element-loading-background="rgba(255, 255, 255, 1)" :data="tableData" style="width: 100%; height: calc(100vh - 200px);"
        :row-style="{ height: rowHeight + 'px' }" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="Name" min-width="200"   show-overflow-tooltip>
          <template #default="{ row }">
            <el-icon size="20" style="margin-bottom: 3px; vertical-align: middle;">
              <template v-if="row.type === 'folder'">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="#9873d9"
                    d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V6h5.17l2 2H20z" />
                </svg>
              </template>
              <template v-else>
                <!-- 根据文件类型显示不同图标 -->

                <template v-if="row.file_type === 'doc'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#4285F4" 
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3.5 14H14v-4h-4v4H8.5v-7h2v2h3v-2h2v7z"/>
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'zip'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#FFA000"
                      d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/>
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'json'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#FFA000"
                      d="M5 3h2v2H5v5a2 2 0 0 1-2 2a2 2 0 0 1 2 2v5h2v2H5c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0-2-2H0v-2h1a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3h2m-7 12a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1m-4 0a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1m8 0a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1z" />
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'txt'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#70B603"
                      d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'exe'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#F7B500"
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V7h2v4h2v2h-2v4z" />
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'md'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#7952B3"
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5h3V7h4v5h3l-5 5z" />
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'yaml'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#E34C26"
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 12H7v-2h10v2zm0-4H7V9h10v2z" />
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'pdf'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#E94444" 
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zm10 0c0 .83-.67 1.5-1.5 1.5h-2.5V15H15v2h-2.5V9H17c.83 0 1.5.67 1.5 1.5v1zm-5-5c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-2.5V7h2.5z"/>
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'image' || row.file_type === 'png' || row.file_type === 'jpg' || row.file_type === 'jpeg'|| row.file_type === 'svg'|| row.file_type === 'ico'|| row.file_type === 'gif'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#42B983"
                      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'video' || row.file_type === 'mp4' || row.file_type === 'avi'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#FF5722"
                      d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'audio' || row.file_type === 'mp3' || row.file_type === 'wav'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#FF9800"
                      d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
                  </svg>
                </template>
                <template v-else-if="row.file_type === 'excel' || row.file_type === 'xlsx' || row.file_type === 'xls'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#1FA463"
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3.5 14H14v-4h-4v4H8.5v-7h2v2h3v-2h2v7z"/>
                  </svg>
                </template>
                <template v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#909399"
                      d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                  </svg>
                </template>
              </template>
            </el-icon>
            <a class="el-table-column-a" @click="openFolder(row)" href="#">{{ row.name || row.file_name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="Size" min-width="90">
          <template #default="{ row }">
            <span v-if="row.type === 'file'">{{ formatFileSize(row.size) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Modified" min-width="100">
          <template #default="{ row }">
            <el-tooltip class="item" :content="formatTimestamp(row.updated_at)" placement="top">
              <span class="tooltip-text">{{ row.modifiedTimeElapsed }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column property="actions" label="操作" width="200" >
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button 
                @click="Sharecontent(row)"
                class="action-btn"
                type="primary"
                plain
                color="#626aef"
                size="small">
                分享
              </el-button>
              <el-divider direction="vertical" />
              
              <el-button
                @click="dropdownDownload(row)"
                class="action-btn"
                
                color="#626aef"
                type="primary"
                size="small">
                下载
              </el-button>
              <el-divider direction="vertical" />
              
              <el-button
                @click="openDelete(row)"
                class="action-btn"
                
                
                type="danger"
                size="small">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div v-if="tableData.length === 0" class="no-data-message">No Data</div> -->
    </div>
  </MainLayout>
  <el-dialog v-model="dropdownDelete" :title="'确定删除'" width="500px" >
    <div class="delete-confirm-content">
      <div class="warning-icon-circle">
        <el-icon class="warning-icon"><Warning /></el-icon>
      </div>
      <span class="delete-text">
        删除{{ dropdownSelecteDelete?.type === 'folder' ? dropdownSelecteDelete.name : dropdownSelecteDelete.file_name }}？
      </span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="deleteJudgment()" color="#626aef">
          确定
        </el-button>
        <el-button @click="dropdownDelete = false" color="#626aef" plain>取消</el-button>

      </div>
    </template>
  </el-dialog>
  <OperationFunction />

  <!-- 添加详情弹窗 -->
  <!-- <el-dialog v-model="detailsVisible" :title="detailsData.type === 'folder' ? '文件夹详情' : '文件详情'" width="400px">
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
  </el-dialog> -->

  <!-- 添加分享弹窗 -->
  <el-dialog v-model="shareDialogVisible" title="分享设置" width="500px">
    <div class="share-content">
      <el-form :model="shareForm" label-width="120px">
        <el-form-item label="过期时间">
          <el-date-picker v-model="shareForm.expireTime" type="date" placeholder="选择过期日期" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" :disabledDate="disabledDate" />
        </el-form-item>
        <el-form-item label="最大下载次数">
          <el-input-number v-model="shareForm.maxDownloads" :min="1" :max="999" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleShare" color="#626aef">确认分享</el-button>
        <el-button @click="shareDialogVisible = false" plain color="#626aef">取消</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 新增分享成功弹窗 -->
  <el-dialog v-model="shareSuccessVisible" title="分享成功" width="500px" :show-close="true">
    <div class="success-content">
      <div class="share-info-item">
        <span class="label">下载链接：</span>
        <el-input v-model="shareLink" readonly class="share-input" @focus="copyText(shareLink)">
        </el-input>
      </div>
      <div class="share-info-item">
        <span class="label">分享码：</span>
        <el-input v-model="shareCode" readonly class="share-input" @focus="copyText(shareCode)">
        </el-input>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import axiosInstance from '@/config/axiosInstance';
import { ref, onMounted, inject, provide } from 'vue'
import { ElNotification } from 'element-plus'
// import axiosInstance from 'axios';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
import OperationFunction from '@/layouts/OperationFunction.vue';
// import UploadFile from '@/util/UploadFile.vue';
// import HelloWorld from '@/components/HelloWorld.vue';
import { Warning } from '@element-plus/icons-vue'

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
    const seconds = Math.floor(positiveDiff / 1000);
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    // return `now`
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
  fetchFolderData(receivedData.value, token.value)
};

//数据存放
const isEmpty = ref(false);
const tableData = ref([]);
const breadcrumbs = ref([]);

const rowHeight = ref(30); // 默认行高
// const showMore = (row) => {
//   console.log(row)
// };

// const open1 = (row) => {
//   ElNotification({
//     message: '成功复制' + row + '分享连接',
//     type: 'success',
//     plain: true,
//   })
// };

// dropdown
// 下载
const dropdownDownload = (row) => {
  // 检查是否为文件夹
  if (row.type === 'folder') {
    ElNotification({
      title: '提示', 
      message: '文件夹不允许下载',
      type: 'warning'
    });
    return;
  }

  // 构建下载URL
  const downloadUrl = `${backendAddress}/api/v1/fs/file/${row.id}`;
  
  // 创建XMLHttpRequest请求
  const xhr = new XMLHttpRequest();
  xhr.open('GET', downloadUrl, true);
  xhr.responseType = 'blob';
  xhr.setRequestHeader('Authorization', `Bearer ${token.value}`);
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      // 创建blob对象
      const blob = new Blob([xhr.response]);
      
      // 创建临时下载链接
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = row.file_name || row.name; // 设置下载文件名
      
      // 添加到文档并触发点击
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } else {
      ElNotification({
        title: '错误',
        message: '下载失败',
        type: 'error'
      });
    }
  };
  
  xhr.onerror = function() {
    ElNotification({
      title: '错误',
      message: '下载失败',
      type: 'error'
    });
  };
  
  xhr.send();
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
const deleteJudgment = () => {
  if (dropdownSelecteDelete.value.type === 'file') {
    deletefile()
  }else{
    deletefolder()
  }
}
const deletefolder = () => {
  dropdownDelete.value = false;
  axiosInstance.delete(`${backendAddress}/api/v1/fs/folder/${dropdownSelecteDelete.value.id}`, {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  })
    .then(res => {
      if (res.data.code === 200) {
        //刷新
        fetchFolderData(cookies.get('currentFolderId'), token.value)
        ElNotification({
          duration: 2000,
          title: '',
          message: '删除文件夹成功',
          type: 'success',
          showClose: false
        });
      } else if (res.data.code === 500) {
        ElNotification({
          duration: 2000,
          title: '',
          message: "删除文件夹失败",
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
const deletefile = () => {
  dropdownDelete.value = false;
  axiosInstance.delete(`${backendAddress}/api/v1/fs/file/${dropdownSelecteDelete.value.id}`, {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  })
    .then(res => {
      if (res.data.code === 200) {
        //刷新
        fetchFolderData(cookies.get('currentFolderId'), token.value)
        ElNotification({
          duration: 2000,
          title: '',
          message: '删除文件成功',
          type: 'success',
          showClose: false
        });
      } else if (res.data.code === 500) {
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
      if (res.data.code === 200) {
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
    loading.value = true;
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
  } finally {
    loading.value = false;
  }
};

//更新触发

const upload = () => {
  fetchFolderData(cookies.get('currentFolderId'), token.value)
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
      // 修改数据处理逻辑
      tableData.value = [
        ...(data.folders || []).map(folder => ({
          ...folder,
          type: 'folder',
          // 统一使用updated_at字段
          modifiedTimeElapsed: calculateTimeElapsed(folder.updated_at || folder.UpdatedAt)
        })),
        ...(data.files || []).map(file => ({
          ...file,
          type: 'file',
          // 统一使用updated_at字段
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
    cookies.set('currentFolderId', row.id, '1d')
    const token = cookies.get('az')
    fetchFolderData(row.id, token);
  }
};

const handleBreadcrumbClick = (item) => {
  cookies.set('currentFolderId', item.id, '1d')
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
// const detailsVisible = ref(false);
// const detailsData = ref({});

// 显示详情的方法
// const showDetails = (row) => {
//   detailsData.value = row;
//   detailsVisible.value = true;
// };

// 分享相关的响应式变量
const shareDialogVisible = ref(false)
const shareForm = ref({
  expireTime: null,
  maxDownloads: 0
})
const currentShareFile = ref(null)

// 打开分享弹窗
const Sharecontent = (row) => {
  currentShareFile.value = row
  shareDialogVisible.value = true
  shareForm.value = {
    expireTime: '',
    maxDownloads: 0
  }
}

// 处理分享
const handleShare = () => {
  if (!shareForm.value.expireTime) {
    ElNotification({
      title: '提示',
      message: '请选择过期时间',
      type: 'warning'
    })
    return
  }
  const formattedExpireTime = `${shareForm.value.expireTime}T23:59:59Z`
  const shareData = {
    expire_time: formattedExpireTime,
    max_download: shareForm.value.maxDownloads
  }
  if (currentShareFile.value.type === 'file') {
    shareData.file_ids = [currentShareFile.value.id]
  } else {
    shareData.folder_ids = [currentShareFile.value.id]
  }
  console.log(shareData)
  // 这里调用分享API
  axiosInstance.post(`${backendAddress}/api/v1/share/create`, shareData, {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  }).then(res => {
    if (res.data.code === 200) {
      ElNotification({
        title: '成功',
        message: '分享成功',
        type: 'success'
      })
      shareDialogVisible.value = false
      successShare(res.data.data.share_link, res.data.data.share_code)
    }
  }).catch(err => {
    console.log(err)
    ElNotification({
      title: '错误',
      message: '分享失败',
      type: 'error'
    })
  })
}
const shareLink = ref('')
const shareCode = ref('')
const shareSuccessVisible = ref(false)
const successShare = (share_link, share_code) => {
  shareLink.value = share_link
  shareCode.value = share_code
  shareSuccessVisible.value = true
}
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7 // 禁用今天之前的日期
}

// 复制文本功能
const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    ElNotification({
      title: '成功',
      message: '复制成功',
      type: 'success'
    })
  } catch (err) {
    ElNotification({
      title: '错误',
      message: '复制失败',
      type: 'error'
    })
  }
}

// 添加选中行的数据
const selectedRows = ref([]);

// 创建更新函数
const updateSelectedFiles = (selection) => {
  selectedRows.value = selection;
  // console.log(selectedRows.value)
};

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection;
  // 更新到provide中
  updateSelectedFiles(selection);
};

// 提供给其他组件使用
provide('selectedFiles', selectedRows);
provide('updateSelectedFiles', (selection) => {
  selectedRows.value = selection;
});

onMounted(() => {
  console.log('DashboardPage')

  console.log('请求地址', backendAddress)
  const token = cookies.get('az')
  //请求获取rootfolderid,记入到cookie
  rootfolder(token)
  //用rootfolderid请求根目录���件




})
</script>

<style scoped>
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
<style>
.common-layout {
  --el-border-radius-base: 10px;
}



* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-data-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  /* 与表格高度一致 */
  font-size: 18px;
  color: #999;
}

/* 去掉列表滚动条 */
.el-scrollbar .el-scrollbar__bar.is-vertical .el-scrollbar__thumb {
  display: none;
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

.custom-dropdown .el-dropdown-item:hover {
  background-color: #478068;
  /* 粉色背景 */
  color: white;
  /* 鼠标停时文字变为白色 */
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

.el-table-column-a {
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

.share-content {
  padding: 20px 30px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  /* padding-left: 30px; */
}

:deep(.el-dialog) {
  border-radius: 8px;
  background-color: #fff !important;
}

:deep(.el-dialog__header) {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}

:deep(.el-dialog__body) {
  background-color: #fff;
  padding: 0;
}

:deep(.el-dialog__footer) {
  background-color: #fff;
  padding: 10px 0;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-button--primary) {
  background-color: #626aef;
  border-color: #626aef;
}

:deep(.el-button--primary:hover) {
  background-color: #4c51bf;
  border-color: #4c51bf;
}

:deep(.el-date-picker) {
  width: 100%;
}

.success-content {
  padding: 20px;
}

.share-info-item {
  margin-bottom: 20px;
}

.share-info-item .label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.share-input {
  width: 100%;
}

:deep(.el-input-group__append) {
  padding: 0;
}

:deep(.el-input-group__append button) {
  border: none;
  margin: 0;
  height: 100%;
}

:deep(.el-dialog__body) {
  padding-top: 10px;
}

/* 添加面包屑样式 */
.breadcrumb-item {
  cursor: pointer;
  /* 鼠标变成小�� */
  color: #606266;
  /* 默认颜色 */
  transition: color 0.3s;
  /* 颜色过渡效果 */
}

/* 最后一个项目可能需要特殊样式 */
.el-breadcrumb__inner {
  color: #606266;
  /* 默认颜色 */
  cursor: pointer !important;
}


.el-breadcrumb__item:last-child .breadcrumb-item:hover {
  color: #303133;
  text-decoration: none;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
}

.action-btn {
  padding: 4px 12px;
}



:deep(.el-divider--vertical) {
  height: 1em;
  margin: 0 4px;
}

.delete-confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.warning-icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff2f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.warning-icon {
  font-size: 30px;
  color: #fc2825;
}

.delete-text {
  font-size: 16px;
  color: #606266;
  text-align: center;
}

:deep(.el-dialog__header) {
  margin-right: 0;
  padding-bottom: 0;
}

:deep(.el-dialog__headerbtn) {
  top: 16px;
}
</style>
