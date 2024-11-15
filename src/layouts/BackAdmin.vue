<template>
  <div class="admin-common-layout">
    <el-container>
      <el-header>
        flycloudisk 管理
      </el-header>
      <el-container>
        <el-aside width="201px" style="border-right: 1px solid #e4e7ed;height: calc(100vh - 60px);">
          <el-menu class="el-menu-vertical-demo" :default-active="$route.path" :router="true" style="border-right: none;">
            <el-menu-item index="/admin/system">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>系统信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </el-menu-item>

            <el-menu-item index="3">
              <el-icon>
                <Setting />
              </el-icon>
              <span>基础设置</span>
            </el-menu-item>
            <el-menu-item index="4">
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
            </el-menu-item>
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
</script>
<style></style>