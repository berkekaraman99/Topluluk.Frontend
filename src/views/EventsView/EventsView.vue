<template>
  <div>
    <Transition appear @before-enter="beforeEnterTitle" @enter="enterTitle">
      <h1 class="fw-bold display-6 px-2">{{ t("event.header") }}</h1>
    </Transition>
    <LoadingSpinner v-if="loading" />
    <div class="container" v-else>
      <div v-if="userEvents.length === 0">
        <h1>{{ t("event.eventnotfound") }}</h1>
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
            v-bind:key="userEvent.id"
            :data-index="index"
          >
            <EventsVue :user-event="userEvent" />
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import EventsVue from "@/components/common/event/EventsVue.vue";
import { useEventStore } from "@/stores/event";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

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

const eventStore = useEventStore();
const authStore = useAuthStore();
const { _user } = storeToRefs(authStore);

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

eventStore.getUserEvents(_user.value.id).then(changeLoadingState);
const { _userEvents: userEvents } = storeToRefs(eventStore);
</script>

<style scoped></style>
