<template>
  <div
    id="community-suggestions"
    class="mb-4 mb-md-4 mb-lg-0 d-none d-md-none d-lg-flex flex-column"
  >
    <div class="card">
      <div class="card-header border rounded-top-3 px-md-4 px-xl-5">
        <div class="fw-bold text-start text-lg-center fs-6">
          Community Suggestions
        </div>
      </div>
      <div class="card-body p-0 border rounded-bottom-3 overflow-hidden">
        <div
          v-if="communityList.length === 0"
          class="d-flex align-items-center justify-content-center py-5"
        >
          <p>No suggestions found</p>
        </div>
        <div
          v-else
          class="d-flex card-body align-items-start p-3 hover-effect"
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
              <div
                v-else
                class="suggestion-profile-image bg-secondary me-4"
              ></div>
              <div>
                <div class="fw-bold text-black">
                  {{ community.title }}
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
        <div
          class="text-center more pointer py-2"
          @click="$router.push({ name: 'communities' })"
        >
          Show more
        </div>
      </div>
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
  padding: 12px 0px;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
  @media screen and (max-width: 576px) {
    top: 60px;
  }
  @media screen and (min-width: 993px) {
    position: fixed;
    width: max-content;
    max-width: 330px;
  }
}

.hover-effect {
  transition: 0.35s ease;
  &:hover {
    background-color: whitesmoke;
  }
}

.more {
  transition: 0.35s ease;
  color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary-hover);
    color: var(--color-text);
  }
}

.card {
  z-index: 0;
}
</style>
