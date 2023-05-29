<template>
  <div class="container-fluid d-flex">
    <Background class="d-none d-md-block" />
    <SignUp />
  </div>
</template>

<script setup lang="ts">
import SignUp from "@/components/common/auth/SignUp.vue";
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
