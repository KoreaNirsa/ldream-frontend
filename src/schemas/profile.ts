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

// 데이터베이스 스키마에 맞춘 새로운 검증 스키마들
export const memberProfileSchema = z.object({
  member_profile_id: z.number(),
  member_id: z.number(),
  mbti: z.enum(['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']).nullable(),
  preferred_region: z.string().max(50).nullable(),
  preferred_time: z.enum(['아침', '낮', '저녁', '밤']).nullable(),
  preferred_budget: z.enum(['3만원 이하', '3-5만원', '5-10만원', '10-20만원', '20만원 이상']).nullable(),
  relationship_status: z.enum(['커플', '친구', '가족']).nullable(),
  updated_at: z.string()
});

export const profileInterestSchema = z.object({
  profile_interest_id: z.number(),
  member_profile_id: z.number(),
  category: z.enum(['카페', '음악', '사진', '독서', '게임', '맛집', '여행', '영화', '운동', '예술', '요리', '캠핑'])
});

export const profileFoodSchema = z.object({
  profile_food_id: z.number(),
  member_profile_id: z.number(),
  food_type: z.enum(['한식', '중식', '일식', '양식', '분식', '카페', '디저트', '술집', '치킨', '피자', '햄버거', '샌드위치'])
});

export const profileDaysSchema = z.object({
  profile_days_id: z.number(),
  member_profile_id: z.number(),
  preferred_days: z.enum(['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'])
});

export const profileTransportationSchema = z.object({
  profile_transportation_id: z.number(),
  member_profile_id: z.number(),
  transportation: z.enum(['대중교통', '자동차', '도보', '자전거', '택시'])
});

export const profileDateMoodSchema = z.object({
  profile_date_mood_id: z.number(),
  member_profile_id: z.number(),
  date_mood: z.enum(['로맨틱', '활발한', '차분한', '신나는', '액티브', '인스타 감성'])
});

export const memberRelationSchema = z.object({
  relation_id: z.number(),
  from_member_id: z.number(),
  to_member_id: z.number(),
  relation_type: z.enum(['커플', '친구', '가족']).nullable(),
  created_at: z.string(),
  status: z.enum(['ACTIVE', 'ENDED'])
});

// Type exports for form data
export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
export type PartnerConnectionFormData = z.infer<typeof partnerConnectionSchema>;
export type MemberProfileFormData = z.infer<typeof memberProfileSchema>;
export type ProfileInterestFormData = z.infer<typeof profileInterestSchema>;
export type ProfileFoodFormData = z.infer<typeof profileFoodSchema>;
export type ProfileDaysFormData = z.infer<typeof profileDaysSchema>;
export type ProfileTransportationFormData = z.infer<typeof profileTransportationSchema>;
export type ProfileDateMoodFormData = z.infer<typeof profileDateMoodSchema>;
export type MemberRelationFormData = z.infer<typeof memberRelationSchema>;
