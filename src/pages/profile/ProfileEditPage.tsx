import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileEdit from '@/components/profile/ProfileEdit';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    nickname: "사랑스러운 사용자",
    locations: ["서울", "부산", "제주도"],
    interests: ["영화", "음악", "여행", "맛집 탐방"],
    name: "사용자",
    birthDate: "1995-01-01",
    mbti: "ENFP",
    mileage: 340
  });

  const defaultPartnerProfile = {
    name: "파트너",
    nickname: "사랑스러운 파트너",
    interests: ["영화", "음악", "여행", "카페 투어"],
    birthDate: "1995-06-15",
    mbti: "ISFJ",
    mileage: 280,
    relationshipType: "커플"
  };

  return (
    <div className="space-y-6">
      <ProfileEdit 
        profile={profile}
        onSave={(updatedProfile) => {
          // 프로필 저장 로직
          console.log('Profile saved:', updatedProfile);
          navigate('/profile/list');
        }}
        onCancel={() => {
          navigate('/profile/list');
        }}
      />
    </div>
  );
};

export default ProfileEditPage; 