import { create } from 'zustand';
import { ChatState, ChatMessage } from '../types';

interface ChatStore extends ChatState {
  setChatMessage: (message: string) => void;
  setChatHistory: (history: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  updateChatFeedback: (index: number, feedback: 'positive' | 'negative' | undefined) => void;
  handleChatFeedback: (messageIndex: number, isPositive: boolean) => void;
  handleQuickChat: (message: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial Chat State
  chatMessage: "",
  chatHistory: [
    {
      type: "ai",
      message: "안녕하세요! 오늘 어떤 데이트를 계획하고 계신가요? 😊",
      timestamp: new Date(),
    },
    {
      type: "user",
      message: "오늘 날씨가 좋은데 야외 데이트 추천해줘",
      timestamp: new Date(),
    },
    {
      type: "ai",
      message: "좋은 선택이에요! 프로필을 보니 로맨틱한 분위기를 좋아하시는군요. 한강공원에서 피크닉은 어떠세요? 🌸",
      timestamp: new Date(),
      showFeedback: true,
      feedback: undefined,
    },
  ],
  
  // Chat actions
  setChatMessage: (message) => set({ chatMessage: message }),
  setChatHistory: (history) => set({ chatHistory: history }),
  addChatMessage: (message) => set((state) => ({ 
    chatHistory: [...state.chatHistory, message] 
  })),
  updateChatFeedback: (index, feedback) => set((state) => ({
    chatHistory: state.chatHistory.map((msg, i) => 
      i === index && msg.type === 'ai' 
        ? { ...msg, feedback: feedback as 'positive' | 'negative' | undefined, showFeedback: true }
        : msg
    )
  })),
  
  handleChatFeedback: (messageIndex, isPositive) => {
    const currentMessage = get().chatHistory[messageIndex];
    if (currentMessage && currentMessage.type === 'ai') {
      const currentFeedback = currentMessage.feedback;
      const newFeedback = currentFeedback === (isPositive ? 'positive' : 'negative') ? undefined : (isPositive ? 'positive' : 'negative');
      get().updateChatFeedback(messageIndex, newFeedback);
    }
  },
  
  handleQuickChat: (message) => {
    const userMessage: ChatMessage = {
      type: 'user',
      message,
      timestamp: new Date()
    };
    get().addChatMessage(userMessage);
    get().setChatMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        type: 'ai',
        message: `"${message}"에 대한 답변을 준비하고 있어요! 잠시만 기다려주세요 😊`,
        timestamp: new Date(),
        showFeedback: true
      };
      get().addChatMessage(aiMessage);
    }, 1000);
  },
}));
