import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedMemories from '@/components/shared-memories/SharedMemories';
import MemoryDetail from '@/components/memories/MemoryDetail';
import MemoryWrite from '@/components/memories/MemoryWrite';

const SharedMemoriesPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  // 메모리 상세보기 및 작성 관련 상태
  const [showMemoryDetail, setShowMemoryDetail] = useState(false);
  const [showMemoryWrite, setShowMemoryWrite] = useState(false);
  const [selectedMemoryForDetail, setSelectedMemoryForDetail] = useState(null);

  const defaultMemories = [
    {
      id: 1,
      title: "첫 번째 데이트",
      date: "2024-01-15",
      description: "멋진 첫 번째 데이트였어요!",
      photos: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"],
      likes: 156,
      isPublic: true,
      isBest: true,
      location: "서울",
      memo: "정말 특별한 첫 번째 데이트였어요!",
      tags: ["첫 데이트", "로맨틱"],
      weather: "맑음",
      temperature: 18,
      mood: "행복",
      cost: 50000,
      rating: 5,
      comments: [],
      author: "지미니",
      views: 1280
    },
    {
      id: 2,
      title: "한강 피크닉",
      date: "2024-01-20",
      description: "한강에서 즐긴 특별한 피크닉",
      photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
      likes: 142,
      isPublic: true,
      isBest: true,
      location: "한강공원",
      memo: "한강에서 즐긴 피크닉, 정말 좋았어요!",
      tags: ["피크닉", "야외"],
      weather: "맑음",
      temperature: 20,
      mood: "즐거움",
      cost: 30000,
      rating: 4.5,
      views: 1150,
      author: "민수니"
    },
    {
      id: 3,
      title: "영화관 데이트",
      date: "2024-01-25",
      description: "CGV에서 본 영화",
      photos: ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop"],
      likes: 128,
      isPublic: true,
      isBest: true,
      location: "CGV 홍대점",
      memo: "영화를 함께 보며 즐거운 시간을 보냈어요",
      tags: ["영화", "실내"],
      weather: "흐림",
      temperature: 15,
      mood: "감동",
      cost: 40000,
      rating: 4,
      views: 980,
      author: "소영이"
    },
    {
      id: 4,
      title: "카페 투어",
      date: "2024-01-30",
      description: "홍대 카페들을 돌아보며",
      photos: ["https://images.unsplash.com/photo-1501339847302-ac426a4a87c3?w=400&h=300&fit=crop"],
      likes: 98,
      isPublic: true,
      isBest: true,
      location: "홍대",
      memo: "홍대의 다양한 카페들을 탐방했어요",
      tags: ["카페", "투어"],
      weather: "맑음",
      temperature: 22,
      mood: "신남",
      cost: 25000,
      rating: 4.5,
      views: 850,
      author: "준호"
    },
    {
      id: 5,
      title: "해운대 해변 데이트",
      date: "2024-02-05",
      description: "부산 해운대에서 즐긴 해변 데이트!",
      photos: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"],
      likes: 234,
      isPublic: true,
      isBest: true,
      location: "부산 해운대",
      memo: "부산 해운대에서 즐긴 해변 데이트!",
      tags: ["해변", "여행"],
      weather: "맑음",
      temperature: 25,
      mood: "신남",
      cost: 80000,
      rating: 5,
      views: 2100,
      author: "예진이"
    },
    {
      id: 6,
      title: "제주도 여행",
      date: "2024-02-10",
      description: "제주도의 아름다운 풍경을 함께 즐겼어요",
      photos: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"],
      likes: 189,
      isPublic: true,
      isBest: true,
      location: "제주도",
      memo: "제주도의 아름다운 풍경을 함께 즐겼어요",
      tags: ["여행", "제주도"],
      weather: "맑음",
      temperature: 18,
      mood: "감동",
      cost: 150000,
      rating: 5,
      views: 1750,
      author: "현우"
    },
    {
      id: 7,
      title: "남산 타워 데이트",
      date: "2024-02-15",
      description: "남산에서 서울의 야경을 함께 감상했어요",
      photos: ["https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop"],
      likes: 167,
      isPublic: true,
      isBest: true,
      location: "서울 남산",
      memo: "남산에서 서울의 야경을 함께 감상했어요",
      tags: ["야경", "로맨틱"],
      weather: "맑음",
      temperature: 12,
      mood: "로맨틱",
      cost: 60000,
      rating: 4.5,
      views: 1450,
      author: "미영이"
    },
    {
      id: 8,
      title: "강남 쇼핑 데이트",
      date: "2024-02-20",
      description: "강남에서 쇼핑을 즐기며 즐거운 시간을 보냈어요",
      photos: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"],
      likes: 103,
      isPublic: true,
      isBest: true,
      location: "서울 강남",
      memo: "강남에서 쇼핑을 즐기며 즐거운 시간을 보냈어요",
      tags: ["쇼핑", "도시"],
      weather: "맑음",
      temperature: 16,
      mood: "즐거움",
      cost: 120000,
      rating: 4,
      views: 920,
      author: "동현"
    },
    {
      id: 9,
      title: "동대문 디자인 플라자",
      date: "2024-02-25",
      description: "DDP에서 특별한 건축물을 감상했어요",
      photos: ["https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop"],
      likes: 78,
      isPublic: true,
      isBest: true,
      location: "서울 동대문",
      memo: "DDP에서 특별한 건축물을 감상했어요",
      tags: ["건축", "문화"],
      weather: "흐림",
      temperature: 8,
      mood: "신기함",
      cost: 20000,
      rating: 3.5,
      views: 650,
      author: "수진이"
    },
    {
      id: 10,
      title: "롯데월드 데이트",
      date: "2024-03-01",
      description: "롯데월드에서 즐긴 즐거운 시간!",
      photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
      likes: 145,
      isPublic: true,
      isBest: true,
      location: "서울 잠실",
      memo: "롯데월드에서 즐긴 즐거운 시간!",
      tags: ["놀이공원", "액티비티"],
      weather: "맑음",
      temperature: 14,
      mood: "신남",
      cost: 100000,
      rating: 4.5,
      views: 1320,
      author: "태현"
    },
    {
      id: 11,
      title: "일반 추억 1",
      date: "2024-03-05",
      description: "일반적인 추억입니다",
      photos: ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop"],
      likes: 45,
      isPublic: true,
      isBest: false,
      location: "서울",
      memo: "일반적인 추억입니다",
      tags: ["일반", "데이트"],
      weather: "맑음",
      temperature: 18,
      mood: "즐거움",
      cost: 30000,
      rating: 4,
      views: 320,
      author: "지은이"
    },
    {
      id: 12,
      title: "일반 추억 2",
      date: "2024-03-10",
      description: "또 다른 일반적인 추억입니다",
      photos: ["https://images.unsplash.com/photo-1501339847302-ac426a4a87c3?w=400&h=300&fit=crop"],
      likes: 32,
      isPublic: true,
      isBest: false,
      location: "부산",
      memo: "또 다른 일반적인 추억입니다",
      tags: ["일반", "여행"],
      weather: "맑음",
      temperature: 20,
      mood: "평온",
      cost: 50000,
      rating: 3.5,
      views: 280,
      author: "성민"
    }
  ];

  const sharedMemories = defaultMemories.filter(m => m.isPublic);
  const bestMemories = defaultMemories.filter(m => (m as any).isBest);

  return (
    <div className="space-y-6">
      {showMemoryDetail && selectedMemoryForDetail ? (
        <MemoryDetail
          memory={selectedMemoryForDetail}
          onBack={() => {
            setShowMemoryDetail(false);
            setSelectedMemoryForDetail(null);
          }}
          onEdit={() => {
            setShowMemoryDetail(false);
            setShowMemoryWrite(true);
          }}
          onDelete={() => {
            setShowMemoryDetail(false);
            setSelectedMemoryForDetail(null);
          }}
        />
      ) : showMemoryWrite ? (
        <MemoryWrite
          onBack={() => {
            setShowMemoryWrite(false);
            setSelectedMemoryForDetail(null);
          }}
          onSave={() => {
            setShowMemoryWrite(false);
            setSelectedMemoryForDetail(null);
          }}
          defaultPrivate={false}
        />
      ) : (
        <SharedMemories 
          viewMode={viewMode}
          setViewMode={setViewMode}
          memories={defaultMemories as any}
          sharedMemories={sharedMemories as any}
          bestMemories={bestMemories as any}
          selectedPost={selectedMemory as any}
          setSelectedPost={setSelectedMemory as any}
          sharedCurrentPage={currentPage}
          setSharedCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          sharedTotalPages={Math.ceil(sharedMemories.length / itemsPerPage)}
          renderPagination={(current, total, onChange) => (
            <div className="flex justify-center mt-4">
              <button 
                className="px-4 py-2 border rounded-l disabled:opacity-50"
                onClick={() => onChange(current - 1)} 
                disabled={current === 1}
              >
                이전
              </button>
              <span className="px-4 py-2 border-t border-b">{current} / {total}</span>
              <button 
                className="px-4 py-2 border rounded-r disabled:opacity-50"
                onClick={() => onChange(current + 1)} 
                disabled={current === total}
              >
                다음
              </button>
            </div>
          )}
          isLoggedIn={true}
          onLoginClick={() => console.log('Login clicked')}
          onMemoryClick={(memory) => {
            setSelectedMemoryForDetail(memory);
            setShowMemoryDetail(true);
          }}
          onAddMemory={() => {
            setSelectedMemoryForDetail(null);
            setShowMemoryWrite(true);
          }}
        />
      )}
    </div>
  );
};

export default SharedMemoriesPage; 