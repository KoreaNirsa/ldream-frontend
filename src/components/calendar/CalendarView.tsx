import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Heart, Camera, Utensils, Palette, Plus } from "lucide-react"

interface CalendarViewProps {
  onAddDate?: () => void
}

const CalendarView: React.FC<CalendarViewProps> = ({ onAddDate }) => {
  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-700">
          <Calendar className="h-5 w-5" />
          데이트 캘린더 📅
        </CardTitle>
        <CardDescription>
          우리만의 특별한 날들을 캘린더로 관리해보세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">이번 달 데이트</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium">한강 피크닉</p>
                    <p className="text-sm text-gray-600">1월 15일</p>
                  </div>
                </div>
                <Badge variant="outline">완료</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">카페 투어</p>
                    <p className="text-sm text-gray-600">1월 10일</p>
                  </div>
                </div>
                <Badge variant="outline">완료</Badge>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">다가오는 데이트</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Utensils className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">맛집 탐방</p>
                    <p className="text-sm text-gray-600">1월 25일</p>
                  </div>
                </div>
                <Badge variant="secondary">예정</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Palette className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">전시회 관람</p>
                    <p className="text-sm text-gray-600">2월 1일</p>
                  </div>
                </div>
                <Badge variant="secondary">예정</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full" onClick={onAddDate}>
            <Plus className="h-4 w-4 mr-2" />
            새로운 데이트 추가
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CalendarView 