<template>
  <div class="admin-common-layout">
    <el-container>
      <el-header class="header">
        <div class="title">flycloudisk 管理</div>
        <el-button class="logout-button" type="danger" @click="dialogVisible = true">
          <el-icon><SwitchButton /></el-icon>
          <!-- 退出登录 -->
        </el-button>
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

    <!-- 退出确认对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="退出确认"
      width="30%"
      :close-on-click-modal="false"
      center
    >
      <span>确定要退出登录吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleLogout">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { SwitchButton } from '@element-plus/icons-vue';

const router = useRouter();
const { cookies } = useCookies();
const dialogVisible = ref(false);

const handleLogout = () => {
  dialogVisible.value = false;
  console.log('登出');
  router.push('/login')
  cookies.remove('currentFolderId');
  cookies.remove('rootfolderid');
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
  background-color: #fff;
}

.title {
  font-weight: bold;
  font-size: 18px;
  color: #303133;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s;
}

.logout-button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.aside {
  border-right: 1px solid #e4e7ed;
  height: calc(100vh - 60px);
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>