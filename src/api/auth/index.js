import { axiosInstance } from "../instance";
import { Endpoints } from "../endpoints";

export const loginService = (username, password) =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, {
    email: username,
    password: password,
  });

export const registerService = (
  email,
  password,
  firstName,
  lastName,
  fatherName,
  eduYear,
  eduProgram
) =>
  axiosInstance.post(Endpoints.AUTH.REGISTER, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    fatherName: fatherName,
    eduYear: eduYear,
    eduProgram: eduProgram,
  });

export const refreshToken = () => axiosInstance.get(Endpoints.AUTH.REFRESH);

export const logout = () => axiosInstance.post(Endpoints.AUTH.LOGOUT);
