import React, { useState } from 'react';
import AIChat from '@/components/chat/AIChat';

const ChatPage = () => {
  const [chatMessage, setChatMessage] = useState("");
  
  // AI 채팅 샘플 데이터
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai' as const,
      message: '안녕하세요! 저는 여러분의 데이트 컨설턴트입니다. 궁금한 것이 있으면 언제든 물어보세요!',
      timestamp: new Date(),
      showFeedback: false
    },
    {
      type: 'user' as const,
      message: '서울에서 데이트하기 좋은 곳 추천해주세요',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      type: 'ai' as const,
      message: '서울에서 데이트하기 좋은 곳들을 추천해드릴게요! 🌸\n\n1. **한강공원** - 피크닉, 자전거 타기, 야경 감상\n2. **남산타워** - 로맨틱한 야경과 전망\n3. **홍대/이태원** - 카페 투어와 맛집 탐방\n4. **덕수궁** - 전통적인 분위기의 산책\n5. **서울숲** - 자연 속 데이트\n\n어떤 분위기를 원하시나요?',
      timestamp: new Date(Date.now() - 240000),
      showFeedback: true
    }
  ]);

  const defaultUserSubscription = {
    plan: "premium",
    features: ["기본 기능", "프리미엄 기능", "AI 추천", "무제한 저장"],
    aiUsageToday: 3,
    aiLimitDaily: 10
  };

  return (
    <div className="space-y-6">
      <AIChat 
        chatHistory={chatHistory}
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        userSubscription={defaultUserSubscription}
        handleChatFeedback={(messageIndex, isPositive) => {
          // 피드백 처리 로직
          console.log(`Message ${messageIndex} feedback: ${isPositive ? 'positive' : 'negative'}`);
        }}
        handleQuickChat={(msg) => {
          // 빠른 채팅 처리 로직
          const newUserMessage = {
            type: 'user' as const,
            message: msg,
            timestamp: new Date()
          };
          const newAIMessage = {
            type: 'ai' as const,
            message: '고민해보시는군요! 더 구체적으로 말씀해주시면 더 정확한 답변을 드릴 수 있어요.',
            timestamp: new Date(),
            showFeedback: true
          };
          setChatHistory([...chatHistory, newUserMessage as any, newAIMessage as any]);
        }}
        setCurrentTab={() => {}}
        isLoggedIn={true}
        guestChatCount={0}
        setGuestChatCount={() => {}}
        onLoginClick={() => console.log('Login clicked')}
      />
    </div>
  );
};

export default ChatPage; 