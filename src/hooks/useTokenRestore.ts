import { useEffect } from 'react';
import { useAppStore } from '@/types/store';

export const useTokenRestore = () => {
  const { setAccessToken, refreshToken, logout, loginWithToken } = useAppStore();

  useEffect(() => {
    const restoreToken = async () => {
      const storedToken = localStorage.getItem('accessToken');
      const storedExpiresAt = localStorage.getItem('tokenExpiresAt');
      
      if (!storedToken) {
        return;
      }

      // 토큰 만료 시간 확인
      if (storedExpiresAt) {
        const expiresAt = parseInt(storedExpiresAt);
        const now = Date.now();
        
        // 토큰이 만료되었거나 5분 이내에 만료될 예정인 경우
        if (now >= expiresAt || (expiresAt - now) < 5 * 60 * 1000) {
          console.log('Token expired or expiring soon, attempting refresh...');
          
          try {
            const success = await refreshToken();
            if (!success) {
              // 토큰 갱신 실패 시 로컬 스토리지 정리
              localStorage.removeItem('accessToken');
              localStorage.removeItem('tokenExpiresAt');
              logout();
            }
          } catch (error) {
            console.error('Token refresh failed:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenExpiresAt');
            logout();
          }
          return;
        }
      }

      // 토큰이 유효한 경우 상태에 복원
      setAccessToken(storedToken);
      
      // 사용자 정보도 복원 (임시로 로컬 스토리지에서 가져오거나 기본값 사용)
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser && storedExpiresAt) {
        const expiresIn = parseInt(storedExpiresAt) - Date.now();
        loginWithToken(storedUser, storedToken, expiresIn);
      }
    };

    restoreToken();
  }, [setAccessToken, refreshToken, logout, loginWithToken]);
};
