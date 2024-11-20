<template>
  <div :style="backgroundStyle" class="star-background">
    <div v-for="star in stars" :key="star.id" class="star" :style="star.style"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StarBackground',
  data() {
    return {
      stars: []
    };
  },
  computed: {
    backgroundStyle() {
      return {
        height: '100vh',
        width: '100vw',
        // backgroundColor: '#000'
      };
    }
  },
  mounted() {
    this.generateStars();
  },
  methods: {
    generateStars() {
      for (let i = 0; i < 50; i++) { // 生成50颗星星
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 5 + 1; // 星星大小在1到6之间
        this.stars.push({
          id: i,
          style: {
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${Math.random() * 10 + 5}s` // 随机动画持续时间
          }
        });
      }
    }
  }
});
</script>

<style scoped>
.star-background {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 5px white;
  animation: moveStar infinite alternate ease-in-out;
}

@keyframes moveStar {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(5px, 5px);
  }
}
</style>