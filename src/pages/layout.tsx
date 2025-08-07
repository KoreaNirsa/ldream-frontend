import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  Cloud,
  Camera,
  Sparkles,
  Heart,
  Coins,
  Crown,
  User,
  Settings,
  LogOut,
  CreditCard,
  Calendar,
  MessageSquare,
  Share,
  History,
  Users,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPartnerConnected, setIsPartnerConnected] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>("사랑스러운 사용자");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout', {}, {
        withCredentials: true, // 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Logout successful');
      
      // 로컬 상태 업데이트
      setIsLoggedIn(false);
      setCurrentUser(null);
      
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem('token');
      
      // 로그인 페이지로 이동
      navigate('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      
      if (error.response) {
        // 서버에서 응답이 왔지만 에러인 경우
        console.error('Logout failed:', error.response.data);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error('Server connection failed');
      } else {
        // 요청 자체를 보내지 못한 경우
        console.error('Logout request failed');
      }
      
      // 에러가 발생해도 로컬 상태는 업데이트
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

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

  const totalMileage = 340;

  const navigation = [
    { name: '대시보드', path: '/', icon: '🏠' },
    { name: '우리만의 추억', path: '/memories', icon: '💕' },
    { name: '모두의 추억', path: '/shared-memories', icon: '🌟' },
    { name: '캘린더(준비중)', path: '/calendar', icon: '📅' },
    { name: 'AI 추천', path: '/recommendations', icon: '✨' },
    { name: 'AI 채팅', path: '/chat', icon: '💬' },
  ];

  const isActiveRoute = (path: string) => {
    // /memories/create 경로에서도 /memories 탭이 활성화되도록
    if (path === '/memories') {
      return location.pathname === path || location.pathname.startsWith('/memories/');
    }
    // /recommendations 경로에서도 /recommendations 탭이 활성화되도록
    if (path === '/recommendations') {
      return location.pathname === path || location.pathname.startsWith('/recommendations/');
    }
    return location.pathname === path;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 
                    className="text-2xl font-bold text-pink-600 cursor-pointer hover:text-pink-700 transition-colors"
                    onClick={() => navigate('/')}
                  >
                    💕 LovelyDream
                  </h1>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden lg:flex space-x-4 xl:space-x-8">
                <a href="#" className="text-gray-700 hover:text-pink-600 px-2 py-2 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
                  홈
                </a>
                <a href="#" className="text-gray-700 hover:text-pink-600 px-2 py-2 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
                  공지사항
                </a>
                <a href="#" className="text-gray-700 hover:text-pink-600 px-2 py-2 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
                  서비스 소개
                </a>
                <a href="#" className="text-gray-700 hover:text-pink-600 px-2 py-2 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
                  고객센터
                </a>
              </nav>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Weather */}
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                  <Cloud className="h-4 w-4" />
                  <span>{defaultWeather.temp}°C</span>
                  <span>{defaultWeather.condition}</span>
                </div>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        5
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="cursor-pointer">최근 활동</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-2 p-2">
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Camera className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">새로운 추억 추가</p>
                          <p className="text-xs text-gray-600">첫 데이트 추억을 작성했습니다</p>
                        </div>
                        <span className="text-xs text-gray-500">2시간 전</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">AI 추천 받기</p>
                          <p className="text-xs text-gray-600">로맨틱 데이트 코스를 추천받았습니다</p>
                        </div>
                        <span className="text-xs text-gray-500">1일 전</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Share className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">추억 공유</p>
                          <p className="text-xs text-gray-600">한강 피크닉 추억을 공유했습니다</p>
                        </div>
                        <span className="text-xs text-gray-500">3일 전</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Heart className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">좋아요 받음</p>
                          <p className="text-xs text-gray-600">누군가 당신의 추억에 좋아요를 눌렀습니다</p>
                        </div>
                        <span className="text-xs text-gray-500">5일 전</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">댓글 달림</p>
                          <p className="text-xs text-gray-600">누군가 당신의 추억에 댓글을 달았습니다</p>
                        </div>
                        <span className="text-xs text-gray-500">1주일 전</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/history')} className="cursor-pointer">
                      <History className="h-4 w-4 mr-2" />
                      알림 더보기
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:block text-sm font-medium">{currentUser}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="cursor-pointer">
                        {isPartnerConnected ? `${defaultProfile.nickname} & ${defaultPartnerProfile.nickname}` : defaultProfile.nickname}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        내 프로필
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/profile/partner')} className="cursor-pointer">
                        <Users className="h-4 w-4 mr-2" />
                        상대방 프로필
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/history')} className="cursor-pointer">
                        <History className="h-4 w-4 mr-2" />
                        활동 내역
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/history/usage')} className="cursor-pointer">
                        <History className="h-4 w-4 mr-2" />
                        사용 내역
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/management/subscription')} className="cursor-pointer">
                        <Crown className="h-4 w-4 mr-2" />
                        구독 관리
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/management/payment')} className="cursor-pointer">
                        <CreditCard className="h-4 w-4 mr-2" />
                        결제 관리
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="h-4 w-4 mr-2" />
                        설정
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        <LogOut className="h-4 w-4 mr-2" />
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => navigate('/login')}>
                      로그인/회원가입
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50">
                  홈
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50">
                  공지사항
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50">
                  서비스 소개
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50">
                  고객센터
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">
                {isLoggedIn ? `안녕하세요, ${currentUser}님! 💕` : "안녕하세요, 방문자님! 👋"}
              </h2>
              <p className="text-pink-100">
                {isLoggedIn
                  ? isPartnerConnected 
                    ? `${defaultPartnerProfile.nickname}님과 함께 오늘도 특별한 데이트를 계획해보세요 💕`
                    : "오늘도 특별한 데이트를 계획해보세요!"
                  : "로그인하고 특별한 데이트를 계획해보세요!"}
              </p>
              {isLoggedIn && (
                <div className="mt-4 flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4" />
                    <span>{defaultUserSubscription.plan === "premium" ? "프리미엄" : "무료"} 플랜</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins className="h-4 w-4" />
                    <span>마일리지: {totalMileage}P</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>추억: 4개</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>AI 추천: 3개</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap w-full gap-1">
              {navigation.map((item) => (
                <Button
                  key={item.path}
                  variant={isActiveRoute(item.path) ? "default" : "outline"}
                  onClick={() => navigate(item.path)}
                  className={`flex-1 rounded-lg px-2 sm:px-4 ${isActiveRoute(item.path) ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
                >
                  <span className="mr-1 sm:mr-2 text-xs sm:text-sm">{item.icon}</span>
                  <span className="text-xs sm:text-sm whitespace-nowrap">{item.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Page Content */}
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
