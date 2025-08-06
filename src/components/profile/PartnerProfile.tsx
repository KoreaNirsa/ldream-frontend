import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Edit, Users, UserPlus, Link, Coins, Sparkles, Heart } from "lucide-react"

interface PartnerProfileProps {
  partnerProfile: any
  profile: any
  isPartnerConnected: boolean
}

const PartnerProfile: React.FC<PartnerProfileProps> = ({ partnerProfile, profile, isPartnerConnected }) => {
  const [searchId, setSearchId] = useState("")
  const [relationshipType, setRelationshipType] = useState("커플")
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleConnectionRequest = () => {
    // 인연 요청 로직 구현
    console.log("인연 요청 전송:", searchId, "관계:", relationshipType)
    setIsSearchDialogOpen(false)
    setSearchId("")
    setRelationshipType("커플")
    setShowSuccessDialog(true)
  }

  if (!isPartnerConnected) {
    return (
      <>
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <UserPlus className="h-5 w-5" />
              상대방 프로필 💕
            </CardTitle>
            <CardDescription>상대방과 커플 또는 친구로 인연을 맺어보세요!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <Heart className="h-16 w-16 mx-auto text-pink-400 mb-4" />
              <p className="text-gray-600 mb-4">연결된 프로필이 없습니다</p>
              <p className="text-sm text-gray-500 mb-6">상대방과 커플 또는 친구로 인연을 맺어보세요!</p>
              <div className="space-y-3">
                <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-pink-500 hover:bg-pink-600 w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      인연 맺기
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-pink-500" />
                        인연 맺기
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="relationship-type">관계 유형</Label>
                        <Select value={relationshipType} onValueChange={setRelationshipType}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="관계 유형을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="커플">💕 커플</SelectItem>
                            <SelectItem value="썸">💫 썸</SelectItem>
                            <SelectItem value="친구">👥 친구</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="search-id">상대방 아이디</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="search-id"
                            placeholder="상대방의 아이디를 입력하세요"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                          />
                          <Button 
                            onClick={handleConnectionRequest}
                            disabled={!searchId.trim()}
                            className="bg-pink-500 hover:bg-pink-600"
                          >
                            요청
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        상대방의 아이디를 입력하면 인연 요청을 보낼 수 있습니다.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 성공 팝업 다이얼로그 */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                인연 요청 완료
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">상대방에게 인연을 요청했어요!</p>
                  <p className="text-sm text-gray-600">활동내역에서 승인/거절이 가능합니다</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button 
                onClick={() => setShowSuccessDialog(false)}
                className="bg-pink-500 hover:bg-pink-600"
              >
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return (
    <div className="space-y-6">
      {/* 상대방 기본 정보 */}
      <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-700">
            <Users className="h-5 w-5" />
            {partnerProfile.nickname}님의 프로필 💕
          </CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{partnerProfile.relationshipType === "커플" ? "연인" : "친구"}으로 연결되어 있습니다</span>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              관계 설정 변경
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="bg-blue-100 text-xl">💙</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{partnerProfile.name}</h3>
                  <p className="text-gray-600">별명: {partnerProfile.nickname}</p>
                  <p className="text-sm text-gray-500">생일: {partnerProfile.birthDate}</p>
                  <p className="text-sm text-gray-500">MBTI: {partnerProfile.mbti}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Coins className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs font-semibold text-yellow-600">
                      {partnerProfile.mileage.toLocaleString()}P
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">관심사</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {partnerProfile.interests.map((interest: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">선호 지역</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {partnerProfile.locations.map((location: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        📍 {location}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">선호 요일</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {partnerProfile.preferredDays.map((day: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        📅 {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <Label className="text-xs text-gray-500">시간대</Label>
                  <p>{partnerProfile.timePreference}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">예산</Label>
                  <p>💸 {partnerProfile.budget}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">교통수단</Label>
                  <p>{partnerProfile.transport}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">분위기</Label>
                  <p>{partnerProfile.mood}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">음식 취향</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {partnerProfile.dietary.map((diet: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* 프로필 비교 */}
      <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-700">
            <Sparkles className="h-5 w-5" />
            프로필 비교 분석 📊
          </CardTitle>
          <CardDescription>두 분의 취향을 비교하여 최적의 데이트 코스를 찾아드려요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🎯 공통 관심사</h4>
                <div className="space-y-1">
                  <Badge className="bg-green-100 text-green-700">📷 사진</Badge>
                  <p className="text-sm text-green-600">사진 찍기 좋은 장소를 추천해드릴게요!</p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🌍 공통 지역</h4>
                <div className="space-y-1">
                  <Badge className="bg-blue-100 text-blue-700">📍 서울 전체</Badge>
                  <p className="text-sm text-blue-600">서울 전역에서 데이트 코스를 찾아드려요!</p>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">📅 공통 선호 요일</h4>
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {profile.preferredDays
                      .filter((day: string) => partnerProfile.preferredDays.includes(day))
                      .map((day: string, index: number) => (
                        <Badge key={index} className="bg-purple-100 text-purple-700 text-xs">
                          {day}
                        </Badge>
                      ))}
                  </div>
                  <p className="text-sm text-purple-600">이 요일들에 데이트 계획을 세워보세요!</p>
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">🧠 MBTI 궁합</h4>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <Badge className="bg-orange-100 text-orange-700">{profile.mbti}</Badge>
                    <span className="text-orange-600">×</span>
                    <Badge className="bg-orange-100 text-orange-700">{partnerProfile.mbti}</Badge>
                  </div>
                  <p className="text-sm text-orange-600">서로 다른 매력으로 균형잡힌 관계예요!</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 추천 포인트</h4>
              <p className="text-sm text-yellow-700">
                {profile.nickname}님은 로맨틱한 분위기를, {partnerProfile.nickname}님은 액티브한 분위기를
                선호하시네요. 야외 활동 후 분위기 있는 카페에서 마무리하는 코스는 어떨까요?
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PartnerProfile 