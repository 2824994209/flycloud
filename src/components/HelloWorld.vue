<template>
  <el-container>
    <el-header>系统信息/统计</el-header>
    <el-main>
      <div class="info-card">
        <h3>系统说明</h3>
        <p>UI 版本: v0.1.2 (2022-08-07)</p>
        <p>软件版本: v0.1.2022-08-07 (测试版)</p>
        <el-button type="primary">访问网站</el-button>
        <el-button>关于软件</el-button>
      </div>
      <div class="info-card">
        <h3>整体数据</h3>
        <p>用户数: 1</p>
        <p>管理员: 1</p>
        <p>分享数: 0</p>
        <p>文件数: 0</p>
        <p>总占用: 0B</p>
        <p>实际占用: 0B</p>
      </div>
      <div class="info-card">
        <h3>服务器占用</h3>
        <p>CPU: 6.15%</p>
        <p>内存: 77.00%</p>
        <p>磁盘: 47.06%</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
</script>

<style scoped>
.info-card {
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.el-main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info-card h3 {
  margin-bottom: 10px;
}
</style>
