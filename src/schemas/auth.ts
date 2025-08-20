import { z } from 'zod';

// 14세 이상 검증 함수
const isOver14YearsOld = (birthDate: string) => {
  if (!birthDate) return false;
  
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 14;
  }
  
  return age >= 14;
};

// 14세 이상 생년월일 계산 함수
export const getMaxBirthDate = () => {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
  return maxDate.toISOString().split('T')[0];
};

// Signup form validation schema
export const signupSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요').regex(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다'),
  nickname: z.string().min(1, '별명을 입력해주세요').regex(/^[a-zA-Z0-9가-힣]+$/, '별명은 영어, 한글, 숫자만 입력 가능합니다'),
  birthDate: z.string().min(1, '생년월일을 선택해주세요'),
  gender: z.string().min(1, '성별을 선택해주세요'),
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, '비밀번호는 특수문자, 대/소문자 영어, 숫자를 포함해야 합니다'),
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요')
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
}).refine((data) => isOver14YearsOld(data.birthDate), {
  message: "만 14세 이상만 가입 가능합니다",
  path: ["birthDate"],
});

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요')
});

// Profile setup form validation schema
export const profileSetupSchema = z.object({
  interests: z.array(z.string()).min(1, '관심사를 하나 이상 선택해주세요'),
  foodPreferences: z.array(z.string()).optional(),
  preferredDateTypes: z.array(z.string()).min(1, '선호하는 데이트 타입을 하나 이상 선택해주세요'),
  preferredDays: z.array(z.string()).min(1, '선호하는 요일을 하나 이상 선택해주세요'),
  mbti: z.string().optional(),
  budget: z.string().optional(),
  timePreference: z.string().optional(),
  transport: z.string().optional()
});

// Type exports for form data
export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;
