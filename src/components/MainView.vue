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
    <div class="row">
      <Transition mode="out-in" name="fade">
        <SideBar
          v-if="
            route.name === 'home' ||
            route.name === 'events' ||
            route.name === 'communities' ||
            route.name === 'search'
          "
        />
      </Transition>

      <RouterView v-slot="{ Component, route }">
        <Transition mode="out-in" name="fade">
          <component
            :is="Component"
            :key="route.path"
            style="overflow: hidden"
            class="col-md-12 offset-md-0 col-lg-7"
            :class="{
              'col-lg-12':
                route.name !== 'home' &&
                route.name !== 'events' &&
                route.name !== 'communities' &&
                route.name !== 'search',
            }"
          />
        </Transition>
      </RouterView>

      <Transition mode="out-in" name="fade">
        <CommunitySuggestions
          v-if="
            route.name === 'home' ||
            route.name === 'events' ||
            route.name === 'communities' ||
            route.name === 'search'
          "
        />
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import SideBar from "@/components/SideBar.vue";
import CommunitySuggestions from "@/components/common/home/CommunitySuggestions.vue";
const route = useRoute();
</script>

<style scoped></style>
