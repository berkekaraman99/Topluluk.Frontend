<template>
  <div
    class="modal fade"
    id="followerRequests"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="followerRequestsLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="followerRequestsLabel">
            Takipçi İstekleri
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <LoadingSpinner v-if="loading" />
          <ul class="container" v-else-if="followersRequests.length > 0">
            <li
              class="card shadow-sm px-4 py-3 my-4"
              v-for="user in followersRequests"
              v-bind:key="user.id"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div>
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
                  </div>
                  <div>
                    <RouterLink
                      :to="{ name: 'userprofile', params: { id: user.id } }"
                      class="text-decoration-none"
                    >
                      <div class="fw-bold text-black">
                        {{ user.firstName }} {{ user.lastName }}
                      </div>
                    </RouterLink>
                    <div class="text-secondary">@{{ user.userName }}</div>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-around">
                  <span
                    class="btn btn-primary mx-1"
                    @click="acceptFollowRequest(user.id, user)"
                  >
                    Kabul Et
                  </span>
                  <span
                    class="btn btn-danger"
                    @click="declineFollowRequest(user.id, user)"
                  >
                    Reddet
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div v-else class="text-center">
            <h4 class="fw-light">Takipçi isteği yok</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["updateFollowerCount"]);

const userStore = useUserStore();
const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

userStore.getFollowersRequests(props.id).then(changeLoadingState);
const { _userFollowersRequests: followersRequests, _statusCode: statusCode } =
  storeToRefs(userStore);

const acceptFollowRequest = async (id: string, user: any) => {
  await userStore.acceptFollowRequest(id).then(async () => {
    if (statusCode.value === 200) {
      user = null;
      emit("updateFollowerCount");
      setTimeout(() => {
        userStore.$patch({
          statusCode: 0,
        });
      }, 2000);
      await userStore.getFollowersRequests(props.id);
    }
  });
};

const declineFollowRequest = async (id: string, user: any) => {
  await userStore.declineFollowRequest(id).then(async () => {
    if (statusCode.value === 200) {
      user = null;
      setTimeout(() => {
        userStore.$patch({
          statusCode: 0,
        });
      }, 2000);
      await userStore.getFollowersRequests(props.id);
    }
  });
};
</script>

<style scoped>
.modal-dialog {
  min-width: 500px;
  width: 900px !important;
}
</style>
