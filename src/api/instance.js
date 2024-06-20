import axios from "axios";
import { Endpoints } from "./endpoints";
import { store } from "../store";
import { getAccessToken, logoutUser } from "../store/auth/actionCreators";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const urlsSkipAuth = [
  Endpoints.AUTH.LOGIN,
  Endpoints.AUTH.REGISTER,
  Endpoints.AUTH.REFRESH,
  Endpoints.AUTH.LOGOUT,
];

// STORE: {
//   PUBLIC: {
//     SEARCH: "/api/v1/public/search",
//     MAIN: "/api/v1/public/store",
//     LANDING: "/api/v1/public/landing",
//   },
//   STUDENT: {
//     SEARCH: "/api/v1/student/search",
//     MAIN: "/api/v1/student/store",
//   },
//   COMMON: {
//     PROJECT_INFO: "/api/v1/project/",
//     USER_INFO: "/api/v1/user/"
//   }

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config;
  }

  // const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTgyNzM0ODgsImVtYWlsIjoibWlzaGEtc3R1ZGVudEBtYWlsLnJ1IiwiYXV0aG9yaXRpZXMiOiJST0xFX1NUVURFTlQiLCJpZCI6Mn0.G6OVQzAuAlOQjtd2Wme84_mLLwhw2kwlMhj2rOE492A"
  //await store.dispatch(getAccessToken())
  // const accessToken = store.getState().auth.authData.accessToken
  const accessToken = await store.dispatch(getAccessToken());

  console.log("accessToken", accessToken);

  if (accessToken) {
    const autharization = `Bearer ${accessToken}`;

    config.headers = {
      ...config.headers,
      authorization: autharization,
    };
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoggedIn = !!store.getState().auth.authData.accessToken;
    console.log("error", isLoggedIn, error);

    if (
      error.response?.status === 401 //||
      // error.response?.status === 404
    ) {
      if (error.request.url !== Endpoints.AUTH.LOGOUT) {
        store.dispatch(logoutUser());
      }
    }

    throw error;
  }
);
