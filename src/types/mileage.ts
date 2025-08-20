// Mileage related types
export interface MileageHistory {
  id: number;
  type: 'earn' | 'use';
  title: string;
  amount: number;
  date: string;
  description: string;
}
