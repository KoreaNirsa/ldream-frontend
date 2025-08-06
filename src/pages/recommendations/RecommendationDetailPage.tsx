import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Calendar,
  Heart,
  MapPin,
  Sun,
  Cloud,
  MessageCircle,
  Coins,
  CheckCircle,
  Flower,
  Building,
  MapPin as LocationIcon,
  Clock,
  DollarSign,
  Utensils,
  Star
} from 'lucide-react';
import { useAppStore } from '@/types/store';

const RecommendationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recommendations } = useAppStore();
  
  // 추천 데이터 찾기
  const recommendation = recommendations.find(r => r.id === Number(id));
  
  if (!recommendation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">추천을 찾을 수 없습니다</h2>
          <Button onClick={() => navigate('/recommendations')}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // 코스별 추천 메뉴와 가격 데이터
  const courseDetails = {
    "반포 한강공원": {
      menu: ["한강공원 산책", "자전거 대여", "피크닉"],
      price: "무료",
      timeSlot: "오후 2시 ~ 6시",
      description: "한강의 아름다운 풍경을 감상하며 산책할 수 있는 곳입니다."
    },
    "세빛섬": {
      menu: ["세빛섬 카페", "전망대 관람", "야경 감상"],
      price: "15,000원",
      timeSlot: "저녁 6시 ~ 9시",
      description: "한강 위에 떠있는 아름다운 섬으로, 로맨틱한 분위기를 연출합니다."
    },
    "한강 카페": {
      menu: ["스페셜 커피", "디저트 세트", "전망 카페"],
      price: "8,000원",
      timeSlot: "오후 3시 ~ 5시",
      description: "한강을 바라보며 즐길 수 있는 특별한 카페입니다."
    },
    "반포대교 무지개분수": {
      menu: ["무지개분수 쇼", "야경 감상", "사진 촬영"],
      price: "무료",
      timeSlot: "저녁 7시 ~ 9시",
      description: "아름다운 무지개분수 쇼를 감상할 수 있는 곳입니다."
    },
    "홍대 거리공연": {
      menu: ["거리공연 감상", "스트리트 푸드", "쇼핑"],
      price: "무료",
      timeSlot: "저녁 6시 ~ 10시",
      description: "젊음의 거리에서 다양한 공연을 감상할 수 있습니다."
    },
    "카페 투어": {
      menu: ["특별 커피", "디저트", "인테리어 감상"],
      price: "12,000원",
      timeSlot: "오후 1시 ~ 5시",
      description: "독특한 분위기의 카페들을 둘러볼 수 있습니다."
    },
    "한강공원": {
      menu: ["산책", "자전거", "피크닉"],
      price: "무료",
      timeSlot: "오후 2시 ~ 6시",
      description: "한강의 아름다운 풍경을 감상할 수 있습니다."
    },
    "남산타워": {
      menu: ["전망대 관람", "레스토랑", "야경 감상"],
      price: "16,000원",
      timeSlot: "저녁 6시 ~ 9시",
      description: "서울의 아름다운 전경을 한눈에 볼 수 있습니다."
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">

        {/* 메인 카드 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                {recommendation.tags.includes('로맨틱') ? (
                  <Flower className="h-6 w-6 text-pink-400" />
                ) : (
                  <Building className="h-6 w-6 text-blue-400" />
                )}
                <CardTitle className="text-xl">{recommendation.title}</CardTitle>
              </div>
              <p className="text-sm text-gray-600">
                AI가 추천하는 맞춤 데이트 코스입니다
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>요청일: {recommendation.requestDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Heart className="h-4 w-4 text-red-500" />
                <span>데이트 예정일: {recommendation.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <LocationIcon className="h-4 w-4" />
                <span>지역: {recommendation.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {recommendation.weather === '맑음' ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Cloud className="h-4 w-4 text-gray-500" />
                )}
                <span>날씨: {recommendation.weather}</span>
              </div>
            </div>

            {/* 추천 코스 섹션 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-semibold text-gray-800">추천 코스 상세</h3>
              </div>
              
              <div className="space-y-4">
                {recommendation.course.map((stop, index) => {
                  const detail = courseDetails[stop as keyof typeof courseDetails] || {
                    menu: ["메뉴 정보 준비 중"],
                    price: "가격 정보 준비 중",
                    description: "상세 정보를 준비 중입니다."
                  };
                  
                  return (
                    <Card key={index} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                              {index + 1}번째
                            </Badge>
                            <h4 className="font-semibold text-gray-800">{stop}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{detail.price}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{detail.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Utensils className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">추천 코스&메뉴:</span>
                            <div className="flex flex-wrap gap-2 ml-2">
                              {detail.menu.map((menu, menuIndex) => (
                                <Badge key={menuIndex} variant="outline" className="text-xs">
                                  {menu}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">추천 시간대:</span>
                            <span className="text-gray-700">{detail.timeSlot}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* 예상 총 비용 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <h4 className="font-semibold text-blue-800">예상 총 비용</h4>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                * 가격은 실제 정보와 다를 수 있습니다. 참고용으로만 이용해주세요.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-800">
                  약 35,000원 ~ 50,000원
                </span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  예상 범위
                </Badge>
              </div>
            </div>

            {/* 데이트 팁 */}
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-pink-500" />
                <h4 className="font-semibold text-pink-800">데이트 팁</h4>
              </div>
              <ul className="text-sm text-pink-700 space-y-1">
                <li>• 각 장소별로 충분한 시간을 두고 여유롭게 이동하세요</li>
                <li>• 날씨에 따라 실내/실외 활동을 조절하세요</li>
                <li>• 사진 촬영을 위해 카메라나 폰을 준비하세요</li>
                <li>• 예약이 필요한 곳은 미리 확인하세요</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 하단 버튼 */}
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => navigate('/recommendations')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetailPage; 