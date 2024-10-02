import AxiosApi from "@/configs/axios";
import { errorData, FormDataOrOther } from "@/constants/constant";
import { AxiosError } from "axios";

export const API_GET_MENU_BY_SHOPID = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>(`/api/menu/product-coffeeshop`, data)
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

export const API_GET_CATEGORIES_BY_SHOPID = <T>(): Promise<T> => {
  return AxiosApi.get<T>(`/api/categories`)
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

export const API_GET_MENU_ITEM_CUSTOMIZE_OPTION = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>(`/api/menu/customize-option`, data)
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
