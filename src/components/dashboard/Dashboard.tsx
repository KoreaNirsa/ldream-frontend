import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Cloud, MapPin, Heart, Calendar, TrendingUp, Sparkles, Camera, Gift, Droplets, CloudRain, Crown } from "lucide-react"

interface DashboardProps {
  weather: any
  profile: any
  partnerProfile: any
  userSubscription: any
  memories: any[]
  isPartnerConnected: boolean
  isLoggedIn: boolean
  onLoginClick: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ weather, profile, partnerProfile, userSubscription, memories, isPartnerConnected, isLoggedIn, onLoginClick }) => {
  // 기본값 설정 (원본 데이터로 복원)
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

  const defaultMemories = [
    {
      id: 1,
      title: "첫 번째 데이트",
      date: "2024-01-15",
      description: "멋진 첫 번째 데이트였어요!",
      photos: ["/placeholder.jpg"],
      likes: 12,
      isPublic: true
    },
    {
      id: 2,
      title: "한강 피크닉",
      date: "2024-01-20",
      description: "한강에서 즐긴 특별한 피크닉",
      photos: ["/placeholder.jpg"],
      likes: 8,
      isPublic: true
    },
    {
      id: 3,
      title: "영화관 데이트",
      date: "2024-01-25",
      description: "CGV에서 본 영화",
      photos: ["/placeholder.jpg"],
      likes: 15,
      isPublic: false
    },
    {
      id: 4,
      title: "카페 투어",
      date: "2024-01-30",
      description: "홍대 카페들을 돌아보며",
      photos: ["/placeholder.jpg"],
      likes: 6,
      isPublic: true
    }
  ];

  const safeWeather = weather || defaultWeather;
  const safeProfile = profile || defaultProfile;
  const safeMemories = memories || defaultMemories;

  return (
    <div className="space-y-6">
      {/* 날씨/지역 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Cloud className="h-5 w-5" />
              오늘의 날씨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-800">{safeWeather.temp}°C</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {safeWeather.condition}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
                <div className="flex items-center gap-1">
                  <Droplets className="h-3 w-3" />
                  습도: {safeWeather.humidity}%
                </div>
                <div className="flex items-center gap-1">
                  <CloudRain className="h-3 w-3" />
                  {safeWeather.condition} / 강수확률: {safeWeather.rainChance}%
                </div>
              </div>
              <div className="text-sm text-blue-600">
                미세먼지: <span className="font-semibold text-green-600">{safeWeather.dust}</span>
              </div>
              <p className="text-sm text-blue-600">🌤️ 야외 데이트하기 좋은 날씨예요!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <MapPin className="h-5 w-5" />
              선호 지역
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {safeProfile.locations.map((location: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                    📍 {location}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-green-600">📍 인기 장소 Top 3</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">
                    🏛️ 경복궁
                  </Badge>
                  <Badge variant="outline">
                    🌸 한강공원
                  </Badge>
                  <Badge variant="outline">☕ 홍대 카페거리</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 추가 대시보드 컨텐츠 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Heart className="h-5 w-5" />
              이번 주 추천
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-purple-600">🌸 벚꽃 명소 투어</p>
              <p className="text-sm text-purple-600">☕ 홍대 카페 호핑</p>
              <p className="text-sm text-purple-600">🎨 전시회 관람</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700">
              <Calendar className="h-5 w-5" />
              다가오는 기념일
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isLoggedIn ? (
              <div className="text-center py-4">
                <p className="text-sm text-rose-600">로그인 해야 이용이 가능해요!</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-rose-600">💕 100일: D-15</p>
                <p className="text-sm text-rose-600">🎂 생일: D-32</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <TrendingUp className="h-5 w-5" />
              데이트 통계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-amber-600">이번 달 데이트</span>
                <span className="text-lg font-bold text-amber-700">8회</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-amber-600">목표 대비 80% 달성</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 파트너 연결 상태 */}
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-700">
            <Sparkles className="h-5 w-5" />
            파트너 연결 상태
          </CardTitle>
          <CardDescription>
            {isPartnerConnected ? "파트너와 연결되어 있어요!" : "파트너와 연결해보세요"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isPartnerConnected ? (
            <div className="text-center py-8">
              <Crown className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">파트너와 연결되지 않았습니다</p>
              <p className="text-sm text-gray-500 mb-4">함께 사용하면 더 많은 기능을 이용할 수 있어요</p>
              <Button 
                className="bg-violet-500 hover:bg-violet-600"
                onClick={onLoginClick}
              >
                파트너 연결하기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-violet-200">
                <h4 className="font-semibold text-violet-800 mb-2">🌸 봄 데이트 특집</h4>
                <p className="text-sm text-violet-600 mb-3">
                  벚꽃이 만개한 한강공원에서 로맨틱한 피크닉은 어떠세요?
                </p>
                <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
                  자세히 보기
                </Button>
              </div>
              <div className="p-4 bg-white rounded-lg border border-violet-200">
                <h4 className="font-semibold text-violet-800 mb-2">☕ 카페 투어</h4>
                <p className="text-sm text-violet-600 mb-3">
                  홍대 감성 카페들을 돌아보며 특별한 하루를 만들어보세요
                </p>
                <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
                  자세히 보기
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 최근 추억들 */}
      <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-rose-700">
            <Camera className="h-5 w-5" />
            최근 추억들 📸
          </CardTitle>
          <CardDescription>
            {isLoggedIn ? "최근에 기록한 소중한 순간들을 다시 만나보세요" : "로그인 해야 이용이 가능해요!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoggedIn ? (
            <div className="text-center py-8">
              <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">로그인이 필요한 서비스입니다</p>
              <p className="text-sm text-gray-500 mb-4">추억을 확인하려면 로그인해주세요</p>
              <Button 
                className="bg-rose-500 hover:bg-rose-600"
                onClick={onLoginClick}
              >
                로그인하기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {safeMemories.slice(0, 4).map((memory: any) => (
                <div key={memory.id} className="relative group cursor-pointer">
                  <img
                    src={memory.photos?.[0] || "/src/assets/placeholder.jpg"}
                    alt={memory.title}
                    className="w-full h-24 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/src/assets/placeholder.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="text-xs font-semibold">{memory.title}</p>
                      <p className="text-xs">{memory.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 특별 제휴 혜택 */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Gift className="h-5 w-5" />
            특별 제휴 혜택 🎁
          </CardTitle>
          <CardDescription>파트너사와의 특별한 혜택을 놓치지 마세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">🍽️ 카카오 예약</h4>
              <p className="text-sm text-orange-700 mb-3">레스토랑 예약 시 최대 20% 할인</p>
              <Badge className="bg-orange-100 text-orange-700">~3/31</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">🎬 CGV</h4>
              <p className="text-sm text-orange-700 mb-3">영화 티켓 2매 구매 시 팝콘 무료</p>
              <Badge className="bg-orange-100 text-orange-700">상시</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard 