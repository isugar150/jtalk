import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

/**
 * API 호출을 위한 커스텀 훅 (주로 GET 요청용)
 * @param {string | string[]} queryKey - React Query의 캐시 키
 * @param {string} url - 요청할 API 엔드포인트 URL (baseURL 제외)
 * @param {import('axios').AxiosRequestConfig} [axiosConfig={}] - Axios 요청 설정
 * @param {import('@tanstack/react-query').UseQueryOptions} [queryOptions={}] - React Query 옵션
 * @returns {import('@tanstack/react-query').UseQueryResult} - React Query의 결과 객체
 */
const useApi = (queryKey, url, axiosConfig = {}, queryOptions = {}) => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance({
        url,
        method: "get",
        ...axiosConfig,
      });
      return response.data;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: fetchData,
    ...queryOptions,
  });
};

export default useApi;
