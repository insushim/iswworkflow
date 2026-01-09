'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewDocumentPage() {
  const router = useRouter();

  useEffect(() => {
    // 문서 페이지로 리다이렉트 (다이얼로그에서 새 문서 생성)
    router.replace('/documents');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">문서 페이지로 이동 중...</p>
      </div>
    </div>
  );
}
