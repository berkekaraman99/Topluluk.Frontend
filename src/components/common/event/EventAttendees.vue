<template>
  <Transition appear name="scaleInOut">
    <div>
      <div class="card-text d-flex align-items-center">
        <div class="fw-bold fs-3">
          Katılımcılar (<span class="tw-text-2xl">{{ attendees.length }}</span
          >)
        </div>
      </div>

      <!-- ATTEND CARD -->
      <div v-for="attend in attendees" :key="attend">
        <div
          class="card my-3 border hover:tw-bg-slate-100 tw-transition tw-ease-in-out tw-duration-350"
        >
          <div class="card-body d-flex align-items-center">
            <div
              alt="profile image"
              class="suggestion-profile-image me-4 shadow-sm"
              :style="{
                'background-image': `url(${attend.profileImage})`,
              }"
              v-if="attend.profileImage"
            ></div>
            <img
              src="@/assets/images/profile-man.png"
              alt="profile-man"
              class="suggestion-profile-image me-4"
              v-else-if="attend.gender == 2"
            />
            <img
              src="@/assets/images/profile-woman.png"
              alt="profile-woman"
              class="suggestion-profile-image me-4"
              v-else-if="attend.gender == 1"
            />
            <img
              src="@/assets/images/user.png"
              alt="profile"
              class="suggestion-profile-image me-4"
              v-else
            />
            <RouterLink
              :to="{ name: 'userprofile', params: { id: attend.id } }"
              class="text-decoration-none tw-text-blue-800"
            >
              <span class="fw-bold">
                {{ attend.firstName }} {{ attend.lastName }}
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  attendees: {
    type: Array<any>,
    required: true,
  },
});
</script>

<style scoped></style>
