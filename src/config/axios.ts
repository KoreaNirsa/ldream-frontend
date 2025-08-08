import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAppStore } from '@/types/store';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청에 토큰 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAppStore.getState();
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 만료 시 자동 재발급
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 401 Unauthorized 에러이고 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const { refreshToken, accessToken } = useAppStore.getState();
      
      // 토큰이 있는 경우에만 재발급 시도
      if (accessToken) {
        try {
          const success = await refreshToken();
          
          if (success) {
            // 새로운 토큰으로 원래 요청 재시도
            const { accessToken: newToken } = useAppStore.getState();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosInstance(originalRequest);
            }
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      
      // 토큰 갱신 실패 또는 토큰이 없는 경우 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
