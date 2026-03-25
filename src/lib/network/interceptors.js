import axios from "axios";
import { incrementLoading, decrementLoading } from "./loading";

const instance = axios.create();

instance.interceptors.request.use(
  function (config) {
    incrementLoading();
    return config;
  },
  function (error) {
    decrementLoading();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    decrementLoading();
    return response;
  },
  function (error) {
    decrementLoading();
    return Promise.reject(error);
  }
);

export default instance;
