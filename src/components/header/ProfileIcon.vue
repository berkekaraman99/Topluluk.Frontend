<template>
  <div class="dropdown user-options">
    <div data-bs-toggle="dropdown" aria-expanded="false">
      <div class="d-flex align-items-center justify-content-center">
        <img
          v-if="user.profileImage != null"
          class="profile-icon"
          :src="user.profileImage"
          alt="user icon"
        />
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
        <RouterLink :to="{ name: 'profileSettings' }" class="dropdown-item"
          ><i class="fa-solid fa-gear me-1"></i> Settings</RouterLink
        >
      </li>
      <li @click="emit('logout')">
        <a class="dropdown-item text-danger"
          ><i class="fa-solid fa-arrow-right-from-bracket me-1"></i> Logout</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { IAuthUser } from "@/models/auth_user_model";
import type { PropType } from "vue";

const props = defineProps({
  user: {
    type: Object as PropType<IAuthUser>,
    required: true,
  },
});

const emit = defineEmits(["logout"]);
</script>

<style scoped>
.user-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 16px;
}
</style>
