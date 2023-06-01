<template>
  <div class="collapse" id="collapseEditProfile">
    <div class="card card-body">
      <FormKit
        type="form"
        @submit="updateProfile"
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
          type="text"
          label="First Name"
          v-model="userObject.firstName"
        />
        <FormKit type="text" label="Last Name" v-model="userObject.lastName" />
        <FormKit type="text" label="Username" v-model="userObject.userName" />
        <FormKit
          type="textarea"
          label="Bio"
          rows="3"
          v-model="userObject.bio"
        />
        <FormKit
          type="email"
          label="Email address"
          validation="required|email|ends_with:.com"
          placeholder="example@mail.com"
          v-model="userObject.email"
        />
        <FormKit
          type="date"
          label="Birthday"
          validation="required|date_before:2023-05-03"
          v-model="userObject.birthdayDate"
        />
        <FormKit
          type="select"
          label="Gender"
          placeholder="Select a gender"
          :options="[
            { label: 'Woman', value: '1' },
            { label: 'Man', value: '2' },
            { label: 'Other', value: '3' },
          ]"
          validation="required"
          v-model="userObject.gender"
        />

        <FormKit
          type="text"
          label="Title"
          v-model="userObject.title"
          placeholder="Title"
        />

        <FormKit
          type="submit"
          :label="
            loading
              ? 'Loading'
              : statusCode !== 200
              ? 'Apply Changes'
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
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import moment from "moment";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import type UpdateProfileModel from "../../../models/UpdateProfileModel";

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const userStore = useUserStore();
const { _statusCode: statusCode } = storeToRefs(userStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const formatTime = async (date: Date) => {
  const formattedTime = moment(date).format("YYYY-MM-DD").toString();
  console.log(formattedTime);
  return formattedTime;
};

console.log(user.value.birthdayDate);

const userObject = reactive({
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  userName: user.value.userName,
  bio: user.value.bio,
  email: user.value.email,
  birthdayDate: formatTime(user.value.birthdayDate),
  gender: user.value.gender,
  title: user.value.title,
});

const updateProfile = async () => {
  const updateProfileModel: UpdateProfileModel = {
    firstName: userObject.firstName,
    lastName: userObject.lastName,
    userName: userObject.userName,
    bio: userObject.bio,
    email: userObject.email,
    birthdayDate: userObject.birthdayDate,
    gender: Number(userObject.gender),
    title: userObject.title,
  };
  changeLoadingState();
  await userStore.updateProfile(updateProfileModel).then(() => {
    changeLoadingState();
    setTimeout(() => {
      userStore.$patch({
        statusCode: 0,
      });
    }, 2000);
  });
};
</script>

<style scoped></style>
