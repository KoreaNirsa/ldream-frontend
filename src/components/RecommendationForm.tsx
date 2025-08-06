import React from "react"
import { useAppStore } from "@/types/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Calendar, MapPin, Users, ArrowLeft } from "lucide-react"

interface RecommendationFormProps {
  onClose: () => void
  onSubmit: () => void
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ onClose, onSubmit }) => {
  const {
    useProfileBased,
    setUseProfileBased,
    profile,
    partnerProfile,
    isPartnerConnected,
    setCurrentTab,
    addRecommendation,
  } = useAppStore()

  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [budgetMin, setBudgetMin] = React.useState("")
  const [budgetMax, setBudgetMax] = React.useState("")
  const [additionalInfo, setAdditionalInfo] = React.useState("")

  // Manual input fields for when profile-based is disabled
  const [manualInterests, setManualInterests] = React.useState("")
  const [manualTimePreference, setManualTimePreference] = React.useState("")
  const [manualBudget, setManualBudget] = React.useState("")
  const [manualTransport, setManualTransport] = React.useState("")
  const [manualMood, setManualMood] = React.useState("")
  const [manualRelationshipStatus, setManualRelationshipStatus] = React.useState("")
  const [manualDietary, setManualDietary] = React.useState("")
  const [manualSpecialDay, setManualSpecialDay] = React.useState("")
  const [manualAgeGroup, setManualAgeGroup] = React.useState("")
  const [manualMbti, setManualMbti] = React.useState("")
  const [showBudgetInput, setShowBudgetInput] = React.useState(false)
  const [showTransportInput, setShowTransportInput] = React.useState(false)
  const [showSpecialDayInput, setShowSpecialDayInput] = React.useState(false)
  const [specialDay, setSpecialDay] = React.useState("")

  const handleSubmit = () => {
    // AI 추천 탭 활성화
    setCurrentTab("/recommendations")
    
    // 추천 요청 데이터 생성
    const recommendationData = {
      id: Date.now(),
      title: `AI 데이트 추천 - ${location || "선택된 지역"}`,
      date: startDate || new Date().toISOString().split('T')[0],
      requestDate: new Date().toISOString().split('T')[0],
      requestDay: new Date().toLocaleDateString('ko-KR', { weekday: 'long' }),
      weather: "맑음", // 기본값, 실제로는 날씨 API에서 가져올 수 있음
      location: location || "미정",
      course: location ? generateSampleCourse(location) : ["카페 투어", "맛집 탐방", "산책"],
      tags: useProfileBased ? 
        [...profile.interests.slice(0, 2), ...(isPartnerConnected ? partnerProfile.interests.slice(0, 2) : [])] :
        [manualInterests, manualTimePreference, manualBudget].filter(Boolean),
      usedMileage: 50 // 기본 마일리지 사용량
    }
    
    // 추천 데이터를 store에 추가
    addRecommendation(recommendationData)
    
    // 추천 요청 로직
    onSubmit()
  }

  // 지역별 샘플 코스 생성 함수
  const generateSampleCourse = (location: string) => {
    const courseMap: { [key: string]: string[] } = {
      "서울": ["홍대 거리공연", "카페 투어", "한강공원", "남산타워"],
      "부산": ["해운대해변", "광안대교", "감천문화마을", "부산타워"],
      "제주도": ["성산일출봉", "만장굴", "협재해변", "오설록티뮤지엄"],
      "인천": ["차이나타운", "월미도", "송도해변", "인천타워"],
      "부평구": ["부평구청", "부평역", "부평시장", "부평공원"],
      "미정": ["카페 투어", "맛집 탐방", "산책", "문화체험"]
    }
    
    return courseMap[location] || courseMap["미정"]
  }

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-700">
            <Sparkles className="h-5 w-5" />
            AI 데이트 추천 요청
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile-based Toggle */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">프로필 기반 추천</p>
                <p className="text-sm text-blue-700">
                  {useProfileBased ? "프로필 정보를 활용한 맞춤 추천" : "수동 입력으로 추천"}
                </p>
              </div>
            </div>
            <Switch
              checked={useProfileBased}
              onCheckedChange={setUseProfileBased}
            />
          </div>

          {/* Profile Info Display */}
          {useProfileBased && (
            <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800">프로필 정보</h3>
              
              {/* 내 정보 섹션 */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h4 className="font-medium text-blue-800">내 정보</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-700">관심사 & 취미</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.interests.slice(0, 3).map((interest: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">선호 시간대</p>
                    <p className="text-sm text-blue-800">{profile.timePreference}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">교통 수단</p>
                    <p className="text-sm text-blue-800">{profile.transport}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">분위기 & 상태</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.mood.slice(0, 3).map((mood: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {mood}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">연애 상태</p>
                    <p className="text-sm text-blue-800">{profile.relationshipStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">음식 취향</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.dietary.slice(0, 3).map((diet: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">나이대</p>
                    <p className="text-sm text-blue-800">{profile.birthDate ? `${new Date().getFullYear() - new Date(profile.birthDate).getFullYear()}대` : "미설정"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">MBTI</p>
                    <p className="text-sm text-blue-800">{profile.mbti || "미설정"}</p>
                  </div>
                </div>
              </div>

              {/* 상대방 정보 섹션 */}
              {isPartnerConnected && (
                <div className="space-y-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <h4 className="font-medium text-pink-800">상대방 정보</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-pink-700">관심사 & 취미</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partnerProfile.interests.slice(0, 3).map((interest: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-pink-100 text-pink-800">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-700">선호 시간대</p>
                      <p className="text-sm text-pink-800">{partnerProfile.timePreference}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-700">교통 수단</p>
                      <p className="text-sm text-pink-800">{partnerProfile.transport}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-700">분위기 & 상태</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partnerProfile.mood.slice(0, 3).map((mood: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-pink-100 text-pink-800">
                            {mood}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-700">연애 상태</p>
                      <p className="text-sm text-pink-800">{partnerProfile.relationshipStatus}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-700">음식 취향</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partnerProfile.dietary.slice(0, 3).map((diet: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-pink-100 text-pink-800">
                            {diet}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-700">나이대</p>
                      <p className="text-sm text-pink-800">{partnerProfile.birthDate ? `${new Date().getFullYear() - new Date(partnerProfile.birthDate).getFullYear()}대` : "미설정"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-700">MBTI</p>
                      <p className="text-sm text-pink-800">{partnerProfile.mbti || "미설정"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Manual Input Fields */}
          {!useProfileBased && (
            <div className="space-y-4 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800">추천 정보 입력</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manualInterests">관심사 & 취미</Label>
                  <Input
                    id="manualInterests"
                    value={manualInterests}
                    onChange={(e) => setManualInterests(e.target.value)}
                    placeholder="영화, 음악, 여행 등"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualTimePreference">선호 시간대</Label>
                  <Select value={manualTimePreference} onValueChange={setManualTimePreference}>
                    <SelectTrigger>
                      <SelectValue placeholder="시간대 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="아침">아침</SelectItem>
                      <SelectItem value="점심">점심</SelectItem>
                      <SelectItem value="저녁">저녁</SelectItem>
                      <SelectItem value="밤">밤</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualBudgetMin">예산 최솟값</Label>
                  <Input
                    id="manualBudgetMin"
                    type="number"
                    value={manualBudget}
                    onChange={(e) => setManualBudget(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualBudgetMax">예산 최댓값</Label>
                  <Input
                    id="manualBudgetMax"
                    type="number"
                    value={manualBudget}
                    onChange={(e) => setManualBudget(e.target.value)}
                    placeholder="100000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualTransport">교통 수단</Label>
                  <Select value={manualTransport} onValueChange={setManualTransport}>
                    <SelectTrigger>
                      <SelectValue placeholder="교통수단 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="도보">도보</SelectItem>
                      <SelectItem value="자차">자차</SelectItem>
                      <SelectItem value="대중교통">대중교통</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualMood">분위기 & 상태</Label>
                  <Input
                    id="manualMood"
                    value={manualMood}
                    onChange={(e) => setManualMood(e.target.value)}
                    placeholder="로맨틱, 액티브, 힐링 등"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualRelationshipStatus">연애 상태</Label>
                  <Select value={manualRelationshipStatus} onValueChange={setManualRelationshipStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="연애 상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="연인">연인</SelectItem>
                      <SelectItem value="썸">썸</SelectItem>
                      <SelectItem value="친구">친구</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualDietary">음식 취향</Label>
                  <Input
                    id="manualDietary"
                    value={manualDietary}
                    onChange={(e) => setManualDietary(e.target.value)}
                    placeholder="한식, 양식, 일식, 중식 등"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manualAgeGroup">나이대</Label>
                  <Select value={manualAgeGroup} onValueChange={setManualAgeGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="나이대 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10대">10대</SelectItem>
                      <SelectItem value="20대">20대</SelectItem>
                      <SelectItem value="30대">30대</SelectItem>
                      <SelectItem value="40대">40대</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manualMbti">MBTI</Label>
                  <Select value={manualMbti} onValueChange={setManualMbti}>
                    <SelectTrigger>
                      <SelectValue placeholder="MBTI 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INTJ">INTJ</SelectItem>
                      <SelectItem value="INTP">INTP</SelectItem>
                      <SelectItem value="ENTJ">ENTJ</SelectItem>
                      <SelectItem value="ENTP">ENTP</SelectItem>
                      <SelectItem value="INFJ">INFJ</SelectItem>
                      <SelectItem value="INFP">INFP</SelectItem>
                      <SelectItem value="ENFJ">ENFJ</SelectItem>
                      <SelectItem value="ENFP">ENFP</SelectItem>
                      <SelectItem value="ISTJ">ISTJ</SelectItem>
                      <SelectItem value="ISFJ">ISFJ</SelectItem>
                      <SelectItem value="ESTJ">ESTJ</SelectItem>
                      <SelectItem value="ESFJ">ESFJ</SelectItem>
                      <SelectItem value="ISTP">ISTP</SelectItem>
                      <SelectItem value="ISFP">ISFP</SelectItem>
                      <SelectItem value="ESTP">ESTP</SelectItem>
                      <SelectItem value="ESFP">ESFP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Request Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">시작일 <span className="text-red-500">*</span></Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">종료일 <span className="text-red-500">*</span></Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">장소 <span className="text-red-500">*</span></Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="인천 부평구, 서울, 제주도 등"
              />
            </div>

                         <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <Label className="text-base font-medium">특별한 날</Label>
                 <Button
                   type="button"
                   variant="outline"
                   size="sm"
                   onClick={() => setShowSpecialDayInput(!showSpecialDayInput)}
                   className="text-sm"
                 >
                   {showSpecialDayInput ? "특별한 날 설정하지 않기" : "특별한 날 설정하기"}
                 </Button>
               </div>
               
               {showSpecialDayInput && (
                 <div className="p-4 bg-gray-50 rounded-lg">
                   <div className="space-y-2">
                     <Input
                       id="specialDay"
                       value={specialDay}
                       onChange={(e) => setSpecialDay(e.target.value)}
                       placeholder="생일, 기념일, 발렌타인데이 등"
                     />
                   </div>
                 </div>
               )}
             </div>

            {useProfileBased && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">예산 범위</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBudgetInput(!showBudgetInput)}
                      className="text-sm"
                    >
                      {showBudgetInput ? "예산 범위 숨기기" : "예산 범위 직접 설정하기"}
                    </Button>
                  </div>
                  
                  {showBudgetInput && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="budgetMin">예산 최솟값 <span className="text-red-500">*</span></Label>
                        <Input
                          id="budgetMin"
                          type="number"
                          value={budgetMin}
                          onChange={(e) => setBudgetMin(e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budgetMax">예산 최댓값 <span className="text-red-500">*</span></Label>
                        <Input
                          id="budgetMax"
                          type="number"
                          value={budgetMax}
                          onChange={(e) => setBudgetMax(e.target.value)}
                          placeholder="100000"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">교통 수단</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTransportInput(!showTransportInput)}
                      className="text-sm"
                    >
                      {showTransportInput ? "교통 수단 숨기기" : "교통 수단 직접 설정하기"}
                    </Button>
                  </div>
                  
                  {showTransportInput && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="transport">교통 수단 선택</Label>
                        <Select value={manualTransport} onValueChange={setManualTransport}>
                          <SelectTrigger>
                            <SelectValue placeholder="교통 수단 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="도보">도보</SelectItem>
                            <SelectItem value="자차">자차</SelectItem>
                            <SelectItem value="대중교통">대중교통</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">추가 요청사항</Label>
              <Textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="추가로 원하는 사항이 있다면 자유롭게 입력해주세요"
                rows={4}
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 flex items-center justify-center gap-2 bg-white text-pink-700 hover:bg-pink-50 border-pink-200"
              >
                <ArrowLeft className="h-4 w-4" />
                목록으로
              </Button>
              <Button onClick={handleSubmit} className="flex-1 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                추천 요청
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RecommendationForm 