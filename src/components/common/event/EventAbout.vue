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
              <div>
                <p class="fw-medium tw-text-lg mb-0">
                  <i class="fa-solid fa-calendar-days"></i> Başlangıç Tarihi
                </p>
                <span class="tw-text-sm">
                  {{ formatTime(currentEvent.startDate) }}
                </span>
              </div>
              <div>
                <p class="fw-medium tw-text-lg mb-0 mt-3">
                  <i class="fa-solid fa-calendar-days"></i> Bitiş Tarihi
                </p>
                <span class="tw-text-sm">
                  {{ formatTime(currentEvent.endDate) }}
                </span>
              </div>
            </div>
            <div></div>
          </div>
          <div class="my-4">
            <p class="tw-text-xl my-2 fw-medium">Etkinlik Açıklaması</p>
            <p class="tw-text-sm my-2">
              {{
                currentEvent.description != null
                  ? currentEvent.description
                  : "Description not available"
              }}
            </p>
          </div>
          <p class="tw-text-sm">
            <i class="fa-solid fa-users fa-lg me-1"></i>
            {{ currentEvent.attendeesCount }} kişi bu etkinliğe gitmeyi
            düşünüyor
          </p>
          <p class="tw-text-sm my-2">
            <i class="fa-solid fa-location-dot fa-lg me-1"></i>
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
          <div class="fw-medium text-end">Etkinlik Yöneticisi</div>
          <div class="d-flex align-items-center justify-content-end my-3">
            <div class="mx-3">
              {{ currentEvent.firstName.concat(" ", currentEvent.lastName) }}
            </div>
            <img
              v-if="currentEvent.profileImage"
              class="post-profile-image"
              :src="currentEvent.profileImage"
              alt="profile image"
            />
            <img
              src="@/assets/images/profile-man.png"
              alt="profile-man"
              class="post-profile-image"
              v-else-if="currentEvent.gender == 2"
            />
            <img
              src="@/assets/images/profile-woman.png"
              alt="profile-woman"
              class="post-profile-image"
              v-else-if="currentEvent.gender == 1"
            />
            <img
              src="@/assets/images/user.png"
              alt="profile"
              class="post-profile-image"
              v-else
            />
          </div>
        </div>
        <div
          id="eventAction"
          class="card-footer fw-bold pointer p-0 m-0 mt-3"
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
            Etkinliğe Katıl
          </button>
          <button
            class="btn btn-danger w-100 h-100"
            v-else-if="currentEvent.userId !== user.id"
            @click="leaveEvent(currentEvent)"
          >
            Etkinlikten Ayrıl
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { IEventModel } from "@/models/event_model";
import { useAuthStore } from "@/stores/auth";
import { useEventStore } from "@/stores/event";
import moment from "moment";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";
import { ref } from "vue";

const props = defineProps({
  currentEvent: {
    type: Object as PropType<IEventModel>,
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
