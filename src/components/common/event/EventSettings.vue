<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center justify-content-start">
        <div class="card-text fw-bold tw-text-2xl">Genel</div>
        <!-- <div class="card-text fw-bold">Tab</div> -->
      </div>
    </div>
    <div class="card-body">
      <div v-if="currentEvent.userId === user.id" class="tile">
        <div disabled v-if="loading">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Deleting...
        </div>
        <div
          class="text-danger"
          @click="!loading ? deleteEvent() : null"
          v-else
        >
          <i class="fa-solid fa-trash-can"></i>
          <span class="ms-2">{{
            loading ? "İşleniyor" : "Etkinliği Sil"
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEventModel } from "@/models/event_model";
import { useAuthStore } from "@/stores/auth";
import { useEventStore } from "@/stores/event";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  currentEvent: {
    type: Object as PropType<IEventModel>,
    required: true,
  },
});

const router = useRouter();
const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

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
