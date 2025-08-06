import React from 'react';
import { useNavigate } from 'react-router-dom';
import MemoryCreate from '@/components/memories/MemoryCreate';

const MemoriesCreatePage = () => {
  const navigate = useNavigate();

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

  return (
    <div className="space-y-6">
      <MemoryCreate 
        onBack={() => {
          navigate('/memories');
          // 스크롤을 상단으로 이동
          window.scrollTo(0, 0);
        }}
        onSave={(memoryData) => {
          // 메모리 저장 로직
          console.log('Memory saved:', memoryData);
          navigate('/memories');
          // 스크롤을 상단으로 이동
          window.scrollTo(0, 0);
        }}
        defaultPrivate={true}
      />
    </div>
  );
};

export default MemoriesCreatePage; 