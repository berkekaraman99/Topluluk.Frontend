import type { ICommunity } from "@/models/community_model";
import { instance } from "./network_manager";
import { defineStore } from "pinia";
import type { ICommunityPreview } from "@/models/community_preview_model";
import type { ICommunityParticipiant } from "@/models/community_participiant_model";

export const useCommunityStore = defineStore("communityStore", {
  state: () => ({
    community: {} as ICommunity,
    communityList: [] as Array<ICommunityPreview>,
    userCommunities: [] as Array<ICommunityPreview>,
    participiants: [] as Array<ICommunityParticipiant>,
    searchedParticipiants: [] as Array<ICommunityParticipiant>,
    statusCode: 0 as number,
  }),

  getters: {
    _community: (state: any) => state.community as ICommunity,
    _communityList: (state: any) =>
      state.communityList as Array<ICommunityPreview>,
    _userCommunities: (state: any) =>
      state.userCommunities as Array<ICommunityPreview>,
    _participiants: (state: any) => state.participiants,
    _searchedParticipiants: (state: any) =>
      state.searchedParticipiants as Array<ICommunityParticipiant>,
    _statusCode: (state: any) => state.statusCode as number,
  },

  actions: {
    // GET ALL COMMUNITIES
    async getCommunities() {
      const res = await instance.get("/Community/communities?skip=0&take=8");
      console.log(res.data.data);
      this.communityList = res.data.data;
    },

    // GET COMMUNITY
    async getCommunity(id: any) {
      const res = await instance.get(`/Community/${id}`);
      console.log(res.data.data);
      this.community = res.data.data;
    },

    // CREATE COMMUNITY
    async createCommunity(communityObject: FormData) {
      const res = await instance.post("/community/create", communityObject);
      console.log(res);
      this.statusCode = res.data.statusCode;
      setTimeout(() => {
        this.statusCode = 0;
      }, 3000);
    },

    //GET USER COMMUNITIES
    async getUserCommunities(id: string) {
      try {
        const res = await instance.get(`/community/user-communities?id=${id}`);
        console.log(res.data.data);
        this.userCommunities = res.data.data;
      } catch (error: any) {
        console.log(error.response.data);
      }
    },

    //JOIN COMMUNITY
    async joinCommunity(communityId: string) {
      try {
        const res = await instance.post(`/community/${communityId}/join`, {});
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //LEAVE COMMUNITY
    async leaveCommunity(communityId: string) {
      try {
        const res = await instance.post(`/community/${communityId}/leave`, {});
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //DELETE COMMUNİTY
    async deleteCommunity(communityId: string) {
      try {
        const res = await instance.post(
          `/Community/Delete?id=${communityId}`,
          {}
        );
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //DELETE PERMANENTLY COMMUNİTY
    async deleteCommunityPermanently(communityId: string) {
      try {
        const res = await instance.post(
          `/Community/DeletePermanently/${communityId}`,
          {}
        );
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //ASSIGN USER AS ADMİN
    async assignUserAsAdmin(user: object) {
      try {
        const res = await instance.post("/Community/AssignUserAsAdmin", user);
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //ASSIGN USER AS MODERATOR
    async assignUserAsModerator(user: object) {
      try {
        const res = await instance.post(
          "/Community/AssignUserAsModerator",
          user
        );
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //COMMUNITY PARTICIPIANTS
    async getCommunityParticipiants(communityId: string) {
      try {
        const res = await instance.get(
          `/community/${communityId}/Participiants`
        );
        console.log(res.data);
        this.participiants = res.data.data;
        this.searchedParticipiants = res.data.data;
      } catch (error: any) {
        console.log(error.data);
      }
    },

    //SEARCH PARTICIPIANTS
    async searchParticipiants(communityId: string, text: string) {
      try {
        const res = await instance.get(
          `/community/${communityId}/Participiants/Search?q=${text}`
        );
        console.log(res.data);
        this.searchedParticipiants = res.data.data;
      } catch (error: any) {
        console.log(error.data);
      }
    },

    //UPDATE COMMUNITY COVER IMAGE
    async updateCoverImage(communityId: string, data: FormData) {
      try {
        const res = await instance.post(
          `/community/${communityId}/update-cover-image`,
          data
        );
        console.log(res.data);
        this.searchedParticipiants = res.data.data;
      } catch (error: any) {
        console.log(error);
      }
    },

    // REMOVE COMMUNITY COVER IMAGE
    async removeCoverImage(communityId: string) {
      try {
        const res = await instance.post(
          `/community/${communityId}/remove-cover-image`,
          {}
        );
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    },

    // UPDATE COMMUNITY BANNER IMAGE
    async updateBannerImage(communityId: string, data: FormData) {
      try {
        const res = await instance.post(
          `/community/${communityId}/update-banner-image`,
          data
        );
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    },

    //REMOVE COMMUNITY BANNER IMAGE
    async removeBannerImage(communityId: string) {
      try {
        const res = await instance.post(
          `/community/${communityId}/remove-banner-image`,
          {}
        );
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    },

    //KICK USER
    async kickUser(communityId: string, targetId: string) {
      try {
        const res = await instance.post(
          `/community/kick-user/${communityId}/${targetId}`,
          {}
        );
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
});
