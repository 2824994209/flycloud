<template>
    <div class="not-found">
      <div class="content">
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面不存在或已被移除</p>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useCookies } from 'vue3-cookies';
  const { cookies } = useCookies();
  const router = useRouter()
  
  const goHome = () => {
    cookies.remove('currentFolderId');
    cookies.remove('rootfolderid');
    cookies.remove('az');
    router.push('/')
  }
  </script>
  
  <style scoped>
  .not-found {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    background-image: url('/public/back.jpg');
    background-size: 100% 100%;
  }
  
  .content {
    text-align: center;
    padding: 2rem;
  }
  
  h1 {
    font-size: 8rem;
    margin: 0;
    color: #0c0c0c;
    line-height: 1;
  }
  
  h2 {
    font-size: 2rem;
    color: #333;
    margin: 1rem 0;
  }
  
  p {
    color: #252525;
    margin-bottom: 2rem;
  }
  
  .el-button {
    padding: 12px 30px;
    font-size: 1.1rem;
    text-decoration: none;
    border: none;
    background: none;
    color: #444445;  
    transition: all 0.3s;
  }
  
  .el-button:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
  </style>