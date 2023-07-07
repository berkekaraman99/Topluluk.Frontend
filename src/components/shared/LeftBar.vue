<template>
  <div id="left-bar" class="bg-body-tertiary border-end">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="tw-bg-slate-200 w-100 text-center py-2 mb-1">
        <i class="fa-solid fa-people-group"></i>
      </div>
      <div
        class="tt my-1"
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
        >
          <div
            v-if="community.coverImage != null"
            class="cover-preview tw-bg-slate-200 shadow-sm"
            :style="{ 'background-image': `url(${community.coverImage})` }"
          ></div>
          <div v-else class="cover-preview tw-bg-slate-200 shadow-sm"></div>
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
.cover-preview {
  transition: all 0.1s ease;
  width: 48px;
  height: 48px;
  border-radius: 99px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid rgb(226, 232, 240);

  &:hover {
    // transition: all 0.4s ease;
    border-radius: 18px;
    border: 1px solid var(--color-primary);
  }
}
</style>
