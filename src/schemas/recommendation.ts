import { z } from 'zod';

// Recommendation request form validation schema
export const recommendationRequestSchema = z.object({
  startDate: z.string().min(1, '시작 날짜를 선택해주세요'),
  endDate: z.string().optional(),
  location: z.string().min(1, '지역을 선택해주세요'),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
  additionalInfo: z.string().max(500, '추가 정보는 500자 이하로 입력해주세요').optional(),
  useProfileBased: z.boolean().optional(),
  // Manual input fields when profile-based is disabled
  manualInterests: z.string().optional(),
  manualTimePreference: z.string().optional(),
  manualBudget: z.string().optional(),
  manualTransport: z.string().optional(),
  manualMood: z.string().optional(),
  manualRelationshipStatus: z.string().optional(),
  manualDietary: z.string().optional(),
  manualAgeGroup: z.string().optional(),
  manualMbti: z.string().optional(),
  specialDay: z.string().optional()
});

// Recommendation filter form validation schema
export const recommendationFilterSchema = z.object({
  searchTerm: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional()
  }).optional(),
  isRead: z.boolean().optional(),
  usedMileage: z.boolean().optional()
});

// Type exports for form data
export type RecommendationRequestFormData = z.infer<typeof recommendationRequestSchema>;
export type RecommendationFilterFormData = z.infer<typeof recommendationFilterSchema>;
