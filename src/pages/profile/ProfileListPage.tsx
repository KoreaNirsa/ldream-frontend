import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '@/components/profile/Profile';
import { useMemberProfile } from '@/hooks/useMemberProfile';

const ProfileListPage = () => {
  const navigate = useNavigate();
  // API에서 회원 프로필 데이터 가져오기
  const { data: memberProfile } = useMemberProfile();

  useEffect(() => {
    console.log('ProfileListPage loaded');
  }, []);

  const [profile, setProfile] = useState({
    nickname: memberProfile?.myNickname || "사랑스러운 사용자",
    locations: ["서울", "부산", "제주도"],
    interests: ["영화", "음악", "여행", "맛집 탐방"],
    name: "사용자",
    birthDate: "1995-01-01",
    mbti: "ENFP",
    mileage: memberProfile?.mileage || 340,
    preferredDays: ["토요일", "일요일"],
    timePreference: "🌙 저녁",
    budget: "3만원",
    transportation: "🚇 지하철",
    activityType: "🎬 영화",
    communicationStyle: "💬 대화",
    relationshipGoals: ["💕 진지한 관계", "🎉 즐거운 데이트"],
    transport: "🚇 지하철",
    mood: ["💕 로맨틱", "🍹 편안함"],
    relationshipStatus: "❤️ 연인과"
  });

  const defaultPartnerProfile = {
    name: "파트너",
    nickname: memberProfile?.partnerNickname || "사랑스러운 파트너",
    interests: ["영화", "음악", "여행", "카페 투어"],
    birthDate: "1995-06-15",
    mbti: "ISFJ",
    mileage: 280,
    relationshipType: "커플"
  };

  return (
    <div className="space-y-6">
      <Profile 
        profile={profile}
        setProfile={setProfile}
        partnerProfile={defaultPartnerProfile}
        isPartnerConnected={Boolean(memberProfile?.partnerNickname)}
        totalMileage={memberProfile?.mileage || 340}
      />
    </div>
  );
};

export default ProfileListPage; 