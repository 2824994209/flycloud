<template style="height: 100vh;">
    <div>
      <!-- 使用 flex 布局整个页面 -->
      <div style="position: relative; z-index: 2;">
        <el-container style="display: flex;">
          <el-main style="flex: 1; display: flex; justify-content: center; align-items: center; text-align: center;">
            <div class="el-input-w" style="z-index: 999; width: 500px; ">
              
              <div style="height: 230px">
                
                <p style="height: 10px;font-weight:bolder;">登入</p>
                  <el-input v-model="loginForm.username" style="width: 300px;margin-bottom: -100px;;" placeholder="mail" />
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
      <!-- 星星效果容器 -->
      <LittleStar style="z-index: 1;"></LittleStar>
      <!-- 设置section为背景 -->
      <section class="banner-brand__wrapper" style=" z-index: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background: url('/login.jpg') center center / cover no-repeat;">
        <div class="banner-brand__content">

        </div>
      </section>
      <!-- 弹出窗口，如果有 -->

    </div>
    </template>
  <script setup>
  import { ref, reactive, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElNotification } from 'element-plus';
  import LittleStar from '@/util/LittleStar.vue';
  import { Key, User } from '@element-plus/icons-vue';
  import axiosInstance from 'axios';
  import { useCookies } from 'vue3-cookies';

  import { inject } from 'vue';
  const backendAddress = inject('backendAddress'); 

  const router = useRouter();
  const { cookies } = useCookies();

  const showPopup = ref(false);
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
      email: loginForm.username,
      password: loginForm.password
    };

    try {
      console.log('请求地址',backendAddress)
      const res = await axiosInstance.post(`${backendAddress}/api/v1/public/login`, params);
      
      if (res.status === 200) {
        console.log('登录成功', res.data);
        
        const token = res.data.data.token;
        console.log('token',token)
        cookies.set('az', token, '1d');
        router.push('/user/personal');
        // if(res.data.role === 'admin'){
        //   router.push('/admin/system');
        // }else{
        //   router.push('/user/personal');
        // }
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

  onMounted(() => {
    console.log('onMounted');

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

    .meteor-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      pointer-events: none;
      z-index: 1000;
      /* background-color: #000; */
    }

    .meteor {
      position: absolute;
      width: 2px;
      height: 100px;
      background-color: #000;
      /* background: linear-gradient(to bottom, rgba(240, 5, 5, 0.8), transparent); */
      animation: fall linear infinite;
    }

    @keyframes fall {
      0% {
        transform: translateY(-100px) translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) translateX(100px);
        opacity: 0;
      }
    }
  </style>
  