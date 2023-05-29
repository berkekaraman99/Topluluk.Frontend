<template>
  <Transition
    appear
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div>
      <div class="card-text d-flex align-items-center">
        <div class="fw-bold fs-3">Attendees</div>
        <div class="bg-black rounded-13 py-1 px-2 ms-1 text-white rounded">
          {{ attendees.length }}
        </div>
      </div>
      <div v-for="attend in attendees" :key="attend">
        <div class="card my-3">
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
            <span class="fw-bold">
              {{ attend.firstName }} {{ attend.lastName }}
            </span>
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
