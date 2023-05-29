<template>
  <Transition
    appear
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="container px-0">
      <div class="row">
        <div class="col-12 col-md-12 col-lg-6">
          <div class="card-text d-flex my-3">
            <div class="me-4">
              <i class="fa-solid fa-calendar-days"></i>
              <div>
                <p class="fw-bold mb-0 mt-3">Start Date</p>
                <span>
                  {{ formatTime(currentEvent.startDate) }}
                </span>
              </div>
              <div>
                <p class="fw-bold mb-0 mt-3">End Date</p>
                <span>
                  {{ formatTime(currentEvent.endDate) }}
                </span>
              </div>
            </div>
            <div></div>
          </div>
          <p class="card-text my-2 fw-bold">Description</p>
          <p class="card-text my-2">
            {{
              currentEvent.description != null
                ? currentEvent.description
                : "Description not available"
            }}
          </p>
          <p class="card-text">
            <i class="fa-solid fa-users fa-lg"></i>
            {{ currentEvent.attendeesCount }} people are considering attend the
            event
          </p>
          <p class="card-text my-2">
            <i class="fa-solid fa-location-dot fa-lg"></i>
            {{
              currentEvent.location != null
                ? currentEvent.location
                : "Not Available"
            }}
          </p>
        </div>
        <div
          class="col-12 col-md-12 col-lg-6 d-flex align-items-end justify-content-end flex-column"
        >
          <div
            id="eventAction"
            class="card-footer fw-bold pointer p-0 m-0"
            v-if="currentEvent.userId !== user.id"
          >
            <button
              class="btn btn-secondary w-100 h-100"
              v-if="processing"
              disabled
            >
              <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
            <button
              class="btn btn-success w-100 h-100"
              v-else-if="!currentEvent.isAttendeed"
              @click="joinEvent(currentEvent)"
            >
              Join Event
            </button>
            <button
              class="btn btn-danger w-100 h-100"
              v-else-if="currentEvent.userId !== user.id"
              @click="leaveEvent(currentEvent)"
            >
              Leave Event
            </button>
          </div>
          <div class="fw-bold text-end">Event Owner</div>
          <div class="d-flex align-items-center justify-content-end my-3">
            <div class="mx-3">
              {{ currentEvent.firstName }} {{ currentEvent.lastName }}
            </div>
            <div
              class="post-profile-image"
              :style="{
                'background-image': 'url(' + currentEvent.profileImage + ')',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useEventStore } from "@/store/event";
import moment from "moment";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const props = defineProps({
  currentEvent: {
    type: Object,
    required: true,
  },
});

const authStore = useAuthStore();
const eventStore = useEventStore();

const { _user: user } = storeToRefs(authStore);

const processing = ref(false);
const changeProcessing = () => {
  processing.value = !processing.value;
};

const formatTime = (time: any) => {
  return moment(time).format("DD MMMM YYYY, hh:mm");
};

const joinEvent = async (cEvent: any) => {
  changeProcessing();
  await eventStore.joinEvent(props.currentEvent.id).then(() => {
    cEvent.isAttendeed = true;
    changeProcessing();
  });
};

const leaveEvent = async (cEvent: any) => {
  changeProcessing();
  await eventStore.leaveEvent(props.currentEvent.id).then(() => {
    cEvent.isAttendeed = false;
    changeProcessing();
  });
};
</script>

<style scoped></style>
