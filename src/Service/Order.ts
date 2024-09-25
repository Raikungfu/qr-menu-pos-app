import AxiosApi from "@/configs/axios";
import { errorData, FormDataOrOther } from "@/constants/constant";
import { AxiosError } from "axios";

export const API_GET_ORDER = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>(`/api/order`, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_GET_STATUS_ORDER_LIST_COUNT = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/order/count`)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_GET_ORDER_DETAIL = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>(`/api/order/getOrderItems`, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};
