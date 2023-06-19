import { instance } from "./network_manager";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import type { IUser } from "@/models/user_model";
import type { IUserSuggestions } from "@/models/user_suggestions_model";
import type { IUserFollowers } from "@/models/user_followers_model";
import type { IUserFollowings } from "@/models/user_followings_model";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    currentUser: {} as IUser,
    userFollowings: [] as Array<IUserFollowings>,
    searchedUserFollowings: [] as Array<IUserFollowings>,
    userFollowers: [] as Array<IUserFollowers>,
    userFollowersRequests: [] as Array<any>,
    userSuggestions: [] as Array<IUserSuggestions>,
    statusCode: 0 as number,
  }),
  getters: {
    _currentUser: (state: any) => state.currentUser as IUser,
    _userFollowings: (state: any) =>
      state.userFollowings as Array<IUserFollowings>,
    _searchedFollowings: (state: any) =>
      state.searchedUserFollowings as Array<IUserFollowings>,
    _userFollowers: (state: any) =>
      state.userFollowers as Array<IUserFollowers>,
    _userSuggestions: (state: any) =>
      state.userSuggestions as Array<IUserSuggestions>,
    _userFollowersRequests: (state: any) => state.userFollowersRequests,
    _statusCode: (state: any) => state.statusCode as number,
  },
  actions: {
    //FOLLOW
    async followUser(targetId: String) {
      const res = await instance.post("/User/follow", { targetId });
      console.log(res);
    },

    //UNFOLLOW
    async unfollowUser(targetId: string) {
      const res = await instance.post("/User/unfollow", { targetId });
      console.log(res);
    },

    //GET USER BY ID
    async getUserById(id: string) {
      const res = await instance.get(`/User/GetUserById?userid=${id}`);
      console.log(res.data);
      this.currentUser = res.data.data;
    },

    //GET USER BY NAME
    async getUserByName(name: string) {
      const res = await instance.get(`/User/${name}`);
      console.log(res.data);
      this.currentUser = res.data.data;
    },

    //GET USER SUGGESTIONS
    async getUserSuggestions() {
      const res = await instance.get("/User/suggestions?limit=3");
      console.log(res.data);
      this.userSuggestions = res.data.data;
    },

    //BLOCK USER
    async blockUser(targetId: FormData) {
      const res = await instance.post("/User/Block", targetId);
      console.log(res.data);
    },

    //DELETE USER
    async deleteUser(password: string) {
      try {
        const res = await instance.post("/User/Delete", { password });
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
        if (this.statusCode === 200) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userToken");
          localStorage.removeItem("user");
          location.reload();
        }
        console.log(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    },

    //CHANGE PRIVACY
    async changeUserPrivacy(info: any) {
      const res = await instance.post("/User/privacy-change", info);
      console.log(res.data);
    },

    //CHANGE USER PROFILE IMAGE
    async changeProfileImage(image: any) {
      const res = await instance.post("/User/ChangeProfileImage", image);
      console.log(res.data);
      this.statusCode = res.data.statusCode;
      setTimeout(() => {
        this.statusCode = 0;
      }, 3000);
      await useAuthStore().getUserAfterLogin();
    },

    //REMOVE PROFILE IMAGE
    async removeProfileImage() {
      try {
        const res = await instance.post("/user/remove-profile-image", {});
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    },

    //CHANGE USER BANNER IMAGE
    async changeBannerImage(image: FormData) {
      const res = await instance.post("/User/ChangeBannerImage", image);
      console.log(res.data);
      this.statusCode = res.data.statusCode;
      setTimeout(() => {
        this.statusCode = 0;
      }, 3000);
      await useAuthStore().getUserAfterLogin();
    },

    //REMOVE BANNER IMAGE
    async removeBannerImage() {
      try {
        const res = await instance.post("/user/remove-banner-image", {});
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    },

    //GET FOLLOWINGS
    async getUserFollowings(userId: string) {
      const res = await instance.get(
        `/user/followings?id=${userId}&skip=0&take=10`
      );
      console.log(res.data);
      this.userFollowings = res.data.data;
      this.searchedUserFollowings = res.data.data;
    },

    //GET FOLLOWERS
    async getUserFollowers(userId: string) {
      const res = await instance.get(
        `/user/followers?id=${userId}&skip=0&take=10`
      );
      console.log(res.data);

      this.userFollowers = res.data.data;
    },

    //GET FOLLOWERS REQUESTS
    async getFollowersRequests(userId: string) {
      const res = await instance.get(`/user/incoming-requests/${userId}`);
      console.log(res.data);
      this.userFollowersRequests = res.data.data;
    },

    //ACCEPT FOLLOW REQUEST
    async acceptFollowRequest(targetId: string) {
      const res = await instance.post(
        `/User/accept-follow-request/${targetId}`
      );
      this.statusCode = res.data.statusCode;
      setTimeout(() => {
        this.statusCode = 0;
      }, 3000);
      console.log(res.data);
    },

    //DECLINE FOLLOW REQUEST
    async declineFollowRequest(targetId: string) {
      const res = await instance.post(
        `/user/decline-follow-request/${targetId}`
      );
      this.statusCode = res.data.statusCode;
      setTimeout(() => {
        this.statusCode = 0;
      }, 3000);
      console.log(res.data);
    },

    //DECLINE FOLLOW REQUEST
    async removeFollowRequest(targetId: String) {
      const res = await instance.post(
        `/User/remove-follow-request/${targetId}`
      );
      console.log(res.data);
    },

    //REMOVE USER FROM FOLLOWERS
    async removeUserFromFollowers(targetId: string) {
      const res = await instance.post("/user/remove-follower", { targetId });
      console.log(res.data);
      this.userFollowers = this.userFollowers.filter((t: any) => {
        return t.id !== targetId;
      });
    },

    //SEARCH FOLLOWINGS
    async searchFollowings({ id, text }: any) {
      try {
        const res = await instance.get(
          `/user/search-in-followings?id=${id}&text=${text}&skip=0&take=10`
        );
        console.log(res.data);
        this.searchedUserFollowings = res.data.data;
      } catch (error: any) {
        console.log(error.data);
      }
    },

    //UPDATE PROFILE
    async updateProfile(updatedInformations: object) {
      const res = await instance.post(
        "/user/update-profile",
        updatedInformations
      );
      this.statusCode = res.data.statusCode;
      setTimeout(() => {
        this.statusCode = 0;
      }, 3000);
      console.log(res.data);
    },
  },
});
