'use client';

import { Bell, Search, User, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

// 현재 날짜 기반 동적 알림 생성
function generateNotifications() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  const items: { id: string; title: string; message: string; time: string; read: boolean }[] = [];

  // 2월 알림
  if (month === 2) {
    if (day <= 20) {
      items.push({ id: '1', title: '학년말 성적 마감', message: '교과학습발달상황 및 행동특성 NEIS 입력 마감이 다가옵니다.', time: '오늘', read: false });
    }
    if (day <= 15) {
      items.push({ id: '2', title: '졸업/수료식 준비', message: '졸업장·상장 출력, 생활기록부 최종 점검을 완료하세요.', time: '이번 주', read: false });
    }
    items.push({ id: '3', title: '학년말 업무 정리', message: '학급 물품 반납, 교실 정리, 인수인계 자료를 준비하세요.', time: '진행 중', read: false });
    items.push({ id: '4', title: '3월 신학기 준비', message: '교육과정 편성, 학급경영계획, 교과서 수령 일정을 확인하세요.', time: '예정', read: true });
  }
  // 3월 알림
  else if (month === 3) {
    items.push({ id: '1', title: '학기초 필수 업무', message: 'NEIS 학급 편성, 교육과정 등록, 시간표 입력을 완료하세요.', time: '오늘', read: false });
    items.push({ id: '2', title: '학부모 총회 준비', message: '학급경영계획 발표 자료와 가정통신문을 준비하세요.', time: '이번 주', read: false });
    items.push({ id: '3', title: '안전점검의 날', message: '매월 4일 학교시설 안전점검 및 결과 보고가 필요합니다.', time: '매월 4일', read: true });
  }
  // 그 외 월
  else {
    items.push({ id: '1', title: '출석부 확인', message: '금일 출결 사항을 NEIS에 입력하세요.', time: '오늘', read: false });
    if (day <= 4) {
      items.push({ id: '2', title: '안전점검의 날', message: '매월 4일 학교시설 안전점검 및 결과 보고가 필요합니다.', time: `${month}월 4일`, read: false });
    }
    items.push({ id: '3', title: '월별 업무 확인', message: `${month}월 주요 업무 일정을 확인하세요.`, time: '이번 달', read: true });
  }

  return items;
}

const notifications = generateNotifications();

export function Header({ title, onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>

      <div className="flex flex-1 items-center justify-center px-4 lg:px-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="업무, 문서, 일정 검색..."
            className="pl-10 pr-4"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">테마 변경</span>
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">알림</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-semibold">알림</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                모두 읽음
              </Button>
            </div>
            <ScrollArea className="h-80">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                      !notification.read ? 'bg-accent/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-2 w-2 mt-2 rounded-full ${
                          !notification.read ? 'bg-primary' : 'bg-transparent'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-2">
              <Button variant="ghost" className="w-full text-sm">
                모든 알림 보기
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/teacher.svg" alt="프로필" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">김선생님</p>
                <p className="text-xs leading-none text-muted-foreground">
                  서울초등학교 · 3학년 담임
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>프로필</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>알림 설정</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
