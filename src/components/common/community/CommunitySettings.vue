<template>
  <div>
    <div v-if="adminId === user.id">
      <button class="btn btn-danger" type="button" disabled v-if="loading">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Deleting...
      </button>
      <button class="btn btn-danger" @click="deleteCommunity" v-else>
        Delete Community
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useCommunityStore } from "@/store/community";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const communityStore = useCommunityStore();
const { _statusCode: statusCode } = storeToRefs(communityStore);

const deleteCommunity = async () => {
  changeLoadingState();
  await communityStore.deleteCommunity(props.id).then(() => {
    changeLoadingState();
    if (statusCode.value === 200) {
      router.back();
    }
  });
};
</script>

<style scoped></style>
