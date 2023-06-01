import axios from "axios";

const baseURL: string = "https://localhost:7149/api";
const timeOut: number = 120000;
const token: string | null = localStorage.getItem("userToken");
const controller = new AbortController();

export const instance = axios.create({
  baseURL: baseURL,
  timeout: timeOut,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  signal: controller.signal,
});

export const auth_instance = axios.create({
  baseURL: baseURL,
  timeout: timeOut,
  signal: controller.signal,
});

export const abortRequest = () => {
  controller.abort();
};

// axios.interceptors.request.use(function (config) {
//   config.headers.Authorization = "Bearer token123";
//   return config;
// });
