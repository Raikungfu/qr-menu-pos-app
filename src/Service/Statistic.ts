import AxiosApi from "@/configs/axios";
import { errorData, FormDataOrOther } from "@/constants/constant";
import { AxiosError } from "axios";

export const API_GET_STATISTIC = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>(`/api/statistic`, data)
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
