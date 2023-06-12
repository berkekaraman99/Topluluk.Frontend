<template>
  <div>
    <div class="my-3">
      <h3>Admin</h3>
      <div class="card border">
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
      <div class="card my-3 border">
        <div
          class="card-body d-flex align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center">
            <div v-if="participiant.profileImage">
              <div
                alt="profile image"
                class="suggestion-profile-image me-4 shadow-sm"
                :style="{
                  'background-image': `url(${participiant.profileImage})`,
                }"
              ></div>
            </div>
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
          <div
            class="d-flex align-items-center pointer ms-3"
            v-if="user.id === community.adminId"
          >
            <div class="dropdown">
              <i
                class="fa-solid fa-ellipsis fa-2xl"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul class="dropdown-menu">
                <li class="dropdown-item" v-if="user.id === community.adminId">
                  <i class="fa-solid fa-crown"></i> Assign as Admin
                </li>
                <li class="dropdown-item" v-if="user.id === community.adminId">
                  <i class="fa-solid fa-user-tie"></i> Assign as Moderator
                </li>
                <li
                  class="dropdown-item text-danger"
                  @click="kickUser(community.id.toString(), participiant.id)"
                >
                  <i class="fa-solid fa-user-xmark"></i> Kick User
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICommunity } from "@/models/community_model";
import { useAuthStore } from "@/stores/auth";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";

const props = defineProps({
  participiants: {
    type: Array<any>,
    required: true,
  },
  community: {
    type: Object as PropType<ICommunity>,
    required: true,
  },
});

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const communityStore = useCommunityStore();
const kickUser = async (communityId: string, targetId: string) => {
  await communityStore.kickUser(communityId, targetId).then(async () => {
    await communityStore.getCommunityParticipiants(
      props.community.id.toString()
    );
  });
};
</script>

<style scoped></style>
