<template>
  <div class="container-fluid d-flex">
    <Background class="d-none d-md-block" />
    <SignupVue />
  </div>
</template>

<script setup lang="ts">
import SignupVue from "@/components/common/auth/SignupVue.vue";
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
