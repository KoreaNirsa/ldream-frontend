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
              <Button variant="outline" size="sm">
                사진 업로드
              </Button>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>이름</Label>
                <Input defaultValue={profile.name} />
              </div>
              <div className="space-y-2">
                <Label>애칭 (별명)</Label>
                <Input defaultValue={profile.nickname} placeholder="상대방이 부를 별명을 입력하세요" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>생년월일</Label>
                  <Input type="date" defaultValue={profile.birthDate} />
                </div>
                <div className="space-y-2">
                  <Label>나이대</Label>
                  <Input 
                    value={calculateAgeGroup(profile.birthDate)} 
                    readOnly 
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>성별</Label>
                <Select defaultValue="여성">
                  <SelectTrigger>
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
              <Select defaultValue={profile.mbti}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"].map((type) => (
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
              {["☕ 카페", "🎶 음악", "📷 사진", "📚 독서", "🎮 게임", "🍽️ 맛집", "🏞️ 여행", "🎬 영화", "🏃 운동", "🎨 예술", "🍳 요리", "🏕️ 캠핑"].map(
                (interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox 
                      id={interest} 
                      checked={profile.interests.includes(interest)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setProfile({
                            ...profile,
                            interests: [...profile.interests, interest],
                          })
                        } else {
                          setProfile({
                            ...profile,
                            interests: profile.interests.filter((i: string) => i !== interest),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={interest} className="text-sm">
                      {interest}
                    </Label>
                  </div>
                ),
              )}
            </div>
            <div className="space-y-2">
              <Label>📅 선호하는 데이트 요일</Label>
              <div className="grid grid-cols-2 gap-2">
                {["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={profile.preferredDays.includes(day)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setProfile({
                            ...profile,
                            preferredDays: [...profile.preferredDays, day],
                          })
                        } else {
                          setProfile({
                            ...profile,
                            preferredDays: profile.preferredDays.filter((d: string) => d !== day),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={day} className="text-sm">
                      📅 {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>📍 선호하는 지역</Label>
              <div className="grid grid-cols-2 gap-2">
                {["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"].map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={location}
                      checked={profile.locations.includes(location)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setProfile({
                            ...profile,
                            locations: [...profile.locations, location],
                          })
                        } else {
                          setProfile({
                            ...profile,
                            locations: profile.locations.filter((l: string) => l !== location),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={location} className="text-sm">
                      📍 {location}
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
              <Label>선호 시간대</Label>
              <div className="flex gap-2">
                {["🌅 아침", "☀️ 낮", "🌆 저녁", "🌙 밤"].map((time) => (
                  <Badge
                    key={time}
                    variant={profile.timePreference === time ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setProfile({ ...profile, timePreference: time })}
                  >
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>선호하는 데이트 비용</Label>
              <div className="flex gap-2">
                {["3만원 이하", "3-5만원", "5-10만원", "10-20만원", "20만원 이상"].map((budget) => (
                  <Badge
                    key={budget}
                    variant={profile.budget === budget ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setProfile({ ...profile, budget: budget })}
                  >
                    💸 {budget}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>교통수단 (복수 선택 가능)</Label>
              <div className="flex gap-2">
                {["🚶 도보", "🚗 자차", "🚈 대중교통", "🚲 자전거", "🚕 택시"].map((transport) => (
                  <Badge
                    key={transport}
                    variant={profile.transport.includes(transport) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (profile.transport.includes(transport)) {
                        setProfile({
                          ...profile,
                          transport: profile.transport.filter((t: string) => t !== transport)
                        })
                      } else {
                        setProfile({
                          ...profile,
                          transport: [...profile.transport, transport]
                        })
                      }
                    }}
                  >
                    {transport}
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
                {["💕 로맨틱", "🎉 활발한", "😌 차분한", "🎊 신나는", "🏃 액티브", "📸 인스타 감성"].map((mood) => (
                  <Badge
                    key={mood}
                    variant={profile.mood.includes(mood) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (profile.mood.includes(mood)) {
                        setProfile({
                          ...profile,
                          mood: profile.mood.filter((m: string) => m !== mood)
                        })
                      } else {
                        setProfile({
                          ...profile,
                          mood: [...profile.mood, mood]
                        })
                      }
                    }}
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>현재 연애 상태</Label>
              <div className="flex gap-2">
                {["❤️ 연인과", "💛 썸", "👥 친구와"].map((status) => (
                  <Badge
                    key={status}
                    variant={profile.relationshipStatus === status ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setProfile({ ...profile, relationshipStatus: status })}
                  >
                    {status}
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
              {["🍚 한식", "🥢 중식", "🍣 일식", "🍝 양식", "🍜 분식", "☕ 카페", "🍰 디저트", "🍺 술집", "🍗 치킨", "🍕 피자", "🍔 햄버거", "🥪 샌드위치"].map(
                (dietary) => (
                  <div key={dietary} className="flex items-center space-x-2">
                    <Checkbox id={dietary} />
                    <Label htmlFor={dietary} className="text-sm">
                      {dietary}
                    </Label>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
        {/* 첫 만남 설정 */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Calendar className="h-5 w-5" />
              첫 만남 설정 💕
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                <span className="text-sm">💕 첫 만남: {profile.firstMeetingDate || "설정되지 않음"}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                <span className="text-sm">🎂 내 생일: {profile.birthDate}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>첫 만남 날짜 설정</Label>
              <Input 
                type="date" 
                value={profile.firstMeetingDate || ""}
                onChange={(e) => setProfile({ ...profile, firstMeetingDate: e.target.value })}
                placeholder="첫 만남 날짜를 선택하세요"
              />
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
              <div className="text-3xl font-bold text-amber-700">{profile.mileage.toLocaleString()}P</div>
              <p className="text-sm text-amber-600">내 마일리지</p>
            </div>
            {isPartnerConnected && (
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">{partnerProfile.mileage.toLocaleString()}P</div>
                <p className="text-sm text-blue-600">커플 마일리지</p>
              </div>
            )}
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">{totalMileage.toLocaleString()}P</div>
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
              checked={profile.autoUseMileage}
              onCheckedChange={(checked) => setProfile({ ...profile, autoUseMileage: checked })}
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
      <div className="flex justify-between pt-4">
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
          <UserX className="h-4 w-4 mr-2" />
          회원 탈퇴
        </Button>
        <Button className="bg-gradient-to-r from-slate-600 to-purple-600 hover:from-slate-700 hover:to-purple-700">
          <Settings className="h-4 w-4 mr-2" />
          프로필 저장
        </Button>
      </div>
    </div>
  )
  }
  
  export default Profile 