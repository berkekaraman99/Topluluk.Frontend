<template>
  <div class="container-fluid d-flex">
    <Background />
    <Login />
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/common/auth/LogIn.vue";
import Background from "@/components/common/auth/BackgroundVue.vue";
</script>

<style scoped>
.container-fluid {
  padding: 0px;
  height: 100vh;
}
</style>
