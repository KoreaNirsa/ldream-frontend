import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '@/components/profile/Profile';
import { 
  useMemberProfile, 
  useDetailedProfile,
  useMemberProfileData,
  useProfileInterests,
  useProfileFoods,
  useProfileDays,
  useProfileTransportations,
  useProfileDateMoods
} from '@/hooks/useMemberProfile';

const ProfileListPage = () => {
  const navigate = useNavigate();
  // API에서 회원 프로필 데이터 가져오기
  const { data: memberProfile } = useMemberProfile();
  // 상세 프로필 데이터 가져오기
  const { data: detailedProfile, isLoading, error } = useDetailedProfile();
  
  // 데이터베이스 스키마에 맞춘 새로운 훅들
  const { data: memberProfileData } = useMemberProfileData();
  const { data: profileInterests } = useProfileInterests(memberProfileData?.member_profile_id);
  const { data: profileFoods } = useProfileFoods(memberProfileData?.member_profile_id);
  const { data: profileDays } = useProfileDays(memberProfileData?.member_profile_id);
  const { data: profileTransportations } = useProfileTransportations(memberProfileData?.member_profile_id);
  const { data: profileDateMoods } = useProfileDateMoods(memberProfileData?.member_profile_id);

  useEffect(() => {
  }, []);

  // API 데이터를 기반으로 프로필 정보 설정
  const [profile, setProfile] = useState({
    nickname: detailedProfile?.nickname || memberProfile?.myNickname || "사랑스러운 사용자",
    interests: profileInterests?.map(interest => interest.category) || detailedProfile?.interests || [],
    name: detailedProfile?.name || "사용자",
    birthDate: detailedProfile?.birthDate || "1995-01-01",
    gender: detailedProfile?.gender || "여성",
    mbti: memberProfileData?.mbti || detailedProfile?.mbti || "ENFP",
    mileage: memberProfile?.mileage || 340,
    preferredDays: profileDays?.map(day => day.preferred_days) || detailedProfile?.preferredDays || [],
    timePreference: memberProfileData?.preferred_time || detailedProfile?.preferredTimeSlots?.[0] || "",
    budget: memberProfileData?.preferred_budget || detailedProfile?.preferredBudget || "",
    transportation: profileTransportations?.map(transport => transport.transportation) || detailedProfile?.transportation || [],
    activityType: "🎬 영화",
    communicationStyle: "💬 대화",
    relationshipGoals: ["💕 진지한 관계", "🎉 즐거운 데이트"],
    transport: profileTransportations?.map(transport => transport.transportation) || detailedProfile?.transportation || [],
    mood: profileDateMoods?.map(mood => mood.date_mood) || detailedProfile?.dateMood || [],
    relationshipStatus: memberProfileData?.relationship_status || detailedProfile?.relationshipStatus || "",
    dietary: profileFoods?.map(food => food.food_type) || detailedProfile?.foodPreferences || []
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
        foods: profileFoods.map(food => food.food_type),
        preferredDays: profileDays.map(day => day.preferred_days),
        transportation: profileTransportations.map(transport => transport.transportation),
        mood: profileDateMoods.map(mood => mood.date_mood)
      }));
    }
  }, [memberProfileData, profileInterests, profileFoods, profileDays, profileTransportations, profileDateMoods]);

  // API 데이터가 로드되면 프로필 정보 업데이트
  useEffect(() => {
    if (detailedProfile) {
             setProfile(prev => ({
         ...prev,
         nickname: detailedProfile.nickname || prev.nickname,
         interests: detailedProfile.interests || prev.interests,
        name: detailedProfile.name || prev.name,
        birthDate: detailedProfile.birthDate || prev.birthDate,
        gender: detailedProfile.gender || prev.gender,
        mbti: detailedProfile.mbti || prev.mbti,
        preferredDays: detailedProfile.preferredDays || prev.preferredDays,
        timePreference: detailedProfile.preferredTimeSlots?.[0] || prev.timePreference,
        budget: detailedProfile.preferredBudget || prev.budget,
        transportation: detailedProfile.transportation || prev.transportation,
        transport: detailedProfile.transportation || prev.transport,
        mood: detailedProfile.dateMood || prev.mood,
        relationshipStatus: detailedProfile.relationshipStatus || prev.relationshipStatus,
        dietary: detailedProfile.foodPreferences || prev.dietary
      }));
    }
  }, [detailedProfile]);

  const defaultPartnerProfile = {
    name: "파트너",
    nickname: memberProfile?.partnerNickname || "사랑스러운 파트너",
    interests: [],
    birthDate: "1995-06-15",
    mbti: "ISFJ",
    mileage: 280,
    relationshipType: "커플",
    preferredDays: [],
    timePreference: "",
    budget: "",
    transport: [],
    mood: [],
    dietary: []
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">프로필 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">프로필 정보를 불러오는데 실패했습니다.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">내 프로필</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/profile/edit')}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            프로필 편집
          </button>
          <button
            onClick={() => navigate('/profile/partner')}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            파트너 프로필
          </button>
        </div>
      </div>
      
      <Profile 
        profile={profile}
        setProfile={setProfile}
        partnerProfile={defaultPartnerProfile}
        isPartnerConnected={Boolean(memberProfile?.partnerNickname)}
        totalMileage={profile.mileage + defaultPartnerProfile.mileage}
      />
    </div>
  );
};

export default ProfileListPage; 