// Subscription related types
export interface UserSubscription {
  plan: 'free' | 'premium' | 'pro';
  aiUsageToday: number;
  aiLimitDaily: number;
  storageUsed: number;
  storageLimit: number;
  renewalDate: string;
  paymentHistory: PaymentHistory[];
  cards: PaymentCard[];
}

export interface PaymentHistory {
  date: string;
  amount: number;
  plan: string;
  status: string;
  mileageUsed: number;
  finalAmount: number;
}

export interface PaymentCard {
  id: number;
  name: string;
  number: string;
  isDefault: boolean;
}
