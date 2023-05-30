<template>
  <div
    id="sidebar"
    class="col-md-12 col-lg-2 mb-4 mb-md-4 mb-lg-0 d-flex align-items-start justify-content-start flex-column flex-sm-row flex-lg-column"
  >
    <RouterLink
      :to="{ name: 'home' }"
      class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
      ><i class="fa-solid fa-bolt"></i><span>Feed</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'events' }"
      class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
      ><i class="fa-solid fa-calendar-days"></i>
      <span>My Events</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'communities' }"
      class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
    >
      <i class="fa-solid fa-people-group"></i>
      <span>Communities</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'search' }"
      class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Search</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#sidebar {
  border-radius: 12px;
  padding: 11px 8px;
  height: fit-content;
  background-color: rgb(253, 253, 253);
  // transition: 0.3s ease;
}

.nav-link {
  height: 40px;
  width: 100%;
  border-radius: 12px;
  transition: 0.4s ease;
  padding: 0px 12px;
  margin: 3px 0px;
  border: 1px solid white;
  box-shadow: 1px 1px 7px -5px black;

  &:hover {
    background-color: rgb(245, 245, 245);
  }

  span {
    margin-left: 6px;
  }
}

a.router-link-exact-active {
  color: var(--color-primary);
  background-color: rgb(255, 255, 255);
  border: 1px solid var(--color-primary);
}
</style>
