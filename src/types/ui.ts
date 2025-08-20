// UI related types
export interface UIState {
  selectedRegion: string;
  currentTab: string;
  viewMode: string;
  showMemoryForm: boolean;
  selectedMemory: Memory | null;
  selectedPost: Memory | null;
  memoryFilter: string;
  currentPage: number;
  sharedCurrentPage: number;
  recommendationPage: number;
  itemsPerPage: number;
  showReplyInput: number | null;
  likedMemories: Set<number>;
  editingComment: number | null;
  editingMemory: number | null;
  isPartnerConnected: boolean;
  uploadedFiles: UploadedFile[];
}

export interface UploadedFile {
  id: number;
  file: File;
  preview: string;
  name: string;
}

// Import types that are used in UI types
import { Memory } from './memory';
