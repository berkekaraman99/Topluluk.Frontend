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
        <FormKit
          type="submit"
          :label="
            loading
              ? 'Loading'
              : statusCode !== 200
              ? 'Change Profile Image'
              : 'Success'
          "
          wrapper-class="text-center"
          :classes="{ input: 'w-100' }"
          :disabled="loading || statusCode === 200"
        />
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const { _statusCode: statusCode } = storeToRefs(userStore);

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
    changeLoadingState();
    await userStore.changeProfileImage(body).then(() => {
      changeLoadingState();
      setTimeout(() => {
        userStore.$patch({
          statusCode: 0,
        });
      }, 2000);
    });
  } catch (error: any) {
    changeLoadingState();
    console.log(error.response.data);
  }
};
</script>

<style scoped></style>
