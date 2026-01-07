'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  Trash2,
  Mail,
  Smartphone,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSettings } from '@/hooks/useFirestore';

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  enabled: boolean;
}

export default function RemindersPage() {
  const { user } = useAuth();
  const { settings, loading, error, updateSettings } = useUserSettings();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: '주간 업무 계획 작성',
      date: '매주 월요일',
      time: '08:00',
      enabled: true,
    },
    {
      id: '2',
      title: '출석부 마감',
      date: '매일',
      time: '16:00',
      enabled: true,
    },
    {
      id: '3',
      title: '안전점검의 날',
      date: '매월 4일',
      time: '09:00',
      enabled: false,
    },
  ]);

  const [newReminder, setNewReminder] = useState({
    title: '',
    date: '',
    time: '09:00',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deadlineReminder: true,
    weeklyReport: false,
  });

  useEffect(() => {
    if (settings?.notifications) {
      setNotifications(settings.notifications);
    }
  }, [settings]);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.date) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      date: newReminder.date,
      time: newReminder.time,
      enabled: true,
    };

    setReminders((prev) => [...prev, reminder]);
    setNewReminder({ title: '', date: '', time: '09:00' });
  };

  const toggleNotification = async (key: keyof typeof notifications) => {
    const newNotifications = {
      ...notifications,
      [key]: !notifications[key],
    };
    setNotifications(newNotifications);
    if (user) {
      await updateSettings({ notifications: newNotifications });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          알림 설정
        </h1>
        <p className="text-muted-foreground">
          업무 리마인더와 알림을 관리합니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>알림 수신 설정</CardTitle>
            <CardDescription>알림을 받을 방법을 선택하세요</CardDescription>
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
              <Switch
                checked={notifications.email}
                onCheckedChange={() => toggleNotification('email')}
              />
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
              <Switch
                checked={notifications.push}
                onCheckedChange={() => toggleNotification('push')}
              />
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
              <Switch
                checked={notifications.deadlineReminder}
                onCheckedChange={() => toggleNotification('deadlineReminder')}
              />
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
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={() => toggleNotification('weeklyReport')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add New Reminder */}
        <Card>
          <CardHeader>
            <CardTitle>새 리마인더 추가</CardTitle>
            <CardDescription>반복되는 업무 알림을 설정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">알림 제목</label>
              <Input
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                placeholder="예: 주간 업무 보고서 제출"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">반복 주기</label>
                <select
                  value={newReminder.date}
                  onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">선택하세요</option>
                  <option value="매일">매일</option>
                  <option value="매주 월요일">매주 월요일</option>
                  <option value="매주 금요일">매주 금요일</option>
                  <option value="매월 1일">매월 1일</option>
                  <option value="매월 4일">매월 4일 (안전점검)</option>
                  <option value="매월 15일">매월 15일</option>
                  <option value="매월 마지막 날">매월 마지막 날</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">알림 시간</label>
                <Input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={addReminder} className="w-full" disabled={!newReminder.title || !newReminder.date}>
              <Plus className="h-4 w-4 mr-2" />
              리마인더 추가
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reminders List */}
      <Card>
        <CardHeader>
          <CardTitle>설정된 리마인더</CardTitle>
          <CardDescription>등록된 반복 알림 목록입니다</CardDescription>
        </CardHeader>
        <CardContent>
          {reminders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>등록된 리마인더가 없습니다.</p>
              <p className="text-sm">위에서 새 리마인더를 추가해보세요.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    reminder.enabled ? 'bg-background' : 'bg-muted/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <div>
                      <p className="font-medium">{reminder.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{reminder.date}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{reminder.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={reminder.enabled ? 'default' : 'secondary'}>
                      {reminder.enabled ? '활성' : '비활성'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
