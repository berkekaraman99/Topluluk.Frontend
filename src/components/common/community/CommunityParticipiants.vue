<template>
  <div>
    <div class="my-3">
      <h3>Admin</h3>
      <div class="card">
        <div class="card-body d-flex align-items-center">
          <div
            alt="profile image"
            class="suggestion-profile-image me-4 shadow-sm"
            :style="{
              'background-image': `url(${community.adminImage})`,
            }"
            v-if="community.adminImage"
          ></div>
          <img
            src="@/assets/images/profile-man.png"
            alt="profile-man"
            class="suggestion-profile-image me-4"
            v-else-if="community.adminGender == 2"
          />
          <img
            src="@/assets/images/profile-woman.png"
            alt="profile-woman"
            class="suggestion-profile-image me-4"
            v-else-if="community.adminGender == 1"
          />
          <img
            src="@/assets/images/user.png"
            alt="profile"
            class="suggestion-profile-image me-4"
            v-else
          />
          <span class="fw-bold">
            {{ community.adminName }} {{ community.adminLastName }}
          </span>
        </div>
      </div>
    </div>
    <div>
      <h3 v-if="community.participiantsCount > 1">Members</h3>
    </div>
    <div v-for="participiant in participiants" :key="participiant">
      <div class="card my-3">
        <div class="card-body d-flex align-items-center">
          <div
            alt="profile image"
            class="suggestion-profile-image me-4 shadow-sm"
            :style="{
              'background-image': `url(${participiant.profileImage})`,
            }"
            v-if="participiant.profileImage"
          ></div>
          <img
            src="@/assets/images/profile-man.png"
            alt="profile-man"
            class="suggestion-profile-image me-4"
            v-else-if="participiant.gender == 2"
          />
          <img
            src="@/assets/images/profile-woman.png"
            alt="profile-woman"
            class="suggestion-profile-image me-4"
            v-else-if="participiant.gender == 1"
          />
          <img
            src="@/assets/images/user.png"
            alt="profile"
            class="suggestion-profile-image me-4"
            v-else
          />
          <span class="fw-bold">
            {{ participiant.firstName }} {{ participiant.lastName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  participiants: {
    type: Array<any>,
    required: true,
  },
  community: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
