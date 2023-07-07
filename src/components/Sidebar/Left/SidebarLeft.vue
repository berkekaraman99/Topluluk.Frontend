<template>
  <div
    id="sidebar-left"
    class="d-flex align-items-start justify-content-start flex-column flex-sm-row flex-md-column flex-lg-column"
  >
    <RouterLink
      :to="{ name: 'home' }"
      class="sidebar-link justify-content-center justify-content-md-center justify-content-lg-start"
    >
      <TabVue>
        <template v-slot:icon>
          <i class="fa-solid fa-bolt"></i>
        </template>
        <template v-slot:name> Akış </template>
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
        <template v-slot:name> Etkinliklerim </template>
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
        <template v-slot:name> Topluluklar </template>
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
        <template v-slot:name> Arama </template>
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
  @media screen and (min-width: 768px) and (max-width: 992px) {
    position: fixed;
    width: fit-content;
  }
  @media screen and (max-width: 576px) {
    top: 60px;
  }
  @media screen and (min-width: 993px) {
    position: fixed;

    // width: fit-content;
  }
}

.sidebar-link {
  background-color: white;
  font-weight: 500;
  height: 40px;
  width: 100%;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  margin: 3px 0px;
  display: flex;
  text-decoration: none;
  color: rgb(27, 27, 27);
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  &:hover {
    color: var(--color-primary);
    box-shadow: inset 8px 0px 0px -2px grey;
  }

  @media screen and (max-width: 992px) {
    margin: 3px 6px;
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    padding: 0px 4px;
  }
}

a.router-link-exact-active {
  color: var(--color-primary);
  background-color: var(--color-secondary);
  box-shadow: inset 8px 0px 0px -2px var(--color-primary);
}
</style>
