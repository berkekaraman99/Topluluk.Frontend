<script setup lang="ts">
import { useRoute } from "vue-router";
import MainVue from "@/components/MainView.vue";
import NavBar from "@/components/header/NavBar.vue";
import PageFooter from "@/components/footer/PageFooter.vue";

const route = useRoute();
</script>

<template>
  <!-- Header -->
  <NavBar
    v-if="
      route.name !== 'login' &&
      route.name !== 'signup' &&
      route.name !== 'forgetpassword'
    "
  />

  <!-- Main -->
  <MainVue />

  <!-- Footer -->
  <PageFooter
    v-if="
      route.name !== 'login' &&
      route.name !== 'signup' &&
      route.name !== 'forgetpassword'
    "
  />
</template>

<style lang="scss">
.carousel-control-prev,
.carousel-control-next {
  opacity: 0;

  &:hover {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
