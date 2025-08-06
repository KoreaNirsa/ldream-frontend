import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Calendar, MapPin, Coffee, Music, Camera, Book, Gamepad, Utensils } from 'lucide-react';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [showSkipMessage, setShowSkipMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    mbti: '',
    interests: [] as string[],
    datePreferences: [] as string[],
    preferredDays: [] as string[],
    preferredLocation: '',
    preferredTime: '',
    budgetRange: '',
    transportation: [] as string[],
    dateMoods: [] as string[],
    relationshipStatus: '',
    foodPreferences: [] as string[]
  });

  const mbtiTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  const interests = [
    { id: 'coffee', label: '카페', icon: Coffee },
    { id: 'music', label: '음악', icon: Music },
    { id: 'camera', label: '사진', icon: Camera },
    { id: 'book', label: '독서', icon: Book },
    { id: 'game', label: '게임', icon: Gamepad },
    { id: 'food', label: '맛집', icon: Utensils },
    { id: 'travel', label: '여행', icon: MapPin },
    { id: 'movie', label: '영화', icon: Calendar },
    { id: 'sports', label: '운동', icon: Calendar },
    { id: 'art', label: '예술', icon: Calendar },
    { id: 'cooking', label: '요리', icon: Calendar },
    { id: 'camping', label: '캠핑', icon: Calendar }
  ];

  const datePreferences = [
    '카페 데이트',
    '영화 데이트',
    '맛집 탐방',
    '산책',
    '문화생활',
    '액티비티',
    '집에서 데이트',
    '드라이브',
    '쇼핑',
    '운동',
    '여행',
    '게임'
  ];

  const preferredDays = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일'
  ];

  const preferredLocations = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주도'
  ];

  const preferredTimes = [
    '아침',
    '낮',
    '저녁',
    '밤'
  ];

  const budgetRanges = [
    '3만원 이하',
    '3-5만원',
    '5-10만원',
    '10-20만원',
    '20만원 이상'
  ];

  const transportations = [
    '대중교통',
    '자동차',
    '도보',
    '자전거',
    '택시'
  ];

  const dateMoods = [
    '로맨틱',
    '활발한',
    '차분한',
    '신나는',
    '액티브',
    '인스타 감성'
  ];

  const relationshipStatuses = [
    '연인과',
    '썸',
    '친구와'
  ];

  const foodPreferences = [
    '한식',
    '중식',
    '일식',
    '양식',
    '분식',
    '카페',
    '디저트',
    '술집',
    '치킨',
    '피자',
    '햄버거',
    '샌드위치'
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      datePreferences: prev.datePreferences.includes(preference)
        ? prev.datePreferences.filter(p => p !== preference)
        : [...prev.datePreferences, preference]
    }));
  };

  const handleFoodPreferenceToggle = (food: string) => {
    setFormData(prev => ({
      ...prev,
      foodPreferences: prev.foodPreferences.includes(food)
        ? prev.foodPreferences.filter(f => f !== food)
        : [...prev.foodPreferences, food]
    }));
  };

  const handleTransportationToggle = (transport: string) => {
    setFormData(prev => ({
      ...prev,
      transportation: prev.transportation.includes(transport)
        ? prev.transportation.filter(t => t !== transport)
        : [...prev.transportation, transport]
    }));
  };

  const handlePreferredDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day]
    }));
  };

  const handleDateMoodToggle = (mood: string) => {
    setFormData(prev => ({
      ...prev,
      dateMoods: prev.dateMoods.includes(mood)
        ? prev.dateMoods.filter(m => m !== mood)
        : [...prev.dateMoods, mood]
    }));
  };

  const handleSkip = () => {
    setShowSkipMessage(true);
  };

  const handleSkipConfirm = () => {
    setShowSkipMessage(false);
    navigate('/login');
  };

  const handleComplete = () => {
    setShowSuccessMessage(true);
  };

  if (showSkipMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="shadow-lg max-w-md w-full">
          <CardContent className="text-center py-8">
            <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">회원가입 완료!</h2>
            <p className="text-gray-600 mb-6">
              회원가입이 완료되었어요!<br />
              로그인 후 내 프로필에서 설정이 가능해요!<br />
              프로필을 작성해주시면 AI 맞춤 성능이 좋아집니다
            </p>
            <Button 
              onClick={handleSkipConfirm}
              className="bg-pink-600 hover:bg-pink-700"
            >
              확인
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="shadow-lg max-w-md w-full">
          <CardContent className="text-center py-8">
            <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">축하해요!</h2>
            <p className="text-gray-600 mb-6">회원 가입이 완료되었어요!</p>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-pink-600 hover:bg-pink-700"
            >
              로그인하러 가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">프로필 설정</h1>
          <p className="text-gray-600">더 나은 데이트 추천을 위해 프로필을 완성해주세요</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">내 프로필 정보</CardTitle>
            <p className="text-gray-600">AI가 더 정확한 추천을 할 수 있도록 도와주세요</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* MBTI */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">MBTI</Label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {mbtiTypes.map((mbti) => (
                  <button
                    key={mbti}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, mbti }))}
                    className={`p-2 rounded-lg border-2 transition-all text-xs ${
                      formData.mbti === mbti
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {mbti}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* 관심사 & 취미 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">관심사 & 취미 (복수 선택 가능)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interests.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = formData.interests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{interest.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* 선호하는 데이트 요일 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">선호하는 데이트 요일 (복수 선택 가능)</Label>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                {preferredDays.map((day) => {
                  const isSelected = formData.preferredDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handlePreferredDayToggle(day)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* 선호하는 지역 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">선호하는 지역</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {preferredLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, preferredLocation: location }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.preferredLocation === location
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{location}</span>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* 데이트 선호도 */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold">데이트 선호도</Label>
              
                             {/* 선호 시간대 */}
               <div className="space-y-3">
                 <Label className="text-base">선호 시간대</Label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                   {preferredTimes.map((time) => (
                     <button
                       key={time}
                       type="button"
                       onClick={() => setFormData(prev => ({ ...prev, preferredTime: time }))}
                       className={`p-3 rounded-lg border-2 transition-all ${
                         formData.preferredTime === time
                           ? 'border-pink-500 bg-pink-50 text-pink-700'
                           : 'border-gray-200 hover:border-pink-300'
                       }`}
                     >
                       <span className="text-sm font-medium">{time}</span>
                     </button>
                   ))}
                 </div>
               </div>

               {/* 선호하는 데이트 비용 */}
               <div className="space-y-3">
                 <Label className="text-base">선호하는 데이트 비용</Label>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                   {budgetRanges.map((budget) => (
                     <button
                       key={budget}
                       type="button"
                       onClick={() => setFormData(prev => ({ ...prev, budgetRange: budget }))}
                       className={`p-3 rounded-lg border-2 transition-all ${
                         formData.budgetRange === budget
                           ? 'border-pink-500 bg-pink-50 text-pink-700'
                           : 'border-gray-200 hover:border-pink-300'
                       }`}
                     >
                       <span className="text-sm font-medium">{budget}</span>
                     </button>
                   ))}
                 </div>
               </div>

              {/* 교통 수단 */}
              <div className="space-y-3">
                <Label className="text-base">교통 수단 (복수 선택 가능)</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {transportations.map((transport) => {
                    const isSelected = formData.transportation.includes(transport);
                    return (
                      <button
                        key={transport}
                        type="button"
                        onClick={() => handleTransportationToggle(transport)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{transport}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Separator />

            {/* 분위기 & 상태 */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold">분위기 & 상태</Label>
              
              {/* 데이트 분위기 */}
              <div className="space-y-3">
                <Label className="text-base">데이트 분위기 (복수 선택 가능)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dateMoods.map((mood) => {
                    const isSelected = formData.dateMoods.includes(mood);
                    return (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => handleDateMoodToggle(mood)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{mood}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 현재 연애 상태 */}
              <div className="space-y-3">
                <Label className="text-base">현재 연애 상태</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {relationshipStatuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, relationshipStatus: status }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.relationshipStatus === status
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{status}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* 음식 취향 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">음식 취향 (복수 선택 가능)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {foodPreferences.map((food) => {
                  const isSelected = formData.foodPreferences.includes(food);
                  return (
                    <button
                      key={food}
                      type="button"
                      onClick={() => handleFoodPreferenceToggle(food)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{food}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 pt-6">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
              >
                건너뛰기
              </Button>
                             <Button
                 onClick={handleComplete}
                 className="flex-1 bg-pink-600 hover:bg-pink-700"
               >
                 설정하기
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetupPage; 