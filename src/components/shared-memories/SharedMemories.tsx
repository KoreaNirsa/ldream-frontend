import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Share, Award, Plus, Filter, MapPin, ThumbsUp, Star, Search, Eye, User, Globe, Lock, Heart, MessageCircle, Calendar, Coins } from "lucide-react"

interface Memory {
  id: number
  title: string
  date: string
  location: string
  photos: string[]
  memo: string
  tags: string[]
  weather: string
  rating: number
  isPublic?: boolean
  likes: number
  comments: number
  author: string
  isBest?: boolean
  views?: number
  mood?: string // Added mood field
}

interface SharedMemoriesProps {
  viewMode: string
  setViewMode: (mode: string) => void
  memories: Memory[]
  sharedMemories: Memory[]
  bestMemories: Memory[]
  selectedPost: Memory | null
  setSelectedPost: (post: Memory | null) => void
  sharedCurrentPage: number
  setSharedCurrentPage: (page: number) => void
  itemsPerPage: number
  sharedTotalPages: number
  renderPagination: (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => JSX.Element
  isLoggedIn?: boolean
  onLoginClick?: () => void
  onMemoryClick?: (memory: any) => void
  onAddMemory?: () => void
}

const SharedMemories: React.FC<SharedMemoriesProps> = ({
  viewMode,
  setViewMode,
  memories,
  sharedMemories,
  bestMemories,
  selectedPost,
  setSelectedPost,
  sharedCurrentPage,
  setSharedCurrentPage,
  itemsPerPage,
  sharedTotalPages,
  renderPagination,
  isLoggedIn,
  onLoginClick,
  onMemoryClick,
  onAddMemory,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchType, setSearchType] = React.useState("전체")
  const [showAdvancedFilter, setShowAdvancedFilter] = React.useState(false)
  const [dateRange, setDateRange] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [sortBy, setSortBy] = React.useState("최신순")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [visibility, setVisibility] = React.useState("전체")

  // 검색 필터링
  const filteredMemories = memories.filter(memory => {
    const matchesSearch = searchQuery === "" || 
      (searchType === "전체" && (
        memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.memo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.author.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
      (searchType === "제목" && memory.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (searchType === "내용" && memory.memo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (searchType === "작성자" && memory.author.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = visibility === "전체" || 
      (visibility === "공개" && memory.isPublic) ||
      (visibility === "비공개" && !memory.isPublic)

    return matchesSearch && matchesFilter
  })

  // 페이지네이션
  const startIndex = (sharedCurrentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMemories = filteredMemories.slice(startIndex, endIndex)

  return (
    <>
      {/* 베스트 추억 섹션 - 항상 표시 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-purple-800">이달의 베스트 추억 🏆</h2>
          </div>
          <p className="text-sm text-purple-700 mb-4">지난 달 가장 많은 사랑을 받은 추억들이에요</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {bestMemories.slice(0, 10).map((memory, index) => (
              <div
                key={memory.id}
                className="relative cursor-pointer"
                onClick={() => onMemoryClick?.(memory)}
              >
                {/* 순위 배지 */}
                <div className="absolute top-2 left-2 z-10">
                  {index === 0 && (<Badge className="bg-yellow-500 text-white text-xs font-bold">🥇 1위</Badge>)}
                  {index === 1 && (<Badge className="bg-gray-400 text-white text-xs font-bold">🥈 2위</Badge>)}
                  {index === 2 && (<Badge className="bg-amber-600 text-white text-xs font-bold">🥉 3위</Badge>)}
                  {index > 2 && (<Badge className="bg-gray-300 text-gray-700 text-xs font-bold">{index + 1}위</Badge>)}
                </div>
                
                {/* 이미지 */}
                <div className="relative h-32 bg-gray-200 rounded-lg mb-2 overflow-hidden">
                  <img
                    src={memory.photos?.[0] || "/src/assets/placeholder.jpg"}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/src/assets/placeholder.jpg";
                    }}
                  />
                </div>
                
                {/* 제목 */}
                <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">{memory.title}</h3>
                
                {/* 작성자 - 기분 | 지역 */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{memory.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">😊</span>
                    <span className="text-xs text-gray-500">{memory.mood}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{memory.location}</span>
                  </div>
                </div>
                
                {/* 조회수-좋아요-댓글수 | 별점 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{memory.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <span className="text-xs text-gray-600">{memory.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{memory.comments || 0}</span>
                    </div>
                  </div>
                  {/* 별점 */}
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        const rating = memory.rating || 0;
                        
                        if (rating >= starValue) {
                          return <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />;
                        } else if (rating >= starValue - 0.5) {
                          return (
                            <div key={i} className="relative">
                              <Star className="h-3 w-3 text-gray-300" />
                              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              </div>
                            </div>
                          );
                        } else {
                          return <Star key={i} className="h-3 w-3 text-gray-300" />;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 검색 및 필터 */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2 flex-1">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="제목">제목</SelectItem>
              <SelectItem value="내용">내용</SelectItem>
              <SelectItem value="작성자">작성자</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4 mr-2" />
            검색
          </Button>
          <Button 
            variant={showAdvancedFilter ? "default" : "outline"}
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
            className={`flex items-center gap-2 ${showAdvancedFilter ? 'bg-pink-500 hover:bg-pink-600 text-white' : ''}`}
          >
            <Filter className="h-4 w-4" />
            상세 필터
          </Button>
        </div>
        {/* 뷰 모드 토글 */}
        <div className="flex border rounded-lg w-fit">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            size="sm"
            className={`rounded-r-none ${viewMode === "grid" ? "bg-pink-500 hover:bg-pink-600" : ""}`}
          >
            <div className="grid grid-cols-2 gap-1 w-4 h-4">
              <div className="w-1 h-1 bg-current rounded-sm"></div>
              <div className="w-1 h-1 bg-current rounded-sm"></div>
              <div className="w-1 h-1 bg-current rounded-sm"></div>
              <div className="w-1 h-1 bg-current rounded-sm"></div>
            </div>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            size="sm"
            className={`rounded-l-none ${viewMode === "list" ? "bg-pink-500 hover:bg-pink-600" : ""}`}
          >
            <div className="flex flex-col gap-1 w-4 h-4">
              <div className="w-full h-1 bg-current rounded-sm"></div>
              <div className="w-full h-1 bg-current rounded-sm"></div>
              <div className="w-full h-1 bg-current rounded-sm"></div>
            </div>
          </Button>
        </div>
      </div>

      {/* 상세 필터 */}
      {showAdvancedFilter && (
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">기간</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="기간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체</SelectItem>
                      <SelectItem value="최근 1주">최근 1주</SelectItem>
                      <SelectItem value="최근 1개월">최근 1개월</SelectItem>
                      <SelectItem value="최근 3개월">최근 3개월</SelectItem>
                      <SelectItem value="최근 6개월">최근 6개월</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">지역</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="지역 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체</SelectItem>
                      <SelectItem value="서울">서울</SelectItem>
                      <SelectItem value="부산">부산</SelectItem>
                      <SelectItem value="대구">대구</SelectItem>
                      <SelectItem value="인천">인천</SelectItem>
                      <SelectItem value="광주">광주</SelectItem>
                      <SelectItem value="대전">대전</SelectItem>
                      <SelectItem value="울산">울산</SelectItem>
                      <SelectItem value="제주">제주</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">정렬</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="최신순">최신순</SelectItem>
                      <SelectItem value="추천순">추천순</SelectItem>
                      <SelectItem value="댓글순">댓글순</SelectItem>
                      <SelectItem value="조회순">조회순</SelectItem>
                      <SelectItem value="별점순">별점순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">공개 설정</label>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체</SelectItem>
                      <SelectItem value="공개">공개</SelectItem>
                      <SelectItem value="비공개">비공개</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">태그</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "로맨틱", "피크닉", "여행", "카페", "영화", "쇼핑", "데이트", "커플", 
                    "야외", "실내", "맛집", "문화", "운동", "힐링", "액티비티", "포토존",
                    "야경", "해변", "산", "공원", "박물관", "전시회", "콘서트", "축제"
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        if (selectedTags.includes(tag)) {
                          setSelectedTags(selectedTags.filter(t => t !== tag))
                        } else {
                          setSelectedTags([...selectedTags, tag])
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 메모리 리스트 */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMemories.map((memory) => (
            <Card key={memory.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onMemoryClick?.(memory)}>
              <CardContent className="p-4">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 relative">
                  <img
                    src={memory.photos?.[0] || "/src/assets/placeholder.jpg"}
                    alt={memory.title}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/src/assets/placeholder.jpg";
                    }}
                  />
                  {/* 공개/비공개 아이콘 */}
                  <div className="absolute top-2 right-2">
                    {memory.isPublic ? (
                      <Globe className="h-4 w-4 text-blue-500 bg-white rounded-full p-0.5" />
                    ) : (
                      <Lock className="h-4 w-4 text-gray-500 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-xl font-bold text-gray-900 truncate flex-1">{memory.title}</h3>
                  <span className="text-xs text-gray-500 ml-2">{memory.date}</span>
                </div>
                
                {/* 위치와 작성자 정보 */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{memory.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">😊</span>
                    <span className="text-xs text-gray-500">{memory.mood}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{memory.location}</span>
                  </div>
                </div>
                
                {/* 조회수, 좋아요, 댓글 수 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{memory.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <span className="text-xs text-gray-500">{memory.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-500">1</span>
                    </div>
                  </div>
                  {/* 별점 */}
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        const rating = memory.rating || 0;
                        
                        if (rating >= starValue) {
                          return <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />;
                        } else if (rating >= starValue - 0.5) {
                          return (
                            <div key={i} className="relative">
                              <Star className="h-3 w-3 text-gray-300" />
                              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              </div>
                            </div>
                          );
                        } else {
                          return <Star key={i} className="h-3 w-3 text-gray-300" />;
                        }
                      })}
                    </div>
                  </div>
                </div>
                
                {/* 태그 */}
                <div className="flex flex-wrap gap-1">
                  {memory.tags?.slice(0, 2).map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {memory.tags && memory.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{memory.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentMemories.map((memory) => (
            <Card
              key={memory.id}
              className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onMemoryClick?.(memory)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={memory.photos?.[0] || "/src/assets/placeholder.jpg"}
                      alt={memory.title}
                      className="w-full h-full object-cover object-center rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/src/assets/placeholder.jpg";
                      }}
                    />
                  </div>
                                      <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 truncate">{memory.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{memory.memo}</p>
                        </div>
                      <div className="flex items-center gap-1">
                        {memory.isPublic ? (
                          <Globe className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                    
                    {/* 위치와 날짜 */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{memory.author}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">😊</span>
                        <span className="text-xs text-gray-500">{memory.mood}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{memory.date}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{memory.location}</span>
                      </div>
                    </div>
                    
                    {/* 조회수, 좋아요, 댓글 수 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{memory.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span className="text-xs text-gray-500">{memory.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{memory.comments || 0}</span>
                        </div>
                      </div>
                      {/* 별점 */}
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            const rating = memory.rating || 0;
                            
                            if (rating >= starValue) {
                              return <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />;
                            } else if (rating >= starValue - 0.5) {
                              return (
                                <div key={i} className="relative">
                                  <Star className="h-3 w-3 text-gray-300" />
                                  <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  </div>
                                </div>
                              );
                            } else {
                              return <Star key={i} className="h-3 w-3 text-gray-300" />;
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* 태그 */}
                    <div className="flex flex-wrap gap-1">
                      {memory.tags?.slice(0, 2).map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {memory.tags && memory.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{memory.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* 페이지네이션 */}
      {sharedTotalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSharedCurrentPage(Math.max(1, sharedCurrentPage - 1))}
            disabled={sharedCurrentPage === 1}
          >
            이전
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, sharedTotalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={sharedCurrentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSharedCurrentPage(pageNum)}
                  className={sharedCurrentPage === pageNum ? "bg-pink-500 hover:bg-pink-600" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSharedCurrentPage(Math.min(sharedTotalPages, sharedCurrentPage + 1))}
            disabled={sharedCurrentPage === sharedTotalPages}
          >
            다음
          </Button>
        </div>
      )}
    </>
  )
}

export default SharedMemories 