import type { IFeedPost } from "@/models/feed_post_model";
import { instance } from "./network_manager";
import { defineStore } from "pinia";
import type { IPostModel } from "@/models/post_model";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    feed: [] as Array<IFeedPost>,
    userPosts: [] as Array<IFeedPost>,
    savedPosts: [] as Array<IFeedPost>,
    post: {} as IPostModel,
    postComments: [],
    statusCode: 0 as number,
  }),
  getters: {
    _feed: (state: any) => state.feed,
    _userPosts: (state: any) => state.userPosts,
    _savedPosts: (state: any) => state.savedPosts,
    _post: (state: any) => state.post,
    _postComments: (state: any) => state.postComments,
    _statusCode: (state: any) => state.statusCode,
  },
  actions: {
    async getPostFeed(skip: string) {
      try {
        const res = await instance.get(`/Post/feed?take=10&skip=${skip}`);
        console.log(res.data.data);
        res.data.data.forEach((element: IFeedPost) => this.feed.push(element));
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async getUserPosts(userId: string) {
      try {
        const res = await instance.get(`/Post/User/${userId}?skip=0&take=10`);
        console.log(res.data.data);
        this.userPosts = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async savePost(id: string) {
      const res = await instance.post(`/post/save/${id}`, {});
      console.log(res.data);
    },

    async getSavedPosts() {
      try {
        const res = await instance.get("/post/saved-posts");
        console.log(res.data);
        this.savedPosts = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async getPostById(id: string) {
      try {
        const res = await instance.get(`/Post/GetPost?id=${id}`);
        console.log(res.data);
        this.post = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async getPostComments(id: string) {
      try {
        const res = await instance.get(`/post/comments?id=${id}`);
        console.log(res.data.data);
        this.postComments = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async createPost(postObject: object) {
      try {
        const res = await instance.post("/post/create", postObject);
        console.log(res);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.data);
      }
    },

    async deletePost({ postId, userId }: any) {
      try {
        const res = await instance.post("/post/delete", { postId });
        // await context.dispatch("getUserPosts");
        await usePostStore().getUserPosts(userId);
        console.log(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    },

    async createComment(message: object) {
      try {
        const res = await instance.post("/Post/Comment", message);
        console.log(res.data);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async deleteComment({ commentId, postId }: any) {
      try {
        const res = await instance.post(`/post/comment/delete/${commentId}`);
        console.log(res.data);
        await usePostStore().getPostComments(postId);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async interactionPost({ interactionType, targetId }: any) {
      try {
        const res = await instance.post(`/post/interaction/${targetId}`, {
          interactionType,
        });
        console.log(res.data);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.data);
      }
    },

    async removeInteractionPost(targetId: string) {
      try {
        const res = await instance.post(`/post/remove-interaction/${targetId}`);
        console.log(res.data);
      } catch (error: any) {
        console.log(error.data);
      }
    },
    resetPostAndComments(state: any) {
      state.post = {};
      state.postComments = [];
    },
  },
});
