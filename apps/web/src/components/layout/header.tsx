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

const notifications = [
  {
    id: '1',
    title: '업무 마감 임박',
    message: '3월 학교교육계획 수립이 3일 후 마감됩니다.',
    time: '10분 전',
    read: false,
  },
  {
    id: '2',
    title: '새 공문서 수신',
    message: '교육청에서 새 공문이 도착했습니다.',
    time: '1시간 전',
    read: false,
  },
  {
    id: '3',
    title: '일정 알림',
    message: '내일 오전 10시 교직원 회의가 있습니다.',
    time: '2시간 전',
    read: true,
  },
];

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
                <AvatarImage src="/avatars/teacher.png" alt="프로필" />
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
