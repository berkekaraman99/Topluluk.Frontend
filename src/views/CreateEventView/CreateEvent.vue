<template>
  <div class="container-fluid">
    <div class="container">
      <h1 class="fw-bold text-center fs-2 py-2">Etkinlik Oluştur</h1>
      <div class="row">
        <FormKit
          type="form"
          submit-label="Create"
          @submit="submitEvent"
          :actions="false"
        >
          <FormKit
            type="multi-step"
            tab-style="tab"
            :hide-progress-labels="true"
            :allow-incomplete="false"
            :classes="{
              outer: 'mx-auto',
              wrapper: 'mx-auto',
            }"
          >
            <FormKit type="step" name="Step One">
              <FormKit
                type="text"
                label="Etkinlik Başlığı"
                validation="required"
                placeholder="Etkinlik başlığını buraya yazınız..."
                v-model="eventObject.title"
              />
              <FormKit
                type="textarea"
                label="Etkinlik Açıklaması"
                validation="required"
                placeholder="Etkinlik açıklamasını buraya yazınız..."
                v-model="eventObject.description"
              />
              <FormKit
                type="select"
                label="Etkinlik Sınırlı mı?"
                placeholder="Select..."
                :options="[
                  { label: 'Evet', value: true },
                  { label: 'Hayır', value: false },
                ]"
                validation="required"
                v-model="eventObject.isLimited"
              />
              <FormKit
                type="number"
                label="Katılımcı Sayısı Limit"
                help="Kaç kişi bu etkinliğe katılabilir?"
                value="1"
                step="1"
                min="1"
                v-model="eventObject.participiantLimit"
              />
            </FormKit>

            <FormKit type="step" name="Step Two">
              <FormKit
                type="file"
                label="Etkinlik Dosyaları"
                accept=".png,.jpg,.jpeg"
                multiple="true"
                validation="required"
                v-on:change="onFileChange"
              />
              <FormKit
                type="select"
                label="Etkinlik Online mı?"
                placeholder="Select..."
                :options="[
                  { label: 'Evet', value: true },
                  { label: 'Hayır', value: false },
                ]"
                validation="required"
                v-model="eventObject.isLocationOnline"
              />

              <FormKit
                v-if="!eventObject.isLocationOnline"
                type="select"
                label="Etkinlik Konumunu Seçiniz"
                name="planet"
                v-model="eventObject.location"
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
                v-if="!eventObject.isLocationOnline"
                type="text"
                placeholder="Konum"
                validation="required"
                v-model="eventObject.location"
                disabled=""
              />

              <FormKit
                type="select"
                label="Etkinlik Görünür mü?"
                placeholder="Select..."
                :options="[
                  { label: 'Evet', value: true },
                  { label: 'Hayır', value: false },
                ]"
                validation="required"
                v-model="eventObject.isVisible"
              />
            </FormKit>

            <FormKit type="step" name="Step Three">
              <FormKit
                type="datetime-local"
                value="2020-03-13T18:22"
                label="Başlangıç Tarihi"
                validation="required|date_after"
                validation-visibility="live"
                v-model="eventObject.startDate"
              />
              <FormKit
                type="datetime-local"
                value="2020-03-13T18:22"
                label="Bitiş Tarihi"
                validation="required|date_after"
                validation-visibility="live"
                v-model="eventObject.endDate"
              />
              <FormKit
                type="select"
                label="Etkinlik Paralı mı?"
                placeholder="Select..."
                :options="[
                  { label: 'Evet', value: true },
                  { label: 'Hayır', value: false },
                ]"
                validation="required"
                v-model="eventObject.isPaid"
              />
              <FormKit
                v-if="eventObject.isPaid"
                type="text"
                label="Ücret"
                validation="required"
                v-model="eventObject.price"
              />
            </FormKit>
          </FormKit>

          <FormKit
            type="submit"
            :label="
              loading
                ? 'Oluşturuluyor'
                : statusCode !== 200
                ? 'Etkinliği Oluştur'
                : 'Başarılı'
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
import { data } from "@/data/il-ilce.json";
import { reactive, ref, onBeforeUnmount } from "vue";
import type { ICreateEventModel } from "../../models/create_event_model";
import router from "@/router";
import { useEventStore } from "@/stores/event";
import { storeToRefs } from "pinia";
import type { ILocation } from "@/models/location_model";

const locationInfo: Array<ILocation> = data;

const eventStore = useEventStore();

const { _statusCode: statusCode } = storeToRefs(eventStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const eventObject = reactive({
  title: "",
  description: "",
  isLimited: false,
  participiantLimit: "10",
  files: null,
  isLocationOnline: false,
  location: "",
  startDate: null,
  endDate: null,
  isPaid: false,
  price: "0",
  isVisible: true,
});

const onFileChange = (e: any) => {
  let files = e.target.files || e.dataTransfer.files;
  eventObject.files = files;
  console.log(eventObject.files);
};

const submitEvent = async () => {
  const eObject: ICreateEventModel = {
    title: eventObject.title,
    description: eventObject.description,
    isLimited: eventObject.isLimited,
    participiantLimit: eventObject.participiantLimit,
    files: eventObject.files!,
    isLocationOnline: eventObject.isLocationOnline,
    location: eventObject.location,
    startDate: eventObject.startDate!,
    endDate: eventObject.endDate!,
    isPaid: eventObject.isPaid,
    price: eventObject.price,
    isVisible: eventObject.isVisible,
  };

  console.log(eObject);

  const body = new FormData();
  body.append("title", eObject.title);
  body.append("description", eObject.description);
  body.append("isLimited", JSON.stringify(eObject.isLimited));
  body.append("participiantLimit", eObject.participiantLimit);
  if (eObject.files !== null) {
    for (let i = 0; i < eObject.files.length; i++) {
      body.append("files", eObject.files[i]);
    }
  } else {
    body.append("files", "");
  }
  body.append("isLocationOnline", JSON.stringify(eObject.isLocationOnline));
  body.append("location", eObject.location);
  body.append("startDate", eObject.startDate.toString());
  body.append("endDate", eObject.endDate.toString());
  body.append("isPaid", JSON.stringify(eObject.isPaid));
  body.append("price", eObject.price);
  body.append("isVisible", JSON.stringify(eObject.isVisible));

  try {
    changeLoadingState();
    await eventStore.createEvent(body).then(() => {
      changeLoadingState();
      setTimeout(() => {
        eventStore.$patch({
          statusCode: 0,
        });
        router.push({ name: "home" });
      }, 2000);
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
  eventStore.$patch({
    statusCode: 0,
  });
});
</script>

<style scoped>
.group-header {
  color: var(--color-primary);
}

.group-text {
  font-weight: 300;
}
</style>
