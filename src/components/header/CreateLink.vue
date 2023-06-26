<template>
  <ul class="dropdown-menu dropdown-menu-end animate scaleOut">
    <li v-for="link in links" :key="link.id">
      <RouterLink :to="{ name: link.routeName }" class="dropdown-item">
        <i :class="link.icon"></i>
        {{ link.content }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const links = [
  {
    id: 1,
    routeName: "createCommunity",
    content: "Topluluk Oluştur",
    icon: "fa-solid fa-users",
  },
  {
    id: 2,
    routeName: "createPost",
    content: "Gönderi Oluştur",
    icon: "fa-solid fa-note-sticky",
  },
  {
    id: 3,
    routeName: "createEvent",
    content: "Etkinlik Oluştur",
    icon: "fa-solid fa-calendar",
  },
];
</script>

<style scoped></style>
