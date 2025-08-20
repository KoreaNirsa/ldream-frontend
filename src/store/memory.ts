import { create } from 'zustand';
import { Memory, UploadedFile } from '../types';

interface MemoryStore {
  // Memory data
  memories: Memory[];
  sharedMemories: Memory[];
  bestMemories: Memory[];
  
  // Memory form state
  showMemoryForm: boolean;
  selectedMemory: Memory | null;
  selectedPost: Memory | null;
  memoryFilter: string;
  useProfileBased: boolean;
  selectedRating: number;
  tags: string[];
  tagInput: string;
  isPrivate: boolean;
  memoText: string;
  existingPhotos: string[];
  likedMemories: Set<number>;
  editingMemory: number | null;
  uploadedFiles: UploadedFile[];
  
  // Memory actions
  setMemories: (memories: Memory[]) => void;
  addMemory: (memory: Memory) => void;
  updateMemory: (id: number, updates: Partial<Memory>) => void;
  deleteMemory: (id: number) => void;
  setSharedMemories: (memories: Memory[]) => void;
  setBestMemories: (memories: Memory[]) => void;
  setShowMemoryForm: (show: boolean) => void;
  setSelectedMemory: (memory: Memory | null) => void;
  setSelectedPost: (post: Memory | null) => void;
  setMemoryFilter: (filter: string) => void;
  setUseProfileBased: (useProfile: boolean) => void;
  setSelectedRating: (rating: number) => void;
  setTags: (tags: string[]) => void;
  setTagInput: (input: string) => void;
  setIsPrivate: (isPrivate: boolean) => void;
  setMemoText: (text: string) => void;
  setExistingPhotos: (photos: string[]) => void;
  setLikedMemories: (likedSet: Set<number>) => void;
  setEditingMemory: (memoryId: number | null) => void;
  addUploadedFile: (file: UploadedFile) => void;
  removeUploadedFile: (id: number) => void;
  handleLike: (memoryId: number) => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  // Initial Memory data
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
  
  // Initial Memory form state
  showMemoryForm: false,
  selectedMemory: null,
  selectedPost: null,
  memoryFilter: "전체",
  useProfileBased: true,
  selectedRating: 5,
  tags: [],
  tagInput: "",
  isPrivate: false,
  memoText: "",
  existingPhotos: [],
  likedMemories: new Set(),
  editingMemory: null,
  uploadedFiles: [],
  
  // Memory actions
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
  setShowMemoryForm: (show) => set({ showMemoryForm: show }),
  setSelectedMemory: (memory) => set({ selectedMemory: memory }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setMemoryFilter: (filter) => set({ memoryFilter: filter }),
  setUseProfileBased: (useProfile) => set({ useProfileBased: useProfile }),
  setSelectedRating: (rating) => set({ selectedRating: rating }),
  setTags: (tags) => set({ tags }),
  setTagInput: (input) => set({ tagInput: input }),
  setIsPrivate: (isPrivate) => set({ isPrivate }),
  setMemoText: (text) => set({ memoText: text }),
  setExistingPhotos: (photos) => set({ existingPhotos: photos }),
  setLikedMemories: (likedSet) => set({ likedMemories: likedSet }),
  setEditingMemory: (memoryId) => set({ editingMemory: memoryId }),
  addUploadedFile: (file) => set((state) => ({ 
    uploadedFiles: [...state.uploadedFiles, file] 
  })),
  removeUploadedFile: (id) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter(file => file.id !== id)
  })),
  
  handleLike: (memoryId) => set((state) => {
    const isLiked = state.likedMemories.has(memoryId);
    const newLikedMemories = new Set(state.likedMemories);
    
    if (isLiked) {
      newLikedMemories.delete(memoryId);
    } else {
      newLikedMemories.add(memoryId);
    }
    
    const updateMemoryLikes = (memory: Memory) => 
      memory.id === memoryId 
        ? { ...memory, likes: isLiked ? memory.likes - 1 : memory.likes + 1 }
        : memory;
    
    return {
      likedMemories: newLikedMemories,
      memories: state.memories.map(updateMemoryLikes),
      sharedMemories: state.sharedMemories.map(updateMemoryLikes)
    };
  }),
}));
