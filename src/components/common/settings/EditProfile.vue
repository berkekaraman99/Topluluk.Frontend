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
        <FormKit type="text" label="Adınız" v-model="userObject.firstName" />
        <FormKit type="text" label="Soyadınız" v-model="userObject.lastName" />
        <FormKit
          type="text"
          label="Kullanıcı Adı"
          v-model="userObject.userName"
        />
        <FormKit
          type="textarea"
          label="Bio"
          rows="3"
          v-model="userObject.bio"
        />
        <FormKit
          type="email"
          label="E-mail adresi"
          validation="required|email|ends_with:.com"
          placeholder="example@mail.com"
          v-model="userObject.email"
        />
        <FormKit
          type="date"
          label="Doğum Tarihi"
          :validation="`required|date_before:${new Date()}`"
          v-model="userObject.birthdayDate"
        />

        <FormKit
          type="select"
          label="Cinsiyet"
          placeholder="Select a gender"
          :options="[
            { label: 'Kadın', value: '1' },
            { label: 'Erkek', value: '2' },
            { label: 'Diğer', value: '3' },
          ]"
          validation="required"
          v-model="userObject.gender"
        />

        <FormKit
          type="text"
          label="Başlık"
          v-model="userObject.title"
          placeholder="Title"
        />

        <FormKit
          type="submit"
          :label="
            loading
              ? 'Kaydediliyor'
              : statusCode !== 200
              ? 'Değişiklikleri Kaydet'
              : 'Başarılı'
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
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import type { UpdateProfileModel } from "../../../models/update_profile_model";

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const userStore = useUserStore();
const { _statusCode: statusCode } = storeToRefs(userStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  console.log(`${day}-${month}-${year}`);

  return `${year}-${month}-${day}`;
};

const userObject = reactive({
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  userName: user.value.userName,
  bio: user.value.bio,
  email: user.value.email,
  birthdayDate: formatDate(user.value.birthdayDate!),
  gender: user.value.gender,
  title: user.value.title,
});

const updateProfile = async () => {
  const updateProfileModel: UpdateProfileModel = {
    firstName: userObject.firstName,
    lastName: userObject.lastName,
    userName: userObject.userName,
    bio: userObject.bio!,
    email: userObject.email,
    birthdayDate: Date.parse(userObject.birthdayDate!),
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
