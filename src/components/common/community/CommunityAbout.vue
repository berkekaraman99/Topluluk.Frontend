<template>
  <div>
    <div>
      <strong>Topluluk Açıklaması</strong>
      <p class="description">{{ community.description }}</p>
    </div>

    <div class="d-flex align-items-center justify-content-between">
      <div>
        <div class="fw-bold">Topluluğun Sahibi</div>
        <div class="d-flex align-items-center my-3">
          <div
            class="post-profile-image"
            :style="{
              'background-image': `url(${community.adminImage})`,
            }"
          ></div>
          <div class="mx-3">
            {{ community.adminName }} {{ community.adminLastName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  community: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.description {
  letter-spacing: 1px;
}
</style>
