import { create } from 'zustand';
import { AuthState, AuthModalState } from '../types';

interface AuthStore extends AuthState, AuthModalState {
  // Auth actions
  login: (username: string, password: string) => boolean;
  loginWithToken: (user: string, token: string, expiresIn?: number) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
  setTokenExpiry: (expiresIn: number) => void;
  isTokenExpired: () => boolean;
  refreshToken: () => Promise<boolean>;
  
  // Auth Modal Actions
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
  setShowEmailSignupModal: (show: boolean) => void;
  setLoginUsername: (username: string) => void;
  setLoginPassword: (password: string) => void;
  setLoginError: (error: string) => void;
  setSignupEmail: (email: string) => void;
  setSignupPassword: (password: string) => void;
  setSignupConfirmPassword: (password: string) => void;
  setSignupNickname: (nickname: string) => void;
  setSignupError: (error: string) => void;
  setGuestChatCount: (count: number) => void;
  setShowVerificationCode: (show: boolean) => void;
  setVerificationCode: (code: string) => void;
  setIsEmailVerified: (verified: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial Auth State
  isLoggedIn: false,
  currentUser: null,
  accessToken: null,
  tokenExpiresAt: null,
  
  // Initial Auth Modal States
  showLoginModal: false,
  showSignupModal: false,
  showEmailSignupModal: false,
  loginUsername: "",
  loginPassword: "",
  loginError: "",
  signupEmail: "",
  signupPassword: "",
  signupConfirmPassword: "",
  signupNickname: "",
  signupError: "",
  guestChatCount: 0,
  showVerificationCode: false,
  verificationCode: "",
  isEmailVerified: false,
  
  // Auth actions
  login: (username, password) => {
    if (username === 'user' && password === 'qwer1234!') {
      set({ isLoggedIn: true, currentUser: username });
      return true;
    }
    // 회원가입한 계정으로도 로그인 가능하도록 추가
    if (username && password && password.length >= 6) {
      set({ isLoggedIn: true, currentUser: username });
      return true;
    }
    return false;
  },
  
  loginWithToken: (user, token, expiresIn) => {
    const expiresAt = expiresIn ? Date.now() + expiresIn : null;
    set({ isLoggedIn: true, currentUser: user, accessToken: token, tokenExpiresAt: expiresAt });
  },
  
  logout: () => set({ isLoggedIn: false, currentUser: null, accessToken: null, tokenExpiresAt: null }),
  
  setAccessToken: (token) => set({ accessToken: token }),
  
  setTokenExpiry: (expiresIn) => {
    const expiresAt = Date.now() + expiresIn;
    set({ tokenExpiresAt: expiresAt });
  },
  
  isTokenExpired: () => {
    const { tokenExpiresAt } = get();
    if (!tokenExpiresAt) return true;
    return Date.now() >= tokenExpiresAt;
  },
  
  refreshToken: async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/reissue', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      if (data.accessToken) {
        const expiresAt = data.expiresIn ? Date.now() + data.expiresIn : null;
        set({ 
          accessToken: data.accessToken, 
          tokenExpiresAt: expiresAt 
        });
        
        // localStorage에도 저장
        localStorage.setItem('accessToken', data.accessToken);
        if (expiresAt) {
          localStorage.setItem('tokenExpiresAt', expiresAt.toString());
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      // 토큰 갱신 실패 시 로그아웃
      get().logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpiresAt');
      return false;
    }
  },
  
  // Auth Modal Actions
  setShowLoginModal: (show: boolean) => set({ showLoginModal: show }),
  setShowSignupModal: (show: boolean) => set({ showSignupModal: show }),
  setShowEmailSignupModal: (show: boolean) => set({ showEmailSignupModal: show }),
  setLoginUsername: (username: string) => set({ loginUsername: username }),
  setLoginPassword: (password: string) => set({ loginPassword: password }),
  setLoginError: (error: string) => set({ loginError: error }),
  setSignupEmail: (email: string) => set({ signupEmail: email }),
  setSignupPassword: (password: string) => set({ signupPassword: password }),
  setSignupConfirmPassword: (password: string) => set({ signupConfirmPassword: password }),
  setSignupNickname: (nickname: string) => set({ signupNickname: nickname }),
  setSignupError: (error: string) => set({ signupError: error }),
  setGuestChatCount: (count: number) => set({ guestChatCount: count }),
  setShowVerificationCode: (show: boolean) => set({ showVerificationCode: show }),
  setVerificationCode: (code: string) => set({ verificationCode: code }),
  setIsEmailVerified: (verified: boolean) => set({ isEmailVerified: verified }),
}));
