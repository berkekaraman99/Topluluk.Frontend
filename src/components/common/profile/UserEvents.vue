<template>
  <Transition name="scaleInOut" mode="out-in">
    <LoadingSpinner v-if="loading" />
    <div class="my-5" v-else-if="userEvents.length === 0">
      <h1 class="text-center fw-light">Burada hiç etkinlik yok...</h1>
    </div>
    <div
      class="row d-flex justify-content-center align-items-center"
      v-else-if="userEvents.length > 0"
    >
      <TransitionGroup
        appear
        @before-enter="beforeEnterEvent"
        @enter="enterEvent"
      >
        <div
          class="col-sm-12 col-md-10 col-lg-8"
          v-for="(userEvent, index) in userEvents"
          v-bind:key="userEvent.id"
          :data-index="index"
        >
          <RouterLink
            :to="{ name: 'eventdetails', params: { id: userEvent.id } }"
            class="text-decoration-none text-dark"
          >
            <div class="container shadow mb-5 rounded-3">
              <div class="row">
                <div class="col-sm-12 col-md-4 d-grid align-content-center">
                  <img
                    :src="userEvent.images[0]"
                    alt="community cover"
                    class="my-2 img-fluid rounded-3"
                    v-if="userEvent.images.length !== 0"
                  />
                  <img
                    class="my-2 rounded-3 img-fluid"
                    src="https://picsum.photos/400"
                    alt="event-image"
                    v-else
                  />
                </div>

                <div class="col-sm-12 col-md-8 col lg-6">
                  <div
                    class="d-flex flex-column justify-content-between rounded-4 m-2 p-2"
                  >
                    <div>
                      <h3 class="fw-bold">{{ userEvent.title }}</h3>
                    </div>
                    <div>
                      <div>
                        <p class="card-text my-2">
                          <span>
                            <i class="fa-solid fa-calendar-days"></i>
                            {{ formatTime(userEvent.startDate) }}
                          </span>
                          -
                          <span>
                            {{ formatTime(userEvent.endDate) }}
                          </span>
                        </p>
                        <p class="card-text my-2">
                          <i class="fa-solid fa-location-dot fa-lg"></i>
                          {{
                            userEvent.location != null
                              ? userEvent.location
                              : "Not Available"
                          }}
                        </p>
                        <p class="card-text pt-2">
                          <i class="fa-solid fa-users fa-lg"></i>
                          {{ userEvent.attendeesCount }} kişi etkinliğe gitmeyi
                          düşünüyor
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import moment from "moment";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useAuthStore } from "@/stores/auth";
import { useEventStore } from "@/stores/event";
import { storeToRefs } from "pinia";

const beforeEnterEvent: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(100px)";
};
const enterEvent: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0; // "index" değerini "el.dataset.index" değerinden alıyoruz. Eğer "el.dataset.index" değeri "undefined" ise 0 olarak ayarlıyoruz.
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2 * index,
  });
};

const formatTime = (time: any) => {
  return moment(time).format("DD MMMM YYYY, hh:mm");
};

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const eventStore = useEventStore();
const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

eventStore.getUserEvents(user.value.id).then(changeLoadingState);
const { _userEvents: userEvents } = storeToRefs(eventStore);
</script>

<style scoped></style>
