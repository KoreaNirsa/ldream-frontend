import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Heart,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FileText,
  Flower,
  Building,
  Sun,
  Cloud,
  MapPin as LocationIcon,
  Coins,
  CheckCircle
} from 'lucide-react';
import RecommendationForm from '@/components/RecommendationForm';
import { useAppStore } from '@/store/store';
import { Recommendation, Profile } from '@/schemas/types';

interface RecommendationsProps {
  showRecommendationForm: boolean;
  setShowRecommendationForm: (show: boolean) => void;
  profile: Profile;
  partnerProfile: Profile;
  isPartnerConnected: boolean;
  recommendationPage: number;
  setRecommendationPage: (page: number) => void;
  itemsPerPage: number;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  showRecommendationForm,
  setShowRecommendationForm,
  profile,
  partnerProfile,
  isPartnerConnected,
  recommendationPage,
  setRecommendationPage,
  itemsPerPage,
  isLoggedIn,
  onLoginClick
}) => {
  const navigate = useNavigate();
  const { recommendations, updateRecommendation } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Filter recommendations based on search and filters
  const filteredRecommendations = recommendations.filter(recommendation => {
    const matchesSearch = recommendation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recommendation.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || recommendation.tags.includes(selectedCategory);
    const matchesLocation = !selectedLocation || selectedLocation === 'all' || recommendation.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Get paginated recommendations
  const startIndex = (recommendationPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecommendations = filteredRecommendations.slice(startIndex, endIndex);

  // Calculate total pages dynamically
  const recommendationTotalPages = Math.ceil(filteredRecommendations.length / itemsPerPage);

  const categories = [...new Set(recommendations.flatMap(r => r.tags))];
  const locations = [...new Set(recommendations.map(r => r.location))];

  const handleCreateRecommendation = () => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }
    navigate('/recommendations/create');
  };

  const handleFormSubmit = () => {
    setShowRecommendationForm(false);
    // Refresh recommendations or navigate
    navigate('/recommendations/list');
  };

  const handleFormClose = () => {
    setShowRecommendationForm(false);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* AI 맞춤 추천 코스 섹션 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h1 className="text-xl font-semibold text-gray-800">AI 맞춤 추천 코스</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          지미니 & 민수니 커플의 프로필을 모두 확인하여 맞춤 추천 코스를 해드려요!
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={handleCreateRecommendation} 
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            추천 코스 받기
          </Button>
        </div>
      </div>

      {/* 받았던 맞춤 추천 코스 섹션 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-gray-800">받았던 맞춤 추천 코스</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          지금까지 받았던 맞춤 추천 코스들을 확인해보세요
        </p>

        {/* Recommendations Grid */}
        <div className="space-y-4">
          {paginatedRecommendations.map((recommendation) => (
            <Card 
              key={recommendation.id} 
              className="hover:shadow-md transition-shadow border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50 cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => {
                // 클릭 시 읽음 상태로 변경
                if (!recommendation.isRead) {
                  updateRecommendation(recommendation.id, { isRead: true });
                }
                navigate(`/recommendations/${recommendation.id}`);
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {recommendation.tags.includes('로맨틱') ? (
                      <Flower className="h-5 w-5 text-pink-400" />
                    ) : (
                      <Building className="h-5 w-5 text-blue-400" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {recommendation.title}
                      {!recommendation.isRead && (
                        <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                          (new)
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {recommendation.usedMileage > 0 ? (
                      <>
                        <Coins className="h-4 w-4 text-yellow-500" />
                        <span>{recommendation.usedMileage}P 사용</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>무료 추천</span>
                      </>
                    )}
                  </div>
                </div>

                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>요청일: {recommendation.requestDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>데이트 예정일: {recommendation.date}</span>
                  </div>
                </div>

                {/* 지역 및 날씨 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LocationIcon className="h-4 w-4" />
                    <span>지역: {recommendation.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {recommendation.weather === '맑음' ? (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Cloud className="h-4 w-4 text-gray-500" />
                    )}
                    <span>날씨: {recommendation.weather}</span>
                  </div>
                </div>

                {/* 코스 장소들 */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-gray-700">추천 코스</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.course.length > 0 ? (
                      recommendation.course.map((stop, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-200 text-purple-800 text-xs border border-purple-300">
                          {index + 1}. {stop}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary" className="bg-gray-200 text-gray-600 text-xs">
                        코스 준비 중...
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {recommendationTotalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRecommendationPage(Math.max(1, recommendationPage - 1))}
              disabled={recommendationPage === 1}
            >
              이전
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, recommendationTotalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={recommendationPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRecommendationPage(pageNum)}
                    className={recommendationPage === pageNum ? "bg-pink-500 hover:bg-pink-600" : ""}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRecommendationPage(Math.min(recommendationTotalPages, recommendationPage + 1))}
              disabled={recommendationPage === recommendationTotalPages}
            >
              다음
            </Button>
          </div>
        )}
      </div>

      {/* Recommendation Form Dialog */}
      <Dialog open={showRecommendationForm} onOpenChange={setShowRecommendationForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI 데이트 추천 요청</DialogTitle>
          </DialogHeader>
          <RecommendationForm
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recommendations; 