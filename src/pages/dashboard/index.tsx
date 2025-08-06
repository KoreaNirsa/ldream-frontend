import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage = () => {
  // 기본 데이터 설정
  const defaultWeather = {
    temp: 18,
    condition: "맑음",
    humidity: 45,
    rainChance: 0,
    dust: "좋음"
  };

  const defaultProfile = {
    nickname: "사랑스러운 사용자",
    locations: ["서울", "부산", "제주도"],
    interests: ["영화", "음악", "여행", "맛집 탐방"]
  };

  const defaultPartnerProfile = {
    name: "파트너",
    nickname: "사랑스러운 파트너",
    interests: ["영화", "음악", "여행", "카페 투어"]
  };

  const defaultUserSubscription = {
    plan: "premium",
    features: ["기본 기능", "프리미엄 기능", "AI 추천", "무제한 저장"]
  };

  const defaultMemories = [
    {
      id: 1,
      title: "첫 번째 데이트",
      date: "2024-01-15",
      description: "멋진 첫 번째 데이트였어요!",
      photos: ["/placeholder.jpg"],
      likes: 12,
      isPublic: true,
      location: "서울",
      memo: "정말 특별한 첫 번째 데이트였어요!",
      tags: ["첫 데이트", "로맨틱"],
      weather: "맑음",
      temperature: 18,
      mood: "행복",
      cost: 50000,
      rating: 5,
      comments: [],
      author: "사용자"
    },
    {
      id: 2,
      title: "한강 피크닉",
      date: "2024-01-20",
      description: "한강에서 즐긴 특별한 피크닉",
      photos: ["/placeholder.jpg"],
      likes: 8,
      isPublic: true,
      location: "한강공원",
      memo: "한강에서 즐긴 피크닉, 정말 좋았어요!",
      tags: ["피크닉", "야외"],
      weather: "맑음",
      temperature: 20,
      mood: "즐거움",
      cost: 30000
    },
    {
      id: 3,
      title: "영화관 데이트",
      date: "2024-01-25",
      description: "CGV에서 본 영화",
      photos: ["/placeholder.jpg"],
      likes: 15,
      isPublic: false,
      location: "CGV 홍대점",
      memo: "영화를 함께 보며 즐거운 시간을 보냈어요",
      tags: ["영화", "실내"],
      weather: "흐림",
      temperature: 15,
      mood: "감동",
      cost: 40000
    },
    {
      id: 4,
      title: "카페 투어",
      date: "2024-01-30",
      description: "홍대 카페들을 돌아보며",
      photos: ["/placeholder.jpg"],
      likes: 6,
      isPublic: true,
      location: "홍대",
      memo: "홍대의 다양한 카페들을 탐방했어요",
      tags: ["카페", "투어"],
      weather: "맑음",
      temperature: 22,
      mood: "신남",
      cost: 25000
    }
  ];

  return (
    <div className="space-y-6">
      <Dashboard 
        weather={defaultWeather}
        profile={defaultProfile}
        partnerProfile={defaultPartnerProfile}
        userSubscription={defaultUserSubscription}
        memories={defaultMemories}
        isPartnerConnected={true}
        isLoggedIn={true}
        onLoginClick={() => console.log('Login clicked')}
      />
    </div>
  );
};

export default DashboardPage; 