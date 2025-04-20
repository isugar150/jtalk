import axios from "axios";

const getBaseApiUrl = () => {
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.origin}/api`;
  }

  console.warn(
    "브라우저 환경이 아니거나 window.location을 사용할 수 없어 기본 API URL을 사용합니다.",
  );
  return "http://localhost:3000/api";
};

const dynamicBaseURL = getBaseApiUrl();

const axiosInstance = axios.create({
  baseURL: dynamicBaseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
