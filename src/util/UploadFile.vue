<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:3000/upload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :show-file-list="false"
      :before-upload="beforeUpload"
      multiple
      :file-list="[]"
    >
    <slot></slot>
    </el-upload>
  </div>
</template>

<script>
import { h, ref } from 'vue';
import { ElNotification } from 'element-plus';

export default {
  setup() {
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

      // 进度达到100%时关闭通知
      if (percentage >= 100) {
        notifications.value[file.uid].close();
        delete notifications.value[file.uid];
      }
    };

    const handleSuccess = async (response, file) => {
      console.log("上传成功", response);
      if (notifications.value[file.uid]) {
        notifications.value[file.uid].close();
        delete notifications.value[file.uid];
      }
      // 可以在这里进行后续处理，例如更新状态
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

    const beforeUpload = async (file) => {
      console.log(`开始上传文件: ${file.name}`);
      // 可以在这里添加异步验证逻辑
      // 例如，检查文件类型或大小
      return true; // 返回 true 以继续上传
    };

    

    return {
      handleProgress,
      handleSuccess,
      handleError,
      beforeUpload,
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
