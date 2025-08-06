import { create } from 'zustand'
import { 
  ChatMessage, 
  Memory, 
  Recommendation, 
  MileageHistory, 
  Profile, 
  UserSubscription, 
  Weather,
  UploadedFile 
} from '../schemas/types'

interface AppState {
  // Auth State
  isLoggedIn: boolean
  currentUser: string | null
  
  // UI State
  selectedRegion: string
  currentTab: string
  viewMode: string
  showMemoryForm: boolean
  showRecommendationForm: boolean
  selectedMemory: Memory | null
  selectedPost: Memory | null
  memoryFilter: string
  
  // Pagination
  currentPage: number
  sharedCurrentPage: number
  recommendationPage: number
  itemsPerPage: number
  
  // Data
  weather: Weather
  chatMessage: string
  chatHistory: ChatMessage[]
  memories: Memory[]
  sharedMemories: Memory[]
  bestMemories: Memory[]
  recommendations: Recommendation[]
  mileageHistory: MileageHistory[]
  profile: Profile
  partnerProfile: Profile
  userSubscription: UserSubscription
  isPartnerConnected: boolean
  uploadedFiles: UploadedFile[]
  
  // Form States
  useProfileBased: boolean
  showReplyInput: number | null
  likedMemories: Set<number>
  editingComment: number | null
  editingMemory: number | null
  selectedRating: number
  tags: string[]
  tagInput: string
  isPrivate: boolean
  memoText: string
  existingPhotos: string[]
  
  // Auth Modal States
  showLoginModal: boolean
  showSignupModal: boolean
  showEmailSignupModal: boolean
  loginUsername: string
  loginPassword: string
  loginError: string
  signupEmail: string
  signupPassword: string
  signupConfirmPassword: string
  signupNickname: string
  signupError: string
  guestChatCount: number
  showVerificationCode: boolean
  verificationCode: string
  isEmailVerified: boolean
  
  // Actions
  setSelectedRegion: (region: string) => void
  setCurrentTab: (tab: string) => void
  setViewMode: (mode: string) => void
  setShowMemoryForm: (show: boolean) => void
  setShowRecommendationForm: (show: boolean) => void
  setSelectedMemory: (memory: Memory | null) => void
  setSelectedPost: (post: Memory | null) => void
  setMemoryFilter: (filter: string) => void
  
  setCurrentPage: (page: number) => void
  setSharedCurrentPage: (page: number) => void
  setRecommendationPage: (page: number) => void
  
  setChatMessage: (message: string) => void
  setChatHistory: (history: ChatMessage[]) => void
  addChatMessage: (message: ChatMessage) => void
  updateChatFeedback: (index: number, feedback: 'positive' | 'negative' | undefined) => void
  
  setMemories: (memories: Memory[]) => void
  addMemory: (memory: Memory) => void
  updateMemory: (id: number, updates: Partial<Memory>) => void
  deleteMemory: (id: number) => void
  
  setSharedMemories: (memories: Memory[]) => void
  setBestMemories: (memories: Memory[]) => void
  
  setRecommendations: (recommendations: Recommendation[]) => void
  addRecommendation: (recommendation: Recommendation) => void
  updateRecommendation: (id: number, updates: Partial<Recommendation>) => void
  
  setMileageHistory: (history: MileageHistory[]) => void
  addMileageHistory: (item: MileageHistory) => void
  
  setProfile: (profile: Profile) => void
  updateProfile: (updates: Partial<Profile>) => void
  
  setPartnerProfile: (profile: Profile) => void
  updatePartnerProfile: (updates: Partial<Profile>) => void
  
  setUserSubscription: (subscription: UserSubscription) => void
  updateUserSubscription: (updates: Partial<UserSubscription>) => void
  
  setIsPartnerConnected: (connected: boolean) => void
  
  setUploadedFiles: (files: UploadedFile[]) => void
  addUploadedFile: (file: UploadedFile) => void
  removeUploadedFile: (id: number) => void
  
