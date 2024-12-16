import axios from 'axios';
import router from '../router'; // 确保导入你的路由实例
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
// 创建 axios 实例
// const backendAddress = inject('backendAddress');
const axiosInstance = axios.create({
  // baseURL: import.meta.env.BACKEND_URL,
  baseURL: process.env.VUE_APP_API_BASE_URL ,
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
      cookies.remove('az');
      cookies.remove('currentFolderId');
      cookies.remove('rootfolderid');
      router.push("/login");

    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 