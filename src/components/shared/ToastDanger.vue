<template>
  <Transition name="toast">
    <div
      class="position-absolute end-0 bottom-0 m-3 shadow"
      style="width: 300px"
      v-if="
        showToast &&
        (statusCode === 10001 || statusCode === 10002 || statusCode === 10401)
      "
    >
      <div class="card">
        <div class="card-header bg-danger text-white">
          <div class="d-flex align-items-center justify-content-between">
            <strong>{{ header }}</strong>
          </div>
        </div>
        <div class="card-body">
          <div>{{ content }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  statusCode: {
    type: Number,
    required: true,
  },
  showToast: {
    type: Boolean,
    required: true,
  },
  header: {
    type: String,
  },
  content: {
    type: String,
  },
});
</script>

<style scoped></style>
