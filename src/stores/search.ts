import { defineStore } from "pinia";
import { instance } from "./network_manager";
import type { ISearchItem } from "@/models/search_item_model";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    searchItemList: [] as Array<ISearchItem>,
  }),
  getters: {
    _searchItemList: (state: any) => state.searchItemList as Array<ISearchItem>,
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
