<script setup lang="ts">
import { useRoute } from "vue-router";
import MainVue from "@/components/MainView.vue";
import NavBar from "@/components/header/NavBar.vue";
import PageFooter from "@/components/footer/PageFooter.vue";
import { ref, watch, inject } from "vue";
import { useAuthStore } from "./stores/auth";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const connection: any = inject("connection");

const hubConnection = ref(connection);

const createHubConnection = async () => {
  connection.onclose(() => {
    console.log("Connection closed");
  });

  try {
    await connection.start();

    console.log("SignalR connected");
    hubConnection.value = connection;
  } catch (error) {
    console.log("SignalR connection error:", error);
  }
};

watchEffect(createHubConnection);

watch(
  user,
  async () => {
    try {
      await connection.start();
    } catch (error: any) {
      console.log(error.message);
    }
  },
  { immediate: true }
);

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
  <MainVue class="d-flex flex-column flex-lg-row" />

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
