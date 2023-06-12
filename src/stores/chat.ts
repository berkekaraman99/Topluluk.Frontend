import type { IMessage } from "@/models/message_mode";
import { instance } from "./network_manager";
import { defineStore } from "pinia";

export const useChatStore = defineStore("chatStore", {
  state: () => ({
    chat: [] as Array<IMessage>,
  }),
  getters: {
    _chat: (state: any) => state.chat as Array<IMessage>,
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
  },
});
