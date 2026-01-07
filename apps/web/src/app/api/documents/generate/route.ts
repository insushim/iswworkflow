import { NextRequest, NextResponse } from 'next/server';
import { generateDocument } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const {
      documentType,
      title,
      context,
      variables,
    } = await request.json();

    if (!documentType || !context) {
      return NextResponse.json(
        { error: 'documentType과 context가 필요합니다.' },
        { status: 400 }
      );
    }

    // context 객체 생성
    const contextObj: Record<string, string> = {
      '문서 유형': documentType,
      '요청 내용': context,
    };

    if (title) {
      contextObj['제목'] = title;
    }

    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        contextObj[key] = String(value);
      });
    }

    // Gemini로 문서 생성
    const generatedContent = await generateDocument(documentType, contextObj);

    return NextResponse.json({
      document: {
        type: documentType,
        title: title || '생성된 문서',
        content: generatedContent,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Document Generation Error:', error);

    return NextResponse.json(
      { error: '문서 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