  // Form State Actions
  setUseProfileBased: (useProfile: boolean) => void
  setShowReplyInput: (commentId: number | null) => void
  setLikedMemories: (likedSet: Set<number>) => void
  setEditingComment: (commentId: number | null) => void
  setEditingMemory: (memoryId: number | null) => void
  setSelectedRating: (rating: number) => void
  setTags: (tags: string[]) => void
  setTagInput: (input: string) => void
  setIsPrivate: (isPrivate: boolean) => void
  setMemoText: (text: string) => void
  setExistingPhotos: (photos: string[]) => void
  
  // Auth Modal Actions
  setShowLoginModal: (show: boolean) => void
  setShowSignupModal: (show: boolean) => void
  setShowEmailSignupModal: (show: boolean) => void
  setLoginUsername: (username: string) => void
  setLoginPassword: (password: string) => void
  setLoginError: (error: string) => void
  setSignupEmail: (email: string) => void
  setSignupPassword: (password: string) => void
  setSignupConfirmPassword: (password: string) => void
  setSignupNickname: (nickname: string) => void
  setSignupError: (error: string) => void
  setGuestChatCount: (count: number) => void
  setShowVerificationCode: (show: boolean) => void
  setVerificationCode: (code: string) => void
  setIsEmailVerified: (verified: boolean) => void
  
  // Auth actions
  login: (username: string, password: string) => boolean
  logout: () => void
  
