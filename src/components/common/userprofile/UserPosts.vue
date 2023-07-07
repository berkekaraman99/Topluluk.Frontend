<template>
  <Transition name="scaleInOut" mode="out-in">
    <LoadingSpinner v-if="loading" />
    <div class="container my-3" v-else-if="userPosts.length > 0">
      <TransitionGroup
        appear
        @before-enter="beforeEnterPosts"
        @enter="enterPosts"
        @before-leave="beforeLeavePosts"
        @leave="leavePosts"
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
    <div class="container my-5" v-else>
      <h1 class="text-center fw-light">Burada hiç gönderi yok...</h1>
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
  id: {
    type: String,
    required: true,
  },
});

const beforeEnterPosts: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(100px)";
};
const enterPosts: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.1 * index,
  });
};
const beforeLeavePosts: any = (el: HTMLElement) => {
  el.style.opacity = "1";
};
const leavePosts: any = (el: HTMLElement) => {
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

postStore.getUserPosts(props.id).then(changeLoadingState);
const { _userPosts: userPosts } = storeToRefs(postStore);
</script>

<style scoped></style>
