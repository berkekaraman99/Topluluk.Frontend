<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12" v-if="loading">
          <div class="profile-header position-relative placeholder-glow">
            <div class="profile-banner rounded-top-4 placeholder"></div>
            <div class="profile-image placeholder bg-black"></div>
            <div class="profile-details">
              <div class="col-4">
                <h2 class="fw-bold">
                  <span class="placeholder col-12"></span>
                </h2>
                <h5 class="placeholder col-8"></h5>
                <div>
                  <span class="placeholder h3 col-3 me-1"></span>
                  <span class="placeholder h3 col-3 me-1"></span>
                  <span class="placeholder h3 col-3"></span>
                  <p class="placeholder col-12 h3"></p>
                </div>
              </div>
              <div class="align-self-baseline">
                <a
                  class="btn follow placeholder"
                  style="width: 100px"
                  disabled
                ></a>
              </div>
            </div>
          </div>

          <div id="options" class="container my-4">
            <div class="row">
              <div class="col-sm-12 col-md-3 text-center my-2">
                <span class="placeholder col-6 h2"></span>
              </div>

              <div class="col-sm-12 col-md-3 text-center my-2">
                <span class="placeholder col-6 h2"></span>
              </div>

              <div class="col-sm-12 col-md-3 text-center my-2">
                <span class="placeholder col-6 h2"></span>
              </div>

              <div class="col-sm-12 col-md-3 text-center my-2">
                <span class="placeholder col-6 h2"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12" v-else>
          <div class="profile-header position-relative">
            <div
              class="profile-banner rounded-top-4 tw-bg-slate-100"
              :style="{
                'background-image': `url(${currentUser.bannerImage})`,
              }"
            ></div>
            <div
              class="profile-image shadow"
              :style="{
                'background-image': 'url(' + currentUser.profileImage + ')',
              }"
              v-if="currentUser.profileImage != null"
            ></div>
            <img
              src="@/assets/images/profile-man.png"
              alt="profile-man"
              class="profile-image me-4"
              v-else-if="currentUser.gender == 2"
            />
            <img
              src="@/assets/images/profile-woman.png"
              alt="profile-woman"
              class="profile-image me-4"
              v-else-if="currentUser.gender == 1"
            />
            <img
              src="@/assets/images/user.png"
              alt="profile"
              class="profile-image me-4"
              v-else
            />
            <div class="profile-details">
              <div>
                <h2 class="fw-bold">
                  {{ currentUser.firstName }} {{ currentUser.lastName }}
                </h2>
                <h5 class="fw-normal">@{{ currentUser.userName }}</h5>
                <div class="d-flex flex-column flex-sm-row">
                  <div
                    class="me-3 pointer"
                    :data-bs-toggle="
                      !currentUser.isPrivate || currentUser.isFollowing
                        ? 'modal'
                        : null
                    "
                    data-bs-target="#followers"
                    @click="getFollowers"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ currentUser.followersCount }}
                    </h3>
                    Takipçiler
                  </div>

                  <div
                    class="me-3 pointer"
                    :data-bs-toggle="
                      !currentUser.isPrivate || currentUser.isFollowing
                        ? 'modal'
                        : null
                    "
                    data-bs-target="#followings"
                    @click="getFollowings"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ currentUser.followingCount }}
                    </h3>
                    Takipler
                  </div>
                </div>
                <!-- Bio -->
                <p
                  v-if="!currentUser.isPrivate || currentUser.isFollowing"
                  class="my-3"
                >
                  {{ currentUser.bio }}
                </p>
              </div>
              <div class="d-flex justify-content-center align-self-baseline">
                <button
                  class="btn follow px-4"
                  @click="removeFollowRequest(currentUser)"
                  v-if="currentUser.isFollowRequestSent"
                >
                  Takip İsteğinden Vazgeç
                </button>
                <button
                  class="btn follow px-4"
                  @click="followUser(currentUser)"
                  v-else-if="
                    currentUser.id !== user.id && !currentUser.isFollowing
                  "
                >
                  Takip Et
                </button>
                <div class="d-flex align-items-center pointer ms-3">
                  <div class="dropdown">
                    <i
                      class="fa-solid fa-ellipsis fa-2xl"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <ul class="dropdown-menu">
                      <li
                        class="dropdown-item text-danger"
                        @click="blockUser(currentUser)"
                        v-if="!currentUser.isBlocked"
                      >
                        <img
                          src="@/assets/images/ic_block.png"
                          alt="block"
                          height="21"
                        />
                        Kullanıcıyı Engelle
                      </li>
                      <li
                        class="dropdown-item text-danger"
                        @click="unblockUser(currentUser)"
                        v-else
                      >
                        <img
                          src="@/assets/images/ic_block.png"
                          alt="block"
                          height="21"
                        />
                        Engellemeyi Kaldır
                      </li>
                      <li
                        class="dropdown-item text-warning-emphasis"
                        v-if="currentUser.isFollowing"
                        @click="unfollowUser(currentUser)"
                      >
                        Takipten Çık
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Followers Modal -->
          <FollowersModal :id="id!" />

          <!-- Followings Modal -->
          <FollowingsModal :id="id!" />

          <div class="mt-3 mx-3 fs-5" v-if="currentUser.isBlocked">
            <p class="fw-light text-center">Bu kullanıcıyı engellediniz</p>
          </div>
          <div
            id="options"
            class="container my-4"
            v-else-if="!currentUser.isPrivate || currentUser.isFollowing"
          >
            <div
              class="d-flex align-items-center justify-content-around flex-column flex-sm-column flex-md-row border-top border-bottom"
            >
              <div class="text-center my-2">
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-1"
                  class="radio"
                  value="radio1"
                  :checked="category === 'activities'"
                />
                <label for="radio-1">
                  <span
                    class="fw-bold fs-5 category"
                    :class="{ selected: category === 'activities' }"
                    id="activities"
                    @click="changeCategory('activities')"
                    >Aktiviteler</span
                  >
                </label>
              </div>

              <div class="text-center my-2">
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-2"
                  class="radio"
                  value="radio2"
                  :checked="category === 'posts'"
                />
                <label for="radio-2">
                  <span
                    class="fw-bold fs-5 category"
                    :class="{ selected: category === 'posts' }"
                    id="posts"
                    @click="changeCategory('posts')"
                    >Postlar</span
                  >
                </label>
              </div>

              <div class="text-center my-2">
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-3"
                  class="radio"
                  value="radio3"
                  :checked="category === 'events'"
                />
                <label for="radio-3">
                  <span
                    class="fw-bold fs-5 category"
                    :class="{ selected: category === 'events' }"
                    id="events"
                    @click="changeCategory('events')"
                    >Etkinlikler</span
                  >
                </label>
              </div>

              <div class="text-center my-2">
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-4"
                  class="radio"
                  value="radio4"
                  :checked="category === 'communities'"
                />
                <label for="radio-4">
                  <span
                    class="fw-bold fs-5 category"
                    :class="{ selected: category === 'communities' }"
                    id="communities"
                    @click="changeCategory('communities')"
                    >Topluluklar ({{ currentUser.communityCount }})</span
                  >
                </label>
              </div>
            </div>
          </div>

          <div class="mt-3 mx-3 fs-5" v-else>
            <p class="fw-light">Bu hesap gizli</p>
            <p class="fw-light">
              Bu hesabın postlarını, etkinliklerini ve diğer aktivitelerini
              görmek için lütfen takip ediniz
            </p>
          </div>

          <UserPosts v-if="category === 'posts'" :id="id" />
          <UserCommunities v-else-if="category === 'communities'" :id="id" />
          <UserEvents v-else-if="category === 'events'" :id="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import UserCommunities from "@/components/common/userprofile/UserCommunities.vue";
