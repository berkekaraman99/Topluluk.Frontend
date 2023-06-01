<template>
  <div>
    <button class="btn btn-danger" @click="deleteEvent" :disabled="loading">
      {{ loading ? "Processing" : "Delete Event" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/event";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const eventStore = useEventStore();
const { _statusCode: statusCode } = storeToRefs(eventStore);

const deleteEvent = async () => {
  changeLoadingState();
  await eventStore.deleteEvent(props.id).then(() => {
    changeLoadingState();
    if (statusCode.value === 200) {
      router.back();
    }
  });
};

onBeforeUnmount(() => {
  eventStore.$patch({
    statusCode: 0,
  });
});
</script>

<style scoped></style>
