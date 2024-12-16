<template>
  <div class="login-page">
    <div class="login-box">
      <div class="title">登入</div>
      
      <el-form 
        :model="loginForm" 
        :rules="rules" 
        ref="formRef" 
        class="form-container"
      >
        <!-- 邮箱输入框 -->
        <el-form-item prop="email">
          <el-input 
            v-model="loginForm.email" 
            placeholder="mail"
          />
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="password"
            show-password
            @keyup.enter="submitLogin"
          />
        </el-form-item>

        <!-- 验证码输入框和图片 -->
        <el-form-item prop="code">
          <div class="captcha-container">
            <el-input 
              v-model="loginForm.code" 
              placeholder="验证码"
              @keyup.enter="submitLogin"
            />
            <img 
              :src="captchaUrl" 
              @click="refreshCaptcha" 
              class="captcha-img"
              alt="验证码"
            />
          </div>
        </el-form-item>

        <!-- 按钮组 -->
        <div class="button-group">
          <el-button 
            color="#626aef" 
            round 
            @click="goToRegister"
          >
            注册
          </el-button>
          <el-button 
            color="#626aef" 
            round 
            @click="submitLogin"
          >
            提交
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
  <!-- 添加全屏loading -->
  <div class="fullscreen-loading" v-if="isLoading">
    <div class="loading-content">
      <el-icon class="loading-icon"><Loading /></el-icon>
      <span>登录中，请稍候...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import axios from 'axios'
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const router = useRouter()
const formRef = ref(null)
const backendAddress = inject('backendAddress')
const isLoading = ref(false)
const captchaUrl = ref('')

const loginForm = reactive({
  email: '',
  password: '',
  code: '',
  captchaId: ''
})
// 表单验证规则
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
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' }
  ]
}

const goToRegister = () => {
  router.push('/register')
}

// 刷新验证码
const refreshCaptcha = async () => {
  try {
    const response = await axios.get(`${backendAddress}/api/v1/public/captcha/`)
    
    if (response.data.code === 200) {
      loginForm.captchaId = response.data.data.captcha_id
      captchaUrl.value = `data:image/png;base64,${response.data.data.image}`
      console.log('captchaUrl', captchaUrl.value)
    }
  } catch (error) {
    console.error('获取验证码失败:', error)
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '获取验证码失败',
      type: 'error',
      showClose: false
    })
  }
}

// 登录提交
const submitLogin = async () => {
  if (isLoading.value) return
  
  try {
    await formRef.value.validate()
    
    isLoading.value = true
    const res = await axios.post(`${backendAddress}/api/v1/public/login`, {
      email: loginForm.email,
      password: loginForm.password,
      code: loginForm.code,
      captcha_id: loginForm.captchaId
    })

    if (res.data.code === 200) {
      cookies.set('az', res.data.data.token)
      console.log('cookies', cookies.get('az'))
      ElNotification({
        duration: 2000,
        title: 'success',
        message: '登录成功',
        type: 'success',
        showClose: false,
      })
      
      // router.push('/user/personal')
      if(loginForm.email == 'admin@qpan.com'){
        router.push('/admin/system')
      }else{
        router.push('/user/personal')
      }
    }else{
      refreshCaptcha()
      ElNotification({
        duration: 2000,
        title: 'error',
        message: "邮箱或密码错误",
        type: 'error',
        showClose: false,
      })
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElNotification({
      duration: 2000,
      title: 'error',
      message: error.response?.data?.message || '登录失败',
      type: 'error',
      showClose: false,
    })
    refreshCaptcha()
  } finally {
    isLoading.value = false
  }
}

// 组件挂载时获取验证码
onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  background-image: url('/public/login.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 500px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  position: relative;
  height: 370px;
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
  font-size: 16px;
}

.close-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: rotate(180deg);
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
  align-items: center;
}

.captcha-container .el-input {
  flex: 1;
}

.captcha-img {
  height: 40px;
  cursor: pointer;
  width: 100px;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 20px;
}

:deep(.el-button) {
  width: 100px;
  height: 40px;
}

/* 确保输入框宽度一致 */
:deep(.el-input) {
  width: 100%;
}

/* 输入框获得焦点时的样式 */
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #626aef !important;
}

/* 添加loading相关样式 */
.fullscreen-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .loading-icon {
      font-size: 40px;
      color: #626aef;
      animation: rotating 2s linear infinite;
    }

    .loading-content span {
      color: #606266;
      font-size: 14px;
    }

    @keyframes rotating {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
</style>
