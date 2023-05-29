<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12" v-if="loading">
          <div class="profile-header position-relative placeholder-wave">
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
              class="profile-banner rounded-top-4"
              :style="{
                'background-image': 'url(' + currentUser.bannerImage + ')',
                'background-color': 'grey',
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
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ currentUser.followersCount }}
                    </h3>
                    Followers
                  </div>

                  <div
                    class="me-3 pointer"
                    :data-bs-toggle="
                      !currentUser.isPrivate || currentUser.isFollowing
                        ? 'modal'
                        : null
                    "
                    data-bs-target="#followings"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ currentUser.followingCount }}
                    </h3>
                    Followings
                  </div>
                  <div class="me-3">
                    <h3 class="fw-bold d-inline-block">
                      {{ currentUser.communityCount }}
                    </h3>
                    Communities
                  </div>
                </div>
                <p v-if="currentUser.bio">{{ currentUser.bio }}</p>
              </div>
              <div class="d-flex justify-content-center align-self-baseline">
                <button
                  class="btn follow px-4"
                  @click="followUser(currentUser)"
                  v-if="currentUser.id !== user.id && !currentUser.isFollowing"
                >
                  Follow
                </button>
                <!-- <button
                  class="btn follow px-4"
                  @click="unfollowUser(currentUser)"
                  v-else
                >
                  Unfollow
                </button> -->
                <div class="d-flex align-items-center pointer ms-3">
                  <div class="dropdown">
                    <i
                      class="fa-solid fa-ellipsis fa-2xl"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item text-danger">
                        <img
                          src="@/assets/images/ic_block.png"
                          alt="block"
                          height="21"
                        />
                        Block User
                      </li>
                      <li
                        class="dropdown-item text-warning"
                        v-if="currentUser.isFollowing"
                        @click="unfollowUser(currentUser)"
                      >
                        Unfollow
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

          <div
            id="options"
            class="container my-4"
            v-if="!currentUser.isPrivate || currentUser.isFollowing"
          >
            <div class="row">
              <div class="col-sm-12 col-md-3 text-center my-2">
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
                    class="fw-bold fs-5 px-2 py-1"
                    :class="{ selected: category === 'activities' }"
                    id="activities"
                    @click="changeCategory('activities')"
                    >Activities</span
                  >
                </label>
              </div>

              <div class="col-sm-12 col-md-3 text-center my-2">
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
                    class="fw-bold fs-5 px-2 py-1"
                    :class="{ selected: category === 'posts' }"
                    id="posts"
                    @click="changeCategory('posts')"
                    >Posts</span
                  >
                </label>
              </div>

              <div class="col-sm-12 col-md-3 text-center my-2">
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
                    class="fw-bold fs-5 px-2 py-1"
                    :class="{ selected: category === 'events' }"
                    id="events"
                    @click="changeCategory('events')"
                    >Events</span
                  >
                </label>
              </div>

              <div class="col-sm-12 col-md-3 text-center my-2">
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
                    class="fw-bold fs-5 px-2 py-1"
                    :class="{ selected: category === 'communities' }"
                    id="communities"
                    @click="changeCategory('communities')"
                    >Communities</span
                  >
                </label>
              </div>
            </div>
          </div>

          <div class="mt-3 mx-3 fs-5" v-else>
            <p class="fw-light">This account is private</p>
            <p class="fw-light">
              Follow this account to see their posts and other activities.
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
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

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

const followUser = async (user: any) => {
  try {
    await userStore.followUser(user.id).then(() => {
      if (!user.isPrivate) {
        user.isFollowing = true;
      }
    });
  } catch (error: any) {
    console.log(error.response.data);
  }
};

const unfollowUser = async (user: any) => {
  try {
    await userStore
      .unfollowUser(user.id)
      .then(() => (user.isFollowing = false));
  } catch (error: any) {
    console.log(error.response.data);
  }
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

.selected {
  border-bottom: 1px solid #24a0ed;
  transition: 0.4s all ease;
  color: #24a0ed;
}

.radio {
  appearance: none;
}
</style>