import UserPosts from "@/components/common/userprofile/UserPosts.vue";
import FollowingsModal from "@/components/shared/FollowingsModal.vue";
import FollowersModal from "@/components/shared/FollowersModal.vue";
import UserEvents from "@/components/common/userprofile/UserEvents.vue";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import type { IUser } from "@/models/user_model";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const userStore = useUserStore();
const category = ref("activities");

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

userStore.getUserById(props.id).then(changeLoadingState);
const { _currentUser: currentUser } = storeToRefs(userStore);

const changeCategory = (tab: string) => {
  category.value = tab;
};

const getFollowers = async () => {
  await userStore.getUserFollowers(currentUser.value.id.toString());
};

const getFollowings = async () => {
  await userStore.getUserFollowings(currentUser.value.id.toString());
};

const followUser = async (currentUser: IUser) => {
  try {
    await userStore.followUser(currentUser.id).then(() => {
      if (!currentUser.isPrivate) {
        currentUser.isFollowing = true;
      } else {
        currentUser.isFollowRequestSent = true;
      }
    });
  } catch (error: any) {
    console.log(error.response.data);
  }
};

const unfollowUser = async (user: IUser) => {
  try {
    await userStore
      .unfollowUser(user.id.toString())
      .then(() => (user.isFollowing = false));
  } catch (error: any) {
    console.log(error.response.data);
  }
};

const blockUser = async (user: IUser) => {
  const body = new FormData();
  const userId = user.id;
  body.append("targetId", userId);
  await userStore.blockUser(body).then(() => (user.isBlocked = true));
};

const unblockUser = async (user: IUser) => {
  const body = new FormData();
  const userId = user.id;
  body.append("targetId", userId);
  await userStore.unblockUser(body).then(() => (user.isBlocked = false));
};

const removeFollowRequest = async (currentUser: IUser) => {
  await userStore
    .removeFollowRequest(currentUser.id)
    .then(() => (currentUser.isFollowRequestSent = false));
};

onBeforeUnmount(() => {
  userStore.$patch({
    currentUser: {},
  });
});
</script>

<style scoped>
.profile-details {
  margin: 72px 16px 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-header {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.follow {
  background-color: #24a0ed;
  color: white;
  border-radius: 99px;
}

.follow:hover {
  background-color: #1b74ac;
}

.category {
  transition: 0.3s;
  color: #83818c;
  padding: 20px;
  margin: 0 6px;
  z-index: 1;
  position: relative;
}

.category:hover {
  color: #111;
  letter-spacing: 1px;
}

.selected {
  transition: 0.3s all ease;
  color: var(--color-primary);
  padding: 20px;
  margin: 0 6px;
  z-index: 2;
  position: relative;
  letter-spacing: 1px;
}

.radio {
  appearance: none;
}
</style>
