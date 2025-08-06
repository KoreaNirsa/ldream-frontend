import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Camera, MapPin, Calendar, Tag, Globe, Lock, X, Plus } from "lucide-react"

interface MemoryCreateProps {
  onBack: () => void
  onSave: (memory: any) => void
  defaultPrivate?: boolean
  existingMemory?: any
  isEdit?: boolean
}

const MemoryCreate: React.FC<MemoryCreateProps> = ({ 
  onBack, 
  onSave, 
  defaultPrivate = true, 
  existingMemory = null,
  isEdit = false 
}) => {
  const [formData, setFormData] = useState({
    title: existingMemory?.title || "",
    description: existingMemory?.description || "",
    date: existingMemory?.date || "",
    location: existingMemory?.location || "",
    weather: existingMemory?.weather || "맑음",
    mood: existingMemory?.mood || "행복",
    rating: existingMemory?.rating || 5,
    isPublic: existingMemory ? existingMemory.isPublic : !defaultPrivate,
    tags: existingMemory?.tags || [] as string[],
    photos: existingMemory?.photos || [] as string[]
  })

  const [newTag, setNewTag] = useState("")

  const weatherOptions = ["맑음", "흐림", "비", "눈", "안개"]
  const moodOptions = ["행복", "즐거움", "감동", "신남", "평온", "설렘", "감사"]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleRemovePhoto = (photoToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo !== photoToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const memoryData = {
      ...formData,
      id: Date.now(), // 임시 ID
      likes: 0,
      comments: [],
      author: "사용자"
    }
    onSave(memoryData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          {isEdit ? "추억 수정하기" : "추억 추가하기"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">
                제목 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="추억의 제목을 입력하세요"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">
                  날짜 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">
                  장소 <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="장소를 입력하세요"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weather">날씨</Label>
                <Select value={formData.weather} onValueChange={(value) => handleInputChange("weather", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherOptions.map(weather => (
                      <SelectItem key={weather} value={weather}>{weather}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mood">기분</Label>
                <Select value={formData.mood} onValueChange={(value) => handleInputChange("mood", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map(mood => (
                      <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 태그 */}
            <div className="space-y-2">
              <Label>태그</Label>
              <Input
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                  // 띄어쓰기로 태그 자동 추가
                  const words = e.target.value.split(' ');
                  if (words.length > 1) {
                    const newTags = words.slice(0, -1).filter(word => word.trim());
                    const lastWord = words[words.length - 1];
                    
                    // 새로운 태그들 추가
                    newTags.forEach(tag => {
                      if (tag.trim() && !formData.tags.includes(tag.trim())) {
                        setFormData(prev => ({
                          ...prev,
                          tags: [...prev.tags, tag.trim()]
                        }));
                      }
                    });
                    
                    // 마지막 단어만 입력창에 남김
                    setNewTag(lastWord);
                  }
                }}
                placeholder="태그를 입력하고 띄어쓰기로 구분하세요"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <div className="flex flex-wrap gap-1">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="rating">평점</Label>
              <div className="flex items-center gap-2 mt-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      const currentRating = formData.rating;
                      const newRating = currentRating === star ? star - 0.5 : star;
                      handleInputChange("rating", newRating);
                    }}
                    className="relative"
                  >
                    <div className="text-2xl text-gray-300">★</div>
                    <div 
                      className={`absolute inset-0 text-2xl text-yellow-400 overflow-hidden ${
                        star <= Math.floor(formData.rating) ? 'w-full' : 
                        star === Math.ceil(formData.rating) && formData.rating % 1 === 0.5 ? 'w-1/2' : 'w-0'
                      }`}
                    >
                      ★
                    </div>
                  </button>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {formData.rating.toFixed(1)}/5.0
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="description">
                설명 <span className="text-red-500">*</span>
              </Label>
              <div className="border rounded-lg p-3 bg-white">
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('description') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = formData.description;
                      const before = text.substring(0, start);
                      const selected = text.substring(start, end);
                      const after = text.substring(end);
                      const newText = before + `<strong>${selected}</strong>` + after;
                      handleInputChange("description", newText);
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    굵게
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('description') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const text = formData.description;
                      const before = text.substring(0, start);
                      const after = text.substring(start);
                      const newText = before + "😊 " + after;
                      handleInputChange("description", newText);
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    😊
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('description') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const text = formData.description;
                      const before = text.substring(0, start);
                      const after = text.substring(start);
                      const newText = before + "💕 " + after;
                      handleInputChange("description", newText);
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    💕
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('description') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const text = formData.description;
                      const before = text.substring(0, start);
                      const after = text.substring(start);
                      const newText = before + "✨ " + after;
                      handleInputChange("description", newText);
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    ✨
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('description') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = formData.description;
                      const before = text.substring(0, start);
                      const selected = text.substring(start, end);
                      const after = text.substring(end);
                      const newText = before + `<em>${selected}</em>` + after;
                      handleInputChange("description", newText);
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    기울임
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('description') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = formData.description;
                      const before = text.substring(0, start);
                      const selected = text.substring(start, end);
                      const after = text.substring(end);
                      const newText = before + `<u>${selected}</u>` + after;
                      handleInputChange("description", newText);
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    밑줄
                  </button>
                </div>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="추억에 대한 간단한 설명을 입력하세요 (굵게: <strong>텍스트</strong>, 기울임: <em>텍스트</em>, 밑줄: <u>텍스트</u>, 이모지: 😊💕✨)"
                  rows={3}
                  className="border-0 p-0 focus:ring-0"
                  required
                />
              </div>
            </div>

          </div>



          {/* 사진 업로드 */}
          <div className="space-y-2">
            <Label>사진 업로드 (최대 10장)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (formData.photos.length + files.length > 10) {
                    alert('최대 10장까지만 업로드 가능합니다.');
                    return;
                  }
                  
                  files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const result = e.target?.result as string;
                      if (result && !formData.photos.includes(result)) {
                        setFormData(prev => ({
                          ...prev,
                          photos: [...prev.photos, result]
                        }));
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">클릭하여 사진을 업로드하세요</p>
                <p className="text-sm text-gray-500 mt-1">최대 10장까지 업로드 가능</p>
              </label>
            </div>
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={photo} 
                      alt={`Photo ${index + 1}`} 
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공개 설정 */}
          <div className="space-y-2">
            <Label>공개 설정</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const newValue = !formData.isPublic;
                    console.log('Current isPublic:', formData.isPublic, 'New value:', newValue);
                    handleInputChange("isPublic", newValue);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.isPublic ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isPublic ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {formData.isPublic ? (
                  <>
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>공개 (모두의 추억)</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span>비공개 (우리만의 추억)</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              취소
            </Button>
            <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">
              저장하기
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default MemoryCreate 