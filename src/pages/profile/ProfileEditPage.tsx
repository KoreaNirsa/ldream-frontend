import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileEdit from '@/components/profile/ProfileEdit';
import { 
  useMemberProfile, 
  useMemberProfileData,
  useProfileInterests,
  useProfileFoods,
  useProfileDays,
  useProfileTransportations,
  useProfileDateMoods,
  useUpdateMemberProfile,
  useUpdateProfileInterests,
  useUpdateProfileFoods,
  useUpdateProfileDays,
  useUpdateProfileTransportations,
  useUpdateProfileDateMoods
} from '@/hooks/useMemberProfile';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  
  // API에서 회원 프로필 데이터 가져오기
  const { data: memberProfile } = useMemberProfile();
  const { data: memberProfileData } = useMemberProfileData();
  const { data: profileInterests } = useProfileInterests(memberProfileData?.member_profile_id);
  const { data: profileFoods } = useProfileFoods(memberProfileData?.member_profile_id);
  const { data: profileDays } = useProfileDays(memberProfileData?.member_profile_id);
  const { data: profileTransportations } = useProfileTransportations(memberProfileData?.member_profile_id);
  const { data: profileDateMoods } = useProfileDateMoods(memberProfileData?.member_profile_id);

  // 업데이트 뮤테이션 훅들
  const updateMemberProfileMutation = useUpdateMemberProfile();
  const updateProfileInterestsMutation = useUpdateProfileInterests();
  const updateProfileFoodsMutation = useUpdateProfileFoods();
  const updateProfileDaysMutation = useUpdateProfileDays();
  const updateProfileTransportationsMutation = useUpdateProfileTransportations();
  const updateProfileDateMoodsMutation = useUpdateProfileDateMoods();

  const [profile, setProfile] = useState({
    nickname: memberProfile?.myNickname || "사랑스러운 사용자",
    interests: profileInterests?.map(interest => interest.category) || [],
    name: "사용자",
    birthDate: "1995-01-01",
    mbti: memberProfileData?.mbti || "ENFP",
    mileage: memberProfile?.mileage || 340,
    preferredDays: profileDays?.map(day => day.preferred_days) || [],
    timePreference: memberProfileData?.preferred_time || "",
    budget: memberProfileData?.preferred_budget || "",
    transportation: profileTransportations?.map(transport => transport.transportation) || [],
    dateMood: profileDateMoods?.map(mood => mood.date_mood) || [],
    relationshipStatus: memberProfileData?.relationship_status || "",
    foodPreferences: profileFoods?.map(food => food.food_type) || []
  });

  // API 데이터가 로드되면 프로필 정보 업데이트
  useEffect(() => {
    if (memberProfileData && profileInterests && profileFoods && profileDays && profileTransportations && profileDateMoods) {
      setProfile(prev => ({
        ...prev,
        mbti: memberProfileData.mbti || prev.mbti,
        timePreference: memberProfileData.preferred_time || prev.timePreference,
        budget: memberProfileData.preferred_budget || prev.budget,
        relationshipStatus: memberProfileData.relationship_status || prev.relationshipStatus,
        interests: profileInterests.map(interest => interest.category),
        foodPreferences: profileFoods.map(food => food.food_type),
        preferredDays: profileDays.map(day => day.preferred_days),
        transportation: profileTransportations.map(transport => transport.transportation),
        dateMood: profileDateMoods.map(mood => mood.date_mood)
      }));
    }
  }, [memberProfileData, profileInterests, profileFoods, profileDays, profileTransportations, profileDateMoods]);

  const handleSave = async (updatedProfile: any) => {
    try {
      if (memberProfileData?.member_profile_id) {
        // 기본 프로필 정보 업데이트
        await updateMemberProfileMutation.mutateAsync({
          memberProfileId: memberProfileData.member_profile_id,
          profileData: {
            mbti: updatedProfile.mbti,
            preferred_time: updatedProfile.timePreference,
            preferred_budget: updatedProfile.budget,
            relationship_status: updatedProfile.relationshipStatus
          }
        });

        // 관심사 업데이트
        if (updatedProfile.interests) {
          await updateProfileInterestsMutation.mutateAsync({
            memberProfileId: memberProfileData.member_profile_id,
            interests: updatedProfile.interests
          });
        }

        // 음식 취향 업데이트
        if (updatedProfile.foodPreferences) {
          await updateProfileFoodsMutation.mutateAsync({
            memberProfileId: memberProfileData.member_profile_id,
            foods: updatedProfile.foodPreferences
          });
        }

        // 선호 요일 업데이트
        if (updatedProfile.preferredDays) {
          await updateProfileDaysMutation.mutateAsync({
            memberProfileId: memberProfileData.member_profile_id,
            days: updatedProfile.preferredDays
          });
        }

        // 교통수단 업데이트
        if (updatedProfile.transportation) {
          await updateProfileTransportationsMutation.mutateAsync({
            memberProfileId: memberProfileData.member_profile_id,
            transportations: updatedProfile.transportation
          });
        }

        // 데이트 분위기 업데이트
        if (updatedProfile.dateMood) {
          await updateProfileDateMoodsMutation.mutateAsync({
            memberProfileId: memberProfileData.member_profile_id,
            moods: updatedProfile.dateMood
          });
        }
      }

      navigate('/profile/list');
    } catch (error) {
      console.error('프로필 저장 중 오류 발생:', error);
      // 에러 처리 로직 추가
    }
  };

  const defaultPartnerProfile = {
    name: "파트너",
    nickname: memberProfile?.partnerNickname || "사랑스러운 파트너",
    interests: [],
    birthDate: "1995-06-15",
    mbti: "ISFJ",
    mileage: 280,
    relationshipType: "커플"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">프로필 편집</h1>
        <button
          onClick={() => navigate('/profile/list')}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          뒤로 가기
        </button>
      </div>
      
      <ProfileEdit 
        profile={profile}
        onSave={handleSave}
        onCancel={() => {
          navigate('/profile/list');
        }}
      />
    </div>
  );
};

export default ProfileEditPage; 