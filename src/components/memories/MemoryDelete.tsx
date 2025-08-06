import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2, X } from "lucide-react"

interface MemoryDeleteProps {
  memory: any
  onCancel: () => void
  onConfirm: () => void
  isLoading?: boolean
}

const MemoryDelete: React.FC<MemoryDeleteProps> = ({ 
  memory, 
  onCancel, 
  onConfirm, 
  isLoading = false 
}) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          추억 삭제
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            정말 삭제하시겠습니까?
          </h3>
          <p className="text-gray-600 mb-4">
            <strong>"{memory.title}"</strong> 추억을 삭제하면 복구할 수 없습니다.
          </p>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">
              <strong>삭제될 내용:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>• 추억 제목: {memory.title}</li>
              <li>• 장소: {memory.location}</li>
              <li>• 날짜: {memory.date}</li>
              <li>• 첨부된 사진 {memory.photos?.length || 0}장</li>
              <li>• 작성된 메모</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            disabled={isLoading}
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" />
            취소
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                삭제 중...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                삭제하기
              </>
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            삭제된 추억은 복구할 수 없습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MemoryDelete 