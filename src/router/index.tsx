import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import Dashboard from '@/pages/dashboard/index';
import MemoriesListPage from '@/pages/memories/MemoriesListPage';
import MemoriesCreatePage from '@/pages/memories/MemoriesCreatePage';
import MemoriesDetailPage from '@/pages/memories/MemoriesDetailPage';
import MemoriesEditPage from '@/pages/memories/MemoriesEditPage';
import MemoriesDeletePage from '@/pages/memories/MemoriesDeletePage';
import SharedMemories from '@/pages/shared-memories/index';
import Calendar from '@/pages/calendar/index';
import Chat from '@/pages/chat/index';
import RecommendationsListPage from '@/pages/recommendations/RecommendationsListPage';
import RecommendationsCreatePage from '@/pages/recommendations/RecommendationsCreatePage';
import RecommendationDetailPage from '@/pages/recommendations/RecommendationDetailPage';
import ProfileListPage from '@/pages/profile/ProfileListPage';
import ProfileEditPage from '@/pages/profile/ProfileEditPage';
import ProfilePartnerPage from '@/pages/profile/ProfilePartnerPage';
import History from '@/pages/history/index';
import Management from '@/pages/management/index';
import Login from '@/pages/auth/login.tsx';
import Signup from '@/pages/auth/signup.tsx';
import ProfileSetupPage from '@/pages/auth/ProfileSetupPage.tsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="memories" element={<MemoriesListPage />} />
          <Route path="memories/create" element={<MemoriesCreatePage />} />
          <Route path="memories/detail/:id" element={<MemoriesDetailPage />} />
          <Route path="memories/edit/:id" element={<MemoriesEditPage />} />
          <Route path="memories/delete/:id" element={<MemoriesDeletePage />} />
          <Route path="shared-memories" element={<SharedMemories />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="chat" element={<Chat />} />
          <Route path="recommendations" element={<RecommendationsListPage />} />
          <Route path="recommendations/list" element={<RecommendationsListPage />} />
          <Route path="recommendations/create" element={<RecommendationsCreatePage />} />
          <Route path="recommendations/:id" element={<RecommendationDetailPage />} />
          
          {/* Profile Routes */}
          <Route path="profile" element={<ProfileListPage />} />
          <Route path="profile/edit" element={<ProfileEditPage />} />
          <Route path="profile/partner" element={<ProfilePartnerPage />} />
          
          {/* History Routes */}
          <Route path="history" element={<History />} />
          <Route path="history/usage" element={<History />} />
          
          {/* Management Routes */}
          <Route path="management" element={<Management />} />
          <Route path="management/subscription" element={<Management />} />
          <Route path="management/payment" element={<Management />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 