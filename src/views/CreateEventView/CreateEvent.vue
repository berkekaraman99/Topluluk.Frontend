<template>
  <div class="container-fluid">
    <div class="container">
      <h1 class="fw-bold text-center fs-2 py-2">Create Event</h1>
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
            :allow-incomplete="true"
            :classes="{
              outer: 'mx-auto',
              wrapper: 'mx-auto',
            }"
          >
            <FormKit type="step" name="Step One">
              <FormKit
                type="text"
                label="Event Title"
                validation="required"
                placeholder="Write your event title here..."
                v-model="eventObject.title"
              />
              <FormKit
                type="textarea"
                label="Event Description"
                validation="required"
                placeholder="Write your event description here..."
                v-model="eventObject.description"
              />
              <FormKit
                type="select"
                label="Event Is Limited?"
                placeholder="Select..."
                :options="[
                  { label: 'True', value: true },
                  { label: 'False', value: false },
                ]"
                validation="required"
                v-model="eventObject.isLimited"
              />
              <FormKit
                type="number"
                label="Attendees Limit"
                help="How many people can attend this event?"
                value="1"
                step="1"
                min="1"
                v-model="eventObject.participiantLimit"
              />
            </FormKit>

            <FormKit type="step" name="Step Two">
              <FormKit
                type="file"
                label="Event Files"
                accept=".png,.jpg,.jpeg"
                multiple="true"
                validation="required"
                v-on:change="onFileChange"
              />
              <FormKit
                type="select"
                label="Event Location Is Online?"
                placeholder="Select..."
                :options="[
                  { label: 'True', value: true },
                  { label: 'False', value: false },
                ]"
                validation="required"
                v-model="eventObject.isLocationOnline"
              />
              <FormKit
                type="text"
                label="Location"
                validation="required"
                v-model="eventObject.location"
              />
              <FormKit
                type="select"
                label="Event Is Visible?"
                placeholder="Select..."
                :options="[
                  { label: 'True', value: true },
                  { label: 'False', value: false },
                ]"
                validation="required"
                v-model="eventObject.isVisible"
              />
            </FormKit>

            <FormKit type="step" name="Step Three">
              <FormKit
                type="datetime-local"
                value="2020-03-13T18:22"
                label="Event start date"
                validation="required|date_after"
                validation-visibility="live"
                v-model="eventObject.startDate"
              />
              <FormKit
                type="datetime-local"
                value="2020-03-13T18:22"
                label="Event end date"
                validation="required|date_after"
                validation-visibility="live"
                v-model="eventObject.endDate"
              />
              <FormKit
                type="select"
                label="Event Is Paid?"
                placeholder="Select..."
                :options="[
                  { label: 'True', value: true },
                  { label: 'False', value: false },
                ]"
                validation="required"
                v-model="eventObject.isPaid"
              />
              <FormKit
                v-if="eventObject.isPaid"
                type="text"
                label="Price"
                validation="required"
                v-model="eventObject.price"
              />
            </FormKit>
          </FormKit>

          <FormKit
            type="submit"
            :label="
              loading
                ? 'Loading'
                : statusCode !== 200
                ? 'Create Event'
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
import { reactive, ref, onBeforeUnmount } from "vue";
import type ICreateEventModel from "../../models/create_event_model";
import router from "@/router";
import { useEventStore } from "@/store/event";
import { storeToRefs } from "pinia";

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

onBeforeUnmount(() => {
  eventStore.$patch({
    statusCode: 0,
  });
});
</script>

<style scoped></style>
