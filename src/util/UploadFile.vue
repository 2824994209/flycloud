<template>
  <div>
    <el-upload
      class="upload-demo"
      :http-request="customRequest"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :show-file-list="false"
      multiple
      :file-list="[]"
    >
      <slot></slot>
    </el-upload>
  </div>
</template>

<script>
import { h, ref,inject } from 'vue';
import { ElNotification } from 'element-plus';
import { useCookies } from 'vue3-cookies';
// import axios from '@/config/axiosInstance';
import axios1 from 'axios';

const { cookies } = useCookies();

export default {
  setup() {
    const backendAddress = inject('backendAddress');
    const notifications = ref({});

    const handleProgress = async (event, file) => {
      const percentage = Math.round(event.percent || 0);

      // 创建新的通知实例
      if (!notifications.value[file.uid]) {
        notifications.value[file.uid] = ElNotification({
          message: h('div', { id: `notification-content-${file.uid}`, style: "width: 200px; z-index: 9999" }, [
            `文件 ${file.name} , 当前进度：${percentage}%`,
            h('progress', {
              id: `progress-bar-${file.uid}`,
              max: 100,
              value: percentage,
              style: 'width: 100%; margin-top: 5px;',
            }),
          ]),
          type: 'info',
          duration: 0, // 持续显示
        });
      }

      // 更新通知内容和进度条
      const contentElement = document.getElementById(`notification-content-${file.uid}`);
      if (contentElement) {
        contentElement.firstChild.textContent = `文件 ${file.name} , 当前进度：${percentage}%`;
      }

      const progressBar = document.getElementById(`progress-bar-${file.uid}`);
      if (progressBar) {
        progressBar.value = percentage;
      }


    };
    const fetchFolderData = inject('fetchFolderData');
    const handleSuccess = async (response, file) => {
      console.log("上传成功", response);
      if (notifications.value[file.uid]) {
        notifications.value[file.uid].close();
        delete notifications.value[file.uid];
      }
      // 可以在这里进行后续处理，例如更新状态
      if (fetchFolderData) {
      fetchFolderData();
    }
    };

    const handleError = async (err, file) => {
      console.error("上传失败", err, file);
      if (notifications.value[file.uid]) {
        notifications.value[file.uid].close();
        delete notifications.value[file.uid];
      }
      // 显示错误通知
      ElNotification({
        title: '上传失败',
        message: `文件 ${file.name} 上传失败: ${err.message || '未知错误'}`,
        type: 'error',
        duration: 3000,
      });
    };

    const customRequest = async (options) => {
      const { file, onProgress, onSuccess } = options;
      // const currentFolderId = localStorage.getItem('currentFolderId');
      const currentFolderId = cookies.get('currentFolderId');
      const token = cookies.get('az');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder_id', currentFolderId);


      try {
        const response = await axios1.post(`${backendAddress}/api/v1/fs/upload`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress({ percent: percentCompleted });
          },
        });
        onSuccess(response.data);
        if(response.data.code === 403){
          ElNotification({
            duration: 2000,
            title: '权限不足',
            message: response.data.data.msg || '权限不足',
            type: 'error',
          })
        }else if(response.data.code === 200){
          ElNotification({
            duration: 2000,
            title: 'success',
            message: '上传成功',
            type: 'success',
          })
        }
        else{
          ElNotification({
            duration: 2000,
            title: 'Error',
            message: response.data.msg || '上传失败',
            type: 'error',
          })
        }

      } catch (error) {
        if(error.response.data.code === 403){
          ElNotification({
            duration: 2000,
            title: '权限不足',
            message: error.response.data.data.msg || '权限不足',
            type: 'error',
          })
        }else{
          ElNotification({
            duration: 2000,
            title: 'Error',
            message: error.response.data.msg || '上传失败',
            type: 'error',
          })
        }
        // onError(error);
      }
    };

    return {
      handleProgress,
      handleSuccess,
      handleError,
      customRequest,
    };
  },
};
</script>

<style>
.upload-demo {
  margin-bottom: 0px;
}
.el-notification {
  z-index: 9999 !important;
}
</style>
