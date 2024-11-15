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
  import {
    Key,
    User,
  } from '@element-plus/icons-vue'
  </script>
  <script>
  import axiosInstance from 'axios';
  
  export default {
    data() {
      return {
        showPopup: false, // 控制弹窗显示
        popupMessage: '',
        isProcessing: false,
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async submitRegister() {
        console.log('点击了注册,', this.loginForm);
  
        // 防抖
        if (this.isProcessing) {
          return;
        }
        this.isProcessing = true;
        this.$router.push('/register');
      },
      // 前台判断输入框是否为空
      async submitLogin() { // 确保方法声明为 async
        console.log('点击了登录,', this.loginForm);
  
        // 防抖
        if (this.isProcessing) {
          return;
        }
        this.isProcessing = true; // 设置处理标志
  
        // 验证输入
        if (!this.loginForm.username) {
          // this.popupMessage = "账号不能为空";
          // this.showPopup = true;
          this.$notify.warning({
              duration: 2000,
              title: 'warning',
              message: '账号不能为空',
              showClose: false
            });
          this.isProcessing = false;
          return;
        }
        if (!this.loginForm.password) {
          // this.popupMessage = "密码不能为空";
          // this.showPopup = true;
          this.$notify.warning({
              duration: 2000,
              title: 'warning',
              message: '密码不能为空',
              showClose: false
            });
          this.isProcessing = false;
          return;
        }
  
        // 登录的post请求
        const params = {
          username: this.loginForm.username,
          password: this.loginForm.password
        };
  
        try {
          const res = await axiosInstance.post(`${this.$backendAddress}/login`, params);
          console.log('res', res);
          if (res.status === 200) {
            console.log('登录成功', res.data);
            // 存储 token
            const token = res.data.token;
            // localStorage.setItem('Authorization', token);
            this.$cookies.set('az', token, '1d')
            // 跳转到 /qifei 页面
            console.log("/qifei/platform")
            this.$router.push('/qifei/platform'); // 修改为你实际需要的路径
            this.$notify.success({
              duration: 2000,
              title: 'success',
              message: '登入成功',
              showClose: false
            });
          } 
        } catch (error) {
          console.error('请求错误', error);
          this.$notify.error({
              duration: 2000,
              title: 'error',
              message: '登入失败',
              showClose: false
            });
          // this.popupMessage = "请求错误: " + error.message;
          // this.showPopup = true;
        } finally {
          this.isProcessing = false;
        }
      }
    },
    watch: {
      showPopup(newVal) {
        if (newVal) {
          setTimeout(() => {
            this.showPopup = false;
          }, 1500);
        } else {
          this.$el.querySelector('.popup').classList.add('hide');
          setTimeout(() => {
            this.showPopup = false;
          }, 1500);
        }
      }
    },
  };
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
  