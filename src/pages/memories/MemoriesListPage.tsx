import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemoryList from '@/components/memories/MemoryList';

const MemoriesListPage = () => {
  const navigate = useNavigate();
  const [memoryFilter, setMemoryFilter] = useState("전체");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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

  const defaultMemories = [
    {
      id: 1,
      title: "첫 번째 데이트",
      date: "2024-01-15",
      location: "서울",
      photos: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"],
      memo: "정말 특별한 첫 번째 데이트였어요!",
      tags: ["첫 데이트", "로맨틱"],
      weather: "맑음",
      rating: 4.5,
      mood: "행복",
      isPublic: true,
      likes: 12,
      comments: 0,
      author: "지미니",
      mileage: 50,
      views: 128
    },
    {
      id: 2,
      title: "한강 피크닉",
      date: "2024-01-20",
      location: "한강공원",
      photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
      memo: "한강에서 즐긴 피크닉, 정말 좋았어요!",
      tags: ["피크닉", "야외"],
      weather: "맑음",
      rating: 3.5,
      mood: "평온",
      isPublic: true,
      likes: 8,
      comments: 0,
      author: "민수니",
      mileage: 30,
      views: 85
    },
    {
      id: 3,
      title: "영화관 데이트",
      date: "2024-01-25",
      location: "CGV 홍대점",
      photos: ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop"],
      memo: "영화를 함께 보며 즐거운 시간을 보냈어요",
      tags: ["영화", "실내"],
      weather: "흐림",
      rating: 5,
      mood: "설렘",
      isPublic: false,
      likes: 15,
      comments: 0,
      author: "지미니",
      mileage: 75,
      views: 156
    },
    {
      id: 4,
      title: "카페 투어",
      date: "2024-01-30",
      location: "홍대",
      photos: ["https://images.unsplash.com/photo-1501339847302-ac426a4a87c3?w=400&h=300&fit=crop"],
      memo: "홍대의 다양한 카페들을 탐방했어요",
      tags: ["카페", "투어"],
      weather: "맑음",
      rating: 4,
      mood: "즐거움",
      isPublic: true,
      likes: 6,
      comments: 0,
      author: "민수니",
      mileage: 25,
      views: 92
    },
    {
      id: 5,
      title: "해운대 해변 데이트",
      date: "2024-02-05",
      location: "부산 해운대",
      photos: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"],
      memo: "부산 해운대에서 즐긴 해변 데이트!",
      tags: ["해변", "여행"],
      weather: "맑음",
      rating: 4.5,
      mood: "신남",
      isPublic: true,
      likes: 20,
      comments: 0,
      author: "지미니",
      mileage: 100,
      views: 234
    },
    {
      id: 6,
      title: "제주도 여행",
      date: "2024-02-10",
      location: "제주도",
      photos: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"],
      memo: "제주도의 아름다운 풍경을 함께 즐겼어요",
      tags: ["여행", "제주도"],
      weather: "맑음",
      rating: 5,
      mood: "감동",
      isPublic: true,
      likes: 25,
      comments: 0,
      author: "민수니",
      mileage: 100,
      views: 234
    },
    {
      id: 7,
      title: "남산 타워 데이트",
      date: "2024-02-15",
      location: "서울 남산",
      photos: ["https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop"],
      memo: "남산에서 서울의 야경을 함께 감상했어요",
      tags: ["야경", "로맨틱"],
      weather: "맑음",
      rating: 4,
      mood: "로맨틱",
      isPublic: true,
      likes: 18,
      comments: 0,
      author: "지미니",
      mileage: 60,
      views: 167
    },
    {
      id: 8,
      title: "강남 쇼핑 데이트",
      date: "2024-02-20",
      location: "서울 강남",
      photos: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"],
      memo: "강남에서 쇼핑을 즐기며 즐거운 시간을 보냈어요",
      tags: ["쇼핑", "도시"],
      weather: "맑음",
      rating: 3.5,
      mood: "즐거움",
      isPublic: true,
      likes: 12,
      comments: 0,
      author: "민수니",
      mileage: 40,
      views: 103
    },
    {
      id: 9,
      title: "동대문 디자인 플라자",
      date: "2024-02-25",
      location: "서울 동대문",
      photos: ["https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop"],
      memo: "DDP에서 특별한 건축물을 감상했어요",
      tags: ["건축", "문화"],
      weather: "흐림",
      rating: 2.5,
      mood: "신기함",
      isPublic: true,
      likes: 15,
      comments: 0,
      author: "지미니",
      mileage: 20,
      views: 78
    }
  ];

  return (
    <div className="space-y-6">
      <MemoryList 
        memories={defaultMemories as any}
        memoryFilter={memoryFilter}
        setMemoryFilter={setMemoryFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedMemory={selectedMemory}
        setSelectedMemory={setSelectedMemory}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalPages={Math.ceil(defaultMemories.length / itemsPerPage)}
        onMemoryClick={(memory) => {
          navigate(`/memories/detail/${memory.id}`);
        }}
        onAddMemory={() => {
          navigate('/memories/create');
        }}
      />
    </div>
  );
};

export default MemoriesListPage; 