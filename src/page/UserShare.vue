<template>
	<MainLayout>
        <div>
            <span class="header-title">share</span>
        </div>
        <div class="shangc">

        </div>
        <div>
            <div class="share_content">
                
            </div>
        </div>

	</MainLayout>
</template>
<script setup>
// import { ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue';
</script>
<style>
.shangc{
	padding: 10px 0;
	margin: 10px 0;
}
.share_content {
  height: 20px;
  background-color: #f6f0fe; /* 背景色 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px; /* 内边距 */
  margin: 20px; /* 外边距 */
  transition: box-shadow 0.3s ease; /* 过渡效果 */
  border: 1px solid #f7f1f1;
}

.share_content:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
