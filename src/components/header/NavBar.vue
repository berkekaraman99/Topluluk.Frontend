<template>
  <!-- Navbar -->
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top mb-4"
  >
    <div class="container-xxl d-flex">
      <span
        class="navbar-brand pointer fw-bold mx-1 fs-4"
        @click="router.push({ name: 'home' })"
        >Topluluk</span
      >

      <div class="d-flex align-items-center justify-content-center">
        <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>
        <template v-if="userIsAuthorized">
          <div class="d-flex align-items-center" v-if="user">
            <div class="dropdown create-nav">
              <button
                class="dropdown-toggle py-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <RouterLink
                    :to="{ name: 'createCommunity' }"
                    class="dropdown-item"
                  >
                    <i class="fa-solid fa-users"></i>
                    Create Community
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    :to="{ name: 'createPost' }"
                    class="dropdown-item"
                  >
                    <i class="fa-solid fa-note-sticky"></i>
                    Create Post
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    :to="{ name: 'createEvent' }"
                    class="dropdown-item"
                  >
                    <i class="fa-solid fa-calendar"></i>
                    Create Event
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div class="pointer">
              <RouterLink :to="{ name: 'chat' }">
                <i
                  class="fa-regular fa-xl fa-comments mx-2 ms-2 position-relative"
                >
                  <span
                    class="position-absolute bottom-100 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                  >
                    <span class="visually-hidden">New alerts</span>
                  </span>
                </i>
              </RouterLink>
            </div>

            <div class="dropdown">
              <div
                class="pointer"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="position-relative">
                  <img
                    src="@/assets/images/ic_notification.png"
                    height="24"
                    alt="bell"
                  />
                  <span
                    class="position-absolute start-100 bottom-50 translate-middle p-1 bg-danger border border-light rounded-circle"
                  >
                    <span class="visually-hidden">New alerts</span>
                  </span>
                </div>
              </div>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><h6 class="dropdown-header">Follow Requests</h6></li>
                <li
                  v-for="userRequests in userFollowersRequests"
                  v-bind:key="userRequests"
                ></li>
              </ul>
            </div>

            <div class="dropdown user-options">
              <div data-bs-toggle="dropdown" aria-expanded="false">
                <div class="d-flex align-items-center justify-content-center">
                  <div
                    class="profile-icon"
                    :style="{
                      'background-image': `url(${user.profileImage})`,
                    }"
                    v-if="user.profileImage != null"
                  ></div>
                  <img
                    src="@/assets/images/profile-man.png"
                    alt="profile-man"
                    class="profile-icon"
                    v-else-if="user.gender == 2"
                  />
                  <img
                    src="@/assets/images/profile-woman.png"
                    alt="profile-woman"
                    class="profile-icon"
                    v-else-if="user.gender == 1"
                  />
                  <img
                    src="@/assets/images/user.png"
                    alt="profile"
                    class="profile-icon"
                    v-else
                  />
                </div>
              </div>

              <ul class="dropdown-menu dropdown-menu-end z-3">
                <li>
                  <RouterLink :to="{ name: 'profile' }" class="dropdown-item"
                    ><i class="fa-solid fa-user me-1"></i> Profile</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    :to="{ name: 'profileSettings' }"
                    class="dropdown-item"
                    ><i class="fa-solid fa-gear me-1"></i> Settings</RouterLink
                  >
                </li>
                <li @click="logout">
                  <a class="dropdown-item text-danger"
                    ><i class="fa-solid fa-arrow-right-from-bracket me-1"></i>
                    Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="d-flex" v-else>
            <RouterLink :to="{ name: 'login' }" class="btn btn-primary me-3"
              >Log In</RouterLink
            >
            <RouterLink :to="{ name: 'signup' }" class="btn btn-warning"
              >Sign Up</RouterLink
            >
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const authStore = useAuthStore();
const { _user: user, _userIsAuthorized: userIsAuthorized } =
  storeToRefs(authStore);

const userStore = useUserStore();
if (user.value != null) {
  userStore.getFollowersRequests(user.value.id.toString());
}

const { _userFollowersRequests: userFollowersRequests } =
  storeToRefs(userStore);

const logout = async () => {
  await authStore.logout();
};
</script>

<style scoped lang="scss">
.user-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 16px;
}

.create-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  text-decoration: none;
}

.create-nav button {
  background-color: var(--color-primary);
  color: white;
  border-radius: 6px;
  border: none;
  padding: 12px;
  transition: all 0.3s ease;
  margin: 0px 4px;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    background-color: var(--color-primary);
  }
}
</style>
