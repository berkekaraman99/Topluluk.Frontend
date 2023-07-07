<template>
  <Transition name="scaleInOut" mode="out-in">
    <LoadingSpinner v-if="loading" />
    <div class="my-5" v-else-if="savedPosts.length === 0">
      <h1 class="text-center fw-light">Kaydedilen gönderi yok...</h1>
    </div>
    <div v-else-if="savedPosts.length > 0">
      <div class="row" v-for="post in savedPosts" v-bind:key="post.id">
        <PostComponentFeed :post="post" />
      </div>
    </div>
  </Transition>
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
