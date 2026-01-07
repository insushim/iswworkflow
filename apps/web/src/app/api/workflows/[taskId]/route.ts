import { NextRequest, NextResponse } from 'next/server';
import { getWorkflowById, getAllWorkflows } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

// 기본 워크플로우 데이터 (Firebase에 데이터가 없을 경우 사용)
const defaultWorkflows: Record<string, {
  id: string;
  taskId: string;
  title: string;
  description: string;
  estimatedTime: number;
  steps: Array<{
    order: number;
    title: string;
    description: string;
    checkItems: Array<{ id: string; text: string; isOptional: boolean }>;
    tips: string[];
    warnings: string[];
    estimatedTime: number;
  }>;
}> = {
  '1': {
    id: 'wf_1',
    taskId: '1',
    title: '3월 학교교육계획 수립 워크플로우',
    description: '연간 학교교육계획을 바탕으로 3월 세부 실행 계획을 수립하는 과정입니다.',
    estimatedTime: 480,
    steps: [
      {
        order: 1,
        title: '연간계획 검토',
        description: '학교교육계획서의 3월 관련 내용을 확인합니다.',
        checkItems: [
          { id: 'c1', text: '연간 학교교육계획서 확보', isOptional: false },
          { id: 'c2', text: '3월 주요 행사 및 일정 확인', isOptional: false },
          { id: 'c3', text: '담당 업무 영역 파악', isOptional: false },
        ],
        tips: [
          '전년도 3월 계획과 비교하면 누락 항목 파악에 도움됩니다.',
          '교육청 3월 주요 일정도 함께 확인하세요.',
        ],
        warnings: [
          '법정 필수 교육 일정은 반드시 포함해야 합니다.',
        ],
        estimatedTime: 60,
      },
      {
        order: 2,
        title: '부서별 계획 수합',
        description: '각 부서 및 학년의 3월 세부 계획을 수합합니다.',
        checkItems: [
          { id: 'c4', text: '학년별 3월 계획 수합', isOptional: false },
          { id: 'c5', text: '업무부서별 계획 수합', isOptional: false },
          { id: 'c6', text: '특수학급 계획 확인', isOptional: true },
        ],
        tips: [
          '수합 마감일을 명확히 공지하세요.',
          '양식을 통일하면 취합이 수월합니다.',
        ],
        warnings: [],
        estimatedTime: 120,
      },
      {
        order: 3,
        title: '일정 조율 및 통합',
        description: '수합된 계획을 검토하고 일정을 조율합니다.',
        checkItems: [
          { id: 'c7', text: '일정 중복 확인 및 조율', isOptional: false },
          { id: 'c8', text: '시설 및 자원 배분 확인', isOptional: false },
          { id: 'c9', text: '예산 확인', isOptional: false },
        ],
        tips: [
          '구글 캘린더나 공유 문서를 활용하면 조율이 편합니다.',
        ],
        warnings: [
          '학교 주요 행사와 학년 행사가 겹치지 않도록 주의하세요.',
        ],
        estimatedTime: 90,
      },
      {
        order: 4,
        title: '최종 문서 작성',
        description: '조율된 내용을 바탕으로 최종 계획서를 작성합니다.',
        checkItems: [
          { id: 'c10', text: '월간 계획표 작성', isOptional: false },
          { id: 'c11', text: '주간 계획표 작성', isOptional: false },
          { id: 'c12', text: '담당자 배정 확인', isOptional: false },
        ],
        tips: [
          '에듀플로우 AI의 문서 생성 기능을 활용하세요.',
        ],
        warnings: [],
        estimatedTime: 120,
      },
      {
        order: 5,
        title: '결재 및 공유',
        description: '작성된 계획서를 결재받고 교직원에게 공유합니다.',
        checkItems: [
          { id: 'c13', text: '관리자 결재', isOptional: false },
          { id: 'c14', text: '교직원 공유', isOptional: false },
          { id: 'c15', text: '학교 홈페이지 게시', isOptional: true },
        ],
        tips: [
          '결재 전 동료 교사의 검토를 받으면 좋습니다.',
        ],
        warnings: [
          '개인정보가 포함된 내용은 홈페이지 게시 전 삭제하세요.',
        ],
        estimatedTime: 90,
      },
    ],
  },
  '2': {
    id: 'wf_2',
    taskId: '2',
    title: '학급경영록 작성 워크플로우',
    description: '학급 운영 계획과 학생 현황을 체계적으로 기록하는 과정입니다.',
    estimatedTime: 240,
    steps: [
      {
        order: 1,
        title: '학급 현황 파악',
        description: '담당 학급의 학생 현황을 파악합니다.',
        checkItems: [
          { id: 'c1', text: '학생 명렬표 확인', isOptional: false },
          { id: 'c2', text: '특이사항 학생 파악', isOptional: false },
          { id: 'c3', text: '전년도 인수인계 내용 확인', isOptional: false },
        ],
        tips: [
          'NEIS 학생 기본 정보를 활용하세요.',
          '전담임 교사와 상담하면 도움됩니다.',
        ],
        warnings: [
          '학생 개인정보 보안에 주의하세요.',
        ],
        estimatedTime: 60,
      },
      {
        order: 2,
        title: '학급 운영 계획 수립',
        description: '연간 학급 운영 방향과 세부 계획을 수립합니다.',
        checkItems: [
          { id: 'c4', text: '학급 운영 목표 설정', isOptional: false },
          { id: 'c5', text: '월별 학급 행사 계획', isOptional: false },
          { id: 'c6', text: '학급 규칙 수립', isOptional: false },
        ],
        tips: [
          '학생들과 함께 학급 규칙을 정하면 실천력이 높아집니다.',
        ],
        warnings: [],
        estimatedTime: 90,
      },
      {
        order: 3,
        title: '문서 작성 및 정리',
        description: '학급경영록 양식에 맞게 내용을 작성합니다.',
        checkItems: [
          { id: 'c7', text: '학급경영록 양식 작성', isOptional: false },
          { id: 'c8', text: '좌석 배치도 작성', isOptional: false },
          { id: 'c9', text: '비상연락망 정리', isOptional: false },
        ],
        tips: [
          '학교 공용 양식이 있는지 먼저 확인하세요.',
        ],
        warnings: [],
        estimatedTime: 90,
      },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;

    // 먼저 Firebase에서 워크플로우 조회 시도
    const firebaseWorkflow = await getWorkflowById(taskId);

    if (firebaseWorkflow) {
      // Firebase 워크플로우 형식 변환
      const workflow = {
        id: firebaseWorkflow.id,
        taskId: taskId,
        title: firebaseWorkflow.title,
        description: firebaseWorkflow.description,
        estimatedTime: parseInt(firebaseWorkflow.estimatedTime) || 60,
        steps: firebaseWorkflow.steps.map((step, index) => ({
          order: step.order || index + 1,
          title: step.title,
          description: step.description,
          checkItems: step.checkItems || [],
          tips: step.tips || [],
          warnings: step.warnings || [],
          estimatedTime: step.estimatedTime || 30,
        })),
      };

      return NextResponse.json({ workflow });
    }

    // Firebase에 없으면 기본 워크플로우 데이터 사용
    const defaultWorkflow = defaultWorkflows[taskId];

    if (defaultWorkflow) {
      return NextResponse.json({ workflow: defaultWorkflow });
    }

    return NextResponse.json(
      { error: '해당 업무의 워크플로우를 찾을 수 없습니다.' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Workflow API Error:', error);
    return NextResponse.json(
      { error: '워크플로우를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
