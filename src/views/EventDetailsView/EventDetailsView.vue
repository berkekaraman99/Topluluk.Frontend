<template>
  <div class="container-fluid">
    <div class="container">
      <Transition name="scaleInOut" mode="out-in">
        <LoadingSpinner v-if="loading" />
        <div class="row" v-else>
          <!-- Sidebar -->
          <div class="col-md-12 col-lg-2 mb-4 mb-md-2 mb-lg-0 my-2">
            <div
              id="sidebar"
              class="col-12 d-flex align-items-start justify-content-start flex-column flex-sm-row flex-lg-column"
            >
              <div
                class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
                @click="changeCategory('About')"
                :class="{ selected: category === 'About' }"
              >
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-1"
                  class="radio"
                  value="radio1"
                  :checked="category === 'About'"
                />
                <label for="radio-1">
                  <span class="fw-bold" id="about">Hakkında</span>
                </label>
              </div>

              <div
                class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
                @click="changeCategory('Attendees')"
                :class="{ selected: category === 'Attendees' }"
              >
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-2"
                  class="radio"
                  value="radio2"
                  :checked="category === 'Attendees'"
                />
                <label for="radio-2">
                  <span class="fw-bold" id="attendees">Katılımcılar</span>
                </label>
              </div>

              <div
                class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
                @click="changeCategory('Comments')"
                :class="{ selected: category === 'Comments' }"
              >
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-3"
                  class="radio"
                  value="radio3"
                  :checked="category === 'Comments'"
                />
                <label for="radio-3">
                  <span class="fw-bold" id="event-comments">Yorumlar</span>
                </label>
              </div>

              <div
                class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
                v-if="currentEvent.userId === user.id"
                @click="changeCategory('Settings')"
                :class="{ selected: category === 'Settings' }"
              >
                <input
                  type="radio"
                  name="group-radio"
                  id="radio-4"
                  class="radio"
                  value="radio4"
                  :checked="category === 'Settings'"
                />
                <label for="radio-4">
                  <span class="fw-bold" id="posts">Ayarlar</span>
                </label>
              </div>
            </div>
            <!-- <div class="col-12">
              <div class="card bg-dark my-2 rounded-3 w-100">
                <div class="card-body text-light">
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
                
              </div>
            </div> -->
          </div>

          <!-- Event View -->
          <div class="col-12 col-md-12 offset-md-0 col-lg-10">
            <div class="card shadow-sm my-2">
              <div class="card-body">
                <div class="card-text mb-3">
                  <h2 class="fw-bold text-center">{{ currentEvent.title }}</h2>
                </div>
                <div>
                  <div
                    :id="`carousel${currentEvent.id}`"
                    class="carousel slide mx-auto"
                    v-if="currentEvent.images?.length > 0"
                    style="max-width: 600px"
                  >
                    <div class="carousel-inner rounded-3">
                      <div
                        class="carousel-item bg-black"
                        :class="{ active: currentEvent.images[0] === image }"
                        style="
                          transition: 0.35s ease-in-out;
                          max-height: 300px;
                          max-width: 600px;
                        "
                        v-for="image in currentEvent.images"
                        :key="image"
                      >
                        <img
                          :src="image"
                          class="d-block img-fluid w-100 object-fit-contain"
                          style="height: 300px"
                          alt="image"
                        />
                      </div>
                    </div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      :data-bs-target="`#carousel${currentEvent.id}`"
                      data-bs-slide="prev"
                      v-if="currentEvent.images?.length !== 1"
                    >
                      <i class="fa-solid fa-circle-chevron-left fa-lg"></i>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      :data-bs-target="`#carousel${currentEvent.id}`"
                      data-bs-slide="next"
                      v-if="currentEvent.images?.length !== 1"
                    >
                      <i class="fa-solid fa-circle-chevron-right fa-lg"></i>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                  <div
                    v-else
                    class="rounded-4"
                    style="
                      background-image: url('https://picsum.photos/1600');
                      background-position: center;
                      background-repeat: no-repeat;
                      background-size: cover;
                      height: 320px;
                    "
                  ></div>
                </div>
              </div>
              <div class="card-footer">
                <Transition mode="out-in" name="scaleInOut">
                  <EventAbout
                    :currentEvent="currentEvent"
                    v-if="category === 'About'"
                  />
                  <EventAttendees
                    :attendees="eventAttendees"
                    v-else-if="category === 'Attendees'"
                  />
                  <EventComments
                    @update-comments="updateComments"
                    :id="id"
                    v-else-if="category === 'Comments'"
                  />
                  <EventSettings
                    :id="id"
                    :currentEvent="currentEvent"
                    v-else-if="category === 'Settings'"
                  />
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useEventStore } from "@/stores/event";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import EventAbout from "@/components/common/event/EventAbout.vue";
import EventAttendees from "@/components/common/event/EventAttendees.vue";
import EventComments from "@/components/common/event/EventComments.vue";
import EventSettings from "@/components/common/event/EventSettings.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const eventStore = useEventStore();
const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

eventStore.getEventById(props.id).then(changeLoadingState);
eventStore.getEventAttendees(props.id);
const { _currentEvent: currentEvent, _eventAttendees: eventAttendees } =
  storeToRefs(eventStore);

const updateComments = async () => {
  await eventStore.getEventComments(props.id);
};

const category = ref("About");
const changeCategory = (name: string) => {
  category.value = name;
};

onUnmounted(() => {
  eventStore.$patch({
    currentEvent: {},
  });
});
</script>

<style scoped lang="scss">
.fs-4 {
  transition: 0.4s all ease;
}
.radio {
  appearance: none;
}

#sidebar {
  border-radius: 12px;
  padding: 11px 8px;
  height: fit-content;
  margin-top: 0.5rem;
}

.nav-link {
  background-color: white;
  font-weight: 500;
  height: 40px;
  width: 100%;
  // border-radius: 12px;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  padding: 0px 12px;
  margin: 3px 0px;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  @media screen and (max-width: 992px) {
    margin: 3px 4px;
  }

  &:hover {
    color: var(--color-primary);
    box-shadow: inset 8px 0px 0px -2px grey;
  }

  span {
    margin-left: 6px;
  }
}

.selected {
  color: var(--color-primary);
  background-color: var(--color-secondary);
  box-shadow: inset 8px 0px 0px -2px var(--color-primary);
}

#eventAction {
  transition: 0.3s ease;
  height: 60px;
}
</style>
