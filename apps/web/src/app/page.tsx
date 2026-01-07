import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, FileText, MessageCircle, CheckSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const features = [
    {
      icon: CheckSquare,
      title: '스마트 업무 관리',
      description:
        '1,000개 이상의 초등학교 업무 데이터를 기반으로 월별·시기별 해야 할 업무를 자동으로 추천합니다.',
    },
    {
      icon: FileText,
      title: 'AI 문서 생성',
      description:
        '10,000건 이상의 공문서를 학습한 AI가 맞춤형 문서를 자동으로 생성해 드립니다.',
    },
    {
      icon: Calendar,
      title: '행사 체크리스트',
      description:
        '학교 행사 준비부터 마무리까지, 빠짐없이 챙기는 스마트 체크리스트를 제공합니다.',
    },
    {
      icon: BookOpen,
      title: '업무 가이드',
      description:
        '처음 맡은 업무도 걱정 없이, 단계별 상세 가이드로 안내해 드립니다.',
    },
    {
      icon: MessageCircle,
      title: 'AI 챗봇 상담',
      description:
        '업무 관련 궁금한 점을 언제든지 물어보세요. AI가 친절하게 답변해 드립니다.',
    },
    {
      icon: Sparkles,
      title: '커뮤니티 인사이트',
      description:
        '50개 이상의 교사 커뮤니티에서 수집한 유용한 정보와 팁을 제공합니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                에듀플로우
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                로그인
              </Link>
              <Button asChild>
                <Link href="/signup">
                  무료로 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI 기반 초등교사 업무 비서
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            선생님의 시간을
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              아이들에게 돌려드립니다
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            복잡한 행정 업무는 AI에게 맡기고,
            <br className="hidden sm:block" />
            교실에서 아이들과 더 많은 시간을 보내세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/signup">
                무료 체험 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8">
              <Link href="/demo">데모 보기</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
            ✓ 신용카드 불필요 · ✓ 14일 무료 체험 · ✓ 언제든 취소 가능
          </p>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              선생님을 위한 올인원 업무 도우미
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              초등학교 현장에서 필요한 모든 기능을 한 곳에서 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1,000+', label: '업무 데이터' },
              { value: '10,000+', label: '문서 템플릿' },
              { value: '50+', label: '연동 커뮤니티' },
              { value: '100+', label: '학교 참여' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              14일 무료 체험으로 에듀플로우의 모든 기능을 경험해 보세요.
              선생님의 업무가 한결 가벼워집니다.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8"
            >
              <Link href="/signup">
                무료로 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                에듀플로우
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
                개인정보처리방침
              </Link>
              <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white">
                문의하기
              </Link>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 EduFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
