<template>
  <div class="collapse" id="collapseProfileImage">
    <div class="card card-body">
      <FormKit
        type="form"
        @submit="changeProfileImage"
        :actions="false"
        :config="{
          classes: {
            outer: 'mx-auto',
            wrapper: 'mx-auto',
            messages: 'text-center',
          },
        }"
      >
        <FormKit
          type="file"
          label="Files"
          accept=".png,.jpg,.jpeg,.jfif"
          multiple="true"
          v-on:change="onFileChangeProfile"
        />
        <div class="d-flex align-items-center justify-content center">
          <FormKit
            type="submit"
            label="Change Profile Image"
            wrapper-class="text-center"
            :classes="{ input: '' }"
          />
          <FormKit
            type="button"
            :label="loading ? 'Loading' : 'Remove Profile Image'"
            @click="removeProfileImage"
            wrapper-class="text-center"
            :classes="{ input: 'bg-danger' }"
            :disabled="loading"
          />
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const profileImage: any = ref(null);
const onFileChangeProfile = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  console.log(files[0]);
  profileImage.value = files[0];
  console.log(profileImage.value);
};

const changeProfileImage = async () => {
  const body = new FormData();
  body.append("files", profileImage.value);
  try {
    await userStore.changeProfileImage(body).then(() => {});
  } catch (error: any) {
    console.log(error.response.data);
  }
};

const removeProfileImage = async () => {
  changeLoadingState();
  await userStore.removeProfileImage().then(async () => {
    changeLoadingState();
    await userStore.getUserById(props.id);
    setTimeout(() => {
      userStore.$patch({
        statusCode: 0,
      });
    }, 2000);
  });
};
</script>

<style scoped></style>
