import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MemoryDetail from '@/components/memories/MemoryDetail';

const MemoriesDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // 페이지 진입 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const defaultMemories = [
    {
      id: 1,
      title: "첫 번째 데이트",
      description: "정말 특별한 첫 번째 데이트였어요!",
      date: "2024-01-15",
      location: "서울",
      photos: ["/placeholder.jpg"],
      memo: "정말 특별한 첫 번째 데이트였어요!",
      tags: ["첫 데이트", "로맨틱"],
      weather: "맑음",
      rating: 5,
      mood: "행복",
      isPublic: true,
      likes: 12,
      comments: 0,
      author: "사용자"
    },
    {
      id: 2,
      title: "한강 피크닉",
      description: "한강에서 즐긴 피크닉, 정말 좋았어요!",
      date: "2024-01-20",
      location: "한강공원",
      photos: ["/placeholder.jpg"],
      memo: "한강에서 즐긴 피크닉, 정말 좋았어요!",
      tags: ["피크닉", "야외"],
      weather: "맑음",
      rating: 4,
      mood: "평온",
      isPublic: true,
      likes: 8,
      comments: 0,
      author: "사용자"
    },
    {
      id: 3,
      title: "영화관 데이트",
      description: "영화를 함께 보며 즐거운 시간을 보냈어요",
      date: "2024-01-25",
      location: "CGV 홍대점",
      photos: ["/placeholder.jpg"],
      memo: "영화를 함께 보며 즐거운 시간을 보냈어요",
      tags: ["영화", "실내"],
      weather: "흐림",
      rating: 5,
      mood: "설렘",
      isPublic: false,
      likes: 15,
      comments: 0,
      author: "사용자"
    },
    {
      id: 4,
      title: "카페 투어",
      description: "홍대의 다양한 카페들을 탐방했어요",
      date: "2024-01-30",
      location: "홍대",
      photos: ["/placeholder.jpg"],
      memo: "홍대의 다양한 카페들을 탐방했어요",
      tags: ["카페", "투어"],
      weather: "맑음",
      rating: 4,
      mood: "즐거움",
      isPublic: true,
      likes: 6,
      comments: 0,
      author: "사용자"
    }
  ];

  const selectedMemory = defaultMemories.find(memory => memory.id === Number(id));

  if (!selectedMemory) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">메모리를 찾을 수 없습니다.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MemoryDetail
        memory={selectedMemory}
        onBack={() => {
          navigate(-1);
        }}
        onEdit={() => {
          navigate(`/memories/edit/${id}`);
        }}
        onDelete={() => {
          // 삭제 로직
          console.log('Memory deleted:', id);
          navigate(-1);
        }}
      />
    </div>
  );
};

export default MemoriesDetailPage; 