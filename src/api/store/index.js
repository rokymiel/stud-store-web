import { axiosInstance } from "../instance";
import { Endpoints } from "../endpoints";

export const searchService = (query) =>
  axiosInstance.get(Endpoints.STORE.PUBLIC.SEARCH, {
    params: {
      query: query,
    },
  });

  export const mainStoreService = () =>
    axiosInstance.get(Endpoints.STORE.PUBLIC.MAIN);

  export const landingService = () =>
    axiosInstance.get(Endpoints.STORE.PUBLIC.LANDING);

  export const projectInfoService = (id) =>
    axiosInstance.get(Endpoints.STORE.COMMON.PROJECT_INFO + id);

  export const userInfoService = (id) =>
    axiosInstance.get(Endpoints.STORE.COMMON.USER_INFO + id);