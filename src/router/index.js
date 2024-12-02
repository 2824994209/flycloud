import { createRouter, createWebHistory } from 'vue-router';
import { useCookies } from 'vue3-cookies';
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
import UserManage from '@/admin_page/UserManage.vue';
import adminBasicSetting from '@/admin_page/BasicSetting.vue';
import UserShare from '@/page/UserShare.vue';
import HistoryDate from '@/page/HistoryDate.vue';
import LittleStar from '@/util/LittleStar.vue';
const routes = [
  { path: '/', component: PageDashboard, meta: { requiresAuth: true } },
  { path: '/admin/system', component: SystemExplain,  },
  { path: '/admin/user', component: UserManage,  },
  { path: '/admin/basic', component: adminBasicSetting, },
  { path: '/ces', component: HelloWorld, meta: { requiresAuth: true } },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/user/personal', component: PageDashboard, meta: { requiresAuth: true }},
  { path: '/user/setting', component: BasicSetting, meta: { requiresAuth: true }},
  { path: '/user/share', component: UserShare,meta: { requiresAuth: true } },
  { path: '/user/date', component: HistoryDate,meta: { requiresAuth: true } },
  { path: '/user/star', component: LittleStar, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const { cookies } = useCookies();

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = cookies.get('az'); // 检查 cookie 中的 token
  // console.log(isAuthenticated)

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'LoginPage' });
  } else {
    // 否则，允许进入路由
    next();
  }
});
export default router;
