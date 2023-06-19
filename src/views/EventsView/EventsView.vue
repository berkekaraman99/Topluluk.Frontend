<template>
  <div>
    <Transition appear @before-enter="beforeEnterTitle" @enter="enterTitle">
      <h1 class="fw-bold display-6 px-2">Etkinliklerim</h1>
    </Transition>
    <LoadingSpinner v-if="loading" />
    <div class="container" v-else>
      <div v-if="userEvents.length === 0">
        <h1>Etkinlik bulunamadı</h1>
      </div>
      <div class="row d-flex justify-content-center align-items-center" v-else>
        <TransitionGroup
          appear
          @before-enter="beforeEnterEvent"
          @enter="enterEvent"
        >
          <div
            class="col-12"
            v-for="(userEvent, index) in userEvents"
            v-bind:key="userEvent.id.toString()"
            :data-index="index"
          >
            <RouterLink
              :to="{
                name: 'eventdetails',
                params: { id: userEvent.id.toString() },
              }"
              class="text-decoration-none text-dark"
            >
              <div class="container shadow mb-5 rounded-3">
                <div class="row">
                  <div class="col-sm-12 col-md-4 d-grid align-content-center">
                    <img
                      :src="userEvent.images[0].toString()"
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
                            {{ userEvent.attendeesCount }} kişi gitmeyi
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import moment from "moment";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useEventStore } from "@/stores/event";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const beforeEnterEvent: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(100px)";
};
const enterEvent: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2 * index,
  });
};
const beforeEnterTitle: any = (el: HTMLElement) => {
  el.style.transform = "translateY(-30px)";
  el.style.opacity = "0";
};
const enterTitle: any = (el: HTMLElement, done: any) => {
  gsap.to(el, {
    duration: 1,
    y: 0,
    opacity: 1,
    ease: "bounce.out",
    onComplete: done,
  });
};
const formatTime = (time: any) => {
  return moment(time).format("DD MMMM YYYY, hh:mm");
};
const eventStore = useEventStore();
const authStore = useAuthStore();
const { _user } = storeToRefs(authStore);

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

eventStore.getUserEvents(_user.value.id.toString()).then(changeLoadingState);
const { _userEvents: userEvents } = storeToRefs(eventStore);
</script>

<style scoped></style>
