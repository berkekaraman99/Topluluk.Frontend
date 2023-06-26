<template>
  <div>
    <FeedVue />
  </div>
</template>

<script setup lang="ts">
import FeedVue from "@/components/common/home/FeedVue.vue";
</script>

<style scope>
.bg-image {
  background-image: url("@/assets/images/home-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.transparent-bg {
  background-color: rgba(0, 0, 0, 0.9);
}

/* switch transitions */
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.switch-enter-active,
.switch-leave-active {
  transition: all 0.6s ease;
}

#feed {
  overflow: hidden;
}
</style>
