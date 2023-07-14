<template>
  <div class="container-fluid">
    <div class="container px-0">
      <div class="row">
        <div class="col-12 col-lg-8 col-xl-9 px-0 mt-3" v-if="loading">
          <div class="profile-header position-relative placeholder-glow">
            <div class="profile-banner rounded-top-4 placeholder"></div>
            <div class="profile-image placeholder bg-black"></div>
            <div class="profile-details">
              <div class="col-4">
                <h2 class="fw-bold">
                  <span class="placeholder col-12"></span>
                </h2>
                <h5 class="placeholder col-12"></h5>
                <div>
                  <h3 class="placeholder col-3 me-1"></h3>
                  <h3 class="placeholder col-3 me-1"></h3>
                  <h3 class="placeholder col-3"></h3>
                  <p class="placeholder col-12 h2 my-3"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8 col-xl-9 px-0 mt-3" v-else>
          <div class="profile-header position-relative">
            <img
              v-if="currentUser.bannerImage != null"
              class="profile-banner rounded-top-4"
              :src="currentUser.bannerImage"
              alt="banner"
            />
            <div
              v-else
              class="profile-banner rounded-top-4 tw-bg-slate-100"
            ></div>
            <div
              class="profile-image shadow"
              :style="{
                'background-image': `url(${currentUser.profileImage})`,
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
                    data-bs-toggle="modal"
                    data-bs-target="#followers"
                    @click="getFollowers"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ followerCount }}
                    </h3>
                    {{ t("profile.followers") }}
                  </div>
                  <div
                    class="me-3 pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#followings"
                    @click="getFollowings"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ followingCount }}
                    </h3>
                    {{ t("profile.followings") }}
                  </div>
                  <div
                    class="me-3 pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#followerRequests"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ followersRequests.length }}
                    </h3>
                    {{ t("profile.followrequests") }}
                  </div>
                </div>
                <!-- Bio -->
                <p v-if="user.bio != null" class="my-3">
                  {{ currentUser.bio }}
                </p>
              </div>
            </div>
          </div>

          <!-- Followers Modal -->
          <FollowersModal
            :id="userId"
            @decrement-follower-count="() => (followerCount -= 1)"
          />

          <!-- Followings Modal -->
          <FollowingsModal :id="userId" />

          <!-- Follower Requests Modal -->
          <FollowerRequestsModal
            :id="userId"
            @update-follower-count="() => (followerCount += 1)"
          />
        </div>
        <div class="col-lg-4 col-xl-3 d-none d-sm-none d-lg-block mt-3">
          <UserSuggestions />
        </div>
      </div>

      <div id="options" class="container my-4 placeholder-glow" v-if="loading">
        <div class="row">
          <div class="col-sm-12 col-md-3 text-center my-2">
            <span class="placeholder col-8 h3"></span>
          </div>

          <div class="col-sm-12 col-md-2 text-center my-2">
            <span class="placeholder col-8 h3"></span>
          </div>

          <div class="col-sm-12 col-md-2 text-center my-2">
            <span class="placeholder col-8 h3"></span>
          </div>

          <div class="col-sm-12 col-md-3 text-center my-2">
            <span class="placeholder col-8 h3"></span>
          </div>

          <div class="col-sm-12 col-md-2 text-center my-2">
            <span class="placeholder col-8 h3"></span>
          </div>
        </div>
      </div>

      <div id="options" class="container my-4 px-0" v-else>
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
                >{{ t("profile.activities") }}</span
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
                >{{ t("profile.posts") }}</span
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
                >{{ t("profile.events") }}</span
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
                >{{ t("profile.communities") }} ({{
                  currentUser.communityCount
                }})</span
              >
            </label>
          </div>

          <div class="text-center my-2">
            <input
              type="radio"
              name="group-radio"
              id="radio-5"
              class="radio"
              value="radio5"
              :checked="category === 'saved'"
            />
            <label for="radio-5">
              <span
                class="fw-bold fs-5 category"
                :class="{ selected: category === 'saved' }"
                id="saved"
                @click="changeCategory('saved')"
                >{{ t("profile.saved") }}</span
              >
            </label>
          </div>
        </div>
      </div>
      <div>
        <UserPosts v-if="category === 'posts'" :userId="userId" />
        <UserCommunities v-else-if="category === 'communities'" />
        <UserEvents v-else-if="category === 'events'" />
        <UserSavedPosts v-else-if="category === 'saved'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import UserCommunities from "@/components/common/profile/UserCommunities.vue";
import UserPosts from "@/components/common/profile/UserPosts.vue";
import FollowingsModal from "@/components/shared/FollowingsModal.vue";
import FollowersModal from "@/components/shared/FollowersModal.vue";
import UserSuggestions from "@/components/shared/UserSuggestions.vue";
import UserEvents from "@/components/common/profile/UserEvents.vue";
import UserSavedPosts from "@/components/common/profile/UserSavedPosts.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import FollowerRequestsModal from "@/components/shared/FollowerRequestsModal.vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const followerCount = ref(0);
const followingCount = ref(0);

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const userId = user.value.id;

const userStore = useUserStore();

const category = ref("activities");
const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};
const { _currentUser: currentUser, _userFollowersRequests: followersRequests } =
  storeToRefs(userStore);

userStore.getUserById(user.value.id).then(() => {
  changeLoadingState();
  followerCount.value = currentUser.value.followersCount;
  followingCount.value = currentUser.value.followingCount;
});

const changeCategory = (tab: string) => {
  category.value = tab;
};

const getFollowers = async () => {
  await userStore.getUserFollowers(userId);
};

const getFollowings = async () => {
  await userStore.getUserFollowings(userId);
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

label span {
  transition: 0.4s all ease;
}

.radio {
  appearance: none;
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
</style>
