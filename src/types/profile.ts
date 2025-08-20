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

// 새로운 API 응답 구조에 맞는 타입
export interface ProfileResponse {
  code: string;
  message: string;
  result: {
    name: string;
    nickname: string;
    birthDate: string;
    gender: string;
    mbti: string;
    interests: string[];
    preferredDays: string[];
    preferredRegion: string;
    preferredTime: string;
    preferredBudget: string;
    transportation: string[];
    dateMood: string[];
    relationshipStatus: string;
    foodTypes: string[];
  };
}

// 데이터베이스 스키마에 맞춘 상세 프로필 타입
export interface DetailedProfileResponse {
  // 기본 정보
  name: string;
  nickname: string;
  birthDate: string;
  gender: string;
  mbti: string;
  
  // 관심사 & 취미
  interests: string[];
  hobbies: string[];
  
  // 데이트 선호도
  preferredDays: string[]; // 선호하는 데이트 요일
  preferredLocations: string[]; // 선호하는 지역
  preferredTimeSlots: string[]; // 선호 시간대
  preferredBudget: string; // 선호하는 데이트 비용
  transportation: string; // 교통 수단
  
  // 데이트 분위기 & 상태
  dateMood: string[]; // 데이트 분위기
  relationshipStatus: string; // 현재 연애 상태
  
  // 음식 취향
  foodPreferences: string[]; // 음식 취향
}

// 데이터베이스 스키마에 맞춘 새로운 타입들
export interface MemberProfileData {
  member_profile_id: number;
  member_id: number;
  mbti: MBTI | null;
  preferred_region: string | null;
  preferred_time: PreferredTime | null;
  preferred_budget: PreferredBudget | null;
  relationship_status: RelationshipStatus | null;
  updated_at: string;
}

export interface ProfileInterestData {
  profile_interest_id: number;
  member_profile_id: number;
  category: InterestCategory;
}

export interface ProfileFoodData {
  profile_food_id: number;
  member_profile_id: number;
  food_type: FoodType;
}

export interface ProfileDaysData {
  profile_days_id: number;
  member_profile_id: number;
  preferred_days: PreferredDays;
}

export interface ProfileTransportationData {
  profile_transportation_id: number;
  member_profile_id: number;
  transportation: Transportation;
}

export interface ProfileDateMoodData {
  profile_date_mood_id: number;
  member_profile_id: number;
  date_mood: DateMood;
}

export interface MemberRelationData {
  relation_id: number;
  from_member_id: number;
  to_member_id: number;
  relation_type: RelationType | null;
  created_at: string;
  status: RelationStatus;
}

// 열거형 타입들
export type MBTI = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type PreferredTime = '아침' | '낮' | '저녁' | '밤';

export type PreferredBudget = '3만원 이하' | '3-5만원' | '5-10만원' | '10-20만원' | '20만원 이상';

export type RelationshipStatus = '커플' | '친구' | '가족';

export type InterestCategory = '카페' | '음악' | '사진' | '독서' | '게임' | '맛집' | '여행' | '영화' | '운동' | '예술' | '요리' | '캠핑';

export type FoodType = '한식' | '중식' | '일식' | '양식' | '분식' | '카페' | '디저트' | '술집' | '치킨' | '피자' | '햄버거' | '샌드위치';

export type PreferredDays = '월요일' | '화요일' | '수요일' | '목요일' | '금요일' | '토요일' | '일요일';

export type Transportation = '대중교통' | '자동차' | '도보' | '자전거' | '택시';

export type DateMood = '로맨틱' | '활발한' | '차분한' | '신나는' | '액티브' | '인스타 감성';

export type RelationType = '커플' | '친구' | '가족';

export type RelationStatus = 'ACTIVE' | 'ENDED';
