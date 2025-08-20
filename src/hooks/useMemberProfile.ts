import { useQuery, useMutation, useQueryClient } from '@/lib/react-query';
import axiosInstance from '@/config/axios';
import { useAuthStore } from '@/store';
import { decodeJwtPayload } from '@/config/utils';
import { 
  DetailedProfileResponse, 
  MemberProfileData, 
  ProfileInterestData, 
  ProfileFoodData, 
  ProfileDaysData, 
  ProfileTransportationData, 
  ProfileDateMoodData,
  MemberRelationData,
  ProfileResponse
} from '@/types/profile';

export const getMemberProfile = async (memberId: string | number) => {
  const { data } = await axiosInstance.get(`/api/member/${memberId}`);
  return data;
};

// 새로운 API 응답 구조에 맞는 함수
export const getProfileData = async (memberId: string | number): Promise<ProfileResponse> => {
  const { data } = await axiosInstance.get(`/api/member/profile/${memberId}`);
  return data;
};

// 상세 프로필 API 함수
export const getDetailedProfile = async (memberId: string | number): Promise<DetailedProfileResponse> => {
  const { data } = await axiosInstance.get(`/api/member/profile/${memberId}`);
  return data;
};

// 데이터베이스 스키마에 맞춘 새로운 API 함수들
export const getMemberProfileData = async (memberId: string | number): Promise<MemberProfileData> => {
  const { data } = await axiosInstance.get(`/api/member/profile/${memberId}`);
  return data;
};

export const getProfileInterests = async (memberProfileId: number): Promise<ProfileInterestData[]> => {
  const { data } = await axiosInstance.get(`/api/profile-interests/${memberProfileId}`);
  return data;
};

export const getProfileFoods = async (memberProfileId: number): Promise<ProfileFoodData[]> => {
  const { data } = await axiosInstance.get(`/api/profile-foods/${memberProfileId}`);
  return data;
};

export const getProfileDays = async (memberProfileId: number): Promise<ProfileDaysData[]> => {
  const { data } = await axiosInstance.get(`/api/profile-days/${memberProfileId}`);
  return data;
};

export const getProfileTransportations = async (memberProfileId: number): Promise<ProfileTransportationData[]> => {
  const { data } = await axiosInstance.get(`/api/profile-transportations/${memberProfileId}`);
  return data;
};

export const getProfileDateMoods = async (memberProfileId: number): Promise<ProfileDateMoodData[]> => {
  const { data } = await axiosInstance.get(`/api/profile-date-moods/${memberProfileId}`);
  return data;
};

export const getMemberRelations = async (memberId: string | number): Promise<MemberRelationData[]> => {
  const { data } = await axiosInstance.get(`/api/member-relations/${memberId}`);
  return data;
};

// 프로필 업데이트 함수들
export const updateMemberProfile = async (memberProfileId: number, profileData: Partial<MemberProfileData>) => {
  const { data } = await axiosInstance.put(`/api/member-profile/${memberProfileId}`, profileData);
  return data;
};

export const updateProfileInterests = async (memberProfileId: number, interests: string[]) => {
  const { data } = await axiosInstance.put(`/api/profile-interests/${memberProfileId}`, { interests });
  return data;
};

export const updateProfileFoods = async (memberProfileId: number, foods: string[]) => {
  const { data } = await axiosInstance.put(`/api/profile-foods/${memberProfileId}`, { foods });
  return data;
};

export const updateProfileDays = async (memberProfileId: number, days: string[]) => {
  const { data } = await axiosInstance.put(`/api/profile-days/${memberProfileId}`, { days });
  return data;
};

export const updateProfileTransportations = async (memberProfileId: number, transportations: string[]) => {
  const { data } = await axiosInstance.put(`/api/profile-transportations/${memberProfileId}`, { transportations });
  return data;
};

