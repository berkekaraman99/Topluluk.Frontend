<template>
  <div
    class="modal fade"
    id="followings"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="followingsLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="followingsLabel">Takipler</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="col-12">
              <input
                type="text"
                class="form-control form-control-lg mb-3"
                :placeholder="
                  user ? 'Takip ettiklerini ara' : 'Please login to search'
                "
                v-model="text"
                @keydown.enter="handleSearch"
                :disabled="!user"
              />
            </div>
          </div>
          <ul class="container" v-if="followings.length > 0">
            <li
              class="card shadow-sm px-4 py-3 my-4"
              v-for="user in searchedFollowings"
              v-bind:key="user.id"
            >
              <RouterLink
                :to="{ name: 'userprofile', params: { id: user.id } }"
                class="text-decoration-none"
              >
                <div
                  class="d-flex justify-content-between align-items-center"
                  data-bs-dismiss="modal"
                >
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
                      <div class="fw-bold text-black">
                        {{ user.firstName }} {{ user.lastName }}
                      </div>
                      <div class="text-secondary">@{{ user.userName }}</div>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </li>
          </ul>
          <div v-else class="text-center">
            <h4 class="fw-light">Takip ettiğin kimse yok</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { reactive, toRef } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const userStore = useUserStore();

const search = reactive({
  text: "",
});

const text = toRef(search, "text");

const handleSearch = async () => {
  if (search.text.length > 0) {
    await userStore.searchFollowings({
      id: user.value.id,
      text: search.text,
    });
  } else {
    userStore.$patch({
      searchedUserFollowings: userStore.userFollowings,
    });
  }
};

userStore.getUserFollowings(props.id);

const { _userFollowings: followings, _searchedFollowings: searchedFollowings } =
  storeToRefs(userStore);
</script>
