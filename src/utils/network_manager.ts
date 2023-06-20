import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const baseURL: string = "https://localhost:7149/api";
const timeOut: number = 120000;
const controller = new AbortController();

export const instance = axios.create({
  baseURL: baseURL,
  timeout: timeOut,
  signal: controller.signal,
});

export const abortRequest = () => {
  controller.abort();
};

instance.interceptors.request.use(function (config) {
  const authStore = useAuthStore();
  config.headers.Authorization = `Bearer ${authStore.$state.accessToken}`;
  return config;
});
