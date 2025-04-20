import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

/**
 * API 데이터 변경(Mutation)을 위한 커스텀 훅 (POST, PUT, DELETE, PATCH 등)
 * @param {import('@tanstack/react-query').UseMutationOptions} [mutationOptions={}] - TanStack Query의 useMutation 옵션
 * @returns {import('@tanstack/react-query').UseMutationResult} - TanStack Query의 useMutation 결과 객체
 */
const useMutateApi = (mutationOptions = {}) => {
  const mutationFn = async ({ url, method = "post", data, config = {} }) => {
    try {
      const response = await axiosInstance({
        url,
        method,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      console.error("API Mutation error:", error);
      throw error;
    }
  };

  return useMutation({
    mutationFn,
    ...mutationOptions,
  });
};

export default useMutateApi;
