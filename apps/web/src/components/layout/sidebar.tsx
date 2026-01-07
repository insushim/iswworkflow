'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  CheckSquare,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  BookOpen,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FolderKanban,
  Users,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navigation = [
  {
    title: '메인',
    items: [
      { name: '대시보드', href: '/dashboard', icon: Home },
      { name: 'AI 어시스턴트', href: '/ai-chat', icon: Sparkles },
      { name: '검색', href: '/search', icon: Search },
    ],
  },
  {
    title: '업무 관리',
    items: [
      { name: '업무 목록', href: '/tasks', icon: CheckSquare },
      { name: '워크플로우', href: '/workflows', icon: FolderKanban },
      { name: '문서 관리', href: '/documents', icon: FileText },
    ],
  },
  {
    title: '일정 관리',
    items: [
      { name: '캘린더', href: '/calendar', icon: Calendar },
      { name: '학사일정', href: '/academic-calendar', icon: BookOpen },
      { name: '알림 설정', href: '/reminders', icon: Bell },
    ],
  },
  {
    title: '정보',
    items: [
      { name: '커뮤니티 자료', href: '/resources', icon: Users },
      { name: '통계', href: '/analytics', icon: BarChart3 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex h-screen flex-col border-r bg-card transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">에듀플로우</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard" className="mx-auto">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          {navigation.map((section) => (
            <div key={section.title} className="mb-4">
              {!collapsed && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  const linkContent = (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  );

                  if (collapsed) {
                    return (
                      <li key={item.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    );
                  }

                  return <li key={item.name}>{linkContent}</li>;
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Settings & Collapse */}
        <div className="border-t p-2">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    pathname === '/settings'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Settings className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>설정</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/settings"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/settings'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Settings className="h-5 w-5" />
              <span>설정</span>
            </Link>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>접기</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
