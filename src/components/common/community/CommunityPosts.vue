<template>
  <div>
    <div class="my-3">
      <h3>{{ t("community.posts") }}</h3>
      <Transition name="scaleInOut" mode="out-in">
        <div class="my-5" v-if="loading">
          <LoadingVue />
        </div>
        <div class="my-5" v-else-if="communityPosts.length === 0">
          <p class="text-center fw-light">{{ t("community.postnotfound") }}</p>
        </div>
        <div v-else>
          <div
            class="container my-3"
            v-for="post in communityPosts"
            :key="post.id"
          >
            <TransitionGroup
              appear
              @before-enter="beforeEnterPost"
              @enter="enterPost"
              @before-leave="beforeLeavePost"
              @leave="leavePost"
            >
              <div
                class="row"
                v-for="(post, index) in communityPosts"
                v-bind:key="post.id"
                :data-index="index"
              >
                <PostComponentFeed :post="post" />
              </div>
            </TransitionGroup>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";
import { gsap } from "gsap";
import PostComponentFeed from "@/components/shared/PostComponentFeed.vue";
import { ref } from "vue";
import LoadingVue from "@/components/shared/LoadingVue.vue";

import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const beforeEnterPost: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  // el.style.transform = "translateY(100px)";
};
const enterPost: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 1,
    duration: 0.6,
    delay: 0.1 * index,
  });
};
const beforeLeavePost: any = (el: HTMLElement) => {
  el.style.opacity = "1";
};
const leavePost: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 0,
    duration: 0.6,
    delay: 0.1 * index,
  });
};

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const postStore = usePostStore();
postStore.getCommunityPosts(props.id).then(changeLoadingState);
const { _communityPosts: communityPosts } = storeToRefs(postStore);
</script>

<style scoped></style>
