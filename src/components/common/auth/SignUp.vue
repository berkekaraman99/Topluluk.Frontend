<template>
  <ToastSuccess
    :show-toast="showToast"
    :status-code="statusCode"
    :header="header"
    :content="content"
  />
  <ToastDanger
    :show-toast="showToast"
    :status-code="statusCode"
    :header="header"
    :content="content"
  />
  <div
    class="container-fluid d-flex justify-content-center overflow-auto h-100"
  >
    <div class="row w-100 align-items-center mt-4">
      <div class="col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
        <p class="fw-bold text-center fs-2 py-4">Sign Up to Community</p>
        <FormKit
          type="form"
          submit-label="Create"
          @submit="handleSignUp"
          :actions="false"
        >
          <FormKit
            type="multi-step"
            tab-style="progress"
            :allow-incomplete="false"
            :hide-progress-labels="true"
            :classes="{
              outer: 'mx-auto',
              wrapper: 'mx-auto',
            }"
          >
            <!-- STEP ONE -->
            <FormKit type="step" name="Step One">
              <FormKit
                type="text"
                label="First Name"
                validation="required"
                v-model="userObject.firstName"
              />
              <FormKit
                type="text"
                label="Last Name"
                validation="required"
                v-model="userObject.lastName"
              />
              <FormKit
                type="email"
                label="Your Email"
                validation="required|email"
                prefix-icon="email"
                v-model="userObject.email"
              />
            </FormKit>
            <!-- STEP TWO -->
            <FormKit type="step" name="Step Two">
              <FormKit
                type="text"
                label="User Name"
                validation="required"
                v-model="userObject.userName"
                prefix-icon="avatarMan"
              />
              <FormKit
                type="password"
                label="Password"
                validation="required"
                v-model="userObject.password"
                prefix-icon="password"
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
            </FormKit>
          </FormKit>
          <FormKit
            type="checkbox"
            label="Terms and Conditions"
            help="Do you agree to our terms of service?"
            name="terms"
            :value="isAccepted"
            @click="handleCheckbox"
            validation="accepted"
            validation-visibility="dirty"
            wrapper-class="text-center"
          />
          <FormKit
            type="submit"
            label="Sign Up"
            :disabled="!isAccepted"
            wrapper-class="mx-auto text-center"
            :classes="{
              input: 'w-100',
            }"
          />
        </FormKit>

        <div class="d-flex justify-content-center align-items-center my-4">
          <span class="text-secondary">or</span>
        </div>

        <!-- ALTERNATIVE SIGNUPS -->
        <div class="alternative-signups my-4">
          <div class="btn btn-white d-block shadow-sm mt-3">
            <img
              src="@/assets/images/logos/ic_google.png"
              height="16"
              width="16"
              alt="Google"
              class="me-2"
            />
            <span class="fw-bold">Signup with Google</span>
          </div>
          <div class="btn btn-dark d-block shadow-sm mt-3">
            <i class="fa-brands fa-apple fa-lg me-2"></i>
            <span class="fw-bold">Signup with Apple</span>
          </div>
        </div>

        <div
          id="back"
          class="btn mt-2 text-black d-inline-block position-fixed top-0 start-0 ms-2 mt-1"
          @click="router.back()"
        >
          <i class="fa-solid fa-angle-left"></i>
          <span class="ps-2">Go Back</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type ISignUpModel from "@/models/signup-model";
import ToastSuccess from "@/components/shared/ToastSuccess.vue";
import ToastDanger from "@/components/shared/ToastDanger.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const isAccepted = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const { _statusCode: statusCode } = storeToRefs(authStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const showToast = ref(false);
const header = ref("");
const content = ref("");
const handleToast = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const userObject = reactive({
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  gender: 0,
});

const handleSignUp = async () => {
  if (userObject.userName.length >= 6 && userObject.password.length >= 6) {
    const signUpObject: ISignUpModel = {
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      userName: userObject.userName,
      email: userObject.email,
      password: userObject.password,
      gender: Number(userObject.gender),
    };
    changeLoadingState();
    try {
      await authStore
        .signup(signUpObject)
        .then(changeLoadingState)
        .then(() => {
          console.log(statusCode.value);
          if (statusCode.value === 10001) {
            header.value = "Kayıt Başarısız";
            content.value =
              "Kullanıcı adı kullanılmaktadır. Lütfen başka bir kullanıcı adı giriniz";
            handleToast();
          } else if (statusCode.value === 10002) {
            header.value = "Kayıt Başarısız";
            content.value =
              "Email adresi kullanılmaktadır. Lütfen başka bir email adresi giriniz";
            handleToast();
          } else if (statusCode.value === 200) {
            header.value = "Kayıt Başarılı";
            content.value =
              "Başarıyla kayıt oldunuz. Ana sayfaya yönlendiriliyorsunuz.";
            handleToast();
            setTimeout(() => {
              router.push({ name: "home" });
            }, 2500);
          }
        });
      console.log(userObject);
    } catch (err: any) {
      console.log(err.response.data);
      changeLoadingState();
    }
  }
};

const handleCheckbox = () => {
  isAccepted.value = !isAccepted.value;
};
</script>

<style scoped lang="scss">
div {
  transition: 0.4s;
}

div .row {
  min-width: 300px;
}

#password-icon,
#user-icon,
#mail-icon,
#gender-icon {
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#back {
  background-color: rgba(255, 255, 255, 0.85);
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
    box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.47);
    border: 1px solid rgb(143, 143, 143);
    background-color: rgba(255, 255, 255, 1);
  }

  &:active {
    transition: 0.3s;
    border: 1px solid rgb(90, 90, 90);
    background-color: rgba(215, 215, 215, 0.34);
  }
}
</style>
