import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerProfile from '@/components/profile/PartnerProfile';

const ProfilePartnerPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    nickname: "사랑스러운 사용자",
    locations: ["서울", "부산", "제주도"],
    interests: ["영화", "음악", "여행", "맛집 탐방"],
    name: "사용자",
    birthDate: "1995-01-01",
    mbti: "ENFP",
    mileage: 340,
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
    nickname: "사랑스러운 파트너",
    interests: ["영화", "음악", "여행", "카페 투어"],
    birthDate: "1995-06-15",
    mbti: "ISFJ",
    mileage: 280,
    relationshipType: "커플",
    locations: ["서울", "부산", "제주도"],
    preferredDays: ["토요일", "일요일"],
    timePreference: "🌙 저녁",
    budget: "3만원",
    transport: "🚇 지하철",
    mood: "😊 편안한",
    dietary: ["한식", "카페", "디저트"]
  };

  return (
    <div className="space-y-6">
      <PartnerProfile 
        partnerProfile={defaultPartnerProfile}
        profile={profile}
        isPartnerConnected={false}
      />
    </div>
  );
};

export default ProfilePartnerPage; 