  // Utility actions
  handleLike: (memoryId: number) => void
  handleChatFeedback: (messageIndex: number, isPositive: boolean) => void
  handleQuickChat: (message: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial Auth State
  isLoggedIn: false,
  currentUser: null,
  
  // Initial UI State
  selectedRegion: "서울",
  currentTab: "dashboard",
  viewMode: "list",
  showMemoryForm: false,
  showRecommendationForm: false,
  selectedMemory: null,
  selectedPost: null,
  memoryFilter: "전체",
  
  // Initial Pagination
  currentPage: 1,
  sharedCurrentPage: 1,
  recommendationPage: 1,
  itemsPerPage: 3,
  
  // Initial Data
  weather: {
    temp: 22,
    condition: "맑음",
    dust: "좋음",
    humidity: 65,
    rainChance: 10,
  },
  
  // Initial Form States
  useProfileBased: true,
  showReplyInput: null,
  likedMemories: new Set(),
  editingComment: null,
  editingMemory: null,
  selectedRating: 5,
  tags: [],
  tagInput: "",
  isPrivate: false,
  memoText: "",
  existingPhotos: [],
  
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
  chatMessage: "",
  chatHistory: [
    {
      type: "ai",
      message: "안녕하세요! 오늘 어떤 데이트를 계획하고 계신가요? 😊",
      timestamp: new Date(),
    },
    {
      type: "user",
      message: "오늘 날씨가 좋은데 야외 데이트 추천해줘",
      timestamp: new Date(),
    },
    {
      type: "ai",
      message: "좋은 선택이에요! 프로필을 보니 로맨틱한 분위기를 좋아하시는군요. 한강공원에서 피크닉은 어떠세요? 🌸",
      timestamp: new Date(),
      showFeedback: true,
      feedback: undefined,
    },
  ],
  memories: [
    {
      id: 1,
      title: "첫 데이트 💕",
      date: "2023-11-15",
      location: "홍대 카페거리",
      photos: [
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
      ],
      memo: "처음 만난 날이라 긴장했지만 정말 즐거웠어요. 카페 분위기도 좋고 대화도 잘 통해서 시간 가는 줄 몰랐어요 ☕💕",
      tags: ["첫만남", "카페", "홍대"],
      weather: "맑음",
      rating: 5,
      mood: "행복",
      isPublic: true,
      likes: 24,
      comments: 8,
      author: "지민 & 민수",
      isBest: true,
    },
    {
      id: 2,
      title: "한강 피크닉 🌸",
      date: "2023-12-03",
      location: "한강공원 여의도",
      photos: [
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
      ],
      memo: "날씨가 정말 좋았던 날! 준비해간 도시락도 맛있었고 일몰도 너무 예뻤어요. 다음에 또 오고 싶은 곳이에요 🌅",
      tags: ["피크닉", "한강", "일몰"],
      weather: "맑음",
      rating: 5,
      mood: "평온",
      isPublic: true,
      likes: 0,
      comments: 0,
      author: "지민 & 민수",
    },
    {
      id: 3,
      title: "영화 데이트 🎬",
      date: "2024-01-08",
      location: "CGV 강남",
      photos: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
      memo: "로맨스 영화 보면서 같이 울었어요 ㅠㅠ 팝콘도 맛있었고 영화 끝나고 이야기 나누는 것도 재밌었어요",
      tags: ["영화", "강남", "실내"],
      weather: "흐림",
      rating: 4,
      mood: "감동",
      isPublic: true,
      likes: 15,
      comments: 3,
      author: "지민 & 민수",
    },
    {
      id: 4,
      title: "크리스마스 데이트 🎄",
      date: "2023-12-25",
      location: "명동 성당",
      photos: [
        "/placeholder.jpg?height=200&width=200",
        "/placeholder.jpg?height=200&width=200",
        "/placeholder.jpg?height=200&width=200",
        "/placeholder.jpg?height=200&width=200",
      ],
      memo: "크리스마스 특별한 날! 일루미네이션이 정말 예뻤고 핫초콜릿도 달콤했어요. 선물 교환도 했는데 너무 감동이었어요 🎁",
      tags: ["크리스마스", "명동", "일루미네이션", "선물"],
      weather: "눈",
      rating: 5,
      mood: "감동",
      isPublic: true,
      likes: 42,
      comments: 12,
      author: "지민 & 민수",
      isBest: true,
    },
  ],
  sharedMemories: [
    {
      id: 5,
      title: "벚꽃 축제 데이트 🌸",
      date: "2024-04-05",
      location: "여의도 한강공원",
      photos: ["/placeholder.jpg?height=200&width=200", "/placeholder.jpg?height=200&width=200"],
      memo: "벚꽃이 만개한 날! 정말 예쁜 사진도 많이 찍고 행복한 하루였어요",
      tags: ["벚꽃", "한강", "봄"],
      weather: "맑음",
      rating: 5,
      mood: "행복",
      likes: 67,
      comments: 23,
      author: "사랑둥이 & 꿀벌이",
      isBest: true,
    },
    {
      id: 6,
      title: "카페 투어 데이트 ☕",
      date: "2024-03-20",
      location: "홍대 카페거리",
      photos: ["/placeholder.jpg?height=200&width=200"],
      memo: "하루 종일 카페만 5곳 다녔어요! 각각 특색이 달라서 재밌었어요",
      tags: ["카페", "홍대", "투어"],
      weather: "흐림",
      rating: 4,
      mood: "즐거움",
      likes: 31,
      comments: 8,
      author: "커피러버 & 디저트킹",
    },
    {
      id: 7,
      title: "봄날 산책 🌿",
      date: "2024-03-15",
      location: "서울숲",
      photos: ["/placeholder.jpg?height=200&width=200", "/placeholder.jpg?height=200&width=200"],
      memo: "봄날 산책하기 딱 좋은 날씨였어요! 벚꽃도 조금 피기 시작했고 새싹도 예뻤어요",
      tags: ["산책", "서울숲", "봄"],
      weather: "맑음",
      rating: 4,
      mood: "평온",
      isPublic: false,
      likes: 0,
      comments: 0,
      author: "지민 & 민수",
    },
    {
      id: 8,
      title: "맛집 탐방 🍜",
      date: "2024-02-20",
      location: "홍대 맛집거리",
      photos: ["/placeholder.jpg?height=200&width=200"],
      memo: "유튜브에서 본 맛집들 다녀왔어요! 라멘, 돈까스, 디저트까지 정말 맛있었어요",
      tags: ["맛집", "홍대", "탐방"],
      weather: "흐림",
      rating: 5,
      mood: "즐거움",
      isPublic: true,
      likes: 28,
      comments: 7,
      author: "지민 & 민수",
    },
    {
      id: 9,
      title: "겨울 스키장 ⛷️",
      date: "2024-01-15",
      location: "용평리조트",
      photos: ["/placeholder.jpg?height=200&width=200", "/placeholder.jpg?height=200&width=200"],
      memo: "처음 스키 타봤는데 재밌었어요! 넘어지기도 많이 했지만 같이 배우니까 즐거웠어요",
      tags: ["스키", "용평", "겨울"],
      weather: "눈",
      rating: 4,
      mood: "즐거움",
      isPublic: false,
      likes: 0,
      comments: 0,
      author: "지민 & 민수",
    },
    {
      id: 10,
      title: "가을 단풍 여행 🍁",
      date: "2023-11-10",
      location: "내장산",
      photos: ["/placeholder.jpg?height=200&width=200", "/placeholder.jpg?height=200&width=200"],
      memo: "단풍이 정말 예뻤어요! 등산도 재밌었고 사진도 많이 찍었어요",
      tags: ["단풍", "내장산", "가을"],
      weather: "맑음",
      rating: 5,
      mood: "평온",
      isPublic: true,
      likes: 35,
      comments: 9,
      author: "지민 & 민수",
    },
    {
      id: 11,
      title: "여름 바다 여행 🌊",
      date: "2023-08-20",
      location: "부산 해운대",
      photos: ["/placeholder.jpg?height=200&width=200", "/placeholder.jpg?height=200&width=200"],
      memo: "바다가 정말 예뻤어요! 해수욕장도 재밌었고 해산물도 맛있었어요",
      tags: ["바다", "부산", "여름"],
      weather: "맑음",
      rating: 5,
      mood: "행복",
      isPublic: true,
      likes: 45,
      comments: 12,
      author: "지민 & 민수",
    },
    {
      id: 12,
      title: "겨울 온천 여행 ♨️",
      date: "2024-01-30",
      location: "양양 온천",
      photos: ["/placeholder.jpg?height=200&width=200"],
      memo: "겨울에 온천 들어가니까 정말 따뜻했어요! 피로도 풀리고 좋았어요",
      tags: ["온천", "양양", "겨울"],
      weather: "눈",
      rating: 4,
      mood: "평온",
      isPublic: false,
      likes: 0,
      comments: 0,
      author: "지민 & 민수",
    },
    {
      id: 13,
      title: "서울타워 데이트 🗼",
      date: "2024-02-14",
      location: "N서울타워",
      photos: ["/placeholder.jpg?height=200&width=200", "/placeholder.jpg?height=200&width=200"],
      memo: "발렌타인데이에 서울타워 갔어요! 야경이 정말 예뻤고 로맨틱했어요",
      tags: ["서울타워", "야경", "발렌타인"],
      weather: "맑음",
      rating: 5,
      mood: "로맨틱",
      likes: 52,
      comments: 15,
      author: "달콤커플 & 로맨틱러버",
    },
    {
      id: 14,
      title: "에버랜드 데이트 🎢",
      date: "2024-01-20",
      location: "에버랜드",
      photos: ["/placeholder.jpg?height=200&width=200"],
      memo: "놀이기구 타면서 정말 재밌었어요! 롤러코스터도 타고 사진도 많이 찍었어요",
      tags: ["에버랜드", "놀이기구", "롤러코스터"],
      weather: "맑음",
      rating: 4,
      mood: "즐거움",
      likes: 38,
      comments: 11,
      author: "어드벤처러버 & 스릴시커",
    },
    {
      id: 15,
      title: "강남 쇼핑 데이트 🛍️",
      date: "2024-03-10",
      location: "강남역",
      photos: ["/placeholder.jpg?height=200&width=200", "/placeholder.jpg?height=200&width=200"],
      memo: "강남에서 쇼핑하고 맛집도 다녀왔어요! 옷도 사고 맛있는 것도 먹고 좋았어요",
      tags: ["쇼핑", "강남", "맛집"],
      weather: "흐림",
      rating: 4,
      mood: "즐거움",
      likes: 29,
      comments: 8,
      author: "패션러버 & 쇼핑홀릭",
    },
  ],
  bestMemories: [
    {
      id: 1,
      title: "첫 데이트 💕",
      date: "2023-11-15",
      location: "홍대 카페거리",
      photos: ["/placeholder.jpg?height=200&width=200"],
      memo: "처음 만난 날이라 긴장했지만 정말 즐거웠어요",
      tags: ["첫만남", "카페", "홍대"],
      weather: "맑음",
      rating: 5,
      mood: "행복",
      isPublic: true,
      likes: 24,
      comments: 8,
      author: "지민 & 민수",
      isBest: true,
    },
    {
      id: 4,
      title: "크리스마스 데이트 🎄",
      date: "2023-12-25",
      location: "명동 성당",
      photos: ["/placeholder.jpg?height=200&width=200"],
      memo: "크리스마스 특별한 날! 일루미네이션이 정말 예뻤어요",
      tags: ["크리스마스", "명동", "일루미네이션"],
      weather: "눈",
      rating: 5,
      mood: "감동",
      isPublic: true,
      likes: 42,
      comments: 12,
      author: "지민 & 민수",
      isBest: true,
    },
    {
      id: 5,
      title: "벚꽃 축제 데이트 🌸",
      date: "2024-04-05",
      location: "여의도 한강공원",
      photos: ["/placeholder.jpg?height=200&width=200"],
      memo: "벚꽃이 만개한 날! 정말 예쁜 사진도 많이 찍고 행복한 하루였어요",
      tags: ["벚꽃", "한강", "봄"],
      weather: "맑음",
      rating: 5,
      mood: "행복",
      likes: 67,
      comments: 23,
      author: "사랑둥이 & 꿀벌이",
      isBest: true,
    },
  ],
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
  mileageHistory: [
    {
      id: 1,
      type: "earn",
      title: "베스트 추억 선정",
      amount: 100,
      date: "2024-02-15",
      description: "크리스마스 데이트 게시글이 베스트 추억으로 선정되었습니다",
    },
    {
      id: 2,
      type: "use",
      title: "AI 맞춤 추천 코스",
      amount: -50,
      date: "2024-02-10",
      description: "로맨틱 한강 데이트 코스 추천 받기",
    },
    {
      id: 3,
      type: "use",
      title: "Premium 플랜 구독",
      amount: -2000,
      date: "2024-01-15",
      description: "Premium 플랜 구독 시 마일리지 사용",
    },
    {
      id: 4,
      type: "earn",
      title: "추천 받기",
      amount: 10,
      date: "2024-01-10",
      description: "게시글 추천으로 마일리지 적립",
    },
  ],
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
  isPartnerConnected: true,
  uploadedFiles: [],
  
  // Actions
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setShowMemoryForm: (show) => set({ showMemoryForm: show }),
  setShowRecommendationForm: (show) => set({ showRecommendationForm: show }),
  setSelectedMemory: (memory) => set({ selectedMemory: memory }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setMemoryFilter: (filter) => set({ memoryFilter: filter }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setSharedCurrentPage: (page) => set({ sharedCurrentPage: page }),
  setRecommendationPage: (page) => set({ recommendationPage: page }),
  
  setChatMessage: (message) => set({ chatMessage: message }),
  setChatHistory: (history) => set({ chatHistory: history }),
  addChatMessage: (message) => set((state) => ({ 
    chatHistory: [...state.chatHistory, message] 
  })),
  updateChatFeedback: (index, feedback) => set((state) => ({
    chatHistory: state.chatHistory.map((msg, i) => 
      i === index && msg.type === 'ai' 
        ? { ...msg, feedback: feedback as 'positive' | 'negative' | undefined, showFeedback: true }
        : msg
    )
  })),
  
  setMemories: (memories) => set({ memories }),
  addMemory: (memory) => set((state) => ({ 
    memories: [...state.memories, memory] 
  })),
  updateMemory: (id, updates) => set((state) => ({
    memories: state.memories.map(memory => 
      memory.id === id ? { ...memory, ...updates } : memory
    )
  })),
  deleteMemory: (id) => set((state) => ({
    memories: state.memories.filter(memory => memory.id !== id)
  })),
  
  setSharedMemories: (memories) => set({ sharedMemories: memories }),
  setBestMemories: (memories) => set({ bestMemories: memories }),
  
  setRecommendations: (recommendations) => set({ recommendations }),
  addRecommendation: (recommendation) => set((state) => ({ 
    recommendations: [...state.recommendations, recommendation] 
  })),
  updateRecommendation: (id, updates) => set((state) => ({
    recommendations: state.recommendations.map(rec => 
      rec.id === id ? { ...rec, ...updates } : rec
    )
  })),
  
  setMileageHistory: (history) => set({ mileageHistory: history }),
  addMileageHistory: (item) => set((state) => ({ 
    mileageHistory: [...state.mileageHistory, item] 
  })),
  
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
  
  setIsPartnerConnected: (connected) => set({ isPartnerConnected: connected }),
  
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
  addUploadedFile: (file) => set((state) => ({ 
    uploadedFiles: [...state.uploadedFiles, file] 
  })),
  removeUploadedFile: (id) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter(file => file.id !== id)
  })),
  
