<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center justify-content-start">
          <div class="card-text fw-bold tw-text-2xl">
            {{ t("community.general") }}
          </div>
          <!-- <div class="card-text fw-bold">Tab</div> -->
        </div>
      </div>
      <div class="card-body">
        <!-- Change Cover Image -->
        <div>
          <div
            class="tile"
            data-bs-toggle="collapse"
            data-bs-target="#collapseChangeCoverImage"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            <span class="ms-2 text-primary">{{
              t("community.changecoverimage")
            }}</span>
          </div>
        </div>
        <div class="collapse" id="collapseChangeCoverImage">
          <div class="card card-body">
            <FormKit
              type="form"
              @submit="changeCoverImage"
              submit-label="Create"
              :actions="false"
            >
              <FormKit
                type="file"
                label="Files"
                accept=".png,.jpg,.jpeg,.jfif,.webp"
                multiple="true"
                v-on:change="onFileChangeCoverImage"
              />
              <div class="d-flex align-items-center">
                <FormKit
                  type="submit"
                  :label="
                    loading
                      ? 'Loading'
                      : statusCode !== 200
                      ? 'Kapak Resmini Değiştir'
                      : 'Başarılı'
                  "
                  wrapper-class="text-center"
                  :classes="{ input: '' }"
                  :disabled="loading || statusCode === 200"
                />
                <FormKit
                  type="button"
                  :label="
                    loading
                      ? 'Loading'
                      : statusCode !== 200
                      ? 'Kapak Resmini Kaldır'
                      : 'Başarılı'
                  "
                  @click="removeCoverImage"
                  wrapper-class="text-center"
                  :classes="{ input: 'bg-danger' }"
                  :disabled="loading || statusCode === 200"
                />
              </div>
            </FormKit>
          </div>
        </div>

        <!-- Change Banner Image -->
        <div>
          <div
            class="tile"
            data-bs-toggle="collapse"
            data-bs-target="#collapseChangeBannerImage"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            <span class="ms-2 text-primary">{{
              t("community.changebannerimage")
            }}</span>
          </div>
        </div>
        <div class="collapse" id="collapseChangeBannerImage">
          <div class="card card-body">
            <FormKit
              type="form"
              @submit="changeBannerImage"
              submit-label="Create"
              :actions="false"
            >
              <FormKit
                type="file"
                label="Files"
                accept=".png,.jpg,.jpeg,.jfif,.webp,.gif"
                multiple="true"
                v-on:change="onFileChangeBannerImage"
              />
              <div class="d-flex align-items-center">
                <FormKit
                  type="submit"
                  :label="
                    loading
                      ? 'Loading'
                      : statusCode !== 200
                      ? 'Afişi Değiştir'
                      : 'Başarılı'
                  "
                  wrapper-class="text-center"
                  :classes="{ input: '' }"
                  :disabled="loading || statusCode === 200"
                />
                <FormKit
                  type="button"
                  :label="
                    loading
                      ? 'Loading'
                      : statusCode !== 200
                      ? 'Afişi Kaldır'
                      : 'Başarılı'
                  "
                  @click="removeBannerImage"
                  wrapper-class="text-center"
                  :classes="{ input: 'bg-danger' }"
                  :disabled="loading || statusCode === 200"
                />
              </div>
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
            <span class="ms-2">{{ t("community.removecommunity") }}</span>
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
import { ref } from "vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";
import { useRouter } from "vue-router";

const { t } = useI18n();

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

const coverImage = ref<File | any>(null);
const bannerImage = ref<File | any>(null);

const onFileChangeCoverImage = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  coverImage.value = files[0];
};

const onFileChangeBannerImage = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  bannerImage.value = files[0];
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

const changeCoverImage = async () => {
  const body = new FormData();
  body.append("File", coverImage.value);
  await communityStore.updateCoverImage(props.id, body).then(async () => {
    await communityStore.getCommunity(props.id);
  });
};

const removeCoverImage = async () => {
  await communityStore
    .removeCoverImage(props.id)
    .then(async () => await communityStore.getCommunity(props.id));
};

const changeBannerImage = async () => {
  const body = new FormData();
  body.append("File", bannerImage.value);
  await communityStore.updateBannerImage(props.id, body).then(async () => {
    await communityStore.getCommunity(props.id);
  });
};

const removeBannerImage = async () => {
  await communityStore
    .removeBannerImage(props.id)
    .then(async () => await communityStore.getCommunity(props.id));
};

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
