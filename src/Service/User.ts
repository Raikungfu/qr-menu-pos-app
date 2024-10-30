import AxiosApi from "@/configs/axios";
import { errorData, FormDataOrOther } from "@/constants/constant";
import { AxiosError } from "axios";

export const API_CHECK_IS_LOGIN = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>(`/login-token`, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(
          (error.status ? "Status: " + error.status : "Status unknown") +
            (x.error || x.message || "Input not correct!")
        );
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_LOGOUT = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/Users/Logout`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(
          (error.status ? "Status: " + error.status : "Status unknown") +
            (x.error || x.message || "Input not correct!")
        );
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_LOGIN = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>("/Coffee-Shop/Login", data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(
          (error.status ? "Status: " + error.status : "Status unknown") +
            (x.error || x.message || "Input not correct!")
        );
      }
    })
    .catch((error) => {
      throw error;
    });
};
