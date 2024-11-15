<template>
  <BackAdmin>
    <div class="dashboard">
      <div class="info-card">
        <h3>系统说明</h3>
        <div class="info-content">
          <p style="color: gray;">UI 版本: </p>
          <p >{{ moni.systemInfo.uiVersion }}</p>
          <div style="padding: 17px 0;">

          </div>
          <p style="color: gray;">软件版本: </p>
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
          <div class="data-item"><p style="text-align: left;padding-bottom: 5px;margin: 0;color: gray;">用户数:</p> <span class="dynamic">{{ moni.overallData.userCount }}</span></div>
          <div class="data-item"><p style="text-align: left;padding-bottom: 5px;margin: 0;color: gray;">管理员:</p> <span class="dynamic">{{ moni.overallData.adminCount }}</span></div>
          <div class="data-item"><p style="text-align: left;padding-bottom: 5px;margin: 0;color: gray;">分享数:</p> <span class="dynamic">{{ moni.overallData.shareCount }}</span></div>
          <div class="data-item"><p style="text-align: left;padding-bottom: 5px;margin: 0;color: gray;">文件数:</p> <span class="dynamic">{{ moni.overallData.fileCount }}</span></div>
          <div class="data-item"><p style="text-align: left;padding-bottom: 5px;margin: 0;color: gray;">总占用:</p> <span class="dynamic">{{ moni.overallData.totalUsage }}</span></div>
          <div class="data-item"><p style="text-align: left;padding-bottom: 5px;margin: 0;color: gray;">实际占用:</p> <span class="dynamic">{{ moni.overallData.actualUsage }}</span></div>
        </div>
      </div>
      <div class="info-card">
        <h3>服务器占用</h3>
        <div class="data-grid single-column">
          <div class="data-item-b">
            <span style="color: gray;">CPU: </span>
            <el-progress :percentage="moni.serverUsage.cpuUsage" :color="colors" />
          </div>
          <div class="data-item-b">
            <span style="color: gray;">内存: </span>
            <el-progress :percentage="moni.serverUsage.memoryUsage" :color="colors" />
          </div>
          <div class="data-item-b">
            <span style="color: gray;">磁盘: </span>
            <el-progress :percentage="moni.serverUsage.diskUsage" :color="colors" />
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard">
      <div class="info-card">
        <h3>cpu和内存占用率</h3>
        <div class="data-grid-c">
          <div class="data-item-c" style="border: none;">
            <el-progress type="dashboard" :percentage="moni.serverUsage.cpuUsage" :color="colors" />
            <span>cpu占用率</span>
          </div>
          <div class="data-item-c" style="border: none;">
            <el-progress type="dashboard" :percentage="moni.serverUsage.memoryUsage" :color="colors" />
            <span>内存占用率</span>
          </div>
        </div>
      </div>
      <div class="info-card disk-chart-card">
        <h3>磁盘使用情况</h3>
        <div class="disk-chart-container" ref="diskChartRef"></div>
      </div>
    </div>
  </BackAdmin>  
</template>

<script setup>
import BackAdmin from '@/layouts/BackAdmin.vue';
import { ref,onMounted,getCurrentInstance, onUnmounted, nextTick } from 'vue';
import 'element-plus/theme-chalk/el-progress.css';
const { proxy } = getCurrentInstance()
const echarts = proxy.$echarts
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
    diskUsage: 47.06,
    diskTotal: '500GB',
    diskUsed: '235.3GB',
    diskFree: '264.7GB'
  }
});
const diskChartRef = ref(null)
let diskChart = null

const initDiskChart = async () => {
  await nextTick()
  if (!diskChartRef.value) return
  
  if (diskChart) {
    diskChart.dispose()
  }

  diskChart = echarts.init(diskChartRef.value)
  
  const diskUsed = parseFloat(moni.value.serverUsage.diskUsed)
  const diskFree = parseFloat(moni.value.serverUsage.diskFree)
  
  const option = {
  title: {
    text: `总容量：${moni.value.serverUsage.diskTotal}`,
    top: 0,
    left: 'center',
    textStyle: {
      rich: {
        used: {
          color: '#f56c6c',
          fontSize: 14
        },
        free: {
          color: '#409eff',
          fontSize: 14
        }
      }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [
      { name: `已使用 ${moni.value.serverUsage.diskUsed}`, icon: 'circle' },
      { name: `剩余空间 ${moni.value.serverUsage.diskFree}`, icon: 'circle' }
    ],
    textStyle: {
      color: '#000' // 你可以根据需要调整文本颜色
    }
  },
  series: [
    {
      name: '磁盘使用情况',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: [
        { 
          value: diskUsed,
          name: `已使用 ${moni.value.serverUsage.diskUsed}`,
          itemStyle: { color: '#f56c6c' }
        },
        { 
          value: diskFree,
          name: `剩余空间 ${moni.value.serverUsage.diskFree}`,
          itemStyle: { color: '#409eff' }
        }
      ]
    }
  ]
}

  
  diskChart.setOption(option)
}

const resizeObserver = new ResizeObserver(() => {
  if (diskChart) {
    diskChart.resize()
  }
})

onMounted(async () => {
  await nextTick()
  if (diskChartRef.value) {
    resizeObserver.observe(diskChartRef.value)
    await initDiskChart()
  }
})

onUnmounted(() => {
  resizeObserver.disconnect()
  if (diskChart) {
    diskChart.dispose()
  }
})
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
  padding: 15px 20px ;
  border: 1px solid #f0eaea;
  border-radius: 8px;
  /* background-color: #f9f9f9; */
  font-size: 14px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;
}

.data-item-b {
  padding: 6px 6px;
  border: 1px solid #f0eaea;
  border-radius: 8px;
  /* background-color: #f9f9f9; */
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
  background-color: #f9f9f9;
  transform: scale(1.08);
}

.data-item-b:hover {
  background-color: #f9f9f9;
  transform: scale(1.05);
}

.dynamic {
  font-size: 20px;
  color: rgb(85,130,208);
  font-weight: bold;
}

p {
  font-size: 14px;
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

.disk-chart-card {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.disk-chart-container {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
