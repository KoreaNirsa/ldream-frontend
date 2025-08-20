import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Activity, CreditCard, Camera, Sparkles, Heart, Share, MessageSquare, FileText, Users, Coins, ArrowUpRight } from 'lucide-react';

const HistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUsageHistory = location.pathname.includes('/usage');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // 활동 내역 데이터 - 더 많은 샘플 데이터 추가
  const activityHistory = [
    {
      id: 1,
      type: 'memory',
      title: '새로운 추억 추가',
      description: '첫 데이트 추억을 작성했습니다',
      timestamp: '2시간 전',
      icon: Camera,
      color: 'blue'
    },
    {
      id: 2,
      type: 'ai',
      title: 'AI 추천 받기',
      description: '로맨틱 데이트 코스를 추천받았습니다',
      timestamp: '1일 전',
      icon: Sparkles,
      color: 'green'
    },
    {
      id: 3,
      type: 'share',
      title: '추억 공유',
      description: '한강 피크닉 추억을 공유했습니다',
      timestamp: '3일 전',
      icon: Share,
      color: 'purple'
    },
    {
      id: 4,
      type: 'like',
      title: '좋아요 받음',
      description: '누군가 당신의 추억에 좋아요를 눌렀습니다',
      timestamp: '5일 전',
      icon: Heart,
      color: 'yellow'
    },
    {
      id: 5,
      type: 'comment',
      title: '댓글 달림',
      description: '누군가 당신의 추억에 댓글을 달았습니다',
      timestamp: '1주일 전',
      icon: MessageSquare,
      color: 'red'
    },
    {
      id: 6,
      type: 'memory',
      title: '영화관 데이트 추억',
      description: '영화관에서 즐거운 시간을 보냈습니다',
      timestamp: '1주일 전',
      icon: Camera,
      color: 'blue'
    },
    {
      id: 7,
      type: 'ai',
      title: 'AI 채팅 사용',
      description: '데이트 장소에 대해 AI와 상담했습니다',
      timestamp: '2주일 전',
      icon: Sparkles,
      color: 'green'
    },
    {
      id: 8,
      type: 'share',
      title: '카페 투어 공유',
      description: '홍대 카페 투어 추억을 공유했습니다',
      timestamp: '2주일 전',
      icon: Share,
      color: 'purple'
    },
    {
      id: 9,
      type: 'like',
      title: '좋아요 받음',
      description: '카페 투어 추억에 좋아요를 받았습니다',
      timestamp: '3주일 전',
      icon: Heart,
      color: 'yellow'
    },
    {
      id: 10,
      type: 'comment',
      title: '댓글 달림',
      description: '영화관 데이트 추억에 댓글이 달렸습니다',
      timestamp: '3주일 전',
      icon: MessageSquare,
      color: 'red'
    },
    {
      id: 11,
      type: 'memory',
      title: '공원 산책 추억',
      description: '한강공원에서 산책하며 즐거운 시간을 보냈습니다',
      timestamp: '4주일 전',
      icon: Camera,
      color: 'blue'
    },
    {
      id: 12,
      type: 'ai',
      title: 'AI 추천 받기',
      description: '주말 데이트 코스를 추천받았습니다',
      timestamp: '4주일 전',
      icon: Sparkles,
      color: 'green'
    }
  ];

  // 인연 요청 상태
  const [hasConnectionRequest, setHasConnectionRequest] = useState(true);
  const [connectionRequest, setConnectionRequest] = useState({
    from: "사랑스러운 파트너",
    message: "인연 요청이 도착했어요! 💕"
  });

  // 승인/거절 관련 상태
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectConfirmDialog, setShowRejectConfirmDialog] = useState(false);
  const [showRejectSuccessDialog, setShowRejectSuccessDialog] = useState(false);

  const handleAcceptConnection = () => {
    // 인연 요청 승인 로직
    setHasConnectionRequest(false)
    setShowAcceptDialog(true)
  };

  const handleRejectConnection = () => {
    // 인연 요청 거절 확인 다이얼로그 표시
    setShowRejectConfirmDialog(true)
  };

  const handleConfirmReject = () => {
    // 인연 요청 거절 로직
    setHasConnectionRequest(false)
    setShowRejectConfirmDialog(false)
    setShowRejectSuccessDialog(true)
  };

  const handleGoToProfile = () => {
    navigate('/profile/partner')
    setShowAcceptDialog(false)
  };

  // 사용 내역 데이터
  const usageHistory = [
    {
      id: 1,
      type: 'ai_chat',
      title: 'AI 채팅 사용',
      description: '데이트 장소 추천 요청',
      timestamp: '2024-01-15 14:30',
      usage: 1,
      limit: 10
    },
    {
      id: 2,
      type: 'ai_recommendation',
      title: 'AI 추천 사용',
      description: '로맨틱 데이트 코스 추천',
      timestamp: '2024-01-14 16:20',
      usage: 1,
      limit: 5
    },
    {
      id: 3,
      type: 'storage',
      title: '저장 공간 사용',
      description: '사진 업로드 (3장)',
      timestamp: '2024-01-13 10:15',
      usage: 15,
      limit: 1000
    }
  ];

  // 활동 통계 데이터
  const activityStats = {
    posts: 24,
    comments: 156,
    memories: 42,
    sharedMemories: 18,
    totalLikes: 342,
    totalMileage: 1250
  };

  // 사용량 통계 데이터
  const usageStats = {
    aiChat: { used: 7, limit: 10, percentage: 70 },
    aiRecommendation: { used: 3, limit: 5, percentage: 60 },
    storage: { used: 250, limit: 1000, percentage: 25 }
  };

  // 페이징된 활동 내역 데이터
  const totalPages = Math.ceil(activityHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivityHistory = activityHistory.slice(startIndex, endIndex);

  const renderActivityHistory = () => (
    <div className="space-y-4">
      {currentActivityHistory.map((activity) => {
        const IconComponent = activity.icon;
        return (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                  <IconComponent className={`h-5 w-5 text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderUsageHistory = () => (
    <div className="space-y-6">
      {/* 사용량 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">AI 채팅</h3>
                <p className="text-2xl font-bold text-blue-700">{usageStats.aiChat.used}/{usageStats.aiChat.limit}</p>
                <p className="text-sm text-blue-600">사용량</p>
              </div>
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-blue-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${usageStats.aiChat.percentage}%` }}
                />
              </div>
              <p className="text-xs text-blue-600 mt-1">{usageStats.aiChat.percentage}% 사용됨</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900">AI 추천</h3>
                <p className="text-2xl font-bold text-green-700">{usageStats.aiRecommendation.used}/{usageStats.aiRecommendation.limit}</p>
                <p className="text-sm text-green-600">사용량</p>
              </div>
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-green-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${usageStats.aiRecommendation.percentage}%` }}
                />
              </div>
              <p className="text-xs text-green-600 mt-1">{usageStats.aiRecommendation.percentage}% 사용됨</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-900">저장 공간</h3>
                <p className="text-2xl font-bold text-purple-700">{usageStats.storage.used}MB/{usageStats.storage.limit}MB</p>
                <p className="text-sm text-purple-600">사용량</p>
              </div>
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-purple-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${usageStats.storage.percentage}%` }}
                />
              </div>
              <p className="text-xs text-purple-600 mt-1">{usageStats.storage.percentage}% 사용됨</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 플랜 업그레이드 버튼 */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-pink-900">플랜 업그레이드</h3>
              <p className="text-sm text-pink-700">더 많은 AI 서비스와 저장 공간을 이용해보세요</p>
            </div>
            <Button 
              onClick={() => navigate('/subscription')}
              className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2"
            >
              업그레이드 하기
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        {isUsageHistory ? (
          // 사용 내역 페이지
          <>
            {/* 사용 내역 카드 - 독립적인 카드로 변경 */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-indigo-900">
                  <CreditCard className="h-5 w-5" />
                  사용 내역
                </CardTitle>
                <p className="text-indigo-700 mb-0">AI 서비스 및 저장 공간 사용 현황을 확인하세요</p>
              </CardHeader>
              <CardContent className="pt-0">
                {/* 빈 내용 */}
              </CardContent>
            </Card>

            {/* 사용량 통계 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">AI 채팅</h3>
                      <p className="text-2xl font-bold text-blue-700">{usageStats.aiChat.used}/{usageStats.aiChat.limit}</p>
                      <p className="text-sm text-blue-600">사용량</p>
                    </div>
                    <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-blue-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${usageStats.aiChat.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-600 mt-1">{usageStats.aiChat.percentage}% 사용됨</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">AI 추천</h3>
                      <p className="text-2xl font-bold text-green-700">{usageStats.aiRecommendation.used}/{usageStats.aiRecommendation.limit}</p>
                      <p className="text-sm text-green-600">사용량</p>
                    </div>
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-green-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${usageStats.aiRecommendation.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-green-600 mt-1">{usageStats.aiRecommendation.percentage}% 사용됨</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-900">저장 공간</h3>
                      <p className="text-2xl font-bold text-purple-700">{usageStats.storage.used}MB/{usageStats.storage.limit}MB</p>
                      <p className="text-sm text-purple-600">사용량</p>
                    </div>
                    <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                      <CreditCard className="h-8 w-8 text-purple-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${usageStats.storage.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-purple-600 mt-1">{usageStats.storage.percentage}% 사용됨</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 플랜 업그레이드 버튼 */}
            <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-pink-900">플랜 업그레이드</h3>
                    <p className="text-sm text-pink-700">더 많은 AI 서비스와 저장 공간을 이용해보세요</p>
                  </div>
                  <Button 
                    onClick={() => navigate('/subscription')}
                    className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2"
                  >
                    업그레이드 하기
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // 활동 내역 페이지
          <>
            {/* 활동 내역 카드 - 활동 통계 위로 이동, 하단 여백 제거 */}
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 mb-0">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-pink-900">
                  <Activity className="h-5 w-5" />
                  활동 내역
                </CardTitle>
                <p className="text-pink-700 mb-0">최근 활동 내역을 확인하세요</p>
              </CardHeader>
              <CardContent className="pt-0">
                {/* 데이터 제거 - 빈 내용 */}
              </CardContent>
            </Card>

            {/* 인연 요청 알림 */}
            {hasConnectionRequest && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="h-6 w-6 text-pink-500" />
                      <div>
                        <p className="font-medium text-purple-900">{connectionRequest.message}</p>
                        <p className="text-sm text-purple-700">from: {connectionRequest.from}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={handleAcceptConnection}
                        className="bg-pink-500 hover:bg-pink-600 text-white"
                      >
                        승인
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handleRejectConnection}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        거절
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 활동 통계 카드 */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Activity className="h-5 w-5" />
                  활동 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900">{activityStats.posts}</p>
                    <p className="text-sm text-blue-700">작성한 게시글</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">{activityStats.comments}</p>
                    <p className="text-sm text-green-700">작성한 댓글</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900">{activityStats.memories}</p>
                    <p className="text-sm text-purple-700">작성한 추억</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-900">{activityStats.sharedMemories}</p>
                    <p className="text-sm text-orange-700">공유한 추억</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-900">{activityStats.totalLikes}</p>
                    <p className="text-sm text-red-700">받은 추천</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Coins className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-900">{activityStats.totalMileage}</p>
                    <p className="text-sm text-yellow-700">적립 마일리지</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 전체 내역 카드 */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Activity className="h-5 w-5" />
                  전체 내역
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderActivityHistory()}
                
                {/* 페이지네이션 - 우리만의 추억 스타일 적용 */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      이전
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className={currentPage === pageNum ? "bg-pink-500 hover:bg-pink-600" : ""}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      다음
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* 승인 성공 다이얼로그 */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              인연 맺기 완료
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">인연이 맺어졌습니다!</p>
                <p className="text-sm text-gray-600">상대방 프로필을 클릭하여 확인해보세요</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button 
              onClick={handleGoToProfile}
              className="bg-pink-500 hover:bg-pink-600"
            >
              프로필 보러가기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 거절 확인 다이얼로그 */}
      <AlertDialog open={showRejectConfirmDialog} onOpenChange={setShowRejectConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              인연 요청 거절
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              <p className="font-medium text-gray-900">정말 거절하실껀가요?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button 
              variant="outline"
              onClick={() => setShowRejectConfirmDialog(false)}
            >
              아니요
            </Button>
            <Button 
              onClick={handleConfirmReject}
              className="bg-red-500 hover:bg-red-600"
            >
              예
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 거절 성공 다이얼로그 */}
      <AlertDialog open={showRejectSuccessDialog} onOpenChange={setShowRejectSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              인연 요청 거절 완료
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">인연 요청이 거절되었습니다!</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button 
              onClick={() => setShowRejectSuccessDialog(false)}
              className="bg-red-500 hover:bg-red-600"
            >
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HistoryPage; 