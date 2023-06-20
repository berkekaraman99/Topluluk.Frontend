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
    class="container-fluid d-flex align-items-center justify-content-center overflow-auto vh-100"
  >
    <div class="row w-100 align-items-center mx-3">
      <div class="col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
        <p class="fw-bold text-center fs-2 py-4">Topluluk'a Giriş Yap</p>

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
            validation="required"
            v-model="userObject.userName"
            :wrapper-class="{
              'formkit-wrapper': false,
            }"
          />
          <FormKit
            type="password"
            name="password"
            placeholder="Şifre"
            validation="required"
            minlength="6"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            @suffix-icon-click="handleIconClick"
            v-model="userObject.password"
            :wrapper-class="{
              'formkit-wrapper': false,
            }"
          />
          <div class="d-flex justify-content-between align-items-center my-3">
            <FormKit
              type="checkbox"
              label="Beni Hatırla"
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
              <span>Şifremi Unuttum?</span>
            </RouterLink>
          </div>
          <FormKit
            type="submit"
            :label="loading ? 'Yükleniyor' : 'Giriş Yap'"
            :classes="{ input: 'w-100' }"
            :disabled="loading || statusCode === 200"
            :wrapper-class="{
              'formkit-wrapper': false,
              'mx-auto text-center': true,
            }"
          />
        </FormKit>

        <!-- PUSH SIGN UP -->
        <div class="text-end mt-4">
          <p>
            Hesabınız yok mu?
            <RouterLink :to="{ name: 'signup' }" class="text-decoration-none"
              >Hemen kaydolun</RouterLink
            >
          </p>
        </div>

        <div class="d-flex justify-content-center align-items-center my-4">
          <span class="text-secondary">veya</span>
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
            <span class="fw-bold">Google ile giriş yap</span>
          </div>
          <div class="btn btn-dark d-block shadow-sm mt-3">
            <i class="fa-brands fa-apple fa-lg me-2"></i>
            <span class="fw-bold">Apple ile giriş yap</span>
          </div>
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
