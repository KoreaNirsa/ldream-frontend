import { create } from 'zustand';
import { MileageHistory } from '../types';

interface MileageStore {
  // Mileage data
  mileageHistory: MileageHistory[];
  
  // Mileage actions
  setMileageHistory: (history: MileageHistory[]) => void;
  addMileageHistory: (item: MileageHistory) => void;
}

export const useMileageStore = create<MileageStore>((set) => ({
  // Initial Mileage data
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
  
  // Mileage actions
  setMileageHistory: (history) => set({ mileageHistory: history }),
  addMileageHistory: (item) => set((state) => ({ 
    mileageHistory: [...state.mileageHistory, item] 
  })),
}));
