import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coins, User, Sparkles, Clock, Palette, Utensils, Calendar, Plus, X, Edit, UserX, Settings, Crown } from "lucide-react"
import { 
  MBTI, 
  PreferredTime, 
  PreferredBudget, 
  RelationshipStatus, 
  InterestCategory, 
  FoodType, 
  PreferredDays, 
  Transportation, 
  DateMood 
} from "@/types/profile"

interface ProfileProps {
  profile: any
  setProfile: (profile: any) => void
  partnerProfile: any
  isPartnerConnected: boolean
  totalMileage: number
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile, partnerProfile, isPartnerConnected, totalMileage }) => {
  // 나이대 계산 함수
  const calculateAgeGroup = (birthDate: string) => {
    if (!birthDate) return "나이대"
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    if (age < 20) return "10대"
    if (age < 30) return "20대"
    if (age < 40) return "30대"
    if (age < 50) return "40대"
    return "50대 이상"
  }

  // 데이터베이스 스키마에 맞춘 옵션들
  const mbtiOptions: MBTI[] = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']
  
  const timeOptions: { value: PreferredTime; label: string }[] = [
    { value: '아침', label: '🌅 아침' },
    { value: '낮', label: '☀️ 낮' },
    { value: '저녁', label: '🌆 저녁' },
    { value: '밤', label: '🌙 밤' }
  ]
  
  const budgetOptions: PreferredBudget[] = ['3만원 이하', '3-5만원', '5-10만원', '10-20만원', '20만원 이상']
  
  const relationshipStatusOptions: { value: RelationshipStatus; label: string }[] = [
    { value: '커플', label: '❤️ 커플' },
    { value: '친구', label: '👥 친구' },
    { value: '가족', label: '👨‍👩‍👧‍👦 가족' }
  ]
  
  const interestOptions: { value: InterestCategory; label: string }[] = [
    { value: '카페', label: '☕ 카페' },
    { value: '음악', label: '🎶 음악' },
    { value: '사진', label: '📷 사진' },
    { value: '독서', label: '📚 독서' },
    { value: '게임', label: '🎮 게임' },
    { value: '맛집', label: '🍽️ 맛집' },
    { value: '여행', label: '🏞️ 여행' },
    { value: '영화', label: '🎬 영화' },
    { value: '운동', label: '🏃 운동' },
    { value: '예술', label: '🎨 예술' },
    { value: '요리', label: '🍳 요리' },
    { value: '캠핑', label: '🏕️ 캠핑' }
  ]
  
  const foodOptions: { value: FoodType; label: string }[] = [
    { value: '한식', label: '🍚 한식' },
    { value: '중식', label: '🥢 중식' },
    { value: '일식', label: '🍣 일식' },
    { value: '양식', label: '🍝 양식' },
    { value: '분식', label: '🍜 분식' },
    { value: '카페', label: '☕ 카페' },
    { value: '디저트', label: '🍰 디저트' },
    { value: '술집', label: '🍺 술집' },
    { value: '치킨', label: '🍗 치킨' },
    { value: '피자', label: '🍕 피자' },
    { value: '햄버거', label: '🍔 햄버거' },
    { value: '샌드위치', label: '🥪 샌드위치' }
  ]
  
  const dayOptions: { value: PreferredDays; label: string }[] = [
    { value: '월요일', label: '📅 월요일' },
    { value: '화요일', label: '📅 화요일' },
    { value: '수요일', label: '📅 수요일' },
    { value: '목요일', label: '📅 목요일' },
    { value: '금요일', label: '📅 금요일' },
    { value: '토요일', label: '📅 토요일' },
    { value: '일요일', label: '📅 일요일' }
  ]
  
  const transportationOptions: { value: Transportation; label: string }[] = [
    { value: '대중교통', label: '🚈 대중교통' },
    { value: '자동차', label: '🚗 자동차' },
    { value: '도보', label: '🚶 도보' },
    { value: '자전거', label: '🚲 자전거' },
    { value: '택시', label: '🚕 택시' }
  ]
  
  const moodOptions: { value: DateMood; label: string }[] = [
    { value: '로맨틱', label: '💕 로맨틱' },
    { value: '활발한', label: '🎉 활발한' },
    { value: '차분한', label: '😌 차분한' },
    { value: '신나는', label: '🎊 신나는' },
    { value: '액티브', label: '🏃 액티브' },
    { value: '인스타 감성', label: '📸 인스타 감성' }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 기본 정보 */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <User className="h-5 w-5" />
              기본 정보 ✨
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-pink-100 text-2xl">💖</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" disabled>
                사진 업로드
              </Button>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>이름</Label>
                <Input value={profile.name || ""} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>애칭 (별명)</Label>
                <Input value={profile.nickname || ""} readOnly className="bg-gray-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>생년월일</Label>
                  <Input type="date" value={profile.birthDate || ""} readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label>나이대</Label>
                  <Input 
                    value={calculateAgeGroup(profile.birthDate || "")} 
                    readOnly 
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>성별</Label>
                <Select value={profile.gender || ""} disabled>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="여성">여성</SelectItem>
                    <SelectItem value="남성">남성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>MBTI</Label>
              <Select value={profile.mbti || ""} disabled>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mbtiOptions.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {/* 관심사/취미 */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Sparkles className="h-5 w-5" />
              관심사 & 취미 🎨
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={interest.value} 
                    checked={profile.interests?.includes(interest.value) || false}
                    disabled
                  />
                  <Label htmlFor={interest.value} className="text-sm">
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label>📅 선호하는 데이트 요일</Label>
              <div className="grid grid-cols-2 gap-2">
                {dayOptions.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.value}
                      checked={profile.preferredDays?.includes(day.value) || false}
                      disabled
                    />
                    <Label htmlFor={day.value} className="text-sm">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>
        {/* 데이트 선호도 */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Clock className="h-5 w-5" />
              데이트 선호도 ⏰
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>선호 지역</Label>
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">📍 {profile.preferredRegion || "설정되지 않음"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>선호 시간대</Label>
              <div className="flex gap-2">
                {timeOptions.map((time) => (
                  <Badge
                    key={time.value}
                    variant={profile.timePreference === time.value ? "default" : "outline"}
                    className="cursor-default"
                  >
                    {time.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>선호하는 데이트 비용</Label>
              <div className="flex gap-2">
                {budgetOptions.map((budget) => (
                  <Badge
                    key={budget}
                    variant={profile.budget === budget ? "default" : "outline"}
                    className="cursor-default"
                  >
                    💸 {budget}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>교통수단 (복수 선택 가능)</Label>
              <div className="flex gap-2">
                {transportationOptions.map((transport) => (
                  <Badge
                    key={transport.value}
                    variant={(profile.transport?.includes(transport.value) || false) ? "default" : "outline"}
                    className="cursor-default"
                  >
                    {transport.label}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* 데이트 분위기 & 상태 */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Palette className="h-5 w-5" />
              분위기 & 상태 💕
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>데이트 분위기</Label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((mood) => (
                  <Badge
                    key={mood.value}
                    variant={(profile.mood?.includes(mood.value) || false) ? "default" : "outline"}
                    className="cursor-default"
                  >
                    {mood.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>현재 관계 상태</Label>
              <div className="flex gap-2">
                {relationshipStatusOptions.map((status) => (
                  <Badge
                    key={status.value}
                    variant={profile.relationshipStatus === status.value ? "default" : "outline"}
                    className="cursor-default"
                  >
                    {status.label}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* 음식 취향 */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Utensils className="h-5 w-5" />
              음식 취향 🍽️
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {foodOptions.map((food) => (
                <div key={food.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={food.value} 
                    checked={profile.dietary?.includes(food.value) || false}
                    disabled
                  />
                  <Label htmlFor={food.value} className="text-sm">
                    {food.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* 추가 정보 */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Calendar className="h-5 w-5" />
              추가 정보 💕
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                <span className="text-sm">💕 첫 만남: {profile.firstMeetingDate || "설정되지 않음"}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                <span className="text-sm">🎂 내 생일: {profile.birthDate || "설정되지 않음"}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <span className="text-sm">📍 선호 지역: {profile.preferredRegion || "설정되지 않음"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* 마일리지 정보 - 전체 너비 */}
      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Coins className="h-5 w-5" />
            마일리지 💰
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700">{(profile.mileage || 0).toLocaleString()}P</div>
              <p className="text-sm text-amber-600">내 마일리지</p>
            </div>
            {isPartnerConnected && (
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">{(partnerProfile.mileage || 0).toLocaleString()}P</div>
                <p className="text-sm text-blue-600">커플 마일리지</p>
              </div>
            )}
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">{(totalMileage || 0).toLocaleString()}P</div>
              <p className="text-sm text-green-600">총 사용 가능 마일리지</p>
            </div>
          </div>
          {/* 플랜 결제 시 자동 사용 토글 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
            <div>
              <Label className="font-semibold text-amber-800">플랜 결제 시 자동 사용</Label>
              <p className="text-sm text-amber-600">구독 결제 시 마일리지를 자동으로 사용합니다</p>
            </div>
            <Switch
              checked={profile.autoUseMileage || false}
              disabled
            />
          </div>
          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>추천 받기</span>
              <span className="text-green-600">+10P</span>
            </div>
            <div className="flex justify-between">
              <span>베스트 추억 선정</span>
              <span className="text-green-600">+100P</span>
            </div>
            <div className="flex justify-between">
              <span>결제 시 사용</span>
              <span className="text-blue-600">1P = 1원 (내 마일리지 + 커플 마일리지 합산 사용)</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center pt-4">
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600" disabled>
          <UserX className="h-4 w-4 mr-2" />
          회원 탈퇴
        </Button>
      </div>
    </div>
  )
  }
  
  export default Profile 