export const updateProfileDateMoods = async (memberProfileId: number, moods: string[]) => {
  const { data } = await axiosInstance.put(`/api/profile-date-moods/${memberProfileId}`, { moods });
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

// 상세 프로필 훅
export const useDetailedProfile = () => {
  const { accessToken } = useAuthStore();
  const payload = decodeJwtPayload<{ sub?: string | number }>(accessToken);
  const memberId = payload?.sub;

  return useQuery({
    queryKey: ['detailed-profile', memberId],
    queryFn: () => getDetailedProfile(memberId as string | number),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000, // 5분간 캐시
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};

// 새로운 API 응답 구조에 맞는 훅
export const useProfileData = () => {
  const { accessToken } = useAuthStore();
  const payload = decodeJwtPayload<{ sub?: string | number }>(accessToken);
  const memberId = payload?.sub;

  return useQuery({
    queryKey: ['profile-data', memberId],
    queryFn: () => getProfileData(memberId as string | number),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000, // 5분간 캐시
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};

// 데이터베이스 스키마에 맞춘 새로운 훅들
export const useMemberProfileData = () => {
  const { accessToken } = useAuthStore();
  const payload = decodeJwtPayload<{ sub?: string | number }>(accessToken);
  const memberId = payload?.sub;

  return useQuery({
    queryKey: ['member-profile-data', memberId],
    queryFn: () => getMemberProfileData(memberId as string | number),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProfileInterests = (memberProfileId?: number) => {
  return useQuery({
    queryKey: ['profile-interests', memberProfileId],
    queryFn: () => getProfileInterests(memberProfileId!),
    enabled: Boolean(memberProfileId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProfileFoods = (memberProfileId?: number) => {
  return useQuery({
    queryKey: ['profile-foods', memberProfileId],
    queryFn: () => getProfileFoods(memberProfileId!),
    enabled: Boolean(memberProfileId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProfileDays = (memberProfileId?: number) => {
  return useQuery({
    queryKey: ['profile-days', memberProfileId],
    queryFn: () => getProfileDays(memberProfileId!),
    enabled: Boolean(memberProfileId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProfileTransportations = (memberProfileId?: number) => {
  return useQuery({
    queryKey: ['profile-transportations', memberProfileId],
    queryFn: () => getProfileTransportations(memberProfileId!),
    enabled: Boolean(memberProfileId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProfileDateMoods = (memberProfileId?: number) => {
  return useQuery({
    queryKey: ['profile-date-moods', memberProfileId],
    queryFn: () => getProfileDateMoods(memberProfileId!),
    enabled: Boolean(memberProfileId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMemberRelations = () => {
  const { accessToken } = useAuthStore();
  const payload = decodeJwtPayload<{ sub?: string | number }>(accessToken);
  const memberId = payload?.sub;

  return useQuery({
    queryKey: ['member-relations', memberId],
    queryFn: () => getMemberRelations(memberId as string | number),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
};

// 프로필 업데이트 뮤테이션 훅들
export const useUpdateMemberProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberProfileId, profileData }: { memberProfileId: number; profileData: Partial<MemberProfileData> }) =>
      updateMemberProfile(memberProfileId, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-profile-data'] });
    },
  });
};

export const useUpdateProfileInterests = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberProfileId, interests }: { memberProfileId: number; interests: string[] }) =>
      updateProfileInterests(memberProfileId, interests),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-interests'] });
    },
  });
};

export const useUpdateProfileFoods = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberProfileId, foods }: { memberProfileId: number; foods: string[] }) =>
      updateProfileFoods(memberProfileId, foods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-foods'] });
    },
  });
};

export const useUpdateProfileDays = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberProfileId, days }: { memberProfileId: number; days: string[] }) =>
      updateProfileDays(memberProfileId, days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-days'] });
    },
  });
};

export const useUpdateProfileTransportations = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberProfileId, transportations }: { memberProfileId: number; transportations: string[] }) =>
      updateProfileTransportations(memberProfileId, transportations),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-transportations'] });
    },
  });
};

export const useUpdateProfileDateMoods = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberProfileId, moods }: { memberProfileId: number; moods: string[] }) =>
      updateProfileDateMoods(memberProfileId, moods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-date-moods'] });
    },
  });
};


