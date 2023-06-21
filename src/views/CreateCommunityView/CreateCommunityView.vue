<template>
  <div class="container-fluid">
    <h1 class="fw-bold text-center fs-2 py-2">Topluluk Oluştur</h1>
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
          :allow-incomplete="false"
          :classes="{
            outer: 'mx-auto',
            wrapper: 'mx-auto',
          }"
        >
          <FormKit type="step">
            <FormKit
              type="text"
              label="Topluluk Adı"
              validation="required"
              v-model="communityObject.Title"
            />
            <FormKit
              type="textarea"
              label="Topluluk Açıklaması"
              validation="required"
              v-model="communityObject.Description"
            />
            <FormKit
              type="number"
              label="Üye Sayısı Limit"
              value="1"
              step="1"
              min="1"
              v-model="communityObject.ParticipiantLimit"
            />
            <FormKit
              type="select"
              label="Topluluk Konumunu Seçiniz"
              name="planet"
              v-model="communityObject.Location"
            >
              <optgroup
                class="group-header"
                v-for="location in locationInfo"
                :key="location.plaka_kodu"
                :label="location.il_adi"
              >
                <option
                  class="group-text"
                  v-for="ilce in location.ilceler"
                  :key="ilce.ilce_kodu"
                  :value="
                    location.il_adi +
                    ' - ' +
                    changeLetterToLowercase(ilce.ilce_adi)
                  "
                >
                  {{ changeLetterToLowercase(ilce.ilce_adi) }}
                </option>
              </optgroup>
            </FormKit>
            <FormKit
              type="text"
              placeholder="Konum"
              validation="required"
              v-model="communityObject.Location"
              disabled
            />
          </FormKit>

          <FormKit type="step">
            <FormKit
              type="file"
              label="Kapak Resmi"
              accept=".png,.jpg,.jpeg"
              multiple="false"
              validation="required"
              v-on:change="onFileChangeCoverImage"
            />

            <FormKit
              type="file"
              label="Afiş Resmi"
              accept=".png,.jpg,.jpeg"
              multiple="false"
              validation="required"
              v-on:change="onFileChangeBannerImage"
            />

            <FormKit
              type="select"
              label="Topluluk Halka Açık mı?"
              placeholder="Select..."
              :options="[
                { label: 'Evet', value: true },
                { label: 'Hayır', value: false },
              ]"
              validation="required"
              v-model="communityObject.IsPublic"
            />

            <FormKit
              type="select"
              label="Topluluk Görünür mü?"
              placeholder="Select..."
              :options="[
                { label: 'Evet', value: true },
                { label: 'Hayır', value: false },
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
              ? 'Oluşturuluyor'
              : statusCode !== 200
              ? 'Topluluğu Oluştur'
              : 'Başarılı'
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
import { data } from "@/data/il-ilce.json";
import { reactive, ref, onBeforeUnmount } from "vue";
import type { ICreateCommunityModel } from "../../models/create_community_model";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useCommunityStore } from "@/stores/community";
import type { ILocation } from "@/models/location_model";

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
    CreatedById: communityObject.CreatedById.toString(),
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
        communityStore.$patch({
          statusCode: 0,
        });
        router.push({ name: "communities" });
      }, 3000);
    });
  } catch (error: any) {
    changeLoadingState();
    console.log(error.message);
  }
};

const changeLetterToLowercase = (item: string) => {
  let changedItem: string = item[0];
  for (let index = 1; index < item.length; index++) {
    changedItem += item[index].toLowerCase();
  }
  return changedItem;
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

.group-header {
  color: var(--color-primary);
}

.group-text {
  font-weight: 300;
}
</style>
