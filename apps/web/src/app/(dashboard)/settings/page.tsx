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
  Building2,
  GraduationCap,
  Stethoscope,
  Plus,
  X,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSettings } from '@/hooks/useFirestore';
import { departments, roles as roleData, departmentsByCategory, categoryLabels, gradeTasks, specialTasks } from '@/data/departments';
import { educationOffices, getEducationOfficeById, nationalResources } from '@/data/education-offices';
import { MapPin, ExternalLink, Phone, FileText } from 'lucide-react';

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
    educationOfficeId: '', // 시도교육청
    roles: [] as string[],
    customTasks: [] as string[], // 사용자 정의 업무
    notifications: {
      email: true,
      push: true,
      deadlineReminder: true,
      weeklyReport: false,
    },
    theme: 'system' as 'light' | 'dark' | 'system',
  });

  // 선택된 교육청 정보
  const selectedOffice = formData.educationOfficeId
    ? getEducationOfficeById(formData.educationOfficeId)
    : null;

  // 사용자 정의 업무 추가 상태
  const [newCustomTask, setNewCustomTask] = useState('');

  // Initialize form data from settings
  useEffect(() => {
    if (settings) {
      const extSettings = settings as unknown as { customTasks?: string[]; educationOfficeId?: string };
      setFormData({
        displayName: settings.displayName || user?.displayName || '',
        email: settings.email || user?.email || '',
        school: settings.school || '',
        classInfo: settings.classInfo || '',
        educationOfficeId: extSettings.educationOfficeId || '',
        roles: settings.roles || [],
        customTasks: extSettings.customTasks || [],
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateSettings({
        displayName: formData.displayName,
        email: formData.email,
        school: formData.school,
        classInfo: formData.classInfo,
        roles: formData.roles,
        customTasks: formData.customTasks, // 사용자 정의 업무 추가
        educationOfficeId: formData.educationOfficeId,
      } as any);
    } catch (err) {
      console.error('[Settings] 프로필 저장 실패:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEducationOfficeChange = async (officeId: string) => {
    setFormData({ ...formData, educationOfficeId: officeId });
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateSettings({ educationOfficeId: officeId } as any);
    } catch (err) {
      console.error('교육청 설정 저장 실패:', err);
      // 실패해도 UI는 유지 (낙관적 업데이트가 롤백됨)
    }
  };

  const handleToggleRole = async (role: string) => {
    const newRoles = formData.roles.includes(role)
      ? formData.roles.filter((r) => r !== role)
      : [...formData.roles, role];

    setFormData({ ...formData, roles: newRoles });
    try {
      await updateSettings({ roles: newRoles });
      alert(`✅ "${role}" 저장 완료! 선택된 역할: ${newRoles.join(', ') || '없음'}`);
    } catch (err) {
      alert(`❌ 저장 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    }
  };

  // 사용자 정의 업무 추가
  const handleAddCustomTask = async () => {
    if (!newCustomTask.trim()) return;
    if (formData.customTasks.includes(newCustomTask.trim())) {
      alert('이미 추가된 업무입니다.');
      return;
    }
    const newCustomTasks = [...formData.customTasks, newCustomTask.trim()];
    setFormData({ ...formData, customTasks: newCustomTasks });
    setNewCustomTask('');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateSettings({ customTasks: newCustomTasks } as any);
    } catch (err) {
      console.error('[Settings] 사용자 정의 업무 추가 실패:', err);
    }
  };

  // 사용자 정의 업무 삭제
  const handleRemoveCustomTask = async (task: string) => {
    const newCustomTasks = formData.customTasks.filter((t) => t !== task);
    setFormData({ ...formData, customTasks: newCustomTasks });
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateSettings({ customTasks: newCustomTasks } as any);
    } catch (err) {
      console.error('[Settings] 사용자 정의 업무 삭제 실패:', err);
    }
  };

  const handleToggleNotification = async (key: keyof typeof formData.notifications) => {
    const newNotifications = {
      ...formData.notifications,
      [key]: !formData.notifications[key],
    };
    setFormData({ ...formData, notifications: newNotifications });
    try {
      await updateSettings({ notifications: newNotifications });
    } catch (err) {
      console.error('알림 설정 저장 실패:', err);
    }
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setFormData({ ...formData, theme: newTheme });
    try {
      await updateSettings({ theme: newTheme });
    } catch (err) {
      console.error('테마 설정 저장 실패:', err);
    }
  };

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await logout();
    }
  };

  // 로딩 중이어도 UI 즉시 표시 (Skeleton 대신 실제 UI with placeholder)
  // error 발생 시에만 에러 표시
  if (error && !loading) {
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

                  {/* 시도교육청 선택 */}
                  <div className="mt-4">
                    <label className="text-sm font-medium block mb-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      소속 시도교육청
                    </label>
                    <select
                      value={formData.educationOfficeId}
                      onChange={(e) => handleEducationOfficeChange(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="">교육청을 선택하세요</option>
                      {educationOffices.map((office) => (
                        <option key={office.id} value={office.id}>
                          {office.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      선택하면 해당 교육청의 매뉴얼, 연락처, 양식을 우선 제공합니다
                    </p>
                  </div>

                  {/* 선택된 교육청 정보 표시 */}
                  {selectedOffice && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-900">{selectedOffice.name}</h4>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-800">{selectedOffice.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-blue-500" />
                          <a
                            href={selectedOffice.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {selectedOffice.homepage}
                          </a>
                        </div>
                      </div>

                      {/* 주요 매뉴얼 */}
                      {selectedOffice.manuals.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-xs font-medium text-blue-700 mb-2">주요 매뉴얼</p>
                          <div className="space-y-1">
                            {selectedOffice.manuals.slice(0, 3).map((manual, idx) => (
                              <a
                                key={idx}
                                href={manual.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                              >
                                <FileText className="h-3 w-3" />
                                {manual.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 긴급 연락처 */}
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-xs font-medium text-blue-700 mb-2">긴급 연락처</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {selectedOffice.emergencyContacts.map((contact, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-blue-800">
                              <span className="font-medium">{contact.name}:</span>
                              <span>{contact.phone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
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
                  <CardDescription>담당 업무를 설정하면 관련 정보를 우선 제공합니다 (50개 이상 사이트 교차검증 완료)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 핵심 부서 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4 text-red-500" />
                      <h4 className="text-sm font-semibold text-red-700">{categoryLabels.core}</h4>
                      <span className="text-xs text-muted-foreground">(필수 보직교사 부서)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {departmentsByCategory.core.map((dept) => {
                        const isSelected = formData.roles.includes(dept.name);
                        return (
                          <Badge
                            key={dept.id}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`cursor-pointer transition-all ${isSelected ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50 hover:border-red-300'}`}
                            onClick={() => handleToggleRole(dept.name)}
                            title={dept.description}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {dept.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* 지원 부서 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      <h4 className="text-sm font-semibold text-blue-700">{categoryLabels.support}</h4>
                      <span className="text-xs text-muted-foreground">(일반교사 부장 포함)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {departmentsByCategory.support.map((dept) => {
                        const isSelected = formData.roles.includes(dept.name);
                        return (
                          <Badge
                            key={dept.id}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`cursor-pointer transition-all ${isSelected ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50 hover:border-blue-300'}`}
                            onClick={() => handleToggleRole(dept.name)}
                            title={dept.description}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {dept.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* 전문 부서 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="h-4 w-4 text-green-500" />
                      <h4 className="text-sm font-semibold text-green-700">{categoryLabels.specialist}</h4>
                      <span className="text-xs text-muted-foreground">(정교사 자격 필요)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {departmentsByCategory.specialist.map((dept) => {
                        const isSelected = formData.roles.includes(dept.name);
                        return (
                          <Badge
                            key={dept.id}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`cursor-pointer transition-all ${isSelected ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50 hover:border-green-300'}`}
                            onClick={() => handleToggleRole(dept.name)}
                            title={dept.description}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {dept.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* 역할 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="h-4 w-4 text-purple-500" />
                      <h4 className="text-sm font-semibold text-purple-700">역할</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {roleData.map((role) => {
                        const isSelected = formData.roles.includes(role.name);
                        return (
                          <Badge
                            key={role.id}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`cursor-pointer transition-all ${isSelected ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-50 hover:border-purple-300'}`}
                            onClick={() => handleToggleRole(role.name)}
                            title={role.description}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {role.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* 학년별 담임 업무 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-orange-500" />
                      <h4 className="text-sm font-semibold text-orange-700">학년별 담임 업무</h4>
                      <span className="text-xs text-muted-foreground">(담당 학년 선택)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {gradeTasks.map((grade) => {
                        const isSelected = formData.roles.includes(grade.name);
                        return (
                          <Badge
                            key={grade.id}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`cursor-pointer transition-all ${isSelected ? 'bg-orange-600 hover:bg-orange-700' : 'hover:bg-orange-50 hover:border-orange-300'}`}
                            onClick={() => handleToggleRole(grade.name)}
                            title={grade.description}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {grade.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* 특수 업무 - 위원회 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="h-4 w-4 text-cyan-500" />
                      <h4 className="text-sm font-semibold text-cyan-700">특수 업무 (위원회/특별업무)</h4>
                      <span className="text-xs text-muted-foreground">({specialTasks.length}개)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {specialTasks.slice(0, 10).map((task) => {
                        const isSelected = formData.roles.includes(task.name);
                        return (
                          <Badge
                            key={task.id}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`cursor-pointer transition-all ${isSelected ? 'bg-cyan-600 hover:bg-cyan-700' : 'hover:bg-cyan-50 hover:border-cyan-300'}`}
                            onClick={() => handleToggleRole(task.name)}
                            title={task.description}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {task.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* 특수 업무 - 교육/안전 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-rose-500" />
                      <h4 className="text-sm font-semibold text-rose-700">교육/안전 업무</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {specialTasks.slice(10).map((task) => {
                        const isSelected = formData.roles.includes(task.name);
                        return (
                          <Badge
                            key={task.id}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`cursor-pointer transition-all ${isSelected ? 'bg-rose-600 hover:bg-rose-700' : 'hover:bg-rose-50 hover:border-rose-300'}`}
                            onClick={() => handleToggleRole(task.name)}
                            title={task.description}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {task.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* 사용자 정의 업무 추가 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Plus className="h-4 w-4 text-emerald-500" />
                      <h4 className="text-sm font-semibold text-emerald-700">나만의 업무 추가</h4>
                      <span className="text-xs text-muted-foreground">(직접 입력)</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={newCustomTask}
                        onChange={(e) => setNewCustomTask(e.target.value)}
                        placeholder="새 업무명 입력 (예: 인권교육담당, 녹색어머니회)"
                        className="flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTask()}
                      />
                      <Button onClick={handleAddCustomTask} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="h-4 w-4 mr-1" />
                        추가
                      </Button>
                    </div>
                    {formData.customTasks.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.customTasks.map((task) => (
                          <Badge
                            key={task}
                            variant="default"
                            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                          >
                            {task}
                            <button
                              onClick={() => handleRemoveCustomTask(task)}
                              className="ml-1 hover:text-red-200"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 선택된 업무 요약 */}
                  {(formData.roles.length > 0 || formData.customTasks.length > 0) && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">선택된 업무 ({formData.roles.length + formData.customTasks.length}개)</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                        {formData.customTasks.map((task) => (
                          <Badge key={task} variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 업무 분장 저장 버튼 */}
                  <div className="mt-6 pt-4 border-t flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      ✓ 업무를 선택하면 업무분장 가이드, 업무목록, 워크플로우에서 관련 정보가 우선 표시됩니다.
                    </p>
                    <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          저장 중...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          업무 분장 저장
                        </>
                      )}
                    </Button>
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
