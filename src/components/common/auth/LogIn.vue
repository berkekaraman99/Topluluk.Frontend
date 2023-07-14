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
    class="container-fluid d-flex align-items-center justify-content-center overflow-auto min-vh-100"
  >
    <div class="row w-100 h-100 align-items-center mx-3">
      <div class="col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
        <p class="fw-bold text-center fs-2 py-4">{{ t("login.header") }}</p>

        <FormKit
          type="form"
          @submit="handleLogin"
          :actions="false"
          :config="{
            classes: {
              outer: 'mx-auto',
              wrapper: 'mx-auto w-100',
              messages: 'text-center',
              input: 'w-100',
            },
          }"
        >
          <FormKit
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
            prefix-icon="avatarMan"
            validation="required|length:6"
            v-model="userObject.userName"
            :wrapper-class="{
              'formkit-wrapper': false,
            }"
            :classes="{
              inner: 'rounded-1',
              prefixIcon: 'rounded-1',
            }"
          />
          <FormKit
            type="password"
            name="password"
            placeholder="Şifre"
            validation="required|length:6"
            minlength="6"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            @suffix-icon-click="handleIconClick"
            v-model="userObject.password"
            :wrapper-class="{
              'formkit-wrapper': false,
            }"
            :classes="{
              inner: 'rounded-1',
              prefixIcon: 'rounded-1',
            }"
          />
          <div class="d-flex justify-content-between align-items-center my-3">
            <FormKit
              type="checkbox"
              :label="t('login.rememberme')"
              name="terms"
              :value="false"
              :outer-class="{
                'mx-auto': false,
                'd-flex': true,
                'align-items-center': true,
                'm-0': true,
              }"
              :classes="{ decorator: 'rounded-1' }"
              @click="toggleRememberMe"
            />
            <RouterLink
              :to="{ name: 'forgetpassword' }"
              class="text-decoration-none"
            >
              <span>{{ t("login.forgotpassword") }}</span>
            </RouterLink>
          </div>
          <FormKit
            type="submit"
            :label="loading ? t('login.loginprogress') : t('login.login')"
            :classes="{ input: 'w-100 rounded-5' }"
            :disabled="loading || statusCode === 200"
            :wrapper-class="{
              'formkit-wrapper': false,
              'mx-auto text-center': true,
            }"
          />
        </FormKit>

        <!-- PUSH SIGN UP -->
        <div class="text-center mt-4">
          <p>
            {{ t("login.donthaveaccount") }}
            <RouterLink :to="{ name: 'signup' }" class="text-decoration-none">{{
              t("login.signup")
            }}</RouterLink>
          </p>
        </div>

        <div class="d-flex justify-content-center align-items-center my-4">
          <span class="text-secondary">{{ t("login.or") }}</span>
        </div>

        <!-- ALTERNATIVE LOGINS -->
        <div class="alternative-logins my-4">
          <div
            class="btn btn-light d-block shadow-sm mt-3 rounded-5 hover:tw-bg-slate-50"
            @click="login"
          >
            <img
              src="@/assets/images/logos/ic_google.png"
              height="16"
              width="16"
              alt="Google"
              class="me-2"
            />
            <span class="fw-bold">{{ t("login.google") }}</span>
          </div>
          <div class="btn btn-dark d-block shadow-sm mt-3 rounded-5">
            <i class="fa-brands fa-apple fa-lg me-2"></i>
            <span class="fw-bold">{{ t("login.apple") }}</span>
          </div>
          <!-- <div class="d-flex align-items-center justify-content-center my-3">
            <GoogleLogin :callback="callback" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ILogInModel } from "@/models/login_model";
import ToastSuccess from "@/components/shared/ToastSuccess.vue";
import ToastDanger from "@/components/shared/ToastDanger.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";
import {
  type GoogleLogin,
  type CallbackTypes,
  googleTokenLogin,
  googleSdkLoaded,
} from "vue3-google-login";
// import { decodeCredential } from "vue3-google-login";

const { t } = useI18n();

// const callback: CallbackTypes.CredentialCallback = (response) => {
//   const userData = decodeCredential(response.credential);
//   console.log("Handle the response", response);
//   console.log("Handle the userData", userData);
// };

const callback: CallbackTypes.TokenResponseCallback = (response) => {
  console.log("Handle the response", response.access_token);
};

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const error = ref(null);
const authStore = useAuthStore();
// const { _user: user } = storeToRefs(authStore);
const router = useRouter();
const { _statusCode: statusCode } = storeToRefs(authStore);

const login = () => {
  googleTokenLogin().then(async (response) => {
    console.log("Handle the response", response);
    authStore.$patch({
      accessToken: response.access_token,
    });
    await authStore.getUserAfterLogin();
  });
};

// const login = () => {
//   googleSdkLoaded((google) => {
//     google.accounts.oauth2
//       .initCodeClient({
//         client_id:
//           "986753015425-6atqct07o1o8a7epeg0qgn2tbmqtv5rl.apps.googleusercontent.com",
//         scope: "email profile openid",
//         callback: async (response) => {
//           console.log("Handle the response", response);
//         },
//       })
//       .requestCode();
//   });
// };

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

<style scoped lang="scss">
div .row {
  max-width: 600px;
  min-width: 300px;
}

input[type="password"] {
  &:hover {
    box-shadow: inset none !important;
  }
  &:focus {
    box-shadow: inset none !important;
  }
}
</style>
