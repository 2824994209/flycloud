<template style="height: 100vh;">
    <div>
      <!-- 使用 flex 布局整个页面 -->
      <div style="position: relative; z-index: 1;">
        <el-container style="display: flex;">
          <el-main style="flex: 1; display: flex; justify-content: center; align-items: center; text-align: center;">
            <div class="el-input-w" style="z-index: 999; width: 500px; ">
              
              <div style="height: 230px">
                
                <p style="height: 10px;font-weight:bolder;">登入</p>
                  <el-input v-model="loginForm.username" style="width: 300px;margin-bottom: -100px;;" placeholder="account" />
                  <el-input
                      v-model="loginForm.password"
                      style="width: 300px;margin-bottom: 100px;"
                      type="password"
                      placeholder="password"
                      show-password
                      size="default"
                      @keyup.enter="submitLogin"
                  />
              </div>
              <el-button color="#626aef" type="success" :icon="User" round  @click="submitRegister" size="large" style="margin-top: -30px;" >注册</el-button>
              <span style="padding-left: 50px;"></span>
              <el-button color="#626aef" type="success" :icon="Key" round  @click="submitLogin" size="large" style="margin-top: -30px;">提交</el-button>
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
  import { ref, reactive, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElNotification } from 'element-plus';
  import { Key, User } from '@element-plus/icons-vue';
  import axiosInstance from 'axios';
  import { useCookies } from 'vue3-cookies';

  const router = useRouter();
  const { cookies } = useCookies();

  const showPopup = ref(false);
  const popupMessage = ref('');
  const isProcessing = ref(false);
  const loginForm = reactive({
    username: '',
    password: ''
  });

  const submitRegister = () => {
    console.log('点击了注册,', loginForm);

    if (isProcessing.value) {
      return;
    }
    isProcessing.value = true;
    router.push('/register');
  };

  const submitLogin = async () => {
    console.log('点击了登录,', loginForm);

    if (isProcessing.value) {
      return;
    }
    isProcessing.value = true;

    if (!loginForm.username) {
      ElNotification({
        duration: 2000,
        title: 'warning',
        message: '账号不能为空',
        type: 'warning',
        showClose: false
      });
      isProcessing.value = false;
      return;
    }
    if (!loginForm.password) {
      ElNotification({
        duration: 2000,
        title: 'warning',
        message: '密码不能为空',
        type: 'warning',
        showClose: false
      });
      isProcessing.value = false;
      return;
    }

    const params = {
      username: loginForm.username,
      password: loginForm.password
    };

    try {
      const res = await axiosInstance.post(`${this.$backendAddress}/login`, params);
      console.log('res', res);
      if (res.status === 200) {
        console.log('登录成功', res.data);
        const token = res.data.token;
        cookies.set('az', token, '1d');
        if(res.data.role === 'admin'){
          router.push('/admin/system');
        }else{
          router.push('/user/personal');
        }
        ElNotification({
          duration: 2000,
          title: 'success',
          message: '登入成功',
          type: 'success',
          showClose: false
        });
      }
    } catch (error) {
      console.error('请求错误', error);
      ElNotification({
        duration: 2000,
        title: 'error',
        message: '登入失败',
        type: 'error',
        showClose: false
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
    align-items: center;
    justify-content: space-between;
    width: 100%; 
  }
    .popup {
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -50%); 
      background-color: #455A64; 
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
  