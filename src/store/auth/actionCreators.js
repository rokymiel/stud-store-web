import api from "../../api";
import { loginSucess, logoutSuccess } from "./authReducer";
import { history } from '../../utils/history'
import { store } from "..";

import { isTokenExpired } from "../../utils/jwt.js";

export const logoutUser =
  () =>
  async (dispatch) => {
      try {
        await api.auth.logout()

        dispatch(logoutSuccess())

        // history.push('/')
        // window.location.replace("http://localhost:3000/");
      } catch (e) {
          console.error('ego', e)
      }
  }

// переменная для хранения запроса токена (для избежания race condition)
let refreshTokenRequest = null;

export const getAccessToken = () => async (dispatch) => {
  try {
    const accessToken = store.getState().auth.authData.accessToken;
    console.log("getAccessToken", accessToken)

    if (!accessToken || isTokenExpired(accessToken)) {
      if (refreshTokenRequest === null) {
        refreshTokenRequest = api.auth.refreshToken();
      }

      const res = await refreshTokenRequest;
      refreshTokenRequest = null;

      dispatch(loginSucess(res.data.accessToken));

      return res.data.accessToken;
    }

    return accessToken;
  } catch (e) {
    console.error(e);

    return null;
  }
};
