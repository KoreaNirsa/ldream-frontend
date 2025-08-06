import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface ProfileSetupModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [interests, setInterests] = useState<string[]>([])
  const [foodPreferences, setFoodPreferences] = useState<string[]>([])
  const [preferredDateTypes, setPreferredDateTypes] = useState<string[]>([])
  const [preferredDays, setPreferredDays] = useState<string[]>([])

  const interestOptions = [
    "영화/드라마", "음악", "독서", "운동", "요리", "여행", "게임", "예술", "사진", "패션"
  ]

  const foodOptions = [
    "한식", "중식", "일식", "양식", "분식", "카페/디저트", "술집", "베이커리", "건강식", "스낵"
  ]

  const dateTypeOptions = [
    "카페 데이트", "영화관", "공원/산책", "레스토랑", "쇼핑", "문화생활", "액티비티", "드라이브", "홈데이트", "여행"
  ]

  const dayOptions = [
    "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"
  ]

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleFoodToggle = (food: string) => {
    setFoodPreferences(prev => 
      prev.includes(food) 
        ? prev.filter(f => f !== food)
        : [...prev, food]
    )
  }

  const handleDateTypeToggle = (dateType: string) => {
    setPreferredDateTypes(prev => 
      prev.includes(dateType) 
        ? prev.filter(d => d !== dateType)
        : [...prev, dateType]
    )
  }

  const handleDayToggle = (day: string) => {
    setPreferredDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  const handleSkip = () => {
    alert("AI의 정확한 추천이 불가능해요! 내 프로필에서 등록하실 수 있습니다")
    onComplete()
  }

  const handleComplete = () => {
    // 프로필 설정 완료 로직
    console.log("프로필 설정 완료:", {
      interests,
      foodPreferences,
      preferredDateTypes,
      preferredDays
    })
    onComplete()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-center">프로필 설정</CardTitle>
          <CardDescription className="text-center">
            더 정확한 AI 추천을 위해 프로필을 설정해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 관심사 */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">관심사 (복수 선택 가능)</Label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest}`}
                    checked={interests.includes(interest)}
                    onCheckedChange={() => handleInterestToggle(interest)}
                  />
                  <Label htmlFor={`interest-${interest}`} className="text-sm">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 음식 취향 */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">음식 취향 (복수 선택 가능)</Label>
            <div className="grid grid-cols-2 gap-2">
              {foodOptions.map((food) => (
                <div key={food} className="flex items-center space-x-2">
                  <Checkbox
                    id={`food-${food}`}
                    checked={foodPreferences.includes(food)}
                    onCheckedChange={() => handleFoodToggle(food)}
                  />
                  <Label htmlFor={`food-${food}`} className="text-sm">
                    {food}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 선호하는 데이트 */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">선호하는 데이트 (복수 선택 가능)</Label>
            <div className="grid grid-cols-2 gap-2">
              {dateTypeOptions.map((dateType) => (
                <div key={dateType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dateType-${dateType}`}
                    checked={preferredDateTypes.includes(dateType)}
                    onCheckedChange={() => handleDateTypeToggle(dateType)}
                  />
                  <Label htmlFor={`dateType-${dateType}`} className="text-sm">
                    {dateType}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 선호하는 요일 */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">선호하는 요일 (복수 선택 가능)</Label>
            <div className="grid grid-cols-2 gap-2">
              {dayOptions.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day}`}
                    checked={preferredDays.includes(day)}
                    onCheckedChange={() => handleDayToggle(day)}
                  />
                  <Label htmlFor={`day-${day}`} className="text-sm">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleSkip} className="flex-1">
              다음에 하기
            </Button>
            <Button onClick={handleComplete} className="flex-1">
              설정 완료
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileSetupModal 