<template style="height: 100vh;">
    <div>
      <!-- 使用 flex 布局整个页面 -->
      <div style="position: relative; z-index: 1;">
        <el-container style="display: flex;">
          <el-main style="flex: 1; display: flex; justify-content: center; align-items: center; text-align: center;margin-top: 60px;">
            <div class="el-input-w" style="z-index: 999; width: 500px; ">
              
                <div style="height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <p style="font-weight: bolder; margin-bottom: 20px;">注册</p>

                <!-- 用户名输入框 -->
                <el-input
                    v-model="registerForm.username"
                    style="width: 300px; margin-bottom: 30px;margin-top:-50px"
                    placeholder="账号"
                />
                <!-- 邮箱 -->
                <el-input
                    v-model="registerForm.mailbox"
                    style="width: 300px; margin-bottom: 30px;"
                    placeholder="邮箱"
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
  </script>
  <script>
  import axiosInstance from 'axios';
  
  export default {
    data() {
      return {
        showPopup: false, // 控制弹窗显示
        popupMessage: '',
        isProcessing: false,
        confirmPassword: '',
        registerForm: {
          username: '',
          password: '',
          mailbox: '',
        }
      }
    },
    methods: {
      // 前台判断输入框是否为空
      async submitLogin() { // 确保方法声明为 async
        console.log('点击了注册,', this.registerForm);
  
        // 防抖
        if (this.isProcessing) {
          return;
        }
        this.isProcessing = true; // 设置处理标志
  
        // 验证输入
        if (!this.registerForm.username) {
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
        if (!this.registerForm.mailbox) {
          this.$notify.warning({
              duration: 2000,
              title: 'warning',
              message: '邮箱不能为空',
              showClose: false
            });
          this.isProcessing = false;
          return;
        }
        if (!this.registerForm.password) {
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
        if (!this.confirmPassword) {
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
        if (this.registerForm.password != this.confirmPassword) {
          // this.popupMessage = "密码不能为空";
          // this.showPopup = true;
          this.$notify.warning({
              duration: 2000,
              title: 'warning',
              message: '输入的密码不一样',
              showClose: false
            });
          this.isProcessing = false;
          return;
        }
  
        // 登录的post请求
        const params = {
          username: this.registerForm.username,
          password: this.registerForm.password,
          mailbox: this.registerForm.mailbox,
        };
  
        try {
          const res = await axiosInstance.post(`${this.$backendAddress}/register`, params);
          console.log('res', res);
          if (res.status === 200) {
            console.log('注册成功', res.data);
            this.$router.push('/login'); // 修改为你实际需要的路径
            this.$notify.success({
              duration: 2000,
              title: 'success',
              message: '注册成功',
              showClose: false
            });
          } 
        } catch (error) {
          console.error('请求错误', error);
          this.$notify.error({
              duration: 2000,
              title: 'error',
              message: '注册失败',
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
  