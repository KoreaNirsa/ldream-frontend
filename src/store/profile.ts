import { create } from 'zustand';
import { Profile, UserSubscription } from '../types';

interface ProfileStore {
  // Profile data
  profile: Profile;
  partnerProfile: Profile;
  userSubscription: UserSubscription;
  
  // Profile actions
  setProfile: (profile: Profile) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  setPartnerProfile: (profile: Profile) => void;
  updatePartnerProfile: (updates: Partial<Profile>) => void;
  setUserSubscription: (subscription: UserSubscription) => void;
  updateUserSubscription: (updates: Partial<UserSubscription>) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  // Initial Profile data
  profile: {
    name: "지민",
    nickname: "지미니",
    birthDate: "1995-03-15",
    firstMeetingDate: "2023-11-15",
    interests: ["🎨 예술·전시", "☕ 카페"],
    timePreference: "🌙 저녁",
    budget: "3만원",
    transport: "🚈 대중교통",
    mood: ["💕 로맨틱"],
    dietary: [],
    relationshipStatus: "❤️ 연인과",
    locations: ["서울 전체", "강남구", "홍대"],
    mbti: "INFP",
    preferredDays: ["토요일", "일요일", "금요일"],
    mileage: 2450,
    autoUseMileage: true,
  },
  partnerProfile: {
    name: "민수",
    nickname: "민수니",
    birthDate: "1993-07-22",
    interests: ["🎶 음악", "🏞️ 여행", "📷 사진"],
    timePreference: "☀️ 낮",
    budget: "5만원 이상",
    transport: "🚗 자차",
    mood: ["🎉 액티브"],
    dietary: ["🍖 고기 선호"],
    relationshipStatus: "❤️ 연인과",
    locations: ["서울 전체", "부산"],
    relationshipType: "커플",
    mbti: "ENFJ",
    preferredDays: ["토요일", "일요일"],
    mileage: 1890,
  },
  userSubscription: {
    plan: "premium",
    aiUsageToday: 7,
    aiLimitDaily: 40,
    storageUsed: 45,
    storageLimit: 3000,
    renewalDate: "2024-03-15",
    paymentHistory: [
      {
        date: "2024-02-15",
        amount: 9900,
        plan: "Premium",
        status: "완료",
        mileageUsed: 2000,
        finalAmount: 7900,
      },
      {
        date: "2024-01-15",
        amount: 9900,
        plan: "Premium",
        status: "완료",
        mileageUsed: 1500,
        finalAmount: 8400,
      },
    ],
    cards: [
      { id: 1, name: "신한카드", number: "**** **** **** 1234", isDefault: true },
      { id: 2, name: "국민카드", number: "**** **** **** 5678", isDefault: false },
      { id: 3, name: "카카오뱅크", number: "**** **** **** 9012", isDefault: false },
    ],
  },
  
  // Profile actions
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) => set((state) => ({ 
    profile: { ...state.profile, ...updates } 
  })),
  setPartnerProfile: (profile) => set({ partnerProfile: profile }),
  updatePartnerProfile: (updates) => set((state) => ({ 
    partnerProfile: { ...state.partnerProfile, ...updates } 
  })),
  setUserSubscription: (subscription) => set({ userSubscription: subscription }),
  updateUserSubscription: (updates) => set((state) => ({ 
    userSubscription: { ...state.userSubscription, ...updates } 
  })),
}));
