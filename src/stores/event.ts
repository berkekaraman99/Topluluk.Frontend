import { defineStore } from "pinia";
import { instance } from "../utils/network_manager";
import type { IEventModel } from "@/models/event_model";
import type { IEventPreview } from "@/models/event_preview_model";
import type { IEventAttend } from "@/models/event_attend_model";
import type { IEventComment } from "@/models/event_comment_model";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    currentEvent: {} as IEventModel,
    eventComments: [] as Array<IEventComment>,
    eventAttendees: [] as Array<IEventAttend>,
    userEvents: [] as Array<IEventPreview>,
    statusCode: 0 as number,
  }),
  getters: {
    _currentEvent: (state: any) => state.currentEvent as IEventModel,
    _eventComments: (state: any) => state.eventComments as Array<IEventComment>,
    _userEvents: (state: any) => state.userEvents as Array<IEventPreview>,
    _statusCode: (state: any) => state.statusCode as number,
    _eventAttendees: (state: any) =>
      state.eventAttendees as Array<IEventPreview>,
  },
  actions: {
    async getEventById(eventId: string) {
      try {
        const res = await instance.get(`/event/${eventId}`);
        console.log(res.data.data);
        this.currentEvent = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async getUserEvents(userId: string) {
      try {
        const res = await instance.get(`/event/user/${userId}`);
        console.log(res.data);
        this.userEvents = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async getEventComments(eventId: string) {
      try {
        const res = await instance.get(`/event/comments/${eventId}`);
        console.log(res.data);
        this.eventComments = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async getEventAttendees(eventId: string) {
      try {
        const res = await instance.get(`/event/${eventId}/attendees`);
        console.log(res.data);
        this.eventAttendees = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async joinEvent(eventId: string) {
      try {
        const res = await instance.post(`/Event/join/${eventId}`, {});
        console.log(res.data);
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async leaveEvent(eventId: string) {
      try {
        const res = await instance.post(`/Event/leave/${eventId}`, {});
        console.log(res.data);
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async createEvent(data: FormData) {
      try {
        const res = await instance.post("/event/create", data);
        console.log(res.data);
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async deleteEvent(eventId: string) {
      try {
        const res = await instance.post(`/event/delete?id=${eventId}`, {});
        console.log(res.data);
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async deleteEventCompletely(eventId: string) {
      try {
        const res = await instance.post(
          `/event/delete-completely?id=${eventId}`,
          {}
        );
        console.log(res.data);
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async eventExpire(eventId: string) {
      try {
        const res = await instance.post(`/event/expire?id=${eventId}`, {});
        console.log(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async deleteComment(commentId: string, eventId: string) {
      try {
        const res = await instance.post(
          `/event/comment/delete/${commentId}`,
          {}
        );
        console.log(res.data);
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
        await useEventStore().getEventComments(eventId);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async createComment(comment: object) {
      try {
        const res = await instance.post(`/event/create-comment`, comment);
        console.log(res.data);
        this.statusCode = res.data.statusCode;
        setTimeout(() => {
          this.statusCode = 0;
        }, 3000);
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
});