  // Form State Actions
  setUseProfileBased: (useProfile: boolean) => set({ useProfileBased: useProfile }),
  setShowReplyInput: (commentId: number | null) => set({ showReplyInput: commentId }),
  setLikedMemories: (likedSet: Set<number>) => set({ likedMemories: likedSet }),
  setEditingComment: (commentId: number | null) => set({ editingComment: commentId }),
  setEditingMemory: (memoryId: number | null) => set({ editingMemory: memoryId }),
  setSelectedRating: (rating: number) => set({ selectedRating: rating }),
  setTags: (tags: string[]) => set({ tags }),
  setTagInput: (input: string) => set({ tagInput: input }),
  setIsPrivate: (isPrivate: boolean) => set({ isPrivate }),
  setMemoText: (text: string) => set({ memoText: text }),
  setExistingPhotos: (photos: string[]) => set({ existingPhotos: photos }),
  
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
  
  // Auth actions
  login: (username, password) => {
    if (username === 'user' && password === 'qwer1234!') {
      set({ isLoggedIn: true, currentUser: username })
      return true
    }
    // 회원가입한 계정으로도 로그인 가능하도록 추가
    if (username && password && password.length >= 6) {
      set({ isLoggedIn: true, currentUser: username })
      return true
    }
    return false
  },
  
