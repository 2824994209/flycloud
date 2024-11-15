import { createRouter, createWebHistory } from 'vue-router';
// import MainLayout from '@/layouts/MainLayout.vue';
import PageDashboard from '@/page/DashboardPage.vue';
import LoginPage from '@/login/LoginPage.vue';
import HelloWorld from '@/components/HelloWorld.vue'
import RegisterPage from '@/login/RegisterPage.vue';
// import CreateFile from '@/util/CreateFile.vue';
import BasicSetting from '@/page/BasicSetting.vue';
// import SystemInfo from '@/page/SystemInfo.vue';
// import BackAdmin from '@/layouts/BackAdmin.vue';
import SystemExplain from '@/admin_page/SystemExplain.vue';


const routes = [
  { path: '/', component: PageDashboard },
  { path: '/admin/system', component: SystemExplain },
  { path: '/ces', component: HelloWorld },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/user/personal', component: PageDashboard },
  { path: '/user/setting', component: BasicSetting },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
