<template style="height: 100vh;">
    <div>
      <!-- 使用 flex 布局整个页面 -->
      <div style="position: relative; z-index: 1;">
        <el-container style="display: flex;">
          <el-main style="flex: 1; display: flex; justify-content: center; align-items: center; text-align: center;margin-top: 60px;">
            <div class="el-input-w" style="z-index: 999; width: 500px; ">
              
                <div style="height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <p style="font-weight: bolder; margin-bottom: 20px;margin-top: 50px;">注册</p>

                <!-- 用户名输入框 -->
                <el-input
                    v-model="registerForm.username"
                    style="width: 300px; margin-bottom: 30px;margin-top:-50px"
                    placeholder="账号"
                />
                
                <!-- 用户名输入框 -->
                <el-input
                    v-model="registerForm.mailbox"
                    style="width: 300px; margin-bottom: 30px;"
                    placeholder="用户名"
                />
                <!-- 密码输入框 -->
                <el-input
                    v-model="registerForm.password"
                    style="width: 300px; margin-bottom: 30px;"
                    type="password"
                    placeholder="密码"
                    show-password
                    size="default"
                />

                <!-- 确认密码输入框 -->
                <el-input
                    v-model="confirmPassword"
                    style="width: 300px; margin-bottom: 30px;"
                    type="password"
                    placeholder="确认密码"
                    show-password
                    size="default"
                    @keyup.enter="submitLogin"
                />
                </div>
              <el-button color="#626aef" type="success" :icon="User" round  @click="submitLogin" size="large" style="">注册提交</el-button>
            </div>
          </el-main>
        </el-container>
      </div>
      <!-- 设置section为背景 -->
      <section class="banner-brand__wrapper" style=" z-index: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background: url('/login.jpg') center center / cover no-repeat;">
        <div class="banner-brand__content">
          <!-- 其他内容 -->
        </div>
      </section>
      <!-- 弹出窗口，如果有 -->
      <div v-if="showPopup" class="popup">
        {{ popupMessage }}
      </div>
    </div>
    </template>
  <script setup>
  import {
    User,
  } from '@element-plus/icons-vue'
  import { ref, reactive, watch } from 'vue';
  import axiosInstance from 'axios';
  import { useRouter } from 'vue-router';
  import { ElNotification } from 'element-plus';

  const showPopup = ref(false);
  const popupMessage = ref('');
  const isProcessing = ref(false);
  const confirmPassword = ref('');
  const registerForm = reactive({
    username: '',
    password: '',
    mailbox: '',
  });

  const router = useRouter();

  const submitLogin = async () => {
    console.log('点击了注册,', registerForm);

    if (isProcessing.value) {
      return;
    }
    isProcessing.value = true;

    if (!registerForm.username) {
      ElNotification({
        duration: 2000,
        title: 'warning',
        message: '账号不能为空',
        type: 'warning',
        showClose: false,
      });
      isProcessing.value = false;
      return;
    }
    if (!registerForm.mailbox) {
      ElNotification({
        duration: 2000,
        title: 'warning',
        message: '邮箱不能为空',
        type: 'warning',
        showClose: false,
      });
      isProcessing.value = false;
      return;
    }
    if (!registerForm.password) {
      ElNotification({
        duration: 2000,
        title: 'warning',
        message: '密码不能为空',
        type: 'warning',
        showClose: false,
      });
      isProcessing.value = false;
      return;
    }
    if (!confirmPassword.value) {
      ElNotification({
        duration: 2000,
        title: 'warning',
        message: '密码不能为空',
        type: 'warning',
        showClose: false,
      });
      isProcessing.value = false;
      return;
    }
    if (registerForm.password !== confirmPassword.value) {
      ElNotification({
        duration: 2000,
        title: 'warning',
        message: '输入的密码不一样',
        type: 'warning',
        showClose: false,
      });
      isProcessing.value = false;
      return;
    }

    const params = {
      username: registerForm.username,
      password: registerForm.password,
      mailbox: registerForm.mailbox,
    };

    try {
      const res = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_ADDRESS}/register`, params);
      console.log('res', res);
      if (res.status === 200) {
        console.log('注册成功', res.data);
        router.push('/login');
        ElNotification({
          duration: 2000,
          title: 'success',
          message: '注册成功',
          type: 'success',
          showClose: false,
        });
      }
    } catch (error) {
      console.error('请求错误', error);
      ElNotification({
        duration: 2000,
        title: 'error',
        message: '注册失败',
        type: 'error',
        showClose: false,
      });
    } finally {
      isProcessing.value = false;
    }
  };

  watch(showPopup, (newVal) => {
    if (newVal) {
      setTimeout(() => {
        showPopup.value = false;
      }, 1500);
    } else {
      document.querySelector('.popup').classList.add('hide');
      setTimeout(() => {
        showPopup.value = false;
      }, 1500);
    }
  });
  </script>
  
  <style scoped>
  .el-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .el-input-w {
    border-radius: 30px;
    /* 透明度 */
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 8px 16px rgba(5, 0, 0, 0.5);
    backdrop-filter: blur(5px) brightness(110%) contrast(90%);
  }
  
    @keyframes slideDown {
      from {
        transform: translate(-50%, -100%); /* 水平居中和从顶部开始 */
      }
      to {
        transform: translate(-50%, 0); /* 水平居中和垂直终点 */
      }
    }
  
    @keyframes slideUp {
      from {
        transform: translate(-50%, 0); /* 水平居中和垂直起点 */
      }
      to {
        transform: translate(-50%, -100%); /* 水平居中和向顶部结束 */
      }
    }
  .card-header {
    display: flex;
    align-items: center; /* 保证内容垂直居中 */
    justify-content: space-between; /* 保证子元素之间的间距均匀分布 */
    width: 100%; /* 确保卡片头部占满整个宽度 */
  }
    .popup {
      position: fixed;
      top: 20%; /* 将弹窗向屏幕的上方移动 */
      left: 50%;
      transform: translate(-50%, -50%); /* 保持水平居中，稍微向上调整 */
      background-color: #455A64; /* 深色背景，与#D3DCE6形成对比 */
      color: white;
      text-align: center;
      padding: 20px;
      width: 300px; /* 限制宽度 */
      border-radius: 10px; /* 圆角边框 */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
      z-index: 1000;
      transform: translateY(-100%);
      animation: slideDown 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    }
    .popup.hide {
    /* 新增退出动画 */
    animation: slideUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    }
    .el-container{
      padding: 0;
      margin: 0;
    }
  
    .el-header, .el-footer {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 60px;
        border-bottom: 1px solid #D3DCE6;
      }
    
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    
    .el-main {
      color: #333;
      text-align: center;
      line-height: 160px;

    }
    
    body > .el-container {
      margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
    
    .db_button{
      margin-top: 30px;
    }
  </style>
  