<template>
  <BackAdmin>
    <div class="dashboard">
      <div class="info-card">
        <h3>系统说明</h3>
        <div class="info-content">
          <p>UI 版本: </p>
          <p>{{ moni.systemInfo.uiVersion }}</p>
          <div style="padding: 17px 0;">

          </div>
          <p>软件版本: </p>
          <p>{{ moni.systemInfo.softwareVersion }}</p>
          <div class="buttons">
            <el-button type="primary">访问网站</el-button>
            <el-button>关于软件</el-button>
          </div>
        </div>
      </div>
      <div class="info-card large">
        <h3>整体数据</h3>
        <div class="data-grid">
          <div class="data-item">用户数: <span class="dynamic">{{ moni.overallData.userCount }}</span></div>
          <div class="data-item">管理员: <span class="dynamic">{{ moni.overallData.adminCount }}</span></div>
          <div class="data-item">分享数: <span class="dynamic">{{ moni.overallData.shareCount }}</span></div>
          <div class="data-item">文件数: <span class="dynamic">{{ moni.overallData.fileCount }}</span></div>
          <div class="data-item">总占用: <span class="dynamic">{{ moni.overallData.totalUsage }}</span></div>
          <div class="data-item">实际占用: <span class="dynamic">{{ moni.overallData.actualUsage }}</span></div>
        </div>
      </div>
      <div class="info-card">
        <h3>服务器占用</h3>
        <div class="data-grid single-column">
          <div class="data-item-b">
            <span>CPU: </span>
            <el-progress :percentage="moni.serverUsage.cpuUsage" color="#895da1" />
          </div>
          <div class="data-item-b">
            <span>内存: </span>
            <el-progress :percentage="moni.serverUsage.memoryUsage" color="#895da1" />
          </div>
          <div class="data-item-b">
            <span>磁盘: </span>
            <el-progress :percentage="moni.serverUsage.diskUsage" color="#895da1" />
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard">
      <div class="info-card">
        <h3>cpu和内存占用率</h3>
        <div class="data-grid-c">
          <div class="data-item-c" style="border: none;">
            <el-progress type="dashboard" :percentage="moni.serverUsage.cpuUsage" />
            <span>cpu占用率</span>
          </div>
          <div class="data-item-c" style="border: none;">
            <el-progress type="dashboard" :percentage="moni.serverUsage.memoryUsage" :color="colors" />
            <span>内存占用率</span>
          </div>
        </div>
      </div>
      <div class="info-card">

      </div>
    </div>
  </BackAdmin>
</template>

<script setup>
import BackAdmin from '@/layouts/BackAdmin.vue';
import { ref } from 'vue';
import 'element-plus/theme-chalk/el-progress.css';

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
// 模拟数据
const moni = ref({
  systemInfo: {
    uiVersion: "v0.1.2 (2022-08-07)",
    softwareVersion: "v0.1.2022-08-07 (测试版)"
  },
  overallData: {
    userCount: 1,
    adminCount: 1,
    shareCount: 0,
    fileCount: 0,
    totalUsage: "0B",
    actualUsage: "0B"
  },
  serverUsage: {
    cpuUsage: 6.15,
    memoryUsage: 30.00,
    diskUsage: 47.06
  }
});
</script>

<style scoped>
.dashboard {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 20px;
}

.info-card {
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  flex: 1;
  min-width: 200px;
}

.info-card.large {
  flex: 2;
}

.info-card h3 {
  margin-bottom: 10px;
}

.info-content {
  display: flex;
  flex-direction: column;
  height: 60%;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.data-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 200px;
  justify-content: space-between;
  align-items: flex-start;
}
.data-grid-c {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 200px;
  justify-content: space-between;
  padding: 0 60px;
  align-items: flex-start;
}

.data-item {
  padding: 20px;
  border: 1px solid #f0eaea;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 14px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;
}

.data-item-b {
  padding: 4px 6px;
  border: 1px solid #f0eaea;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 14px;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;
}
.data-item-c {
  padding: 20px;
  /* border: 1px solid #f0eaea; */
  border-radius: 8px;
  /* background-color: #f9f9f9; */
  font-size: 14px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;
}
.data-item:hover {
  background-color: #eaeaea;
  transform: scale(1.05);
}

.data-item-b:hover {
  background-color: #eaeaea;
  transform: scale(1.05);
}

.dynamic {
  font-size: 18px;
  color: #895da1;
  font-weight: bold;
}

p {
  font-size: 13px;
}

@media (min-width: 768px) {
  .data-item {
    width: 48%;
  }
}

@media (min-width: 1024px) {
  .data-item {
    width: 24%;
  }
}
@media (min-width: 768px) {
  .data-item-c {
    width: 48%;
  }
}

@media (min-width: 1024px) {
  .data-item-c {
    width: 24%;
  }
}
</style>
