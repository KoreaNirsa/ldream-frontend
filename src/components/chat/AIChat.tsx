import React, { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { MessageCircle, ThumbsUp, ThumbsDown, Send } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type ChatMessage =
  | {
      type: 'ai';
      message: string;
      timestamp: Date;
      showFeedback?: boolean;
      feedback?: 'positive' | 'negative';
    }
  | {
      type: 'user';
      message: string;
      timestamp: Date;
    }

interface AIChatProps {
  chatHistory: ChatMessage[]
  chatMessage: string
  setChatMessage: (msg: string) => void
  userSubscription: any
  handleChatFeedback: (messageIndex: number, isPositive: boolean) => void
  handleQuickChat: (msg: string) => void
  setCurrentTab: (tab: string) => void
  isLoggedIn: boolean
  guestChatCount: number
  setGuestChatCount: (count: number) => void
  onLoginClick: () => void
}

const AIChat: React.FC<AIChatProps> = ({
  chatHistory,
  chatMessage,
  setChatMessage,
  userSubscription,
  handleChatFeedback,
  handleQuickChat,
  setCurrentTab,
  isLoggedIn,
  guestChatCount,
  setGuestChatCount,
  onLoginClick,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [feedbackStates, setFeedbackStates] = React.useState<{[key: number]: 'positive' | 'negative' | undefined}>({})

  // 새 메시지가 추가되면 스크롤을 하단으로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  // 피드백 토글 함수
  const toggleFeedback = (messageIndex: number, isPositive: boolean) => {
    const currentFeedback = feedbackStates[messageIndex]
    let newFeedback: 'positive' | 'negative' | undefined
    
    if (isPositive) {
      newFeedback = currentFeedback === 'positive' ? undefined : 'positive'
    } else {
      newFeedback = currentFeedback === 'negative' ? undefined : 'negative'
    }
    
    setFeedbackStates(prev => ({
      ...prev,
      [messageIndex]: newFeedback
    }))
    
    // store에도 업데이트
    handleChatFeedback(messageIndex, isPositive)
  }
  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-700">
          <MessageCircle className="h-5 w-5" />
          AI 데이트 컨설턴트 💬
          <Badge variant="outline" className="ml-auto">
            {userSubscription.aiUsageToday}/{userSubscription.aiLimitDaily} 사용
          </Badge>
        </CardTitle>
        <CardDescription>
          궁금한 것이 있으면 언제든 물어보세요! 맞춤 추천을 도와드릴게요 ✨
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={chatContainerRef} className="bg-slate-50 rounded-lg p-4 min-h-[400px] max-h-[500px] overflow-y-auto">
          <div className="space-y-4">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                {message.type === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                  <div
                    className={`p-3 rounded-lg shadow-sm ${
                      message.type === "user" ? "bg-purple-500 text-white" : "bg-white"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                  {message.type === "ai" && index === chatHistory.length - 1 && (
                    <div className="flex items-center gap-3 mt-1 p-2 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-600 font-medium">이 답변이 도움이 되었나요?</span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant={feedbackStates[index] === "positive" ? "default" : "outline"}
                          onClick={() => toggleFeedback(index, true)}
                          className={`h-7 px-3 ${
                            feedbackStates[index] === "positive" 
                              ? "bg-green-500 hover:bg-green-600 text-white border-green-500" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <ThumbsUp className={`h-3 w-3 ${
                            feedbackStates[index] === "positive" ? "fill-current" : ""
                          }`} />
                          <span className="ml-1 text-xs">좋아요</span>
                        </Button>
                        <Button
                          size="sm"
                          variant={feedbackStates[index] === "negative" ? "default" : "outline"}
                          onClick={() => toggleFeedback(index, false)}
                          className={`h-7 px-3 ${
                            feedbackStates[index] === "negative" 
                              ? "bg-red-500 hover:bg-red-600 text-white border-red-500" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <ThumbsDown className={`h-3 w-3 ${
                            feedbackStates[index] === "negative" ? "fill-current" : ""
                          }`} />
                          <span className="ml-1 text-xs">싫어요</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {message.type === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-pink-100">💖</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </div>

        {!isLoggedIn ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-800 font-medium mb-2">비회원 AI 채팅</p>
            <p className="text-sm text-blue-600 mb-3">
              {guestChatCount === 0 
                ? "오늘 1회 무료로 AI 채팅을 이용할 수 있습니다" 
                : "오늘의 무료 사용 횟수를 모두 사용했습니다"
              }
            </p>
            {guestChatCount === 0 ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="AI에게 질문해보세요..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      if (chatMessage.trim()) {
                        handleQuickChat(chatMessage)
                        setChatMessage("")
                        setGuestChatCount(1)
                      }
                    }}
                  >
                    전송
                  </Button>
                </div>
                <Button 
                  variant="outline"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={onLoginClick}
                >
                  로그인하여 더 많이 이용하기
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={onLoginClick}
              >
                로그인하기
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <Input
                placeholder="AI에게 질문해보세요... (예: 실내 데이트 추천해줘, 기념일 코스 알려줘)"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatMessage.trim() && userSubscription.aiUsageToday < userSubscription.aiLimitDaily) {
                    handleQuickChat(chatMessage)
                    setChatMessage("")
                  }
                }}
                className="flex-1"
                disabled={userSubscription.aiUsageToday >= userSubscription.aiLimitDaily}
              />
              <Button
                className="bg-purple-500 hover:bg-purple-600"
                disabled={userSubscription.aiUsageToday >= userSubscription.aiLimitDaily}
                onClick={() => {
                  if (chatMessage.trim()) {
                    handleQuickChat(chatMessage)
                    setChatMessage("")
                  }
                }}
              >
                전송
              </Button>
            </div>

            {/* 빠른 질문 버튼들 */}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => handleQuickChat("💡 실내 데이트 추천해줘")} className="text-xs">
                💡 실내 데이트 추천해줘
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleQuickChat("🎂 생일 기념 코스 알려줘")} className="text-xs">
                🎂 생일 기념 코스 알려줘
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleQuickChat("☔ 비오는 날 데이트는?")} className="text-xs">
                ☔ 비오는 날 데이트는?
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleQuickChat("💸 저렴한 데이트 코스")} className="text-xs">
                💸 저렴한 데이트 코스
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleQuickChat("👫 우리 둘 다 좋아할 만한 곳")} className="text-xs">
                👫 우리 둘 다 좋아할 만한 곳
              </Button>
            </div>
          </>
        )}

        {userSubscription.aiUsageToday >= userSubscription.aiLimitDaily && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              오늘의 AI 채팅 한도를 모두 사용했습니다.
              <Button
                variant="link"
                className="p-0 h-auto text-yellow-800 underline ml-1"
                onClick={() => setCurrentTab("subscription")}
              >
                프리미엄으로 업그레이드
              </Button>
              하여 더 많이 이용해보세요!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AIChat 