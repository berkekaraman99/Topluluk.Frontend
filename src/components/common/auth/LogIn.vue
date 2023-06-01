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
    class="container-fluid d-flex align-items-center justify-content-center overflow-auto h-100"
  >
    <div class="row w-100 align-items-center mx-3">
      <div class="col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
        <p class="fw-bold text-center fs-2 py-4">Welcome Back!</p>

        <FormKit
          type="form"
          @submit="handleLogin"
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
            name="username"
            placeholder="Your username"
            prefix-icon="avatarMan"
            validation="required"
            v-model="userObject.userName"
          />
          <FormKit
            type="password"
            name="password"
            placeholder="Password"
            validation="required"
            minlength="6"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            @suffix-icon-click="handleIconClick"
            v-model="userObject.password"
          />
          <div class="d-flex justify-content-between align-items-center my-3">
            <FormKit
              type="checkbox"
              label="Remember Me?"
              name="terms"
              :value="false"
              :outer-class="{
                'mx-auto': false,
                'd-flex': true,
                'align-items-center': true,
                'm-0': true,
              }"
              @click="toggleRememberMe"
            />
            <RouterLink
              :to="{ name: 'forgetpassword' }"
              class="text-decoration-none"
            >
              <span>Forgot Password?</span>
            </RouterLink>
          </div>
          <FormKit
            type="submit"
            :label="loading ? 'Loading' : 'Login'"
            wrapper-class="mx-auto text-center"
            :classes="{ input: 'w-100' }"
            :disabled="loading || statusCode === 200"
          />
        </FormKit>

        <!-- PUSH SIGN UP -->
        <div class="text-end mt-4">
          <p>
            Don't have an account?
            <RouterLink :to="{ name: 'signup' }" class="text-decoration-none"
              >Sign Up</RouterLink
            >
          </p>
        </div>

        <div class="d-flex justify-content-center align-items-center my-4">
          <span class="text-secondary">or</span>
        </div>

        <!-- ALTERNATIVE LOGINS -->
        <div class="alternative-logins my-4">
          <div class="btn btn-white d-block shadow-sm mt-3">
            <img
              src="@/assets/images/logos/ic_google.png"
              height="16"
              width="16"
              alt="Google"
              class="me-2"
            />
            <span class="fw-bold">Login with Google</span>
          </div>
          <div class="btn btn-dark d-block shadow-sm mt-3">
            <i class="fa-brands fa-apple fa-lg me-2"></i>
            <span class="fw-bold">Login with Apple</span>
          </div>
        </div>

        <div
          v-if="user"
          id="back"
          class="btn mt-2 text-black d-inline-block position-fixed top-0 start-0 ms-2 mt-1"
          @click="router.push({ name: 'home' })"
        >
          <i class="fa-solid fa-angle-left"></i>
          <span class="ps-2">Back</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type ILogInModel from "@/models/login-model";
import ToastSuccess from "@/components/shared/ToastSuccess.vue";
import ToastDanger from "@/components/shared/ToastDanger.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const error = ref(null);
const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const router = useRouter();
const { _statusCode: statusCode } = storeToRefs(authStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const isRemembered = ref(false);
const toggleRememberMe = () => {
  isRemembered.value = !isRemembered.value;
};

const showToast = ref(false);
const header = ref("");
const content = ref("");
const handleToast = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};

let rememberedUser = { userName: "", password: "" };
rememberedUser = JSON.parse(localStorage.getItem("rememberMe") || "{}");

const userObject = reactive({
  userName: "",
  password: "",
});

userObject.userName = rememberedUser.userName;
userObject.password = rememberedUser.password;

const handleLogin = async () => {
  if (userObject.userName.length >= 6 && userObject.password.length >= 6) {
    const loginObject: ILogInModel = {
      userName: userObject.userName,
      password: userObject.password,
      provider: 0,
    };
    changeLoadingState();
    try {
      authStore
        .login(loginObject)
        .then(changeLoadingState)
        .then(() => {
          console.log(statusCode.value);
          if (statusCode.value === 10401) {
            header.value = "Giriş Başarısız";
            content.value = "Kullanıcı adı veya şifre hatalı.";
            handleToast();
          } else if (statusCode.value === 200) {
            if (
              isRemembered.value ||
              localStorage.getItem("rememberMe") == null
            ) {
              localStorage.setItem("rememberMe", JSON.stringify(loginObject));
            }
            header.value = "Giriş Başarılı";
            content.value = "Ana sayfaya yönlendiriliyorsunuz.";
            handleToast();
            setTimeout(() => {
              router.push({ name: "home" });
            }, 2500);
          }
        });
    } catch (err: any) {
      error.value = err.message;
      changeLoadingState();
    }
  }
};
</script>

<style scoped>
div .row {
  max-width: 600px;
  min-width: 300px;
}
</style>
