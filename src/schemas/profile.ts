import { z } from 'zod';

// Profile edit form validation schema
export const profileEditSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').regex(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다'),
  nickname: z.string().min(1, '별명을 입력해주세요').regex(/^[a-zA-Z0-9가-힣]+$/, '별명은 영어, 한글, 숫자만 입력 가능합니다'),
  birthDate: z.string().min(1, '생년월일을 선택해주세요'),
  interests: z.array(z.string()).min(1, '관심사를 하나 이상 선택해주세요'),
  timePreference: z.string().min(1, '시간 선호도를 선택해주세요'),
  budget: z.string().min(1, '예산을 선택해주세요'),
  transport: z.string().min(1, '교통수단을 선택해주세요'),
  mood: z.array(z.string()).min(1, '분위기를 하나 이상 선택해주세요'),
  dietary: z.array(z.string()).optional(),
  relationshipStatus: z.string().min(1, '관계 상태를 선택해주세요'),
  locations: z.array(z.string()).min(1, '선호 지역을 하나 이상 선택해주세요'),
  mbti: z.string().optional(),
  preferredDays: z.array(z.string()).min(1, '선호 요일을 하나 이상 선택해주세요'),
  autoUseMileage: z.boolean().optional()
});

// Partner connection form validation schema
export const partnerConnectionSchema = z.object({
  searchId: z.string().min(1, '검색할 ID를 입력해주세요'),
  relationshipType: z.string().min(1, '관계 유형을 선택해주세요'),
  message: z.string().max(200, '메시지는 200자 이하로 입력해주세요').optional()
});

// Type exports for form data
export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
export type PartnerConnectionFormData = z.infer<typeof partnerConnectionSchema>;
