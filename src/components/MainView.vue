<template>
  <main
    :style="{
      overflow:
        route.name !== 'login' &&
        route.name !== 'signup' &&
        route.name !== 'forgetpassword'
          ? 'auto'
          : 'hidden',
    }"
    :class="{
      'container-fluid px-0':
        route.name === 'login' ||
        route.name === 'signup' ||
        route.name === 'forgetpassword',
      container:
        route.name !== 'login' &&
        route.name !== 'signup' &&
        route.name !== 'forgetpassword',
    }"
  >
    <Transition mode="out-in" name="fade">
      <div
        id="left-panel"
        class="p-0"
        v-if="
          route.name === 'home' ||
          route.name === 'events' ||
          route.name === 'communities' ||
          route.name === 'search'
        "
      >
        <SideBar />
      </div>
    </Transition>

    <RouterView v-slot="{ Component, route }">
      <Transition mode="out-in" name="fade">
        <component
          :is="Component"
          :key="route.path"
          style="overflow: hidden"
          class="scrollable-panel"
        />
      </Transition>
    </RouterView>

    <Transition mode="out-in" name="fade">
      <div
        id="right-panel"
        class="p-0"
        v-if="
          route.name === 'home' ||
          route.name === 'events' ||
          route.name === 'communities' ||
          route.name === 'search'
        "
      >
        <CommunitySuggestions />
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import SideBar from "@/components/SideBar.vue";
import CommunitySuggestions from "@/components/common/home/CommunitySuggestions.vue";
const route = useRoute();
</script>

<style scoped lang="scss">
#left-panel {
  flex: 0 0 200px;
  @media screen and (max-width: 992px) {
    flex: 0 0 0px;
    // display: inline-block;
  }
}

#right-panel {
  flex: 0 0 272px;

  @media screen and (max-width: 992px) {
    flex: 0 0 0px;
  }
}

.scrollable-panel {
  flex: 1;
  overflow-y: auto;
  // @media screen and (max-width: 576px) {
  //   margin-top: 176px !important;
  // }
  min-height: 240px;
  align-items: center;
}
</style>
