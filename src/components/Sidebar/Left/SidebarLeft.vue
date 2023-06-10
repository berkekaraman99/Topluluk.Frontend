<template>
  <div
    id="sidebar-left"
    class="mb-4 mb-md-4 mb-lg-0 d-flex align-items-start justify-content-start flex-column flex-sm-row flex-md-column flex-lg-column"
  >
    <RouterLink
      :to="{ name: 'home' }"
      class="sidebar-link justify-content-center justify-content-md-center justify-content-lg-start"
    >
      <TabVue>
        <template v-slot:icon>
          <i class="fa-solid fa-bolt"></i>
        </template>
        <template v-slot:name> Feed </template>
      </TabVue>
    </RouterLink>

    <RouterLink
      :to="{ name: 'events' }"
      class="sidebar-link justify-content-center justify-content-md-center justify-content-lg-start"
    >
      <TabVue>
        <template v-slot:icon>
          <i class="fa-solid fa-calendar-days"></i>
        </template>
        <template v-slot:name> My Events </template>
      </TabVue>
    </RouterLink>
    <RouterLink
      :to="{ name: 'communities' }"
      class="sidebar-link justify-content-center justify-content-md-center justify-content-lg-start"
    >
      <TabVue>
        <template v-slot:icon>
          <i class="fa-solid fa-people-group"></i>
        </template>
        <template v-slot:name> Communities </template>
      </TabVue>
    </RouterLink>
    <RouterLink
      :to="{ name: 'search' }"
      class="sidebar-link justify-content-center justify-content-md-center justify-content-lg-start"
    >
      <TabVue>
        <template v-slot:icon>
          <i class="fa-solid fa-magnifying-glass"></i>
        </template>
        <template v-slot:name> Search </template>
      </TabVue>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import TabVue from "./TabVue.vue";
</script>

<style scoped lang="scss">
#sidebar-left {
  border-radius: 12px;
  padding: 0.5rem 0px;
  height: fit-content;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
  @media screen and (max-width: 576px) {
    top: 60px;
  }
  @media screen and (min-width: 993px) {
    position: fixed;
    width: fit-content;
  }
}

.sidebar-link {
  height: 40px;
  width: 100%;
  border-radius: 12px;
  transition: 0.35s ease;
  margin: 3px 0px;
  border: 1px solid white;
  box-shadow: 1px 1px 7px -5px black;
  display: flex;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: whitesmoke;
    color: black;
  }

  @media screen and (max-width: 992px) {
    margin: 3px 6px;
  }
}

a.router-link-exact-active {
  color: var(--color-text);
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  font-weight: bold;
}
</style>
