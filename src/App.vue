<template>
  <div class="h-100">
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
      <div
        class="h-100"
        :class="{
          'container-fluid':
            $route.name === 'login' ||
            $route.name === 'signup' ||
            $route.name === 'forgetpassword',
          container:
            $route.name !== 'login' &&
            $route.name !== 'signup' &&
            $route.name !== 'forgetpassword',
        }"
        :style="{
          marginTop:
            $route.name !== 'login' &&
            $route.name !== 'signup' &&
            $route.name !== 'forgetpassword'
              ? '72px'
              : '0px',
        }"
      >
        <div class="row h-100">
          <Transition name="fade" mode="out-in">
            <div
              class="col-md-1 col-lg-2 px-0 pe-0 pe-sm-0 pe-md-3 pe-lg-0"
              v-if="
                $route.name === 'home' ||
                $route.name === 'communities' ||
                $route.name === 'search' ||
                $route.name === 'events'
              "
            >
              <div>
                <SidebarLeft />
              </div>
            </div>
          </Transition>

          <!-- Main -->
          <main
            class="col-12 col-md-11 col-lg-7 col-xl-7 px-0"
            :class="{
              'col-md-12 col-lg-12 col-xl-12':
                $route.name !== 'home' &&
                $route.name !== 'communities' &&
                $route.name !== 'search' &&
                $route.name !== 'events',
            }"
          >
            <RouterView v-slot="{ Component, route }">
              <Transition name="fade" mode="out-in">
                <component :is="Component" :key="route.path" />
              </Transition>
            </RouterView>
          </main>

          <Transition name="fade" mode="out-in">
            <div
              class="d-none d-sm-none d-md-none d-lg-block col-md-3 col-lg-3"
              v-if="
                $route.name === 'home' ||
                $route.name === 'communities' ||
                $route.name === 'search' ||
                $route.name === 'events'
              "
            >
              <div>
                <SidebarRight />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import SidebarLeft from "./components/Sidebar/Left/SidebarLeft.vue";
import SidebarRight from "./components/Sidebar/Right/SidebarRight.vue";
import NavBar from "./components/header/NavBar.vue";
</script>

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
