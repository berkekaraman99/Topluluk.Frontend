import { defineStore } from "pinia";
import { instance } from "@/store/network_manager";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    currentEvent: {},
    eventComments: [],
    eventAttendees: [],
    userEvents: [],
    statusCode: 0 as number,
  }),
  getters: {
    _currentEvent: (state: any) => state.currentEvent,
    _eventComments: (state: any) => state.eventComments,
    _userEvents: (state: any) => state.userEvents,
    _statusCode: (state: any) => state.statusCode,
    _eventAttendees: (state: any) => state.eventAttendees,
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
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async leaveEvent(eventId: string) {
      try {
        const res = await instance.post(`/Event/leave/${eventId}`, {});
        console.log(res.data);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async createEvent(data: FormData) {
      try {
        const res = await instance.post("/event/create", data);
        console.log(res.data);
        this.statusCode = res.data.statusCode;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    async deleteEvent(eventId: string) {
      try {
        const res = await instance.post(`/event/delete?id=${eventId}`, {});
        console.log(res.data);
        this.statusCode = res.data.statusCode;
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
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
});
