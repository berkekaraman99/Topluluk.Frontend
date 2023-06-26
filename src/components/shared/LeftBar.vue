<template>
  <div id="left-bar" class="bg-body-tertiary border-end">
    <div
      class="d-flex flex-column justify-content-center align-items-center mt-1"
    >
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
            class="cover-preview tw-bg-slate-200 shadow-sm"
            :style="{ 'background-image': `url(${community.coverImage})` }"
          ></div>
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
  transition: all 0.3s ease;
  position: fixed;
  bottom: 0;
  top: 0;
  width: 64px;
  z-index: 1;
}
.cover-preview {
  transition: 0.3s linear;
  width: 48px;
  height: 48px;
  border-radius: 99px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    transition: 0.3s ease;
    border-radius: 18px;
  }
}
</style>
