// Recommendation related types
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

export interface RecommendationFormState {
  showRecommendationForm: boolean;
}
