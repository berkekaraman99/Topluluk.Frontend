<template>
  <div
    class="container min-vh-100 d-flex justify-content-center overflow-auto h-100"
  >
    <div class="row w-100 align-items-center my-5 mx-5">
      <div class="col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
        <h1 class="text-center">Forgot Your Password?</h1>
        <FormKit type="form" :actions="false">
          <FormKit
            type="multi-step"
            tab-style="progress"
            :hide-progress-labels="false"
            :allow-incomplete="true"
            :classes="{
              outer: 'mx-auto',
              wrapper: 'mx-auto',
            }"
          >
            <FormKit type="step" name="Enter email">
              <FormKit
                type="email"
                label="Email"
                placeholder="Enter you mail here..."
                validation="required|email"
                v-model="mail"
              />
            </FormKit>

            <FormKit type="step" name="Code sending method">
              <FormKit
                type="radio"
                label="Choose where to send the code"
                :options="[
                  { label: 'Email', value: 'email' },
                  { label: 'SMS', value: 'sms' },
                ]"
                v-model="codeSendStyle"
              />
              <template #stepNext="{ handlers, node }">
                <FormKit
                  type="button"
                  @click="
                    resetPasswordRequest().then(() => {
                      if (statusCode === 200) {
                        handlers.incrementStep(1, node.context)();
                        authStore.$patch({
                          statusCode: 0,
                        });
                      }
                    })
                  "
                  label="Send"
                  data-next="true"
                />
              </template>
            </FormKit>
            <FormKit type="step" name="Enter code">
              <h5 class="formkit-label">Enter your code here</h5>
              <div class="d-flex justify-content-center">
                <input
                  type="number"
                  min="0"
                  max="9"
                  maxlength="1"
                  placeholder=" "
                  id="n1"
                  oninput="this.nextElementSibling.focus()"
                  v-model="codes[0]"
                />
                <input
                  type="number"
                  min="0"
                  max="9"
                  maxlength="1"
                  placeholder=" "
                  oninput="this.nextElementSibling.focus()"
                  id="n2"
                  v-model="codes[1]"
                />
                <input
                  type="number"
                  min="0"
                  max="9"
                  maxlength="1"
                  placeholder=" "
                  oninput="this.nextElementSibling.focus()"
                  id="n3"
                  v-model="codes[2]"
                />
                <input
                  type="number"
                  min="0"
                  max="9"
                  maxlength="1"
                  placeholder=" "
                  oninput="this.nextElementSibling.focus()"
                  id="n4"
                  v-model="codes[3]"
                />
                <input
                  type="number"
                  min="0"
                  max="9"
                  maxlength="1"
                  placeholder=" "
                  oninput="this.nextElementSibling.focus()"
                  id="n5"
                  v-model="codes[4]"
                />
                <input
                  type="number"
                  min="0"
                  max="9"
                  maxlength="1"
                  placeholder=" "
                  v-on:input="setCode()"
                  id="n6"
                  v-model="codes[5]"
                />
              </div>
              <template #stepNext="{ handlers, node }">
                <FormKit
                  type="button"
                  @click="
                    checkCode(mail, code).then(() => {
                      if (statusCode === 200) {
                        handlers.incrementStep(1, node.context)();
                        authStore.$patch({
                          statusCode: 0,
                        });
                      }
                    })
                  "
                  label="Check"
                  data-next="true"
                />
              </template>
            </FormKit>
            <FormKit type="step" name="Enter new password">
              <h2>Create a new password</h2>
              <FormKit
                type="password"
                name="newpassword"
                validation="required|length:6|contains_lowercase|contains_uppercase|contains_numeric"
                validation-visibility="live"
                label="Password"
                v-model="passwords.newPassword"
              />
              <FormKit
                type="password"
                name="newpassword_confirm"
                validation="required|confirm"
                label="Confirm Password"
                validation-visibility="live"
                v-model="passwords.confirmNewPassword"
              />
              <template #stepNext="{}">
                <FormKit
                  type="button"
                  @click="
                    resetPassword(
                      mail,
                      code,
                      passwords.newPassword,
                      passwords.confirmNewPassword
                    ).then(() => {
                      if (statusCode === 200) {
                        authStore.$patch({
                          statusCode: 0,
                        });
                        router.push({ name: 'login' });
                      }
                    })
                  "
                  label="Reset Password"
                />
              </template>
            </FormKit>
          </FormKit>
        </FormKit>
      </div>
    </div>
    <div
      id="back"
      class="pointer position-fixed top-0 start-0"
      @click="router.back()"
    >
      <i class="fa-solid fa-angle-left"></i>
      <span class="ps-2">Go Back</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const { _statusCode: statusCode } = storeToRefs(authStore);

const mail = ref("");
const sms = ref("");
const codeSendStyle = ref("email");
const codes: Array<String> = ["", "", "", "", "", ""];
const code = ref("");

const passwords = reactive({
  newPassword: "",
  confirmNewPassword: "",
});

const setCode = () => {
  removeCode();
  codes.forEach((element) => {
    code.value += element;
  });
  console.log(code.value);
};

const removeCode = () => {
  code.value = "";
};

const resetPasswordRequest = async () => {
  if (codeSendStyle.value === "email") {
    await authStore.resetPasswordRequest(mail.value);
    console.log(mail.value);
  } else if (codeSendStyle.value === "sms") {
    await authStore.resetPasswordRequest(sms.value);
  }
};

const checkCode = async (mail: string, code: string) => {
  await authStore.checkOTPCode(mail, code);
};

const resetPassword = async (
  Mail: string,
  Code: string,
  newPassword: string,
  newPasswordAgain: string
) => {
  await authStore.resetPassword({
    Mail,
    Code,
    newPassword,
    newPasswordAgain,
  });
};
</script>

<style scoped lang="scss">
input[type="number"] {
  height: 64px;
  width: 48px;
  appearance: textfield;
  -moz-appearance: textfield;
  text-align: center;
  margin: 24px 8px;
  border-radius: 10px;
  transition: 0.3s;
  box-sizing: border-box;
  border: 2px solid rgb(216, 216, 216);
  outline: none;
  font-size: 1.5rem;

  &:not(:placeholder-shown) {
    border-color: palevioletred;
  }
  &:focus {
    transition: 0.3s;
    border-color: orange;
  }
  &:active {
    border-color: rebeccapurple;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

#back {
  background-color: rgba(237, 237, 237, 0.85);
  height: 40px;
  width: 160px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  margin-top: 12px;
  margin-left: 12px;

  &:hover {
    box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.463);
    border: 1px solid rgb(143, 143, 143);
    background-color: rgba(255, 255, 255, 1);
  }

  &:active {
    transition: 0.3s;
    border: 1px solid rgb(90, 90, 90);
    background-color: rgba(215, 215, 215, 0.337);
  }
}
</style>
