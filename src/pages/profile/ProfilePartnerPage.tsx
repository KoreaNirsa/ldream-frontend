import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerProfile from '@/components/profile/PartnerProfile';
import { 
  useMemberProfile, 
  useMemberProfileData,
  useProfileInterests,
  useProfileFoods,
  useProfileDays,
  useProfileTransportations,
  useProfileDateMoods
} from '@/hooks/useMemberProfile';

const ProfilePartnerPage = () => {
  const navigate = useNavigate();
  
  // API에서 회원 프로필 데이터 가져오기
  const { data: memberProfile } = useMemberProfile();
  const { data: memberProfileData } = useMemberProfileData();
  const { data: profileInterests } = useProfileInterests(memberProfileData?.member_profile_id);
  const { data: profileFoods } = useProfileFoods(memberProfileData?.member_profile_id);
  const { data: profileDays } = useProfileDays(memberProfileData?.member_profile_id);
  const { data: profileTransportations } = useProfileTransportations(memberProfileData?.member_profile_id);
  const { data: profileDateMoods } = useProfileDateMoods(memberProfileData?.member_profile_id);

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
    activityType: "🎬 영화",
    communicationStyle: "💬 대화",
    relationshipGoals: ["💕 진지한 관계", "🎉 즐거운 데이트"],
    transport: profileTransportations?.map(transport => transport.transportation) || [],
    mood: profileDateMoods?.map(mood => mood.date_mood) || [],
    relationshipStatus: memberProfileData?.relationship_status || "",
    dietary: profileFoods?.map(food => food.food_type) || []
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
        dietary: profileFoods.map(food => food.food_type),
        preferredDays: profileDays.map(day => day.preferred_days),
        transportation: profileTransportations.map(transport => transport.transportation),
        transport: profileTransportations.map(transport => transport.transportation),
        mood: profileDateMoods.map(mood => mood.date_mood)
      }));
    }
  }, [memberProfileData, profileInterests, profileFoods, profileDays, profileTransportations, profileDateMoods]);

  // 파트너 정보 가져오기
  const getPartnerProfile = () => {
    // 현재는 하드코딩된 파트너 프로필을 반환
    // 실제 구현에서는 파트너의 프로필 데이터를 API로 가져와야 함
    return {
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
  };

  const partnerProfile = getPartnerProfile();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">파트너 프로필</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/profile/list')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            내 프로필
          </button>
          <button
            onClick={() => navigate('/profile/edit')}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            프로필 편집
          </button>
        </div>
      </div>
      
      {partnerProfile ? (
        <PartnerProfile 
          partnerProfile={partnerProfile}
          profile={profile}
          isPartnerConnected={Boolean(memberProfile?.partnerNickname)}
        />
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">파트너가 연결되지 않았습니다</h2>
          <p className="text-gray-600 mb-6">파트너와 연결하여 함께하는 추억을 만들어보세요!</p>
          <button
            onClick={() => navigate('/profile/list')}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            파트너 연결하기
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePartnerPage; 