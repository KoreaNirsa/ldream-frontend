import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, X, Edit, User, Heart, MapPin, Calendar, Bike, Car, Train, Users } from "lucide-react"

interface ProfileEditProps {
  profile: any
  onSave: (profile: any) => void
  onCancel: () => void
  isPartner?: boolean
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  profile,
  onSave,
  onCancel,
  isPartner = false
}) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    nickname: profile.nickname || "",
    email: profile.email || "",
    phone: profile.phone || "",
    birthday: profile.birthday || "",
    location: profile.location || "",
    bio: profile.bio || "",
    interests: profile.interests || [],
    avatar: profile.avatar || "",
    relationshipStatus: profile.relationshipStatus || "연인과",
    anniversary: profile.anniversary || "",
    partnerName: profile.partnerName || "",
    preferredTime: profile.preferredTime || "",
    budgetRange: profile.budgetRange || "",
    transportation: profile.transportation || [],
    dateMood: profile.dateMood || "",
    foodPreferences: profile.foodPreferences || []
  })

  const [newInterest, setNewInterest] = useState("")

  const relationshipOptions = [
    "연인과", "썸", "친구와"
  ]

  const interestOptions = [
    "카페", "음악", "사진", "독서", "게임", "맛집", "여행", "영화", "운동", "예술", "요리", "캠핑"
  ]

  const preferredTimes = [
    "아침", "낮", "저녁", "밤"
  ]

  const budgetRanges = [
    "3만원 이하", "3-5만원", "5-10만원", "10-20만원", "20만원 이상"
  ]

  const transportations = [
    { id: 'public', label: '대중교통', icon: Train },
    { id: 'car', label: '자동차', icon: Car },
    { id: 'walk', label: '도보', icon: Users },
    { id: 'bike', label: '자전거', icon: Bike },
    { id: 'taxi', label: '택시', icon: Car }
  ]

  const dateMoods = [
    "로맨틱", "활발한", "차분한", "신나는", "액티브", "인스타 감성"
  ]

  const foodPreferences = [
    "한식", "중식", "일식", "양식", "분식", "카페", "디저트", "술집", "치킨", "피자", "햄버거", "샌드위치"
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }))
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((interest: string) => interest !== interestToRemove)
    }))
  }

  const handleFoodPreferenceToggle = (food: string) => {
    setFormData(prev => ({
      ...prev,
      foodPreferences: prev.foodPreferences.includes(food)
        ? prev.foodPreferences.filter((f: string) => f !== food)
        : [...prev.foodPreferences, food]
    }))
  }

  const handleTransportationToggle = (transport: string) => {
    setFormData(prev => ({
      ...prev,
      transportation: prev.transportation.includes(transport)
        ? prev.transportation.filter((t: string) => t !== transport)
        : [...prev.transportation, transport]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          {isPartner ? "파트너 프로필 편집" : "프로필 편집"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 프로필 사진 */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg">
                {formData.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button type="button" variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                사진 변경
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG 파일만 업로드 가능합니다
              </p>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange("nickname", e.target.value)}
                  placeholder="닉네임을 입력하세요"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="전화번호를 입력하세요"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthday">생일</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">거주지</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="거주지를 입력하세요"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 관계 정보 (파트너 프로필인 경우) */}
          {isPartner && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partnerName">파트너 이름</Label>
                  <Input
                    id="partnerName"
                    value={formData.partnerName}
                    onChange={(e) => handleInputChange("partnerName", e.target.value)}
                    placeholder="파트너 이름을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="relationshipStatus">관계 상태</Label>
                  <Select value={formData.relationshipStatus} onValueChange={(value) => handleInputChange("relationshipStatus", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="anniversary">기념일</Label>
                <Input
                  id="anniversary"
                  type="date"
                  value={formData.anniversary}
                  onChange={(e) => handleInputChange("anniversary", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* 자기소개 */}
          <div>
            <Label htmlFor="bio">자기소개</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="자기소개를 입력하세요"
              rows={4}
            />
          </div>

          {/* 관심사 */}
          <div className="space-y-2">
            <Label>관심사</Label>
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="관심사를 입력하세요"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
              />
              <Button type="button" onClick={handleAddInterest} size="sm">
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(interest => (
                <Button
                  key={interest}
                  type="button"
                  variant={formData.interests.includes(interest) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (formData.interests.includes(interest)) {
                      handleRemoveInterest(interest)
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        interests: [...prev.interests, interest]
                      }))
                    }
                  }}
                  className="text-xs"
                >
                  {interest}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.interests.map((interest: string, index: number) => (
                <div key={index} className="flex items-center gap-1 bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 선호하는 시간대 */}
          <div className="space-y-3">
            <Label>선호하는 시간대</Label>
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
            <Label>선호하는 데이트 비용</Label>
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
            <Label>교통 수단 (복수 선택 가능)</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {transportations.map((transport) => {
                const Icon = transport.icon;
                const isSelected = formData.transportation.includes(transport.label);
                return (
                  <button
                    key={transport.id}
                    type="button"
                    onClick={() => handleTransportationToggle(transport.label)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <Icon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{transport.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 데이트 분위기 */}
          <div className="space-y-3">
            <Label>데이트 분위기</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {dateMoods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, dateMood: mood }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.dateMood === mood
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <span className="text-sm font-medium">{mood}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 음식 취향 */}
          <div className="space-y-3">
            <Label>음식 취향 (복수 선택 가능)</Label>
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
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">
              <Save className="h-4 w-4 mr-2" />
              저장하기
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileEdit 