import type { ICommunity } from "@/models/community_model";
import { instance } from "./network_manager";
import { defineStore } from "pinia";
import type { ICommunityPreview } from "@/models/community_preview_model";

export const useCommunityStore = defineStore("communityStore", {
  state: () => ({
    community: {} as ICommunity,
    communityList: [] as Array<ICommunityPreview>,
    userCommunities: [] as Array<ICommunityPreview>,
    participiants: [],
    statusCode: 0 as number,
  }),

  getters: {
    _community: (state: any) => state.community,
    _communityList: (state: any) => state.communityList,
    _userCommunities: (state: any) => state.userCommunities,
    _participiants: (state: any) => state.participiants,
    _statusCode: (state: any) => state.statusCode,
  },

  actions: {
    // GET ALL COMMUNITIES
    async getCommunities() {
      const res = await instance.get("/Community/communities?skip=0&take=3");
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
    },

    //GET USER COMMUNITIES
    async getUserCommunities(id: string) {
      try {
        const res = await instance.get(`/Community/user/${id}`);
        console.log(res.data.data);

        this.userCommunities = res.data.data;
      } catch (error: any) {
        console.log(error.response.data);
      }
    },

    //JOIN COMMUNITY
    async joinCommunity(communityId: string) {
      try {
        const res = await instance.post("/community/join", { communityId });
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
          `/community/Participiants/${communityId}`
        );
        console.log(res.data);
        this.participiants = res.data.data;
      } catch (error: any) {
        console.log(error.data);
      }
    },
    setParticipiants(state: any, payload: any) {
      state.participiants = payload;
    },
  },
});
