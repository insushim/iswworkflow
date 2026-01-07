'use client';

import {
  TaskOverview,
  QuickActions,
  AIAssistantWidget,
  CalendarWidget,
  RecentDocuments,
  CommunityFeed,
} from '@/components/dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSettings } from '@/hooks/useFirestore';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { settings, loading: settingsLoading } = useUserSettings();

  const getUserDisplayName = () => {
    if (settings?.displayName) return settings.displayName;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return '선생님';
  };

  if (authLoading || settingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          안녕하세요, {getUserDisplayName()}님! 👋
        </h1>
        <p className="text-muted-foreground">
          오늘의 업무 현황을 확인하고, AI 어시스턴트의 도움을 받아보세요.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2 cols wide */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Task Overview */}
          <TaskOverview />

          {/* Recent Documents */}
          <RecentDocuments />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* AI Assistant Widget */}
          <AIAssistantWidget />

          {/* Calendar Widget */}
          <CalendarWidget />

          {/* Community Feed */}
          <CommunityFeed />
        </div>
      </div>
    </div>
  );
}
