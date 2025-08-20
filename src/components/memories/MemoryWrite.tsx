import React, { useEffect } from "react"
import { useMemoryStore } from "@/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Upload,
  X,
  Star,
  ArrowLeft,
  Save,


  Bold,
  Italic,
  Underline,
  Smile,
} from "lucide-react"

interface MemoryWriteProps {
  onBack: () => void
  onSave: () => void
  defaultPrivate?: boolean
}

const MemoryWrite: React.FC<MemoryWriteProps> = ({ onBack, onSave, defaultPrivate = true }) => {
  const {
    editingMemory,
    selectedMemory,
    selectedRating,
    tags,
    tagInput,
    isPrivate,
    memoText,
    existingPhotos,
    uploadedFiles,
    setSelectedRating,
    setTags,
    setTagInput,
    setIsPrivate,
    setMemoText,
    setExistingPhotos,
    addUploadedFile,
    removeUploadedFile,
  } = useMemoryStore()

  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [weather, setWeather] = React.useState("맑음")
  const [isBold, setIsBold] = React.useState(false)
  const [isItalic, setIsItalic] = React.useState(false)
  const [isUnderline, setIsUnderline] = React.useState(false)

  // 편집 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (editingMemory && selectedMemory) {
      setTitle(selectedMemory.title)
      setDate(selectedMemory.date)
      setLocation(selectedMemory.location)
      setWeather(selectedMemory.weather)
      setSelectedRating(selectedMemory.rating)
      setTags(selectedMemory.tags || [])
      setIsPrivate(!selectedMemory.isPublic)
      setMemoText(selectedMemory.memo)
      setExistingPhotos(selectedMemory.photos || [])
    } else {
      // 새로 작성할 때 기본값 설정
      setIsPrivate(defaultPrivate)
    }
  }, [editingMemory, selectedMemory, defaultPrivate])

  const handleTagInput = (value: string) => {
    setTagInput(value)
    if (value.includes(" ")) {
      const newTag = value.trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileId = Date.now() + Math.random()
        addUploadedFile({
          id: fileId,
          name: file.name,
          file: file,
          preview: e.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (fileId: number) => {
    removeUploadedFile(fileId)
  }

  // 에디터 기능들
  const insertEmoji = (emoji: string) => {
    setMemoText(memoText + emoji)
  }

  const toggleBold = () => {
    setIsBold(!isBold)
  }

  const toggleItalic = () => {
    setIsItalic(!isItalic)
  }

  const toggleUnderline = () => {
    setIsUnderline(!isUnderline)
  }

  const handleSave = () => {
    // 저장 로직
    onSave()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onBack} 
                          className="flex items-center gap-2 bg-white text-pink-700 hover:bg-pink-50 border-pink-200"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          저장
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {editingMemory ? "추억 수정" : "추억 추가하기"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="추억의 제목을 입력해주세요"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">날짜 *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">데이트 위치 *</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="데이트한 장소를 입력해주세요"
            />
          </div>

          {/* Weather */}
          <div className="space-y-2">
            <Label htmlFor="weather">날씨</Label>
            <select
              id="weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="맑음">맑음</option>
              <option value="흐림">흐림</option>
              <option value="비">비</option>
              <option value="눈">눈</option>
            </select>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>별점</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="relative">
                  <button
                    onClick={() => setSelectedRating(star - 0.5)}
                    className="absolute left-0 top-0 w-3 h-6 z-10"
                  />
                  <button
                    onClick={() => setSelectedRating(star)}
                    className="absolute right-0 top-0 w-3 h-6 z-10"
                  />
                  <div className="relative">
                    {/* 배경 별 (회색) */}
                    <Star className="h-6 w-6 text-gray-300 fill-current" />
                    {/* 채워진 별 (노란색) */}
                    <div 
                      className="absolute top-0 left-0 overflow-hidden"
                      style={{
                        width: selectedRating >= star ? '100%' : 
                               selectedRating >= star - 0.5 ? '50%' : '0%'
                      }}
                    >
                      <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>
              ))}
              <span className="ml-2 text-sm text-gray-600">{selectedRating}/5</span>
            </div>
          </div>

          {/* Memo */}
          <div className="space-y-2">
            <Label htmlFor="memo">메모</Label>
            <div className="border rounded-lg">
              {/* 에디터 툴바 */}
              <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
                <Button
                  type="button"
                  variant={isBold ? "default" : "outline"}
                  size="sm"
                  onClick={toggleBold}
                  className="h-8 w-8 p-0"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={isItalic ? "default" : "outline"}
                  size="sm"
                  onClick={toggleItalic}
                  className="h-8 w-8 p-0"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={isUnderline ? "default" : "outline"}
                  size="sm"
                  onClick={toggleUnderline}
                  className="h-8 w-8 p-0"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertEmoji("😊")}
                  className="h-8 w-8 p-0"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertEmoji("❤️")}
                  className="h-8 px-2"
                >
                  ❤️
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertEmoji("🎉")}
                  className="h-8 px-2"
                >
                  🎉
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertEmoji("🌟")}
                  className="h-8 px-2"
                >
                  🌟
                </Button>
              </div>
              <Textarea
                id="memo"
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                placeholder="추억에 대한 메모를 작성해주세요..."
                className={`min-h-[120px] border-0 resize-none ${
                  isBold ? "font-bold" : ""
                } ${isItalic ? "italic" : ""} ${
                  isUnderline ? "underline" : ""
                }`}
              />
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <Label>사진</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">클릭하여 사진을 선택하세요</p>
              </label>
            </div>
            
            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Existing Photos */}
            {existingPhotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {existingPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`기존 사진 ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        const newPhotos = existingPhotos.filter((_, i) => i !== index)
                        setExistingPhotos(newPhotos)
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">태그 (띄어쓰기로 구분)</Label>
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => handleTagInput(e.target.value)}
              placeholder="태그를 입력하고 스페이스를 누르세요"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Public/Private Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="private" className="flex items-center gap-2">
              {isPrivate ? "🔒 비공개 (우리만의 추억)" : "🌍 공개 (모두의 추억)"}
            </Label>
            <Switch
              id="private"
              checked={!isPrivate}
              onCheckedChange={(checked) => setIsPrivate(!checked)}
            />
          </div>


        </CardContent>
      </Card>
    </div>
  )
}

export default MemoryWrite 