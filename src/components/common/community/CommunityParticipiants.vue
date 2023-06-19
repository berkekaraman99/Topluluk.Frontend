<template>
  <div>
    <div class="my-3">
      <h3>Admin</h3>
      <div
        class="card border hover:tw-bg-slate-100 transition ease-in-out duration-350"
      >
        <div class="card-body d-flex align-items-center">
          <div
            alt="profile image"
            class="suggestion-profile-image me-4 shadow-sm"
            :style="{
              'background-image': `url(${community.adminImage})`,
            }"
            v-if="community.adminImage"
          ></div>
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
          type="text"
          class="form-control form-control-lg mb-3"
          :placeholder="user ? 'Üye ara' : 'Please login to search'"
          v-model="search"
          @keydown.enter="handleSearch"
          :disabled="!user"
        />
      </div>
      <h3 v-if="searchedParticipiants.length >= 1">Üyeler</h3>
    </div>
    <div>
      <div v-for="participiant in searchedParticipiants" :key="participiant.id">
        <div
          class="card my-3 border hover:tw-bg-slate-100 tw-transition tw-ease-in-out tw-duration-350"
        >
          <div
            class="card-body d-flex align-items-center justify-content-between"
          >
            <div class="d-flex align-items-center">
              <div v-if="participiant.profileImage">
                <div
                  alt="profile image"
                  class="suggestion-profile-image me-4 shadow-sm"
                  :style="{
                    'background-image': `url(${participiant.profileImage})`,
                  }"
                ></div>
              </div>
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
                  :to="{ name: 'userprofile', params: { id: participiant.id } }"
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
                    <i class="fa-solid fa-crown"></i> Assign as Admin
                  </li>
                  <li
                    class="dropdown-item"
                    v-if="user.id === community.adminId"
                  >
                    <i class="fa-solid fa-user-tie"></i> Assign as Moderator
                  </li>
                  <li
                    class="dropdown-item text-danger"
                    @click="kickUser(community.id.toString(), participiant.id)"
                  >
                    <i class="fa-solid fa-user-xmark"></i> Kick User
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICommunity } from "@/models/community_model";
import { useAuthStore } from "@/stores/auth";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";
import { ref } from "vue";

const props = defineProps({
  community: {
    type: Object as PropType<ICommunity>,
    required: true,
  },
});

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const communityStore = useCommunityStore();
communityStore.getCommunityParticipiants(props.community.id);
const { _searchedParticipiants: searchedParticipiants } =
  storeToRefs(communityStore);
const kickUser = async (communityId: string, targetId: string) => {
  await communityStore.kickUser(communityId, targetId).then(async () => {
    await communityStore.getCommunityParticipiants(
      props.community.id.toString()
    );
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
