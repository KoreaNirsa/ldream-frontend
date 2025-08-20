// Profile related types
export interface Profile {
  name: string;
  nickname: string;
  birthDate: string;
  firstMeetingDate?: string;
  interests: string[];
  timePreference: string;
  budget: string;
  transport: string;
  mood: string[];
  dietary: string[];
  relationshipStatus: string;
  locations: string[];
  mbti: string;
  preferredDays: string[];
  mileage: number;
  autoUseMileage?: boolean;
  relationshipType?: string;
}

export interface MemberProfile {
  myNickname?: string;
  partnerNickname?: string | null;
  mileage?: number;
  tier?: string;
  memoryCount?: number;
  aiRecommendation?: number;
  email?: string;
  name?: string;
  nickname?: string;
  brith_date?: string; // API 필드명 그대로 사용 (서버 스펙 오타 가능성 반영)
  birth_date?: string; // 백엔드 표기 차이 대비
  gender?: string;
  [key: string]: any;
}
