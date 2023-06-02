<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center justify-content-around">
          <div class="card-text fw-bold">General</div>
          <div class="card-text fw-bold">Tab</div>
        </div>
      </div>
      <div class="card-body">
        <div>
          <div
            class="tile"
            data-bs-toggle="collapse"
            data-bs-target="#collapseEditCommunity"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            <span class="ms-2 text-primary">Edit Community</span>
          </div>
        </div>
        <div class="collapse" id="collapseEditCommunity">
          <div class="card card-body">
            <FormKit type="form" submit-label="Create" :actions="false">
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
                    ? 'Edit Community'
                    : 'Success'
                "
                wrapper-class="mx-auto text-center"
                :classes="{ input: 'w-100' }"
                :disabled="loading || statusCode === 200"
              />
            </FormKit>
          </div>
        </div>
        <div v-if="adminId === user.id" class="tile">
          <div disabled v-if="loading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Deleting...
          </div>
          <div class="text-danger" @click="deleteCommunity" v-else>
            <i class="fa-solid fa-trash-can"></i>
            <span class="ms-2">Delete Community</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
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

const communityObject = reactive({
  Location: "",
  IsVisible: "true",
  IsPublic: "true",
  CoverImage: null,
  ParticipiantLimit: "1",
  Description: "",
  Title: "",
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

<style scoped lang="scss">
.tile {
  transition: all 0.4s ease;
  border: 1px solid white;
  padding: 12px 8px;
  font-weight: bold;

  &:hover {
    background-color: rgb(241, 241, 241);
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
  }
}
</style>
