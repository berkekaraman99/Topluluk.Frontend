<template>
  <div class="">
    <div class="card rounded-3" id="suggestions" v-if="!loading">
      <div class="card-header p-0">
        <h4 class="fw-bold my-3 text-center">Suggestions</h4>
      </div>
      <div class="card-body py-0 px-1 overflow-auto">
        <ul class="list-unstyled">
          <div
            v-if="suggestions.length === 0"
            class="d-flex align-items-center justify-content-center py-5"
          >
            <p>No suggestions found</p>
          </div>
          <li
            v-else
            class="py-3 px-3 my-2 suggestion card shadow-sm"
            v-for="suggested in suggestions"
            v-bind:key="suggested.id"
          >
            <RouterLink
              :to="{ name: 'userprofile', params: { id: suggested.id } }"
              class="text-decoration-none"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div
                    :style="{
                      backgroundImage: `url(${suggested.profileImage})`,
                    }"
                    class="suggestion-profile-image me-4 shadow-sm"
                    v-if="suggested.profileImage"
                  ></div>
                  <img
                    src="@/assets/images/profile-man.png"
                    alt="profile-man"
                    class="suggestion-profile-image me-4"
                    v-else-if="suggested.gender == 2"
                  />
                  <img
                    src="@/assets/images/profile-woman.png"
                    alt="profile-woman"
                    class="suggestion-profile-image me-4"
                    v-else-if="suggested.gender == 1"
                  />
                  <img
                    src="@/assets/images/user.png"
                    alt="profile"
                    class="suggestion-profile-image me-4"
                    v-else
                  />
                  <div>
                    <div class="fw-bold text-black">
                      {{ suggested.firstName }} {{ suggested.lastName }}
                    </div>
                    <div class="text-secondary">@{{ suggested.userName }}</div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="card" aria-hidden="true" v-else>
      <div class="card-header p-0 placeholder-wave">
        <h4 class="fw-bold my-3 text-center placeholder offset-1 col-10"></h4>
      </div>
      <div class="card-body p-0">
        <div class="py-3 px-3 my-2">
          <div class="d-flex justify-content-between placeholder-glow">
            <div><div class="suggestion-profile-image placeholder"></div></div>
            <div class="container placeholder-wave">
              <span class="placeholder col-12"></span>
              <span class="placeholder col-12"></span>
            </div>
          </div>
        </div>
        <div class="py-3 px-3 my-2">
          <div class="d-flex justify-content-between placeholder-glow">
            <div><div class="suggestion-profile-image placeholder"></div></div>
            <div class="container placeholder-wave">
              <span class="placeholder col-12"></span>
              <span class="placeholder col-12"></span>
            </div>
          </div>
        </div>
        <div class="py-3 px-3 my-2">
          <div class="d-flex justify-content-between placeholder-glow">
            <div><div class="suggestion-profile-image placeholder"></div></div>
            <div class="container placeholder-wave">
              <span class="placeholder col-12"></span>
              <span class="placeholder col-12"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const loading = ref(true);
const changeLoadingsState = () => {
  loading.value = !loading.value;
};

userStore.getUserSuggestions().then(changeLoadingsState);
const { _userSuggestions: suggestions } = storeToRefs(userStore);
</script>

<style scoped>
#suggestions {
  overflow-y: auto;
  max-height: 368px;
}

.suggestion {
  transition: 0.4s all;
}
.suggestion:hover {
  transition: 0.4s all;
  background-color: rgb(222, 222, 222);
}
</style>
