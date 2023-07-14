<template>
  <div id="left-bar" class="bg-body-tertiary border-end">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="my-3 w-100">
        <RouterLink
          :to="{ name: 'home' }"
          class="sidebar-link justify-content-center align-items-center tt"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          :data-bs-title="t('feed.header')"
        >
          <i class="fa-solid fa-bolt"></i>
        </RouterLink>

        <RouterLink
          :to="{ name: 'events' }"
          class="sidebar-link justify-content-center align-items-center tt"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          :data-bs-title="t('event.header')"
        >
          <i class="fa-solid fa-calendar-days"></i>
        </RouterLink>
        <RouterLink
          :to="{ name: 'communities' }"
          class="sidebar-link justify-content-center align-items-center tt"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          :data-bs-title="t('community.header')"
        >
          <i class="fa-solid fa-people-group"></i>
        </RouterLink>
        <RouterLink
          :to="{ name: 'search' }"
          class="sidebar-link justify-content-center align-items-center tt"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          :data-bs-title="t('search.header')"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </RouterLink>
      </div>
      <div class="tw-bg-slate-200 w-100 text-center py-2 mb-1">
        <i class="fa-solid fa-people-group"></i>
      </div>

      <RouterLink
        :to="{ name: 'communities' }"
        class="text-decoration-none w-100 d-flex tw-text-gray-600 justify-content-center tt"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        :data-bs-title="t('leftbar.explore')"
      >
        <div class="my-1 explore pointer">
          <i class="fa-solid fa-compass fa-xl"></i>
        </div>
      </RouterLink>
      <div
        class="tt my-1 w-100"
        v-for="community in communities"
        :key="community.id"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        :data-bs-title="community.title"
      >
        <RouterLink
          :to="{
            name: 'communitydetails',
            params: { id: community.id, name: community.title },
          }"
          class="d-flex align-items-center justify-content-center"
        >
          <img
            v-if="community.coverImage != null"
            class="cover-preview tw-bg-slate-200"
            :src="community.coverImage"
            :alt="community.title"
          />
          <img
            v-else
            class="cover-preview"
            src="@/assets/images/ic_community_avatar.png"
            alt="test"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";
import { ref } from "vue";
declare var bootstrap: any;
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const tooltips = ref();

const communityStore = useCommunityStore();
communityStore.getUserCommunities(user.value.id).then(() => {
  tooltips.value = document.querySelectorAll(".tt");
  tooltips.value.forEach((t: any) => {
    new bootstrap.Tooltip(t);
  });
});
const { _userCommunities: communities } = storeToRefs(communityStore);
</script>

<style lang="scss" scoped>
#left-bar {
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  position: fixed;
  bottom: 0;
  top: 0;
  width: 64px;
  z-index: 1;
}

.explore {
  transition: all 0.2s ease;
  width: 48px;
  height: 48px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-text);
  }
}

.cover-preview {
  transition: all 0.2s ease;
  width: 48px;
  height: 48px;
  border-radius: 99px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;

  &:hover {
    // transition: all 0.4s ease;
    border-radius: 18px;
  }
}

.sidebar-link {
  font-weight: 500;
  height: 40px;
  width: 100%;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  margin: 4px 0px;
  padding: 0 4px;
  display: flex;
  text-decoration: none;
  color: rgb(27, 27, 27);
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  &:hover {
    color: var(--color-primary);
    box-shadow: inset 6px 0px 0px -2px grey;
  }
}

a {
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &:hover {
    color: var(--color-primary);
    box-shadow: inset 6px 0px 0px -2px grey;
  }
}

a.router-link-exact-active {
  color: var(--color-primary);
  box-shadow: inset 6px 0px 0px -2px var(--color-primary);
}
</style>
