import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationForm from '@/components/RecommendationForm';

const RecommendationsCreatePage = () => {
  const navigate = useNavigate();

  const defaultProfile = {
    name: "사용자",
    nickname: "사랑스러운 사용자",
    birthDate: "1995-01-01",
    interests: ["영화", "음악", "여행", "맛집 탐방"],
    timePreference: "오후",
    budget: "3만원 이하",
    transport: "지하철",
    mood: ["행복", "즐거움"],
    dietary: ["한식"],
    relationshipStatus: "연인과",
    locations: ["서울", "부산", "제주도"],
    mbti: "ENFP",
    preferredDays: ["토요일", "일요일"],
    mileage: 1000
  };

  const defaultPartnerProfile = {
    name: "파트너",
    nickname: "사랑스러운 파트너",
    birthDate: "1995-01-01",
    interests: ["영화", "음악", "여행", "카페 투어"],
    timePreference: "오후",
    budget: "3만원 이하",
    transport: "지하철",
    mood: ["행복", "즐거움"],
    dietary: ["한식"],
    relationshipStatus: "연인과",
    locations: ["서울", "부산", "제주도"],
    mbti: "ENFP",
    preferredDays: ["토요일", "일요일"],
    mileage: 1000
  };

  return (
    <div className="space-y-6">
      <RecommendationForm 
        onClose={() => {
          navigate('/recommendations/list');
          // 스크롤을 상단으로 이동
          window.scrollTo(0, 0);
        }}
        onSubmit={() => {
          // 추천 생성 로직
          console.log('Recommendation created');
          navigate('/recommendations/list');
          // 스크롤을 상단으로 이동
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
};

export default RecommendationsCreatePage; 