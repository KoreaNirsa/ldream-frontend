import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerProfile from '@/components/profile/PartnerProfile';
import { 
  useMemberProfile, 
  useMemberProfileData,
  useProfileInterests,
  useProfileFoods,
  useProfileDays,
  useProfileTransportations,
  useProfileDateMoods
} from '@/hooks/useMemberProfile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, X, Check, XCircle, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getRelationStatus, cancelRelationRequest } from '@/config/axios';
import { RelationStatus, RELATION_TYPE_LABELS } from '@/types/relation';

const ProfilePartnerPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 관계 요청 상태 관리
  const [relationStatuses, setRelationStatuses] = useState<RelationStatus[]>([]);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState<number | null>(null);
  
  // API에서 회원 프로필 데이터 가져오기
  const { data: memberProfile } = useMemberProfile();
  const { data: memberProfileData } = useMemberProfileData();
  const { data: profileInterests } = useProfileInterests(memberProfileData?.member_profile_id);
  const { data: profileFoods } = useProfileFoods(memberProfileData?.member_profile_id);
  const { data: profileDays } = useProfileDays(memberProfileData?.member_profile_id);
  const { data: profileTransportations } = useProfileTransportations(memberProfileData?.member_profile_id);
  const { data: profileDateMoods } = useProfileDateMoods(memberProfileData?.member_profile_id);

  const [profile, setProfile] = useState({
    nickname: memberProfile?.myNickname || "사랑스러운 사용자",
    interests: profileInterests?.map(interest => interest.category) || [],
    name: "사용자",
    birthDate: "1995-01-01",
    mbti: memberProfileData?.mbti || "ENFP",
    mileage: memberProfile?.mileage || 340,
    preferredDays: profileDays?.map(day => day.preferred_days) || [],
    timePreference: memberProfileData?.preferred_time || "",
    budget: memberProfileData?.preferred_budget || "",
    transportation: profileTransportations?.map(transport => transport.transportation) || [],
    activityType: "🎬 영화",
    communicationStyle: "💬 대화",
    relationshipGoals: ["💕 진지한 관계", "🎉 즐거운 데이트"],
    transport: profileTransportations?.map(transport => transport.transportation) || [],
    mood: profileDateMoods?.map(mood => mood.date_mood) || [],
    relationshipStatus: memberProfileData?.relationship_status || "",
    dietary: profileFoods?.map(food => food.food_type) || []
  });

  // API 데이터가 로드되면 프로필 정보 업데이트
  useEffect(() => {
    if (memberProfileData && profileInterests && profileFoods && profileDays && profileTransportations && profileDateMoods) {
      setProfile(prev => ({
        ...prev,
        mbti: memberProfileData.mbti || prev.mbti,
        timePreference: memberProfileData.preferred_time || prev.timePreference,
        budget: memberProfileData.preferred_budget || prev.budget,
        relationshipStatus: memberProfileData.relationship_status || prev.relationshipStatus,
        interests: profileInterests.map(interest => interest.category),
        dietary: profileFoods.map(food => food.food_type),
        preferredDays: profileDays.map(day => day.preferred_days),
        transportation: profileTransportations.map(transport => transport.transportation),
        transport: profileTransportations.map(transport => transport.transportation),
        mood: profileDateMoods.map(mood => mood.date_mood)
      }));
    }
  }, [memberProfileData, profileInterests, profileFoods, profileDays, profileTransportations, profileDateMoods]);

  // 파트너 정보 가져오기
  const getPartnerProfile = () => {
    // 현재는 하드코딩된 파트너 프로필을 반환
    // 실제 구현에서는 파트너의 프로필 데이터를 API로 가져와야 함
    return {
      name: "파트너",
      nickname: memberProfile?.partnerNickname || "사랑스러운 파트너",
      interests: [],
      birthDate: "1995-06-15",
      mbti: "ISFJ",
      mileage: 280,
      relationshipType: "커플",
      preferredDays: [],
      timePreference: "",
      budget: "",
      transport: [],
      mood: [],
      dietary: []
    };
  };

  const partnerProfile = getPartnerProfile();

  // 관계 요청 상태 조회
  useEffect(() => {
    const fetchRelationStatus = async () => {
      if (!memberProfile?.partnerNickname) {
        setIsLoadingStatus(true);
        try {
          const status = await getRelationStatus();
          setRelationStatuses([status]);
        } catch (error) {
          console.error('관계 요청 상태 조회 실패:', error);
          // 에러가 발생하면 요청이 없는 것으로 간주
          setRelationStatuses([]);
          
          // 테스트용 더미 데이터 (실제 구현 시 제거)
          setRelationStatuses([
            {
              relationId: 1,
              fromMemberId: 1,
              toMemberId: 2,
              fromMemberEmail: 'user@example.com',
              toMemberEmail: 'partner@example.com',
              relationType: 'COUPLE',
              status: 'PENDING',
              createdAt: '2024-01-15T10:30:00Z',
              updatedAt: '2024-01-15T10:30:00Z'
            },
            {
              relationId: 2,
              fromMemberId: 1,
              toMemberId: 3,
              fromMemberEmail: 'user@example.com',
              toMemberEmail: 'friend@example.com',
              relationType: 'FRIEND',
              status: 'PENDING',
              createdAt: '2024-01-16T14:20:00Z',
              updatedAt: '2024-01-16T14:20:00Z'
            }
          ]);
        } finally {
          setIsLoadingStatus(false);
        }
      } else {
        // 파트너가 연결된 경우 요청 상태 초기화
        setRelationStatuses([]);
      }
    };

    fetchRelationStatus();
  }, [memberProfile?.partnerNickname]);

  // 요청 취소 처리
  const handleCancelRequest = async (relationId: number) => {
    setIsLoadingCancel(relationId);
    try {
      await cancelRelationRequest(relationId);
      setRelationStatuses(prev => prev.filter(status => status.relationId !== relationId));
      toast({
        title: "요청 취소 완료",
        description: "관계 요청이 취소되었습니다.",
      });
    } catch (error) {
      console.error('요청 취소 실패:', error);
      toast({
        title: "취소 실패",
        description: "요청 취소에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCancel(null);
    }
  };

  // 요청 상태 표시 컴포넌트
  const RelationStatusCard = () => {
    if (memberProfile?.partnerNickname) return null;
    
    // 로딩 중일 때
    if (isLoadingStatus) {
      return (
        <Card className="mb-6 border-gray-200 bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              <span className="text-gray-600">요청 상태를 확인하는 중...</span>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    // 요청 상태가 없을 때 - "요청이 없습니다" 메시지 표시
    if (relationStatuses.length === 0) {
      return (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">관계 요청 상태</h3>
                <p className="text-sm text-gray-600">현재 진행 중인 관계 요청이 없습니다.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const getStatusInfo = (status: string) => {
      switch (status) {
        case 'PENDING':
          return {
            icon: <Clock className="h-4 w-4 text-orange-600" />,
            badge: <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">대기</Badge>,
            message: '상대방이 요청을 확인하는 중입니다.',
            showCancelButton: true
          };
        case 'ACCEPTED':
          return {
            icon: <Check className="h-4 w-4 text-green-600" />,
            badge: <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">승인</Badge>,
            message: '상대방이 요청을 승인했습니다.',
            showCancelButton: false
          };
        case 'REJECTED':
          return {
            icon: <XCircle className="h-4 w-4 text-red-600" />,
            badge: <Badge variant="destructive" className="text-xs">거절</Badge>,
            message: '상대방이 요청을 거절했습니다.',
            showCancelButton: false
          };
        default:
          return null;
      }
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <Card className="mb-6 border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-gray-800 text-lg">관계 요청 상태</h3>
            </div>
            
            <div className="space-y-3">
              {relationStatuses.map((relationStatus) => {
                const statusInfo = getStatusInfo(relationStatus.status);
                if (!statusInfo) return null;

                return (
                  <div key={relationStatus.relationId} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {statusInfo.icon}
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{relationStatus.toMemberEmail}</span>
                          <Badge variant="outline" className="text-xs">
                            {RELATION_TYPE_LABELS[relationStatus.relationType]}
                          </Badge>
                          {statusInfo.badge}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDate(relationStatus.createdAt)}
                        </div>
                      </div>
                      
                      {statusInfo.showCancelButton && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelRequest(relationStatus.relationId)}
                          disabled={isLoadingCancel === relationStatus.relationId}
                          className="border-orange-300 text-orange-700 hover:bg-orange-100"
                        >
                          {isLoadingCancel === relationStatus.relationId ? "취소 중..." : "요청 취소"}
                        </Button>
                      )}
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      {statusInfo.message}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">파트너 프로필</h1>
      </div>
      
      {/* 관계 요청 상태 카드 */}
      <RelationStatusCard />
      
      {partnerProfile ? (
        <PartnerProfile 
          partnerProfile={partnerProfile}
          profile={profile}
          isPartnerConnected={Boolean(memberProfile?.partnerNickname)}
        />
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">파트너가 연결되지 않았습니다</h2>
          <p className="text-gray-600 mb-6">파트너와 연결하여 함께하는 추억을 만들어보세요!</p>
          <button
            onClick={() => navigate('/profile/list')}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            파트너 연결하기
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePartnerPage; 