<template>
  <!-- Navbar -->
  <nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
    <div class="container-xxl d-flex">
      <div>
        <span
          @click="togglebar"
          class="pointer rounded-5 p-2 tw-transition tw-ease-in-out tw-duration-350 hover:tw-bg-slate-200"
          ><i class="fa-solid fa-bars-staggered fa-lg"></i
        ></span>
        <span
          class="navbar-brand pointer fw-bold px-2 fs-4"
          @click="router.push({ name: 'home' })"
          >Topluluk</span
        >
      </div>

      <div class="d-flex align-items-center justify-content-center">
        <template v-if="userIsAuthorized">
          <div class="d-flex align-items-center" v-if="user">
            <div class="dropdown create-nav">
              <button
                class="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Oluştur
              </button>
              <CreateLink />
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
              </ul>
            </div>

            <ProfileIcon :user="user" @logout="logout" />
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
import CreateLink from "./CreateLink.vue";
import ProfileIcon from "./ProfileIcon.vue";
import { ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const { _user: user, _userIsAuthorized: userIsAuthorized } =
  storeToRefs(authStore);

const logout = async () => {
  await authStore.logout();
};

const leftBarToggle = ref(false);

const togglebar = () => {
  const leftBar: HTMLElement = document.getElementById("left-bar")!;
  const navbar: HTMLElement = document.getElementById("navbar")!;
  const mainEl: HTMLElement = document.getElementById("main")!;

  if (!leftBarToggle.value) {
    leftBar.style.left = "-64px";
    navbar.style.left = "0px";
    mainEl.style.paddingLeft = "0px";
    leftBarToggle.value = true;
  } else {
    leftBar.style.left = "0px";
    navbar.style.left = "64px";
    mainEl.style.paddingLeft = "80px";
    leftBarToggle.value = false;
  }
};
</script>

<style scoped lang="scss">
#navbar {
  transition: all 0.3s ease;
  position: fixed;
  left: 64px;
  top: 0;
  right: 0;
  z-index: 1;
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
  height: 48px;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    background-color: var(--color-primary);
  }
}
</style>
