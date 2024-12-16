<template>
	<div @click="Sharecontent()">
		<slot></slot>
	</div>
	<el-dialog
    v-model="shareDialogVisible"
    title="合并分享"
    width="500px"
  >
    <div class="share-content">
      <el-form :model="shareForm" label-width="120px">
        <el-form-item label="过期时间">
          <el-date-picker
            v-model="shareForm.expireTime"
            type="date"
            placeholder="选择过期日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :disabledDate="disabledDate"
          />
        </el-form-item>
        <el-form-item label="最大下载次数">
          <el-input-number 
            v-model="shareForm.maxDownloads"
            :min="1"
            :max="999"
          />
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
  <el-dialog
    v-model="shareSuccessVisible"
    title="分享成功"
    width="500px"
    :show-close="true"
  >
    <div class="success-content">
      <div class="share-info-item">
        <span class="label">下载链接：</span>
        <el-input
          v-model="shareLink"
          readonly
          class="share-input"
          @focus="copyText(shareLink)"
        >
        </el-input>
      </div>
      <div class="share-info-item">
        <span class="label">分享码：</span>
        <el-input
          v-model="shareCode"
          readonly
          class="share-input"
          @focus="copyText(shareCode)"
        >
        </el-input>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref,inject } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const backendAddress = inject('backendAddress');
const selectedFiles = inject('selectedFiles', []);


import { ElNotification } from 'element-plus'
import axiosInstance from '@/config/axiosInstance';
// import axiosInstance from 'axios';


const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7 // 禁用今天之前的日期
}
// 分享相关的响应式变量
const shareDialogVisible = ref(false)
const shareForm = ref({
  expireTime: null, 
  maxDownloads: 0
})
const currentShareFile = ref(null)

// 打开分享弹窗
const Sharecontent = () => {
  if(selectedFiles.value.length == 0){
		ElNotification({
			title: '请选择文件',
			message: '请选择文件',
			type: 'warning',
		});
		return;
	}
	console.log("selectedFiles",selectedFiles.value)
  currentShareFile.value = selectedFiles.value
  shareDialogVisible.value = true
  shareForm.value = {
    expireTime: '', 
    maxDownloads: 0
  }
}
const handleShare = () => {
  if(!shareForm.value.expireTime) {
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
    max_download: shareForm.value.maxDownloads,
    file_ids: [],
    folder_ids: []
  }

  // 遍历选中的项目,分别添加到file_ids和folder_ids
  currentShareFile.value.forEach(item => {
    if(item.type === 'file') {
      shareData.file_ids.push(item.id)
    } else {
      shareData.folder_ids.push(item.id)
    }
  })

  // 如果都为空,提示错误
  if(shareData.file_ids.length === 0 && shareData.folder_ids.length === 0) {
    ElNotification({
      title: '提示',
      message: '请选择要分享的文件或文件夹',
      type: 'warning'
    })
    return
  }

  // 调用分享API
  const token = cookies.get('az');
  axiosInstance.post(`${backendAddress}/api/v1/share/create`, shareData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    if(res.data.code === 200) {
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