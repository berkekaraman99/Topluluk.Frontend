<template>
  <div
    id="community-suggestions"
    class="mb-4 mb-md-4 mb-lg-0 d-none d-md-none d-lg-flex flex-column my-2 position-fixed"
  >
    <p class="fw-bold text-start text-lg-center">Community Suggestions</p>

    <div
      v-if="communityList.length === 0"
      class="d-flex align-items-center justify-content-center py-5"
    >
      <p>No suggestions found</p>
    </div>
    <div
      v-else
      class="card d-flex align-items-start shadow-sm my-2 p-3 rounded-3"
      v-for="community in communityList"
      :key="community.id"
    >
      <RouterLink
        :to="{
          name: 'communitydetails',
          params: { id: community.id, name: community.title },
        }"
        class="text-decoration-none"
      >
        <div class="d-flex align-items-center">
          <div
            :style="{ backgroundImage: `url(${community.coverImage})` }"
            class="suggestion-profile-image me-4 shadow-sm"
            v-if="community.coverImage != null"
          ></div>
          <div v-else class="suggestion-profile-image bg-secondary me-4"></div>
          <div>
            <div class="fw-bold text-black">
              {{ community.title }}
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";

const communityStore = useCommunityStore();
communityStore.getCommunities();
const { _communityList: communityList } = storeToRefs(communityStore);
</script>

<style scoped lang="scss">
#community-suggestions {
  @media screen and (min-width: 993px) {
    width: 272px;
  }
}
</style>
