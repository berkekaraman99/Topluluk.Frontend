<template>
  <Transition appear @before-enter="beforeEnterTitle" @enter="enterTitle">
    <h1 class="fw-bold display-6 px-2">{{ t("feed.header") }}</h1>
  </Transition>

  <LoadingSpinner v-if="loading" />
  <div class="container my-3" v-else-if="postFeed.length">
    <TransitionGroup
      appear
      @before-enter="beforeEnterFeed"
      @enter="enterFeed"
      @before-leave="beforeLeaveFeed"
      @leave="leaveFeed"
    >
      <div
        class="row"
        v-for="(post, index) in postFeed"
        v-bind:key="post.id"
        :data-index="index"
      >
        <PostComponentFeed :post="post" />
      </div>
    </TransitionGroup>
  </div>
  <div class="container my-3" v-else>
    <h1>{{ t("feed.postnotfound") }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import PostComponentFeed from "@/components/shared/PostComponentFeed.vue";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const beforeEnterFeed: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(100px)";
};
const enterFeed: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.1 * index,
  });
};
const beforeLeaveFeed: any = (el: HTMLElement) => {
  el.style.opacity = "1";
};
const leaveFeed: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 0,
    y: 100,
    duration: 0.6,
    delay: 0.1 * index,
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

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const skip = ref<number>(0);

const postStore = usePostStore();
postStore.getPostFeed(skip.value.toString()).then(changeLoadingState);

const { _feed: postFeed } = storeToRefs(postStore);

onBeforeUnmount(() => {
  console.log("UnMounted");

  postStore.$patch({
    feed: [],
  });
});
</script>

<style scoped></style>
