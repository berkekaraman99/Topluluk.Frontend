<template>
  <div class="container-fluid">
    <div class="container">
      <h1 class="text-center">Gönderi Oluştur</h1>
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
          :classes="{
            form: 'mx-auto tw-p-8 shadow rounded-5',
          }"
          style="max-width: 512px"
        >
          <FormKit
            v-model="postStyle"
            type="radio"
            label="Gönderi şeklini seçiniz"
            :options="[
              { label: 'Normal Gönderi', value: 'normal' },
              { label: 'Topluluk için gönderi', value: 'community' },
              {
                label: 'Etkinlik için gönderi',
                value: 'Event',
                attrs: { disabled: true },
              },
            ]"
            help=""
            :classes="{
              fieldset: 'mx-auto',
              legend: 'mb-3',
            }"
          />

          <FormKit
            v-if="postStyle === 'community'"
            type="select"
            label="Gönderi yapılacak Topluluğu seçiniz"
            name="country"
            placeholder="Topluluk seçiniz"
            v-model="communityId"
          >
            <option
              v-for="community in userCommunities"
              :key="community.id"
              :value="community.id"
            >
              {{ community.title }}
            </option>
          </FormKit>

          <FormKit
            type="textarea"
            label="Açıklama"
            validation="required"
            v-model="postDescription"
          />
          <FormKit
            type="file"
            label="Dosyalar"
            accept=".png,.jpg,.jpeg,.jfif"
            multiple="true"
            v-on:change="onFileChange"
          />
          <FormKit
            type="submit"
            :label="
              loading
                ? 'Oluşturuluyor'
                : statusCode !== 200
                ? 'Gönderiyi Oluştur'
                : 'Başarılı'
            "
            wrapper-class="mx-auto text-center"
            :classes="{ input: 'w-100 rounded-5' }"
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
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import type { ICreatePostModel } from "../../models/create_post_model";
import { useCommunityStore } from "@/stores/community";

const communityStore = useCommunityStore();
const { _userCommunities: userCommunities } = storeToRefs(communityStore);

const postStore = usePostStore();
const router = useRouter();

const postStyle = ref("normal");
const postDescription = ref("");
const postFiles = ref<FileList>();
const communityId = ref("");

const { _statusCode: statusCode } = storeToRefs(postStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const onFileChange = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  postFiles.value = files;
  console.log(postFiles.value);
};

const submitPost = async () => {
  changeLoadingState();
  const body = new FormData();

  body.append("description", postDescription.value);

  if (postFiles.value != null) {
    for (let i = 0; i < postFiles.value!.length; i++) {
      body.append("Files", postFiles.value![i]);
    }
  } else {
    body.append("Files", "");
  }

  if (postStyle.value === "normal") {
    await postStore.createPost(body).then(() => {
      changeLoadingState();
      setTimeout(() => {
        router.push({ name: "home" });
      }, 3000);
    });
  } else if (postStyle.value === "community") {
    body.append("CommunityId", communityId.value);
    await postStore.createPost(body).then(() => {
      changeLoadingState();
      setTimeout(() => {
        router.push({ name: "home" });
      }, 3000);
    });
  }
};

onBeforeUnmount(() => {
  postStore.$patch({
    statusCode: 0,
  });
});
</script>

<style scoped></style>
