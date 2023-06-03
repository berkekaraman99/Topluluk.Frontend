<template>
  <div class="collapse" id="collapsePassword">
    <div class="card card-body">
      <FormKit
        type="form"
        @submit="changePassword"
        :actions="false"
        :config="{
          classes: {
            outer: 'mx-auto',
            wrapper: 'mx-auto',
            messages: 'text-center',
            help: 'text-center',
          },
        }"
      >
        <FormKit
          type="password"
          name="old_password"
          label="Old Password"
          help="Enter your old password"
          validation="required"
          v-model="userInfo.oldPassword"
        />
        <FormKit
          type="password"
          name="password"
          label="New Password"
          help="Enter a new password"
          validation="required"
          v-model="userInfo.newPassword"
        />
        <FormKit
          type="submit"
          :label="
            loading
              ? 'Loading'
              : statusCode !== 200
              ? 'Change Password Now'
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
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import type { ChangePassword } from "@/models/change_password_model";

const authStore = useAuthStore();
const { _statusCode: statusCode } = storeToRefs(authStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const userInfo = reactive({
  oldPassword: "",
  newPassword: "",
});

const changePassword = async () => {
  console.log(userInfo);
  const model: ChangePassword = {
    oldPassword: userInfo.oldPassword,
    newPassword: userInfo.newPassword,
  };
  changeLoadingState();
  await authStore.changePassword(model).then(() => {
    changeLoadingState();
    setTimeout(() => {
      authStore.$patch({
        statusCode: 0,
      });
    }, 2000);
  });
};
</script>

<style scoped></style>
