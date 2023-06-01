<template>
  <div class="collapse" id="collapseBannerImage">
    <div class="card card-body">
      <FormKit
        type="form"
        @submit="changeBannerImage"
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
          accept=".png,.jpg,.jpeg"
          multiple="true"
          v-on:change="onFileChangeBanner"
        />
        <FormKit
          type="submit"
          :label="
            loading
              ? 'Loading'
              : statusCode !== 200
              ? 'Change Banner Image'
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
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const { _statusCode: statusCode } = storeToRefs(userStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const bannerImage: any = ref(null);
const onFileChangeBanner = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  console.log(files[0]);
  bannerImage.value = files[0];
  console.log(bannerImage.value);
};

const changeBannerImage = async () => {
  const body: FormData = new FormData();
  body.append("File", bannerImage.value);
  try {
    changeLoadingState();
    await userStore.changeBannerImage(body).then(() => {
      changeLoadingState();
      setTimeout(() => {
        userStore.$patch({
          statusCode: 0,
        });
      }, 2000);
    });
  } catch (error: any) {
    console.log(error.response.data);
  }
};
</script>

<style scoped></style>