  logout: () => set({ isLoggedIn: false, currentUser: null }),
  
  // Utility actions
  handleLike: (memoryId) => set((state) => {
    const isLiked = state.likedMemories.has(memoryId)
    const newLikedMemories = new Set(state.likedMemories)
    
    if (isLiked) {
      newLikedMemories.delete(memoryId)
    } else {
      newLikedMemories.add(memoryId)
    }
    
    const updateMemoryLikes = (memory: Memory) => 
      memory.id === memoryId 
        ? { ...memory, likes: isLiked ? memory.likes - 1 : memory.likes + 1 }
        : memory
    
    return {
      likedMemories: newLikedMemories,
      memories: state.memories.map(updateMemoryLikes),
      sharedMemories: state.sharedMemories.map(updateMemoryLikes)
    }
  }),
  
  handleChatFeedback: (messageIndex, isPositive) => {
    const currentMessage = get().chatHistory[messageIndex]
    if (currentMessage && currentMessage.type === 'ai') {
      const currentFeedback = currentMessage.feedback
      const newFeedback = currentFeedback === (isPositive ? 'positive' : 'negative') ? undefined : (isPositive ? 'positive' : 'negative')
      get().updateChatFeedback(messageIndex, newFeedback)
    }
  },
  
  handleQuickChat: (message) => {
    const userMessage: ChatMessage = {
      type: 'user',
      message,
      timestamp: new Date()
    }
    get().addChatMessage(userMessage)
    get().setChatMessage('')
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        type: 'ai',
        message: `"${message}"에 대한 답변을 준비하고 있어요! 잠시만 기다려주세요 😊`,
        timestamp: new Date(),
        showFeedback: true
      }
      get().addChatMessage(aiMessage)
    }, 1000)
  },
})) 