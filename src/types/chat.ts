// Chat related types
export type ChatMessage =
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
    };

export interface ChatState {
  chatMessage: string;
  chatHistory: ChatMessage[];
}
