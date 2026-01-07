'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Bell,
  Palette,
  Shield,
  Database,
  Key,
  LogOut,
  Save,
  Moon,
  Sun,
  Monitor,
  Mail,
  Smartphone,
  Clock,
  Calendar,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSettings } from '@/hooks/useFirestore';

const roles = ['학급담임', '방과후부', '안전담당', '정보부', '생활지도', '교육과정부', '체육부', '과학부'];

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { settings, loading, error, updateSettings } = useUserSettings();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Local form state
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    school: '',
    classInfo: '',
    roles: [] as string[],
    notifications: {
      email: true,
      push: true,
      deadlineReminder: true,
      weeklyReport: false,
    },
    theme: 'system' as 'light' | 'dark' | 'system',
  });

  // Initialize form data from settings
  useEffect(() => {
    if (settings) {
      setFormData({
        displayName: settings.displayName || user?.displayName || '',
        email: settings.email || user?.email || '',
        school: settings.school || '',
        classInfo: settings.classInfo || '',
        roles: settings.roles || [],
        notifications: settings.notifications || {
          email: true,
          push: true,
          deadlineReminder: true,
          weeklyReport: false,
        },
        theme: settings.theme || 'system',
      });
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [settings, user]);

  const tabs = [
    { id: 'profile', label: '프로필', icon: User },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'appearance', label: '화면', icon: Palette },
    { id: 'security', label: '보안', icon: Shield },
    { id: 'data', label: '데이터', icon: Database },
  ];

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        displayName: formData.displayName,
        email: formData.email,
        school: formData.school,
        classInfo: formData.classInfo,
        roles: formData.roles,
      });
    } catch (err) {
      console.error('프로필 저장 실패:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleRole = async (role: string) => {
    const newRoles = formData.roles.includes(role)
      ? formData.roles.filter((r) => r !== role)
      : [...formData.roles, role];

    setFormData({ ...formData, roles: newRoles });
    await updateSettings({ roles: newRoles });
  };

  const handleToggleNotification = async (key: keyof typeof formData.notifications) => {
    const newNotifications = {
      ...formData.notifications,
      [key]: !formData.notifications[key],
    };
    setFormData({ ...formData, notifications: newNotifications });
    await updateSettings({ notifications: newNotifications });
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setFormData({ ...formData, theme: newTheme });
    await updateSettings({ theme: newTheme });
  };

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await logout();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">설정을 불러오는 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg font-medium">{error}</p>
        <p className="text-muted-foreground">로그인이 필요하거나 네트워크 문제가 있을 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">설정</h1>
        <p className="text-muted-foreground">
          계정 및 앱 설정을 관리합니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="pt-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">로그아웃</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile */}
          {activeTab === 'profile' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>프로필 정보</CardTitle>
                  <CardDescription>기본 정보를 수정할 수 있습니다</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="프로필"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{formData.displayName || '이름 미설정'}</p>
                      <p className="text-sm text-muted-foreground">{formData.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">이름</label>
                      <Input
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">이메일</label>
                      <Input
                        value={formData.email}
                        type="email"
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">학교</label>
                      <Input
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        placeholder="예: 서울행복초등학교"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">담당 학년/반</label>
                      <Input
                        value={formData.classInfo}
                        onChange={(e) => setFormData({ ...formData, classInfo: e.target.value })}
                        placeholder="예: 3학년 2반"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          저장 중...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          저장
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>업무 분장</CardTitle>
                  <CardDescription>담당 업무를 설정하면 관련 정보를 우선 제공합니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role) => {
                      const isSelected = formData.roles.includes(role);
                      return (
                        <Badge
                          key={role}
                          variant={isSelected ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => handleToggleRole(role)}
                        >
                          {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {role}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
                <CardDescription>알림 수신 방법을 설정합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">이메일 알림</p>
                      <p className="text-sm text-muted-foreground">중요 업무 마감 알림을 이메일로 받습니다</p>
                    </div>
                  </div>
                  <Button
                    variant={formData.notifications.email ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleToggleNotification('email')}
                  >
                    {formData.notifications.email ? '켜짐' : '꺼짐'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">푸시 알림</p>
                      <p className="text-sm text-muted-foreground">브라우저 푸시 알림을 받습니다</p>
                    </div>
                  </div>
                  <Button
                    variant={formData.notifications.push ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleToggleNotification('push')}
                  >
                    {formData.notifications.push ? '켜짐' : '꺼짐'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">마감일 리마인더</p>
                      <p className="text-sm text-muted-foreground">마감 3일 전, 1일 전 알림을 받습니다</p>
                    </div>
                  </div>
                  <Button
                    variant={formData.notifications.deadlineReminder ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleToggleNotification('deadlineReminder')}
                  >
                    {formData.notifications.deadlineReminder ? '켜짐' : '꺼짐'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">주간 리포트</p>
                      <p className="text-sm text-muted-foreground">매주 월요일 주간 업무 요약을 받습니다</p>
                    </div>
                  </div>
                  <Button
                    variant={formData.notifications.weeklyReport ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleToggleNotification('weeklyReport')}
                  >
                    {formData.notifications.weeklyReport ? '켜짐' : '꺼짐'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>화면 설정</CardTitle>
                <CardDescription>테마와 디스플레이 옵션을 설정합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-3">테마</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.theme === 'light' ? 'border-primary bg-primary/5' : 'border-transparent bg-accent'
                      }`}
                    >
                      <Sun className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium text-center">라이트</p>
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.theme === 'dark' ? 'border-primary bg-primary/5' : 'border-transparent bg-accent'
                      }`}
                    >
                      <Moon className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium text-center">다크</p>
                    </button>
                    <button
                      onClick={() => handleThemeChange('system')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.theme === 'system' ? 'border-primary bg-primary/5' : 'border-transparent bg-accent'
                      }`}
                    >
                      <Monitor className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium text-center">시스템</p>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>보안 설정</CardTitle>
                <CardDescription>계정 보안을 관리합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">비밀번호 변경</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.providerData[0]?.providerId === 'google.com'
                          ? 'Google 계정으로 로그인 중'
                          : '이메일/비밀번호로 로그인 중'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    disabled={user?.providerData[0]?.providerId === 'google.com'}
                  >
                    변경
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">2단계 인증</p>
                      <p className="text-sm text-muted-foreground">추가 보안을 위한 인증을 설정합니다</p>
                    </div>
                  </div>
                  <Button variant="outline">설정</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data */}
          {activeTab === 'data' && (
            <Card>
              <CardHeader>
                <CardTitle>데이터 관리</CardTitle>
                <CardDescription>데이터 백업 및 내보내기를 관리합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">데이터 내보내기</p>
                    <p className="text-sm text-muted-foreground">모든 데이터를 JSON 파일로 다운로드합니다</p>
                  </div>
                  <Button variant="outline">내보내기</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                  <div>
                    <p className="font-medium text-red-700">계정 삭제</p>
                    <p className="text-sm text-red-600">모든 데이터가 영구적으로 삭제됩니다</p>
                  </div>
                  <Button variant="destructive">삭제</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
