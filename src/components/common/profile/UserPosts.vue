<template>
  <Transition name="scaleInOut" mode="out-in">
    <LoadingSpinner v-if="loading" />
    <div class="my-5" v-else-if="userPosts.length === 0">
      <h1 class="text-center fw-light">Burada hiç gönderi yok...</h1>
    </div>
    <div class="container my-3" v-else-if="userPosts.length > 0">
      <TransitionGroup
        appear
        @before-enter="beforeEnterFeed"
        @enter="enterFeed"
        @before-leave="beforeLeaveFeed"
        @leave="leaveFeed"
      >
        <div
          class="row"
          v-for="(post, index) in userPosts"
          v-bind:key="post.id"
          :data-index="index"
        >
          <PostComponentProfile :post="post" />
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import PostComponentProfile from "@/components/shared/PostComponentProfile.vue";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

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

const postStore = usePostStore();

const loading = ref(true);

const changeLoadingState = () => {
  loading.value = !loading.value;
};
postStore.getUserPosts(props.userId).then(changeLoadingState);

const { _userPosts: userPosts } = storeToRefs(postStore);
</script>
<style scoped></style>
