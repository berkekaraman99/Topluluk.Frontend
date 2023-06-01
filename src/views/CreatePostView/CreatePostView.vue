<template>
  <div class="container-fluid">
    <div class="container">
      <h1 class="text-center">Create Post</h1>
      <div class="row">
        <FormKit
          type="form"
          @submit="submitPost"
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
            type="textarea"
            label="Description"
            validation="required"
            v-model="postModel.description"
          />
          <FormKit
            type="file"
            label="Files"
            accept=".png,.jpg,.jpeg,.jfif"
            multiple="true"
            v-on:change="onFileChange"
          />
          <FormKit
            type="submit"
            :label="
              loading
                ? 'Loading'
                : statusCode !== 200
                ? 'Create Post'
                : 'Success'
            "
            wrapper-class="mx-auto text-center"
            :classes="{ input: 'w-100' }"
            :disabled="loading || statusCode === 200"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";
import { reactive, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import type ICreatePostModel from "../../models/post_model";

const postStore = usePostStore();
const router = useRouter();
const postModel = reactive({
  description: "",
  files: null,
});
const { _statusCode: statusCode } = storeToRefs(postStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const onFileChange = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  postModel.files = files;
  console.log(postModel.files);
};

const submitPost = async () => {
  changeLoadingState();
  const body = new FormData();

  const pModel: ICreatePostModel = {
    description: postModel.description,
    files: postModel.files!,
  };

  body.append("description", pModel.description);

  if (pModel.files !== null) {
    for (let i = 0; i < pModel.files.length; i++) {
      body.append("Files", pModel.files[i]);
    }
  } else {
    body.append("Files", "");
  }

  await postStore.createPost(body).then(() => {
    changeLoadingState();
    setTimeout(() => {
      router.push({ name: "home" });
    }, 3000);
  });
};

onBeforeUnmount(() => {
  postStore.$patch({
    statusCode: 0,
  });
});
</script>

<style scoped></style>
