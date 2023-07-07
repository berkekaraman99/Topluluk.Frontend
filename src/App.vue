<template>
  <div class="min-vh-100">
    <!-- NAVBAR -->
    <Transition name="fade">
      <NavBar
        v-if="
          $route.name !== 'login' &&
          $route.name !== 'signup' &&
          $route.name !== 'forgetpassword' &&
          $route.path !== '/'
        "
      />
    </Transition>

    <Transition name="fade">
      <LeftBar
        v-if="
          $route.name !== 'login' &&
          $route.name !== 'signup' &&
          $route.name !== 'forgetpassword' &&
          $route.path !== '/'
        "
      />
    </Transition>

    <div
      class="main"
      :class="{
        'container-fluid ps-0':
          $route.name === 'login' ||
          $route.name === 'signup' ||
          $route.name === 'forgetpassword',
        container:
          $route.name !== 'login' &&
          $route.name !== 'signup' &&
          $route.name !== 'forgetpassword',
      }"
      :style="{
        'padding-top':
          $route.name === 'login' ||
          $route.name === 'signup' ||
          $route.name === 'forgetpassword'
            ? '0'
            : '64px',
      }"
    >
      <div class="row overflow-hidden h-100">
        <!-- SIDEBAR LEFT -->
        <Transition name="scaleInOut" mode="out-in">
          <div
            class="col-md-1 col-lg-2"
            v-if="
              $route.name === 'home' ||
              $route.name === 'communities' ||
              $route.name === 'search' ||
              $route.name === 'events'
            "
          >
            <SidebarLeft />
          </div>
        </Transition>

        <!-- MAIN - ROUTER.VIEW -->
        <main
          class="col-12 col-sm-12 col-md-11 col-lg-7 col-xl-7 px-4 px-md-0"
          :class="{
            'col-md-12 col-lg-12 col-xl-12 px-0':
              $route.name !== 'home' &&
              $route.name !== 'search' &&
              $route.name !== 'communities' &&
              $route.name !== 'events',
          }"
        >
          <RouterView v-slot="{ Component, route }">
            <Transition name="scaleInOut" mode="out-in">
              <component :is="Component" :key="route.path" />
            </Transition>
          </RouterView>
        </main>

        <!-- SIDEBAR RIGHT -->
        <Transition name="scaleInOut" mode="out-in">
          <div
            class="d-none d-sm-none d-md-none d-lg-flex col-md-3 col-lg-3 justify-content-lg-center px-0"
            v-if="
              $route.name === 'home' ||
              $route.name === 'search' ||
              $route.name === 'events'
            "
          >
            <SidebarRight />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarLeft from "./components/Sidebar/Left/SidebarLeft.vue";
import SidebarRight from "./components/Sidebar/Right/SidebarRight.vue";
import NavBar from "./components/header/NavBar.vue";
import LeftBar from "./components/shared/LeftBar.vue";
</script>

<style lang="scss">
.main {
  // position: relative;
  // top: 64px;
  // left: 64px;
  // bottom: 0;
  // right: 0;
  // overflow: hidden;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  padding-left: 76px;
  padding-top: 80px;
}
</style>
