import type { IAuthUser } from "@/models/auth_user_model";
import type { ILogInModel } from "../models/login_model";
import type { ISignUpModel } from "../models/signup_model";
import { instance } from "./network_manager";
import { defineStore } from "pinia";
import SecureLS from "secure-ls";
import router from "@/router";

const ls = new SecureLS({ isCompression: false });

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as IAuthUser | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
    userIsAuthorized: false as boolean,
    statusCode: 0 as number,
  }),
  getters: {
    _user: (state: any) => state.user as IAuthUser,
    _accessToken: (state: any) => state.accessToken as string | null,
    _refreshToken: (state: any) => state.refreshToken as string | null,
    _userIsAuthorized: (state: any) => state.userIsAuthorized as boolean,
    _statusCode: (state: any) => state.statusCode as number,
  },

  actions: {
    // LOGIN
    async login(logInObject: ILogInModel) {
      try {
        const res = await instance.post("/Authentication/SignIn", logInObject);
        this.statusCode = res.data.statusCode;
        console.log(res.data);

        if (res.data.isSuccess) {
          this.accessToken = res.data.data.accessToken;
          this.refreshToken = res.data.data.refreshToken;

          instance.defaults.headers[
            "Authorization"
          ] = `Bearer ${this.accessToken}`;
          this.userIsAuthorized = true;

          const getUserAfterLogin = await instance.get(
            "/User/GetUserAfterLogin"
          );
          this.user = getUserAfterLogin.data.data;
          console.log(this.user);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    },

    // SIGNUP
    async signup(signUpObject: ISignUpModel) {
      try {
        this.statusCode = 0;
        const res = await instance.post("/Authentication/SignUp", signUpObject);
        if (res) {
          this.accessToken = res.data.data.accessToken;
          this.refreshToken = res.data.data.refreshToken;

          instance.defaults.headers[
            "Authorization"
          ] = `Bearer ${this.accessToken}`;
          this.userIsAuthorized = true;

          const getUserAfterLogin = await instance.get(
            "/User/GetUserAfterLogin"
          );

          this.statusCode = res.data.statusCode;
          this.user = getUserAfterLogin.data.data;
          setTimeout(() => {
            this.statusCode = 0;
          }, 3000);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //LOGOUT
    async logout() {
      try {
        await instance
          .post("/authentication/signout", { refreshToken: this.refreshToken })
          .then(() => {
            instance.defaults.headers["Authorization"] = null;
            this.user = null;
            ls.remove("authStore");
            useAuthStore().$reset();
            router.push({ name: "login" });
            // location.reload();
          });
      } catch (error: any) {
        console.log(error.data);
      }
    },

    //REFRESH TOKEN
    async refreshUserToken() {
      const res = await instance.post("/Authentication/RefreshToken", {
        refreshToken: this.refreshToken,
      });

      console.log(res);
    },

    //CHANGE PASSWORD
    async changePassword(passwords: Object) {
      const res = await instance.post(
        "/authentication/change-password",
        passwords
      );
      this.statusCode = res.data.statusCode;
      console.log(res.data);
    },

    //LOAD USER
    async loadUser() {
      if (this.user != null) {
        // this.user = JSON.parse(user);
      } else if (this.accessToken != null) {
        const getUserAfterLogin = await instance.get("/User/GetUserAfterLogin");
        this.user = getUserAfterLogin.data.data;
      }
      this.userIsAuthorized = true;
      // console.log(this.user);
    },

    async getUserAfterLogin() {
      const res = await instance.get("/User/GetUserAfterLogin");
      console.log(res.data);
      this.user = res.data.data;
      // localStorage.removeItem("user");
      // localStorage.setItem("user", JSON.stringify(this.user));
      this.loadUser();
    },

    async resetPasswordRequest(mail: string) {
      try {
        const res = await instance.post(
          "/authentication/reset-password-request",
          { mail }
        );
        console.log(res.data);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async resetPassword(credentials: Object) {
      try {
        const res = await instance.post(
          "/authentication/reset-password",
          credentials
        );
        console.log(res.data);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async checkOTPCode(mail: string, code: string) {
      try {
        const res = await instance.post("/authentication/check-otp", {
          mail,
          code,
        });
        console.log(res.data);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
  persist: {
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
    },
  },
});
