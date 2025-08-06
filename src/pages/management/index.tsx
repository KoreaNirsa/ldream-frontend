import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Crown, Diamond, Check, Star, AlertTriangle, CreditCard, Coins } from 'lucide-react';

const ManagementPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPaymentManagement = location.pathname.includes('/payment');

  // 팝업 상태 관리
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDowngradeDialog, setShowDowngradeDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // 구독 정보
  const subscriptionInfo = {
    currentPlan: "Premium",
    nextPaymentDate: "2024-03-15",
    mileage: {
      total: 4340,
      my: 2450,
      couple: 1890
    }
  };

  // 결제 내역 데이터
  const paymentHistory = [
    {
      id: 1,
      date: "2024-01-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    },
    {
      id: 2,
      date: "2023-12-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    },
    {
      id: 3,
      date: "2023-11-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    },
    {
      id: 4,
      date: "2023-10-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    },
    {
      id: 5,
      date: "2023-09-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    },
    {
      id: 6,
      date: "2023-08-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    },
    {
      id: 7,
      date: "2023-07-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    },
    {
      id: 8,
      date: "2023-06-15",
      amount: "29,900원",
      status: "completed",
      description: "프리미엄 플랜 월 구독"
    }
  ];

  // 페이징된 결제 내역 데이터
  const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPaymentHistory = paymentHistory.slice(startIndex, endIndex);

  // 현재 날짜 기준으로 계산
  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getFullYear()}년${now.getMonth() + 1}월${now.getDate()}일`;
  };

  const getNextMonthDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    return `${nextMonth.getFullYear()}년${nextMonth.getMonth() + 1}월${nextMonth.getDate()}일`;
  };

  // 플랜 정보
  const plans = [
    {
      name: "무료",
      price: 0,
      priceText: "무료",
      mileageDiscount: 0,
      features: [
        "AI 채팅 일일 10회 제한",
        "GPT-4o-mini 모델",
        "기본 코스 추천",
        "캘린더 일정 관리",
        "기념일 입력",
        "월 100MB 저장공간"
      ],
      buttonText: "다운그레이드",
      buttonVariant: "outline" as const,
      popular: false,
      current: false,
      color: "gray"
    },
    {
      name: "Premium",
      price: 9900,
      priceText: "₩9,900/월",
      mileageDiscount: 5560,
      features: [
        "AI 채팅 일일 40회 제한",
        "GPT-4o-mini 모델",
        "AI 추천 정밀도 업그레이드",
        "추천 이유 상세 설명",
        "월 3GB 저장공간",
        "우선 고객지원"
      ],
      buttonText: "현재 플랜",
      buttonVariant: "secondary" as const,
      popular: true,
      current: true,
      color: "purple"
    },
    {
      name: "Pro",
      price: 19900,
      priceText: "₩19,900/월",
      mileageDiscount: 15560,
      features: [
        "AI 채팅 일일 60회 제한",
        "GPT-3.5-Turbo 모델",
        "최고 성능 AI 추천",
        "개인 맞춤 분석 리포트",
        "월 10GB 저장공간",
        "24시간 고객지원"
      ],
      buttonText: "업그레이드",
      buttonVariant: "outline" as const,
      popular: false,
      current: false,
      color: "blue"
    }
  ];

  const renderSubscriptionManagement = () => (
    <div className="space-y-8">
      {/* 헤더 카드 */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-6 w-6 text-yellow-600" />
            <Diamond className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">구독 관리</h1>
          <p className="text-gray-600">더 나은 데이트 경험을 위한 프리미엄 서비스</p>
        </CardContent>
      </Card>

      {/* 현재 구독 정보 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                현재 플랜: {subscriptionInfo.currentPlan}
              </h2>
              <p className="text-gray-600">
                다음 결제일: {subscriptionInfo.nextPaymentDate}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => setShowCancelDialog(true)}
            >
              <Crown className="h-4 w-4 mr-2" />
              구독 해지
            </Button>
          </div>

          {/* 마일리지 차감 정보 */}
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">
                  보유 마일리지 {subscriptionInfo.mileage.total.toLocaleString()}P (내 {subscriptionInfo.mileage.my.toLocaleString()}P + 커플 {subscriptionInfo.mileage.couple.toLocaleString()}P)는 다음 결제 시 자동 차감됩니다
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 플랜 비교 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">플랜 비교</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative ${
                plan.current 
                  ? 'border-purple-300 bg-purple-50' 
                  : plan.color === 'gray'
                  ? 'border-gray-200 bg-gray-50'
                  : plan.color === 'blue'
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    인기
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">
                  {plan.current && <Check className="h-5 w-5 text-green-500 inline mr-2" />}
                  {plan.name}
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{plan.priceText}</p>
                  {plan.price > 0 && (
                    <div className="text-sm text-gray-600">
                      <p>마일리지 차감 후: ₩{plan.mileageDiscount.toLocaleString()}</p>
                      <p className="text-xs mt-1">(내 {subscriptionInfo.mileage.my.toLocaleString()}P + 커플 {subscriptionInfo.mileage.couple.toLocaleString()}P 사용)</p>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.buttonVariant} 
                  className={`w-full ${
                    plan.current 
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                      : plan.color === 'gray'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : plan.color === 'blue'
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : ''
                  }`}
                  disabled={plan.current}
                  onClick={() => {
                    if (plan.name === "무료") {
                      setShowDowngradeDialog(true);
                    } else if (plan.name === "Pro") {
                      setShowUpgradeDialog(true);
                    }
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 구독 해지 팝업 */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              구독 해지 확인
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              <p className="mb-3">정말로 구독을 해지하시겠습니까?</p>
              <div className="space-y-2 text-sm">
                <p>• 다음달부터 자동 결제가 되지 않습니다</p>
                <p>• {getNextMonthDate()}까지 현재 플랜이 유지됩니다</p>
                <p>• 해지 후에도 현재 구독 기간 동안은 모든 기능을 이용할 수 있습니다</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                // 구독 해지 로직 구현
                setShowCancelDialog(false);
              }}
            >
              구독 해지
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 다운그레이드 팝업 */}
      <AlertDialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              플랜 다운그레이드 확인
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              <p className="mb-3">Premium에서 무료 플랜으로 다운그레이드하시겠습니까?</p>
              <div className="space-y-2 text-sm">
                <p>• 다음달부터 자동 결제가 되지 않습니다</p>
                <p>• {getNextMonthDate()}까지 현재 플랜이 유지됩니다</p>
                <p>• 다운그레이드 후에는 일부 기능이 제한될 수 있습니다</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => {
                // 다운그레이드 로직 구현
                setShowDowngradeDialog(false);
              }}
            >
              다운그레이드
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 업그레이드 팝업 */}
      <AlertDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              플랜 업그레이드 확인
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              <p className="mb-4 font-medium">Premium에서 Pro 플랜으로 업그레이드하시겠습니까?</p>
              
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-800 mb-2">💰 결제 금액 계산</h4>
                  <div className="space-y-1 text-blue-700">
                    <p>• Premium 요금: 9,900원 ÷ 30일 = 330원/일</p>
                    <p>• 사용한 일수: 14일</p>
                    <p>• 사용한 금액: 330원 × 14일 = 4,620원</p>
                    <p>• 남은 크레딧: 9,900원 - 4,620원 = 5,280원</p>
                    <p className="font-semibold">• 결제 금액: 19,900원 - 5,280원 = 14,620원</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-gray-800">✅ 업그레이드 혜택</p>
                  <div className="space-y-1 text-gray-600">
                    <p>• 업그레이드 즉시 모든 Pro 기능 이용 가능</p>
                    <p>• 정기 결제일: {getCurrentDate()} 기준으로 변경</p>
                    <p>• 다음 달부터는 19,900원 전체 금액 정기 결제</p>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                // 업그레이드 로직 구현
                setShowUpgradeDialog(false);
              }}
            >
              업그레이드 (14,620원)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  const renderPaymentManagement = () => (
    <div className="space-y-6">
      {/* 결제 관리 헤더 카드 */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <CreditCard className="h-5 w-5" />
            결제 관리
          </CardTitle>
          <p className="text-indigo-700 mb-0">결제 내역과 결제 방법을 관리하세요</p>
        </CardHeader>
        <CardContent className="pt-0">
          {/* 빈 내용 */}
        </CardContent>
      </Card>

      {/* 결제 내역 카드 */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <CreditCard className="h-5 w-5" />
            결제 내역
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentPaymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div className="flex-1">
                  <h4 className="font-medium">{payment.description}</h4>
                  <p className="text-sm text-gray-600">{payment.date}</p>
                </div>
                <div className="text-right">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 line-through">29,900원</p>
                    <div className="flex items-center justify-end gap-1 text-xs text-yellow-600">
                      <Coins className="h-4 w-4 text-yellow-600" />
                      <span>1,500P 사용</span>
                    </div>
                    <p className="text-sm text-gray-700">최종 결제 금액 : 18,400원</p>
                  </div>
                  <Badge 
                    variant={payment.status === 'completed' ? 'default' : 'secondary'}
                    className={payment.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {payment.status === 'completed' ? '결제 완료' : '대기중'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

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

      {/* 결제 방법 관리 카드 */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <CreditCard className="h-5 w-5" />
            결제 방법
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium">신용카드</h4>
                <p className="text-sm text-gray-600">**** **** **** 1234</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              기본
            </Badge>
          </div>
          
          <Button variant="outline" className="w-full">
            결제 방법 추가
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {isPaymentManagement ? renderPaymentManagement() : renderSubscriptionManagement()}
    </div>
  );
};

export default ManagementPage; 