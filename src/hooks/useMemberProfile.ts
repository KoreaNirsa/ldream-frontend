import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/config/axios';
import { useAppStore } from '@/types/store';
import { decodeJwtPayload } from '@/config/utils';

export type MemberProfile = {
  email?: string;
  name?: string;
  nickname?: string;
  brith_date?: string; // API 필드명 그대로 사용 (서버 스펙 오타 가능성 반영)
  birth_date?: string; // 백엔드 표기 차이 대비
  gender?: string;
  mileage?: number;
  [key: string]: any;
};

export const getMemberProfile = async (memberId: string | number): Promise<MemberProfile> => {
  const { data } = await axiosInstance.get(`/api/member/${memberId}`);
  return data;
};

export const useMemberProfile = () => {
  const { accessToken } = useAppStore();
  const payload = decodeJwtPayload<{ sub?: string | number }>(accessToken);
  const memberId = payload?.sub;

  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getMemberProfile(memberId as string | number),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
};


