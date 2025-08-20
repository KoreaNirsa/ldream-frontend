import { useQuery } from '@/lib/react-query';
import axiosInstance from '@/config/axios';
import { useAuthStore } from '@/store';
import { decodeJwtPayload } from '@/config/utils';


export const getMemberProfile = async (memberId: string | number) => {
  const { data } = await axiosInstance.get(`/api/member/${memberId}`);
  return data;
};

export const useMemberProfile = () => {
  const { accessToken } = useAuthStore();
  const payload = decodeJwtPayload<{ sub?: string | number }>(accessToken);
  const memberId = payload?.sub;



  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getMemberProfile(memberId as string | number),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
};


