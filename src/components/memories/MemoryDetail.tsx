import React, { useState } from "react"
import { useUIStore } from "@/store"
import { Memory } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share,
  Edit,
  Trash2,
  Reply,

  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Cloud,


  ExternalLink,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface MemoryDetailProps {
  memory: Memory
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

const MemoryDetail: React.FC<MemoryDetailProps> = ({
  memory,
  onBack,
  onEdit,
  onDelete,
}) => {

  
  const {
    showReplyInput,
    setShowReplyInput,
  } = useUIStore()
  


  const [replyText, setReplyText] = React.useState("")
  const [commentText, setCommentText] = React.useState("")
  const [editingComment, setEditingComment] = React.useState<number | null>(null)
  const [editingReply, setEditingReply] = useState<number | null>(null)
  const [editCommentText, setEditCommentText] = useState("")
  const [editReplyText, setEditReplyText] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(memory.likes || 0)
  const [commentPage, setCommentPage] = useState(1)
  const [commentsPerPage] = useState(5)

  // 샘플 이미지 데이터
  const sampleImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a87c3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a87c3?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&q=80"
  ]

  // 사용할 이미지 배열 (테스트를 위해 항상 샘플 이미지 사용)
  const images = sampleImages

  // 샘플 댓글 데이터
  const sampleComments = [
    {
      id: 1,
      author: "지미니",
      content: "정말 아름다운 추억이네요! 💕",
      date: "2시간 전",
      likes: 3,
      replies: [
        {
          id: 1,
          author: "민수니",
          content: "고마워요! 다음에도 더 좋은 추억 만들어요 😊",
          date: "1시간 전",
          likes: 2
        }
      ]
    },
    {
      id: 2,
      author: "친구1",
      content: "여기 정말 예쁘네요! 다음에 같이 가고 싶어요",
      date: "5시간 전",
      likes: 1,
      replies: []
    },
    {
      id: 3,
      author: "친구2",
      content: "사진이 너무 잘 나왔어요! 📸",
      date: "1일 전",
      likes: 0,
      replies: []
    },
    {
      id: 4,
      author: "친구3",
      content: "정말 로맨틱한 데이트였겠어요! 💕",
      date: "2일 전",
      likes: 2,
      replies: []
    },
    {
      id: 5,
      author: "친구4",
      content: "다음에 저도 데려가주세요! 😄",
      date: "3일 전",
      likes: 1,
      replies: []
    },
    {
      id: 6,
      author: "친구5",
      content: "정말 아름다운 추억이네요! 💕",
      date: "4일 전",
      likes: 0,
      replies: []
    }
  ]

  // 댓글 페이징 계산
  const totalCommentPages = Math.ceil(sampleComments.length / commentsPerPage)
  const startCommentIndex = (commentPage - 1) * commentsPerPage
  const endCommentIndex = startCommentIndex + commentsPerPage
  const currentComments = sampleComments.slice(startCommentIndex, endCommentIndex)

  const handleReply = () => {
    if (replyText.trim()) {
      // 댓글 추가 로직
      setReplyText("")
      setShowReplyInput(null)
    }
  }

  const handleComment = () => {
    if (commentText.trim()) {
      // 댓글 추가 로직
      setCommentText("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Button>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            수정
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-1" />
                삭제
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>추억 삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  추억을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>삭제</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Memory Content */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-slate-800">
                {memory.title}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {memory.date}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {memory.location}
                </div>
                <div className="flex items-center gap-1">
                  <Cloud className="h-4 w-4" />
                  {memory.weather}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">😊</span>
                  {memory.mood}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const rating = memory.rating || 0;
                
                if (rating >= starValue) {
                  // 완전한 별
                  return <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />;
                } else if (rating >= starValue - 0.5) {
                  // 반별 (왼쪽 절반만 채워진 별)
                  return (
                    <div key={i} className="relative">
                      <Star className="h-5 w-5 text-gray-300" />
                      <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </div>
                    </div>
                  );
                } else {
                  // 빈 별
                  return <Star key={i} className="h-5 w-5 text-gray-300" />;
                }
              })}
              <span className="ml-2 text-sm text-gray-600">
                {memory.rating ? memory.rating.toFixed(1) : '0.0'}/5.0
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Photos */}
          <div className="relative">
            {/* 메인 이미지 */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={`${memory.title} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/src/assets/placeholder.jpg";
                }}
              />
              
              {/* 네비게이션 버튼 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              
              {/* 이미지 카운터 */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
            
            {/* 썸네일 이미지들 */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-pink-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`썸네일 ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/src/assets/placeholder.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Memo */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{memory.memo}</p>
          </div>

          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {memory.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isLiked) {
                      setIsLiked(false);
                      setLikeCount(likeCount - 1);
                    } else {
                      setIsLiked(true);
                      setLikeCount(likeCount + 1);
                    }
                  }}
                  // disabled={!isLoggedIn}
                  className="text-2xl hover:scale-110 transition-transform cursor-pointer"
                >
                  {isLiked ? (
                    <Heart className="h-6 w-6 text-red-500 fill-current" />
                  ) : (
                    <Heart className="h-6 w-6 text-gray-400 hover:text-red-400" />
                  )}
                </button>
                <span className="text-sm font-medium">
                  {likeCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">{memory.comments}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4 mr-1" />
                    공유
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    인스타그램
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    카카오톡
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    URL 복사
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">댓글</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comment Input */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="space-y-2">
                <Textarea
                  placeholder="댓글을 작성해주세요..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleComment} disabled={!commentText.trim()}>
                  댓글 작성
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {currentComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    {editingComment === comment.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingComment(null)
                              setEditCommentText("")
                            }}
                          >
                            취소
                          </Button>
                          <Button size="sm" onClick={() => {
                            // 댓글 수정 로직
                            setEditingComment(null)
                            setEditCommentText("")
                          }}>
                            수정 완료
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => setShowReplyInput(comment.id)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      답글
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => {
                        setEditingComment(comment.id)
                        setEditCommentText(comment.content)
                      }}
                    >
                      수정
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-xs text-red-500">
                          삭제
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction>삭제</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  {showReplyInput === comment.id && (
                    <div className="mt-3 ml-4 space-y-2">
                      <Textarea
                        placeholder="답글을 작성해주세요..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[60px]"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowReplyInput(null)}
                        >
                          취소
                        </Button>
                        <Button size="sm" onClick={handleReply}>
                          답글 작성
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mt-3 ml-4 flex gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-xs">{reply.author}</span>
                            <span className="text-xs text-gray-500">{reply.date}</span>
                          </div>
                          {editingReply === reply.id ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editReplyText}
                                onChange={(e) => setEditReplyText(e.target.value)}
                                className="min-h-[40px] text-xs"
                              />
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingReply(null)
                                    setEditReplyText("")
                                  }}
                                >
                                  취소
                                </Button>
                                <Button size="sm" onClick={() => {
                                  // 답글 수정 로직
                                  setEditingReply(null)
                                  setEditReplyText("")
                                }}>
                                  수정 완료
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-700">{reply.content}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs"
                            onClick={() => {
                              setEditingReply(reply.id)
                              setEditReplyText(reply.content)
                            }}
                          >
                            수정
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-xs text-red-500">
                                삭제
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>답글 삭제</AlertDialogTitle>
                                <AlertDialogDescription>
                                  답글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction>삭제</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalCommentPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommentPage(prev => Math.max(1, prev - 1))}
                disabled={commentPage === 1}
              >
                이전
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalCommentPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={commentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCommentPage(pageNum)}
                      className={commentPage === pageNum ? "bg-pink-500 hover:bg-pink-600" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommentPage(prev => Math.min(totalCommentPages, prev + 1))}
                disabled={commentPage === totalCommentPages}
              >
                다음
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom Back Button */}
      <div className="flex justify-center pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Button>
      </div>
    </div>
  )
}

export default MemoryDetail 