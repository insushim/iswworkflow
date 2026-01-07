import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '에듀플로우 AI - 초등교사 업무 비서',
  description:
    '대한민국 초등교사를 위한 AI 기반 업무 관리 시스템. 업무 자동화, 문서 생성, 일정 관리를 한 곳에서.',
  keywords: [
    '초등교사',
    '교사 업무',
    'AI 비서',
    '학교 업무',
    '공문서 작성',
    '업무 관리',
  ],
  authors: [{ name: 'EduFlow Team' }],
  creator: 'EduFlow',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://eduflow.ai',
    title: '에듀플로우 AI - 초등교사 업무 비서',
    description: '대한민국 초등교사를 위한 AI 기반 업무 관리 시스템',
    siteName: '에듀플로우 AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: '에듀플로우 AI',
    description: '초등교사를 위한 AI 업무 비서',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
