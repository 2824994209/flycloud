<template>
  <div class="register-page">
    <div class="register-box">
      <div class="title">注册</div>
      <div class="close-icon" @click="handleClose">×</div>
      
      <el-form 
        :model="registerForm" 
        :rules="rules" 
        ref="formRef" 
        class="form-container"
      >
        <!-- 邮箱输入框 -->
        <el-form-item prop="email">
          <el-input 
            v-model="registerForm.email" 
            placeholder="邮箱"
          />
        </el-form-item>

        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input 
            v-model="registerForm.username" 
            placeholder="用户名"
          />
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input 
            v-model="registerForm.password" 
            type="password" 
            placeholder="密码"
            show-password
          />
        </el-form-item>

        <!-- 确认密码输入框 -->
        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword" 
            type="password" 
            placeholder="确认密码"
            show-password
          />
        </el-form-item>

        <!-- 验证码输入框和按钮 -->
        <el-form-item prop="captcha">
          <div class="captcha-container">
            <el-input 
              v-model="registerForm.captcha" 
              placeholder="验证码"
            />
            <el-button 
              :disabled="countdown > 0"
              @click="getCaptcha"
              class="captcha-btn"
              plain
              color="#626aef"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-button 
          type="primary" 
          color="#626aef" 
          class="submit-btn"
          @click="submitRegister"
        >
          注册提交
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
const backendAddress = inject('backendAddress')
const countdown = ref(0)

const registerForm = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  captcha: ''
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
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在2-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '密码长度在6-8位之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' }
  ]
}

const handleClose = () => {
  router.push('/login')
}

// 获取验证码
const getCaptcha = async () => {
  if (!registerForm.email) {
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '请输入邮箱',
      type: 'error',
      showClose: false,
    })
    return
  }
  countdown.value = 60
      const timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--
        } else {
          clearInterval(timer)
        }
      }, 1000)
  try {
    const res = await axios.post(`${backendAddress}/api/v1/public/send/emailcode`, {
      email: registerForm.email
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
    console.error('获取验证码失败:', error)
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '获取验证码失败',
      type: 'error',
      showClose: false,
    })
  }
}

// 提交注册
const submitRegister = async () => {
  // 表单验证
  if (!registerForm.email || !registerForm.username || !registerForm.password || !registerForm.confirmPassword || !registerForm.captcha) {
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '请填写完整信息',
      type: 'error',
      showClose: false,
    })
    return
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '两次密码不一致',
      type: 'error',
      showClose: false,
    })
    return
  }

  if (registerForm.password.length < 6 || registerForm.password.length > 8) {
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '密码长度必须在6-8位之间',
      type: 'error',
      showClose: false,
    })
    return
  }

  try {
    const res = await axios.post(`${backendAddress}/api/v1/public/register`, {
      email: registerForm.email,
      username: registerForm.username,
      password: registerForm.password,
      email_code: registerForm.captcha
    })

    if (res.data.code === 200) {
      ElNotification({
        duration: 2000,
        title: 'success',
        message: '注册成功',
        type: 'success',
        showClose: false,
      })
      router.push('/login')
    }else{
      ElNotification({
        duration: 2000,
        title: 'error',
        message: res.data.msg,
        type: 'error',
        showClose: false,
      })
    }
  } catch (error) {
    console.error('注册失败:', error)
    ElNotification({
      duration: 2000,
      title: 'error',
      message: '注册失败',
      type: 'error',
      showClose: false,
    })
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
  height: 470px;
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
  /* background-color: #626aef; */
  margin-top: 15px;
}

/* 确保输入框宽度一致 */
:deep(.el-input) {
  width: 100%;
}

/* 输入框获得焦点时的样式 */
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #626aef !important;
}
</style>