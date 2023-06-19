import type { IMessage } from "@/models/message_mode";
import { instance } from "./network_manager";
import { defineStore } from "pinia";
import type { IRecentChat } from "@/models/recent_chat_model";

export const useChatStore = defineStore("chatStore", {
  state: () => ({
    chat: [] as Array<IMessage>,
    recentChats: [] as Array<IRecentChat>,
  }),
  getters: {
    _chat: (state: any) => state.chat as Array<IMessage>,
    _recentChats: (state: any) => state.recentChats as Array<IRecentChat>,
  },
  actions: {
    //GET CHAT HISTORY
    async getMessageHistory(targetId: string) {
      try {
        const res = await instance.get(
          `http://localhost:7070/chat/history/${targetId}?skip=0&take=10`
        );
        console.log(res.data.data);
        this.chat = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //GET RECENT CHATS
    async getRecentChats() {
      try {
        const res = await instance.get(
          "http://localhost:7070/chat/recent-chats"
        );
        console.log(res.data.data);
        this.recentChats = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    //CREATE GROUP
    async createGroup(chatName: string) {
      try {
        const res = await instance.post(
          "http://localhost:7070/chat/create-group",
          { name: chatName }
        );
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
});
