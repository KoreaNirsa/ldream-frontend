import { create } from 'zustand';
import { UIState, UploadedFile, Memory } from '../types';

interface UIStore extends UIState {
  // UI actions
  setSelectedRegion: (region: string) => void;
  setCurrentTab: (tab: string) => void;
  setViewMode: (mode: string) => void;
  setCurrentPage: (page: number) => void;
  setSharedCurrentPage: (page: number) => void;
  setRecommendationPage: (page: number) => void;
  setShowReplyInput: (commentId: number | null) => void;
  setEditingComment: (commentId: number | null) => void;
  setEditingMemory: (memoryId: number | null) => void;
  setIsPartnerConnected: (connected: boolean) => void;
  setUploadedFiles: (files: UploadedFile[]) => void;
  addUploadedFile: (file: UploadedFile) => void;
  removeUploadedFile: (id: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Initial UI State
  selectedRegion: "서울",
  currentTab: "dashboard",
  viewMode: "list",
  showMemoryForm: false,
  selectedMemory: null,
  selectedPost: null,
  memoryFilter: "전체",
  currentPage: 1,
  sharedCurrentPage: 1,
  recommendationPage: 1,
  itemsPerPage: 3,
  showReplyInput: null,
  likedMemories: new Set(),
  editingComment: null,
  editingMemory: null,
  isPartnerConnected: true,
  uploadedFiles: [],
  
  // UI actions
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSharedCurrentPage: (page) => set({ sharedCurrentPage: page }),
  setRecommendationPage: (page) => set({ recommendationPage: page }),
  setShowReplyInput: (commentId) => set({ showReplyInput: commentId }),
  setEditingComment: (commentId) => set({ editingComment: commentId }),
  setEditingMemory: (memoryId) => set({ editingMemory: memoryId }),
  setIsPartnerConnected: (connected) => set({ isPartnerConnected: connected }),
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
  addUploadedFile: (file) => set((state) => ({ 
    uploadedFiles: [...state.uploadedFiles, file] 
  })),
  removeUploadedFile: (id) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter(file => file.id !== id)
  })),
  setShowMemoryForm: (show: boolean) => set({ showMemoryForm: show }),
  setSelectedMemory: (memory: Memory | null) => set({ selectedMemory: memory }),
  setSelectedPost: (post: Memory | null) => set({ selectedPost: post }),
  setMemoryFilter: (filter: string) => set({ memoryFilter: filter }),
  setLikedMemories: (likedSet: Set<number>) => set({ likedMemories: likedSet }),
}));
