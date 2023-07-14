<template>
  <Transition name="scaleInOut" mode="out-in">
    <LoadingSpinner v-if="loading" />
    <div class="my-5" v-else-if="userEvents.length === 0">
      <h1 class="text-center fw-light">{{ t("profile.eventsnotfound") }}</h1>
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
          class="col-12 col-sm-12 col-md-10 col-lg-8"
          v-for="(userEvent, index) in userEvents"
          v-bind:key="userEvent.id"
          :data-index="index"
        >
          <EventsVue :user-event="userEvent" />
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useEventStore } from "@/stores/event";
import { storeToRefs } from "pinia";
import EventsVue from "../event/EventsVue.vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

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

const eventStore = useEventStore();
const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

eventStore.getUserEvents(props.id).then(changeLoadingState);
const { _userEvents: userEvents } = storeToRefs(eventStore);
</script>

<style scoped></style>
