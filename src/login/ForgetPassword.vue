<template>
  <div class="register-page">
    <div class="register-box">
      <div class="title">找回密码</div>
      <div class="close-icon" @click="handleClose">×</div>
      
      <el-form 
        :model="formData" 
        :rules="rules" 
        ref="formRef" 
        class="form-container"
      >
        <!-- 邮箱输入框 -->
        <el-form-item prop="email">
          <el-input 
            v-model="formData.email" 
            placeholder="邮箱"
          />
        </el-form-item>

        <!-- 新密码输入框 -->
        <el-form-item prop="password">
          <el-input 
            v-model="formData.password" 
            type="password" 
            placeholder="新密码"
            show-password
          />
        </el-form-item>

        <!-- 确认密码输入框 -->
        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="formData.confirmPassword" 
            type="password" 
            placeholder="确认密码"
            show-password
          />
        </el-form-item>

        <!-- 验证码输入框和按钮 -->
        <el-form-item prop="emailCode">
          <div class="captcha-container">
            <el-input 
              v-model="formData.emailCode" 
              placeholder="验证码"
            />
            <el-button 
              :disabled="countdown > 0"
              @click="sendEmailCode"
              class="captcha-btn"
              plain
              color="#626aef"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-button 
          type="primary" 
          color="#626aef" 
          class="submit-btn"
          @click="submitForm"
          :loading="loading"
        >
          重置密码
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import axios from 'axios'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const countdown = ref(0)
const backendAddress = inject('backendAddress')

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailCode: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { 
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
      message: '请输入正确的邮箱格式', 
      trigger: 'blur' 
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '密码长度在6-8位之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  emailCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' }
  ]
}

const handleClose = () => {
  router.push('/login')
}

// 发送验证码
const sendEmailCode = async () => {
  if (!formData.email) {
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '请输入邮箱',
      type: 'error',
      showClose: false,
    })
    return
  }

  try {
    const res = await axios.post(`${backendAddress}/api/v1/public/send/emailcode`, {
      email: formData.email
    })
    
    if (res.data.code === 200) {
      ElNotification({
        duration: 2000,
        title: 'success',
        message: '验证码已发送',
        type: 'success',
        showClose: false,
      })
      
      countdown.value = 60
      const timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--
        } else {
          clearInterval(timer)
        }
      }, 1000)
    }
  } catch (error) {
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '获取验证码失败',
      type: 'error',
      showClose: false,
    })
  }
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    const res = await axios.post(`${backendAddress}/api/v1/public/reset/password`, {
      email: formData.email,
      password: formData.password,
      email_code: formData.emailCode
    })

    if (res.data.code === 200) {
      ElNotification({
        duration: 2000,
        title: 'success',
        message: '密码重置成功',
        type: 'success',
        showClose: false,
      })
      router.push('/login')
    } else {
      ElNotification({
        duration: 2000,
        title: 'error',
        message: res.data.msg,
        type: 'error',
        showClose: false,
      })
    }
  } catch (error) {
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '密码重置失败',
      type: 'error',
      showClose: false,
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  height: 100vh;
  width: 100vw;
  background-image: url('/public/login.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-box {
  width: 500px;
  height: 400px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  position: relative;
  box-shadow: 0 8px 16px rgba(5, 0, 0, 0.5);
}

.title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 30px 0;
}

.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  color: #666;
  line-height: 1;
  font-size: 18px;
  padding-bottom: 3px;
  padding-right: 2px;
  padding-left: 2px;
}

.close-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: rotate(90deg);
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 23px;
  margin: 0 100px;
}

:deep(.el-input__wrapper) {
  border-radius: 10px !important;
  box-shadow: none;
  border: 1px solid #dcdfe6;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form-item__error) {
  padding-left: 15px;
  margin-top: 2px;
}

.captcha-container {
  display: flex;
  gap: 10px;
}

.captcha-container .el-input {
  flex: 1;
}

.captcha-btn {
  width: 120px;
  border-radius: 10px;
}

.submit-btn {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  /* margin-top: 15px; */
}

:deep(.el-input) {
  width: 100%;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #626aef !important;
}
</style>