import type { IAuthUser } from "@/models/auth_user_model";
import type { ILogInModel } from "../models/login_model";
import type { ISignUpModel } from "../models/signup_model";
import { instance, auth_instance } from "./network_manager";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as IAuthUser | null,
    userIsAuthorized: false as boolean,
    statusCode: 0 as number,
  }),
  getters: {
    _user: (state: any) => state.user,
    _userIsAuthorized: (state: any) => state.userIsAuthorized,
    _statusCode: (state: any) => state.statusCode,
  },

  actions: {
    // LOGIN
    async login(logInObject: ILogInModel) {
      try {
        const res = await auth_instance.post(
          "/Authentication/SignIn",
          logInObject
        );
        this.statusCode = res.data.statusCode;
        if (res.data.isSuccess) {
          const accessToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;

          localStorage.setItem("userToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          instance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

          const getUserAfterLogin = await instance.get(
            "/User/GetUserAfterLogin",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const activeUser = getUserAfterLogin.data.data;
          this.user = activeUser;
          localStorage.setItem("user", JSON.stringify(activeUser));
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
        const res = await auth_instance.post(
          "/Authentication/SignUp",
          signUpObject
        );
        if (res) {
          const accessToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;

          localStorage.setItem("userToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          instance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

          const getUserAfterLogin = await instance.get(
            "/User/GetUserAfterLogin",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const activeUser = getUserAfterLogin.data.data;
          this.statusCode = res.data.statusCode;
          this.user = activeUser;
          localStorage.setItem("user", JSON.stringify(activeUser));
        }
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //LOGOUT
    async logout() {
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        await instance
          .post("/authentication/signout", { refreshToken: refreshToken })
          .then(async () => {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            location.reload();
          });
      } catch (error: any) {
        console.log(error.data);
      }
    },

    //REFRESH TOKEN
    async refreshUserToken() {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await auth_instance.post("/Authentication/RefreshToken", {
        refreshToken,
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
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("user");

      if (user != null) {
        this.user = JSON.parse(user);
      } else if (token != null) {
        const getUserAfterLogin = await instance.get("/User/GetUserAfterLogin");
        this.user = getUserAfterLogin.data.data;
      }
      // console.log(this.user);
    },

    async getUserAfterLogin() {
      const res = await instance.get("/User/GetUserAfterLogin");
      console.log(res.data);
      this.user = res.data.data;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(this.user));
      this.loadUser();
    },

    async resetPasswordRequest(mail: string) {
      try {
        const res = await auth_instance.post(
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
        const res = await auth_instance.post(
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
        const res = await auth_instance.post("/authentication/check-otp", {
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
});
