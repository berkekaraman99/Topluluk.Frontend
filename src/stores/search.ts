import { defineStore } from "pinia";
import { instance } from "./network_manager";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    searchItemList: [],
  }),
  getters: {
    _searchItemList: (state: any) => state.searchItemList,
  },
  actions: {
    //SEARCH
    async loadSearchItems(text: string) {
      try {
        const res = await instance.get(`/User/Search?text=${text}`);
        console.log(res.data.data);
        this.searchItemList = res.data.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
});
