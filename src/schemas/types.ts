export type ChatMessage =
  | {
      type: 'ai';
      message: string;
      timestamp: Date;
      showFeedback?: boolean;
      feedback?: 'positive' | 'negative';
    }
  | {
      type: 'user';
      message: string;
      timestamp: Date;
    }

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

export interface Recommendation {
  id: number;
  title: string;
  date: string;
  requestDate: string;
  requestDay: string;
  weather: string;
  location: string;
  course: string[];
  tags: string[];
  usedMileage: number;
  isRead?: boolean;
}

export interface MileageHistory {
  id: number;
  type: 'earn' | 'use';
  title: string;
  amount: number;
  date: string;
  description: string;
}

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

export interface UserSubscription {
  plan: 'free' | 'premium' | 'pro';
  aiUsageToday: number;
  aiLimitDaily: number;
  storageUsed: number;
  storageLimit: number;
  renewalDate: string;
  paymentHistory: {
    date: string;
    amount: number;
    plan: string;
    status: string;
    mileageUsed: number;
    finalAmount: number;
  }[];
  cards: {
    id: number;
    name: string;
    number: string;
    isDefault: boolean;
  }[];
}

export interface Weather {
  temp: number;
  condition: string;
  dust: string;
  humidity: number;
  rainChance: number;
}

export interface UploadedFile {
  id: number;
  file: File;
  preview: string;
  name: string;
} 