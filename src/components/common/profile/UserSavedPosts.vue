<template>
  <LoadingSpinner v-if="loading" />
  <div v-else-if="savedPosts.length === 0">
    <h1 class="text-center fw-light">There is no saved posts here...</h1>
  </div>
  <div v-else-if="savedPosts.length">
    <div class="row" v-for="post in savedPosts" v-bind:key="post.id">
      <PostComponentFeed :post="post" />
    </div>
  </div>
  <div class="my-3" v-else>
    <p class="text-center fs-5">No saved posts here</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import PostComponentFeed from "@/components/shared/PostComponentFeed.vue";
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";

const postStore = usePostStore();
const { _savedPosts: savedPosts } = storeToRefs(postStore);

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};
postStore.getSavedPosts().then(changeLoadingState);
</script>

<style scoped>
.card {
  background-color: rgb(247, 247, 247);
}
</style>
