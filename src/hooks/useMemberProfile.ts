import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/config/axios';
import { useAppStore } from '@/types/store';
import { decodeJwtPayload } from '@/config/utils';

export type MemberProfile = {
  myNickname?: string;
  partnerNickname?: string | null;
  mileage?: number;
  tier?: string;
  memoryCount?: number;
  aiRecommendation?: number;
  email?: string;
  name?: string;
  nickname?: string;
  brith_date?: string; // API 필드명 그대로 사용 (서버 스펙 오타 가능성 반영)
  birth_date?: string; // 백엔드 표기 차이 대비
  gender?: string;
  [key: string]: any;
};

export const getMemberProfile = async (memberId: string | number) => {
  console.log('getMemberProfile - calling API with memberId:', memberId);
  const { data } = await axiosInstance.get(`/api/member/${memberId}`);
  console.log('getMemberProfile - API response:', data);
  return data;
};

export const useMemberProfile = () => {
  const { accessToken } = useAppStore();
  const payload = decodeJwtPayload<{ sub?: string | number }>(accessToken);
  const memberId = payload?.sub;

  // 디버깅을 위한 콘솔 로그
  console.log('useMemberProfile - accessToken:', accessToken);
  console.log('useMemberProfile - payload:', payload);
  console.log('useMemberProfile - memberId:', memberId);

  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getMemberProfile(memberId as string | number),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
};


