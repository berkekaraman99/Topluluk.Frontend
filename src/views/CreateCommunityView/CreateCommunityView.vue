<template>
  <div class="container-fluid">
    <h1 class="fw-bold text-center fs-2 py-2">Create Community</h1>
    <div class="row">
      <FormKit
        type="form"
        submit-label="Create"
        @submit="submitCommunity"
        :actions="false"
      >
        <FormKit
          type="multi-step"
          tab-style="progress"
          :hide-progress-labels="true"
          :allow-incomplete="true"
          :classes="{
            outer: 'mx-auto',
            wrapper: 'mx-auto',
          }"
        >
          <FormKit type="step">
            <FormKit
              type="text"
              label="Community Name"
              validation="required"
              v-model="communityObject.Title"
            />
            <FormKit
              type="textarea"
              label="Community Description"
              validation="required"
              v-model="communityObject.Description"
            />
            <FormKit
              type="number"
              label="Participiant Limit"
              value="1"
              step="1"
              min="1"
              v-model="communityObject.ParticipiantLimit"
            />
            <FormKit
              type="text"
              label="Location"
              validation="required"
              v-model="communityObject.Location"
            />
            <FormKit
              type="select"
              label="Where would you prefer to live?"
              name="planet"
              v-model="communityObject.Location"
            >
              <optgroup label="Inner Planets">
                <option
                  v-for="location in locationInfo"
                  :key="location.ilce"
                  :value="location.il + location.ilce"
                >
                  {{ location.ilce }}
                </option>
              </optgroup>
            </FormKit>
          </FormKit>

          <FormKit type="step">
            <FormKit
              type="file"
              label="Cover Image"
              accept=".png,.jpg,.jpeg"
              multiple="false"
              validation="required"
              v-on:change="onFileChangeCoverImage"
            />

            <FormKit
              type="file"
              label="Banner Image"
              accept=".png,.jpg,.jpeg"
              multiple="false"
              validation="required"
              v-on:change="onFileChangeBannerImage"
            />

            <FormKit
              type="select"
              label="Community Is Public?"
              placeholder="Select..."
              :options="[
                { label: 'True', value: true },
                { label: 'False', value: false },
              ]"
              validation="required"
              v-model="communityObject.IsPublic"
            />

            <FormKit
              type="select"
              label="Community Is Visible?"
              placeholder="Select..."
              :options="[
                { label: 'True', value: true },
                { label: 'False', value: false },
              ]"
              validation="required"
              v-model="communityObject.IsVisible"
            />
          </FormKit>
        </FormKit>
        <FormKit
          type="submit"
          :label="
            loading
              ? 'Loading'
              : statusCode !== 200
              ? 'Create Community'
              : 'Success'
          "
          wrapper-class="mx-auto text-center"
          :classes="{ input: 'w-100' }"
          :disabled="loading || statusCode === 200"
        />
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from "@/data/location-data.json";
import { reactive, ref, onBeforeUnmount } from "vue";
import type ICreateCommunityModel from "../../models/create_community_model";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useCommunityStore } from "@/stores/community";
import ILocation from "@/models/location-model";

console.log(data);
const locationInfo: Array<ILocation> = data;

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const communityStore = useCommunityStore();
const { _statusCode: statusCode } = storeToRefs(communityStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const communityObject = reactive({
  Location: "",
  IsVisible: "true",
  IsPublic: "true",
  CoverImage: null,
  ParticipiantLimit: "1",
  Description: "",
  Title: "",
  CreatedById: user.value.id,
  BannerImage: null,
});

const onFileChangeCoverImage = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  communityObject.CoverImage = files[0];
};

const onFileChangeBannerImage = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  communityObject.BannerImage = files[0];
};

const submitCommunity = async () => {
  const cObject: ICreateCommunityModel = {
    Title: communityObject.Title,
    Description: communityObject.Description,
    ParticipiantLimit: communityObject.ParticipiantLimit,
    Location: communityObject.Location,
    CoverImage: communityObject.CoverImage!,
    IsVisible: communityObject.IsVisible,
    IsPublic: communityObject.IsPublic,
    CreatedById: communityObject.CreatedById,
    BannerImage: communityObject.BannerImage!,
  };
  console.log(communityObject);

  const body = new FormData();
  body.append("Title", cObject.Title);
  body.append("Description", cObject.Description);
  body.append("ParticipiantLimit", cObject.ParticipiantLimit);
  body.append("Location", cObject.Location);
  body.append("CoverImage", cObject.CoverImage);
  body.append("IsVisible", cObject.IsVisible);
  body.append("IsPublic", cObject.IsPublic);
  body.append("CreatedById", cObject.CreatedById);
  body.append("bannerImage", cObject.BannerImage);

  try {
    changeLoadingState();
    await communityStore.createCommunity(body).then(() => {
      changeLoadingState();
      setTimeout(() => {
        router.push({ name: "communities" });
      }, 3000);
    });
  } catch (error: any) {
    changeLoadingState();
    console.log(error.message);
  }
};

onBeforeUnmount(() => {
  communityStore.$patch({
    statusCode: 0,
  });
});
</script>

<style scoped>
div .row {
  min-width: 300px;
}
</style>
