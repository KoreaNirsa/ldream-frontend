// 관계 요청 관련 타입들
export interface RelationRequest {
  targetEmail: string;
  relationType: string;
}

export interface RelationRequestResponse {
  code: string;
  message: string;
  result?: {
    relationId: number;
    status: string;
    createdAt: string;
  };
}

export type RelationType = 'COUPLE' | 'FRIEND' | 'FAMILY';

// 프론트엔드 표시용 라벨
export const RELATION_TYPE_LABELS: Record<RelationType, string> = {
  COUPLE: '커플',
  FRIEND: '친구', 
  FAMILY: '가족'
};

export interface RelationStatus {
  relationId: number;
  fromMemberId: number;
  toMemberId: number;
  fromMemberEmail: string;
  toMemberEmail: string;
  relationType: RelationType;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}
