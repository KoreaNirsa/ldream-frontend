import { create } from 'zustand';
import { Recommendation, RecommendationFormState, Profile } from '../types';

interface RecommendationStore extends RecommendationFormState {
  // Recommendation data
  recommendations: Recommendation[];
  useProfileBased: boolean;
  profile: Profile;
  partnerProfile: Profile;
  isPartnerConnected: boolean;
  currentTab: string;
  
  // Recommendation actions
  setRecommendations: (recommendations: Recommendation[]) => void;
  addRecommendation: (recommendation: Recommendation) => void;
  updateRecommendation: (id: number, updates: Partial<Recommendation>) => void;
  setShowRecommendationForm: (show: boolean) => void;
  setUseProfileBased: (useProfile: boolean) => void;
  setProfile: (profile: Profile) => void;
  setPartnerProfile: (profile: Profile) => void;
  setIsPartnerConnected: (connected: boolean) => void;
  setCurrentTab: (tab: string) => void;
}

export const useRecommendationStore = create<RecommendationStore>((set) => ({
  // Initial Recommendation data
  recommendations: [
    {
      id: 1,
      title: "🌸 로맨틱 한강 데이트 코스",
      date: "2024-02-14",
      requestDate: "2024-02-10",
      requestDay: "토요일",
      weather: "맑음 18°C",
      location: "한강공원 여의도",
      course: ["반포 한강공원", "세빛섬", "한강 카페", "반포대교 무지개분수"],
      tags: ["로맨틱", "야외", "저녁"],
      usedMileage: 50,
      isRead: false,
    },
    {
      id: 2,
      title: "🎭 홍대 문화 체험 코스",
      date: "2024-02-20",
      requestDate: "2024-02-18",
      requestDay: "일요일",
      weather: "흐림 15°C",
      location: "홍대 일대",
      course: ["홍대 거리공연", "카페 투어", "홍대 클럽", "야식 맛집"],
      tags: ["액티브", "문화", "밤"],
      usedMileage: 0,
      isRead: true,
    },
    {
      id: 3,
      title: "🌊 부산 해운대 데이트 코스",
      date: "2024-02-25",
      requestDate: "2024-02-22",
      requestDay: "토요일",
      weather: "맑음 22°C",
      location: "부산 해운대",
      course: ["해운대해변", "광안대교", "감천문화마을", "부산타워"],
      tags: ["로맨틱", "바다", "야경"],
      usedMileage: 50,
      isRead: false,
    },
    {
      id: 4,
      title: "🍃 제주도 힐링 코스",
      date: "2024-03-01",
      requestDate: "2024-02-28",
      requestDay: "금요일",
      weather: "맑음 20°C",
      location: "제주도",
      course: ["성산일출봉", "만장굴", "협재해변", "오설록티뮤지엄"],
      tags: ["힐링", "자연", "여행"],
      usedMileage: 50,
      isRead: false,
    },
    {
      id: 5,
      title: "🎨 인천 예술 코스",
      date: "2024-03-05",
      requestDate: "2024-03-02",
      requestDay: "토요일",
      weather: "흐림 16°C",
      location: "인천",
      course: ["차이나타운", "월미도", "송도해변", "인천타워"],
      tags: ["문화", "예술", "도시"],
      usedMileage: 0,
      isRead: true,
    },
    {
      id: 6,
      title: "🏞️ 남산타워 야경 코스",
      date: "2024-03-10",
      requestDate: "2024-03-07",
      requestDay: "일요일",
      weather: "맑음 18°C",
      location: "서울 남산",
      course: ["남산타워", "남산공원", "서울타워", "남산산책로"],
      tags: ["야경", "로맨틱", "도시"],
      usedMileage: 50,
      isRead: false,
    },
    {
      id: 7,
      title: "🎡 에버랜드 데이트 코스",
      date: "2024-03-15",
      requestDate: "2024-03-12",
      requestDay: "토요일",
      weather: "맑음 20°C",
      location: "용인 에버랜드",
      course: ["에버랜드", "카리브베이", "동물원", "플로라가든"],
      tags: ["액티브", "놀이기구", "가족"],
      usedMileage: 50,
      isRead: false,
    },
    {
      id: 8,
      title: "🍜 강남 맛집 투어",
      date: "2024-03-20",
      requestDate: "2024-03-17",
      requestDay: "일요일",
      weather: "흐림 16°C",
      location: "서울 강남",
      course: ["강남역", "카페거리", "맛집거리", "쇼핑몰"],
      tags: ["맛집", "쇼핑", "도시"],
      usedMileage: 0,
      isRead: true,
    },
    {
      id: 9,
      title: "🌊 제주도 서귀포 코스",
      date: "2024-03-25",
      requestDate: "2024-03-22",
      requestDay: "금요일",
      weather: "맑음 22°C",
      location: "제주 서귀포",
      course: ["서귀포해변", "천지연폭포", "올레길", "카페거리"],
      tags: ["자연", "힐링", "바다"],
      usedMileage: 50,
      isRead: false,
    },
  ],
  
  // Initial Recommendation form state
  showRecommendationForm: false,
  useProfileBased: true,
  profile: {
    name: "지민",
    nickname: "지미니",
    birthDate: "1995-03-15",
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
  isPartnerConnected: true,
  currentTab: "dashboard",
  
  // Recommendation actions
  setRecommendations: (recommendations) => set({ recommendations }),
  addRecommendation: (recommendation) => set((state) => ({ 
    recommendations: [...state.recommendations, recommendation] 
  })),
  updateRecommendation: (id, updates) => set((state) => ({
    recommendations: state.recommendations.map(rec => 
      rec.id === id ? { ...rec, ...updates } : rec
    )
  })),
  setShowRecommendationForm: (show) => set({ showRecommendationForm: show }),
  setUseProfileBased: (useProfile) => set({ useProfileBased: useProfile }),
  setProfile: (profile) => set({ profile }),
  setPartnerProfile: (profile) => set({ partnerProfile: profile }),
  setIsPartnerConnected: (connected) => set({ isPartnerConnected: connected }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));
