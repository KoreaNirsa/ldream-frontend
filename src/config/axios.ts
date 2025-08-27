import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { RelationRequest, RelationRequestResponse } from '@/types/relation';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청에 토큰 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    
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
      
      const { refreshToken, accessToken } = useAuthStore.getState();
      
      // 토큰이 있는 경우에만 재발급 시도
      if (accessToken) {
        try {
          const success = await refreshToken();
          
          if (success) {
            // 새로운 토큰으로 원래 요청 재시도
            const { accessToken: newToken } = useAuthStore.getState();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosInstance(originalRequest);
            }
          }
        } catch (refreshError) {
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

// 관계 요청 API 함수
export const requestRelation = async (targetEmail: string, relationType: string): Promise<RelationRequestResponse> => {
  try {
    const requestData: RelationRequest = {
      targetEmail,
      relationType
    };
    
    const response = await axiosInstance.post<RelationRequestResponse>('/api/member/relation/request', requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 관계 요청 상태 조회 API 함수
export const getRelationStatus = async (): Promise<RelationStatus> => {
  try {
    const response = await axiosInstance.get<RelationStatus>('/api/member/relation/status');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 관계 요청 취소 API 함수
export const cancelRelationRequest = async (relationId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/member/relation/request/${relationId}`);
  } catch (error) {
    throw error;
  }
};
