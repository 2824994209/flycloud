<template>
  <div class="admin-common-layout">
    <el-container>
      <el-header class="header">
        <div class="title">flycloudisk 管理</div>
        <el-button class="logout-button" @click="logout" type="info">登出</el-button>
      </el-header>
      <el-container>
        <el-aside class="aside" width="201px">
          <el-menu class="el-menu-vertical-demo" :default-active="$route.path" :router="true" style="border-right: none;">
            <el-menu-item index="/admin/system">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>系统信息</span>
            </el-menu-item>
            <el-menu-item index="/admin/user">
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </el-menu-item>

            <el-menu-item index="/admin/basic">
              <el-icon>
                <Setting />
              </el-icon>
              <span>基础设置</span>
            </el-menu-item>
            <!-- <el-menu-item index="4">
              <el-icon>
                <Message />
              </el-icon>
              <span>邮箱设置</span>
            </el-menu-item>
            <el-menu-item index="5  ">
              <el-icon>
                <Download />
              </el-icon>
              <span>导入文件</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>
<script setup>
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';
const router = useRouter();
const { cookies } = useCookies();
const logout = () => {
  console.log('登出');
  // 在这里添加登出逻辑
  router.push('/login')
  cookies.remove('az');
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: bold;
  font-size: 18px;
}

.logout-button {
  font-size: 16px;
  color: #409eff;
  border: none;
  background: none;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  padding: 10px;
}

.logout-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.aside {
  border-right: 1px solid #e4e7ed;
  height: calc(100vh - 60px);
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}
</style>