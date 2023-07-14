import { defineStore } from "pinia";

export const useLocaleStore = defineStore("localeStore", {
  state: () => ({
    locale: "tr",
  }),
  getters: {
    _locale: (state: any) => state.locale,
  },
  actions: {
    async updateLocale(locale: string) {
      this.locale = locale;
    },
  },
});
