<template>
  <div
    class="modal fade"
    id="followers"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="followersLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="followersLabel">Takipçiler</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- <LoadingSpinner v-if="loading" /> -->
          <ul class="container" v-if="followers.length > 0">
            <li
              class="card shadow-sm px-4 py-3 my-4"
              v-for="user in followers"
              v-bind:key="user.id"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div
                    :style="{
                      'background-image': `url(${user.profileImage})`,
                    }"
                    alt="profile image"
                    class="post-profile-image me-4"
                    v-if="user.profileImage != null"
                  ></div>
                  <img
                    src="@/assets/images/profile-man.png"
                    alt="profile-man"
                    class="post-profile-image me-4"
                    v-else-if="user.gender == 2"
                  />
                  <img
                    src="@/assets/images/profile-woman.png"
                    alt="profile-woman"
                    class="post-profile-image me-4"
                    v-else-if="user.gender == 1"
                  />
                  <img
                    src="@/assets/images/user.png"
                    alt="profile"
                    class="post-profile-image me-4"
                    v-else
                  />
                  <div>
                    <RouterLink
                      :to="{ name: 'userprofile', params: { id: user.id } }"
                      class="text-decoration-none"
                    >
                      <div class="fw-bold text-black" data-bs-dismiss="modal">
                        {{ user.firstName }} {{ user.lastName }}
                      </div>
                    </RouterLink>
                    <div class="text-secondary">@{{ user.userName }}</div>
                  </div>
                </div>
                <button
                  class="btn btn-danger"
                  @click="removeFollower(user.id)"
                  v-if="authUser.id === id"
                >
                  Kaldır
                </button>
              </div>
            </li>
          </ul>
          <div v-else class="text-center">
            <h4 class="fw-light">Hiç takipçin yok</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
// import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();

const authStore = useAuthStore();
const { _user: authUser } = storeToRefs(authStore);

userStore.getUserFollowers(props.id);
const { _userFollowers: followers } = storeToRefs(userStore);

const removeFollower = async (id: string) => {
  await userStore.removeUserFromFollowers(id);
};
</script>
