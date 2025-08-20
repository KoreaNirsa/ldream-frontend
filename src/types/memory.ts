// Memory related types
export interface Memory {
  id: number;
  title: string;
  date: string;
  location: string;
  photos: string[];
  memo: string;
  tags: string[];
  weather: string;
  rating: number;
  mood: string;
  isPublic?: boolean;
  likes: number;
  comments: number;
  author: string;
  isBest?: boolean;
}

export interface MemoryFormState {
  useProfileBased: boolean;
  selectedRating: number;
  tags: string[];
  tagInput: string;
  isPrivate: boolean;
  memoText: string;
  existingPhotos: string[];
}

export interface MemoryFilter {
  filter: string;
  searchQuery: string;
  searchType: string;
}
