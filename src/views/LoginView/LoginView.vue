<template>
  <div class="container-fluid d-flex">
    <Background class="d-none d-md-block" />
    <Login />
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/common/auth/LogIn.vue";
import Background from "@/components/common/auth/BackgroundVue.vue";
</script>

<style scoped>
main {
  padding: 0px;
}
.container-fluid {
  padding: 0px;
  height: 100vh;
}
</style>
