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
  useProfileDateMoods,
  useProfileData
} from '@/hooks/useMemberProfile';

const ProfileListPage = () => {
  const navigate = useNavigate();
  // API에서 회원 프로필 데이터 가져오기
  const { data: memberProfile } = useMemberProfile();
  // 상세 프로필 데이터 가져오기
  const { data: detailedProfile } = useDetailedProfile();
  // 새로운 API 응답 구조에 맞는 프로필 데이터
  const { data: profileData, isLoading, error } = useProfileData();
  
  // 데이터베이스 스키마에 맞춘 새로운 훅들
  const { data: memberProfileData } = useMemberProfileData();
  const { data: profileInterests } = useProfileInterests(memberProfileData?.member_profile_id);
  const { data: profileFoods } = useProfileFoods(memberProfileData?.member_profile_id);
  const { data: profileDays } = useProfileDays(memberProfileData?.member_profile_id);
  const { data: profileTransportations } = useProfileTransportations(memberProfileData?.member_profile_id);
  const { data: profileDateMoods } = useProfileDateMoods(memberProfileData?.member_profile_id);

  useEffect(() => {
  }, []);

  // 새로운 API 응답 데이터를 기반으로 프로필 정보 설정
  const [profile, setProfile] = useState({
    nickname: profileData?.result?.nickname || detailedProfile?.nickname || memberProfile?.myNickname || "사랑스러운 사용자",
    interests: profileData?.result?.interests || profileInterests?.map(interest => interest.category) || detailedProfile?.interests || [],
    name: profileData?.result?.name || detailedProfile?.name || "사용자",
    birthDate: profileData?.result?.birthDate || detailedProfile?.birthDate || "1995-01-01",
    gender: profileData?.result?.gender === 'M' ? '남성' : profileData?.result?.gender === 'F' ? '여성' : detailedProfile?.gender || "여성",
    mbti: profileData?.result?.mbti || memberProfileData?.mbti || detailedProfile?.mbti || "ENFP",
    mileage: memberProfile?.mileage || 340,
    preferredDays: profileData?.result?.preferredDays || profileDays?.map(day => day.preferred_days) || detailedProfile?.preferredDays || [],
    timePreference: profileData?.result?.preferredTime || memberProfileData?.preferred_time || detailedProfile?.preferredTimeSlots?.[0] || "",
    budget: profileData?.result?.preferredBudget || memberProfileData?.preferred_budget || detailedProfile?.preferredBudget || "",
    transportation: profileData?.result?.transportation || profileTransportations?.map(transport => transport.transportation) || detailedProfile?.transportation || [],
    activityType: "🎬 영화",
    communicationStyle: "💬 대화",
    relationshipGoals: ["💕 진지한 관계", "🎉 즐거운 데이트"],
    transport: profileData?.result?.transportation || profileTransportations?.map(transport => transport.transportation) || detailedProfile?.transportation || [],
    mood: profileData?.result?.dateMood || profileDateMoods?.map(mood => mood.date_mood) || detailedProfile?.dateMood || [],
    relationshipStatus: profileData?.result?.relationshipStatus || memberProfileData?.relationship_status || detailedProfile?.relationshipStatus || "",
    dietary: profileData?.result?.foodTypes || profileFoods?.map(food => food.food_type) || detailedProfile?.foodPreferences || [],
    preferredRegion: profileData?.result?.preferredRegion || ""
  });

  // 새로운 API 응답 데이터가 로드되면 프로필 정보 업데이트
  useEffect(() => {
    if (profileData?.result) {
      setProfile(prev => ({
        ...prev,
        nickname: profileData.result.nickname || prev.nickname,
        interests: profileData.result.interests || prev.interests,
        name: profileData.result.name || prev.name,
        birthDate: profileData.result.birthDate || prev.birthDate,
        gender: profileData.result.gender === 'M' ? '남성' : profileData.result.gender === 'F' ? '여성' : prev.gender,
        mbti: profileData.result.mbti || prev.mbti,
        preferredDays: profileData.result.preferredDays || prev.preferredDays,
        timePreference: profileData.result.preferredTime || prev.timePreference,
        budget: profileData.result.preferredBudget || prev.budget,
        transportation: profileData.result.transportation || prev.transportation,
        transport: profileData.result.transportation || prev.transport,
        mood: profileData.result.dateMood || prev.mood,
        relationshipStatus: profileData.result.relationshipStatus || prev.relationshipStatus,
        dietary: profileData.result.foodTypes || prev.dietary,
        preferredRegion: profileData.result.preferredRegion || prev.preferredRegion
      }));
    }
  }, [profileData]);

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