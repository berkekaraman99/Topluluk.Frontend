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
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();
const links = [
  {
    id: 1,
    routeName: "createCommunity",
    content: t("header.createcommunity"),
    icon: "fa-solid fa-users",
  },
  {
    id: 2,
    routeName: "createPost",
    content: t("header.createpost"),
    icon: "fa-solid fa-note-sticky",
  },
  {
    id: 3,
    routeName: "createEvent",
    content: t("header.createevent"),
    icon: "fa-solid fa-calendar",
  },
];
</script>

<style scoped></style>
