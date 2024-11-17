import axios from 'axios';
import router from '../router'; // 确保导入你的路由实例

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000', // 设置你的 API 基础 URL
  timeout: 10000, // 请求超时时间
});


// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      // 如果返回 401 未授权，重定向到登录页面
      router.push({ name: 'LoginPage' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 