import { z } from 'zod';

// Memory creation/edit form validation schema
export const memorySchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이하로 입력해주세요'),
  date: z.string().min(1, '날짜를 선택해주세요'),
  location: z.string().min(1, '장소를 입력해주세요').max(100, '장소는 100자 이하로 입력해주세요'),
  memo: z.string().min(1, '메모를 입력해주세요').max(1000, '메모는 1000자 이하로 입력해주세요'),
  weather: z.string().min(1, '날씨를 선택해주세요'),
  rating: z.number().min(1, '평점을 선택해주세요').max(5, '평점은 1-5 사이의 값이어야 합니다'),
  mood: z.string().min(1, '기분을 선택해주세요'),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  photos: z.array(z.string()).optional()
});

// Memory filter form validation schema
export const memoryFilterSchema = z.object({
  filter: z.string().optional(),
  searchQuery: z.string().optional(),
  searchType: z.string().optional(),
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional()
  }).optional(),
  location: z.string().optional(),
  tags: z.array(z.string()).optional(),
  rating: z.number().optional(),
  isPublic: z.boolean().optional()
});

// Type exports for form data
export type MemoryFormData = z.infer<typeof memorySchema>;
export type MemoryFilterFormData = z.infer<typeof memoryFilterSchema>;
