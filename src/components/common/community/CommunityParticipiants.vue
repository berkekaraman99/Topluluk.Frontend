<template>
  <div>
    <div class="my-3">
      <h3>{{ t("community.admin") }}</h3>
      <div
        class="card border hover:tw-bg-slate-100 tw-transition tw-ease-in-out tw-duration-350"
      >
        <div class="card-body d-flex align-items-center">
          <img
            alt="profile image"
            class="suggestion-profile-image me-4"
            :src="community.adminImage"
            v-if="community.adminImage != null"
          />
          <img
            src="@/assets/images/profile-man.png"
            alt="profile-man"
            class="suggestion-profile-image me-4"
            v-else-if="community.adminGender == 2"
          />
          <img
            src="@/assets/images/profile-woman.png"
            alt="profile-woman"
            class="suggestion-profile-image me-4"
            v-else-if="community.adminGender == 1"
          />
          <img
            src="@/assets/images/user.png"
            alt="profile"
            class="suggestion-profile-image me-4"
            v-else
          />
          <span class="fw-bold">
            <RouterLink
              :to="{ name: 'userprofile', params: { id: community.adminId } }"
              class="text-decoration-none tw-text-blue-800"
            >
              <span>
                {{ community.adminName }} {{ community.adminLastName }}
              </span>
            </RouterLink>
          </span>
        </div>
      </div>
    </div>
    <div>
      <div>
        <input
          v-if="searchedParticipiants.length >= 1"
          type="text"
          class="form-control form-control-lg mb-3"
          :placeholder="user ? 'Üye ara' : 'Please login to search'"
          v-model="search"
          @keydown.enter="handleSearch"
          :disabled="!user"
        />
      </div>
      <h3 v-if="searchedParticipiants.length >= 1">
        {{ t("community.members") }}
      </h3>
    </div>
    <Transition name="scaleInOut" mode="out-in">
      <div v-if="loading">
        <LoadingVue />
      </div>
      <div v-else>
        <div
          v-for="participiant in searchedParticipiants"
          :key="participiant.id"
        >
          <div
            class="card my-3 border hover:tw-bg-slate-100 tw-transition tw-ease-in-out tw-duration-350"
          >
            <div
              class="card-body d-flex align-items-center justify-content-between"
            >
              <div class="d-flex align-items-center">
                <img
                  v-if="participiant.profileImage != null"
                  alt="profile image"
                  class="suggestion-profile-image me-4"
                  :src="participiant.profileImage"
                />
                <img
                  src="@/assets/images/profile-man.png"
                  alt="profile-man"
                  class="suggestion-profile-image me-4"
                  v-else-if="participiant.gender == 2"
                />
                <img
                  src="@/assets/images/profile-woman.png"
                  alt="profile-woman"
                  class="suggestion-profile-image me-4"
                  v-else-if="participiant.gender == 1"
                />
                <img
                  src="@/assets/images/user.png"
                  alt="profile"
                  class="suggestion-profile-image me-4"
                  v-else
                />
                <span class="fw-bold">
                  <RouterLink
                    :to="{
                      name: 'userprofile',
                      params: { id: participiant.id },
                    }"
                    class="text-decoration-none tw-text-blue-800"
                  >
                    <span>
                      {{ participiant.firstName }}
                      {{ participiant.lastName }}
                    </span>
                  </RouterLink>
                </span>
              </div>
              <div
                class="d-flex align-items-center pointer ms-3"
                v-if="user.id === community.adminId"
              >
                <div class="dropdown">
                  <i
                    class="fa-solid fa-ellipsis fa-2xl"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></i>
                  <ul class="dropdown-menu">
                    <li
                      class="dropdown-item"
                      v-if="user.id === community.adminId"
                    >
                      <i class="fa-solid fa-crown"></i>
                      {{ t("community.assignasadmin") }}
                    </li>
                    <li
                      class="dropdown-item"
                      v-if="user.id === community.adminId"
                    >
                      <i class="fa-solid fa-user-tie"></i
                      >{{ t("community.assignasmoderator") }}
                    </li>
                    <li
                      class="dropdown-item text-danger"
                      @click="kickUser(community.id, participiant.id)"
                    >
                      <i class="fa-solid fa-user-xmark"></i
                      >{{ t("community.kickmember") }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import LoadingVue from "@/components/shared/LoadingVue.vue";
import type { ICommunity } from "@/models/community_model";
import { useAuthStore } from "@/stores/auth";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const props = defineProps({
  community: {
    type: Object as PropType<ICommunity>,
    required: true,
  },
});

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const communityStore = useCommunityStore();
communityStore
  .getCommunityParticipiants(props.community.id)
  .then(changeLoadingState);
const { _searchedParticipiants: searchedParticipiants } =
  storeToRefs(communityStore);
const kickUser = async (communityId: string, targetId: string) => {
  await communityStore.kickUser(communityId, targetId).then(async () => {
    await communityStore.getCommunityParticipiants(props.community.id);
  });
};

const search = ref("");

const handleSearch = async () => {
  if (search.value.length > 0) {
    await communityStore.searchParticipiants(props.community.id, search.value);
  } else {
    communityStore.$patch({
      searchedParticipiants: communityStore.participiants,
    });
  }
};
</script>

<style scoped></style>
