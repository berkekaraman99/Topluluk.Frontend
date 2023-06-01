<template>
  <div></div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();
userStore.getFollowersRequests(props.userId);

const { _userFollowersRequests: followersRequests } = storeToRefs(userStore);
</script>

<style scoped></style>
