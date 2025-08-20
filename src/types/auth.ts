// Authentication related types
export interface AuthState {
  isLoggedIn: boolean;
  currentUser: string | null;
  accessToken: string | null;
  tokenExpiresAt: number | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export interface AuthModalState {
  showLoginModal: boolean;
  showSignupModal: boolean;
  showEmailSignupModal: boolean;
  loginUsername: string;
  loginPassword: string;
  loginError: string;
  signupEmail: string;
  signupPassword: string;
  signupConfirmPassword: string;
  signupNickname: string;
  signupError: string;
  guestChatCount: number;
  showVerificationCode: boolean;
  verificationCode: string;
  isEmailVerified: boolean;
}

export interface JwtPayload {
  sub?: string | number;
  exp?: number;
  iat?: number;
  [key: string]: any;
}
