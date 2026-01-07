import { NextRequest, NextResponse } from 'next/server';

// Mock data for tasks - in production, this would come from database
const mockTasks = [
  {
    id: '1',
    title: '3월 학교교육계획 수립',
    description: '연간 학교교육계획 중 3월 세부 계획 수립',
    categoryId: 'academic',
    category: { name: 'academic', nameKo: '학사 운영' },
    month: 3,
    priority: 'HIGH',
    estimatedHours: 8,
    targetGrades: [1, 2, 3, 4, 5, 6],
    targetPositions: ['TEACHER', 'HEAD_TEACHER'],
    isRecurring: true,
    recurringType: 'YEARLY',
    tags: ['계획', '학사', '필수'],
  },
  {
    id: '2',
    title: '학급경영록 작성',
    description: '학급 운영 계획 및 학생 현황 기록',
    categoryId: 'classroom',
    category: { name: 'classroom', nameKo: '학급 운영' },
    month: 3,
    priority: 'MEDIUM',
    estimatedHours: 4,
    targetGrades: [1, 2, 3, 4, 5, 6],
    targetPositions: ['TEACHER'],
    isRecurring: true,
    recurringType: 'YEARLY',
    tags: ['학급', '기록', '필수'],
  },
  {
    id: '3',
    title: '교과서 배부',
    description: '신학기 교과서 수령 및 학생 배부',
    categoryId: 'academic',
    category: { name: 'academic', nameKo: '학사 운영' },
    month: 3,
    priority: 'HIGH',
    estimatedHours: 2,
    targetGrades: [1, 2, 3, 4, 5, 6],
    targetPositions: ['TEACHER'],
    isRecurring: true,
    recurringType: 'YEARLY',
    tags: ['교과서', '배부', '신학기'],
  },
  {
    id: '4',
    title: '학부모 총회 준비',
    description: '학기 초 학부모 총회 및 상담 주간 준비',
    categoryId: 'parents',
    category: { name: 'parents', nameKo: '학부모' },
    month: 3,
    priority: 'MEDIUM',
    estimatedHours: 6,
    targetGrades: [1, 2, 3, 4, 5, 6],
    targetPositions: ['TEACHER', 'HEAD_TEACHER'],
    isRecurring: true,
    recurringType: 'YEARLY',
    tags: ['학부모', '총회', '상담'],
  },
  {
    id: '5',
    title: '안전교육 실시',
    description: '월별 법정 안전교육 실시 및 기록',
    categoryId: 'safety',
    category: { name: 'safety', nameKo: '안전' },
    month: null,
    priority: 'HIGH',
    estimatedHours: 2,
    targetGrades: [1, 2, 3, 4, 5, 6],
    targetPositions: ['TEACHER'],
    isRecurring: true,
    recurringType: 'MONTHLY',
    tags: ['안전', '법정', '교육'],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const grade = searchParams.get('grade');

    let filteredTasks = [...mockTasks];

    if (month) {
      const monthNum = parseInt(month);
      filteredTasks = filteredTasks.filter(
        (task) => task.month === monthNum || task.month === null
      );
    }

    if (category) {
      filteredTasks = filteredTasks.filter(
        (task) => task.categoryId === category
      );
    }

    if (priority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priority
      );
    }

    if (grade) {
      const gradeNum = parseInt(grade);
      filteredTasks = filteredTasks.filter((task) =>
        task.targetGrades.includes(gradeNum)
      );
    }

    return NextResponse.json({
      tasks: filteredTasks,
      total: filteredTasks.length,
    });
  } catch (error) {
    console.error('Tasks API Error:', error);
    return NextResponse.json(
      { error: '업무 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { title, categoryId, priority } = body;
    if (!title || !categoryId) {
      return NextResponse.json(
        { error: '제목과 카테고리는 필수입니다.' },
        { status: 400 }
      );
    }

    // In production, this would create in database
    const newTask = {
      id: `task_${Date.now()}`,
      ...body,
      priority: priority || 'MEDIUM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      task: newTask,
      message: '업무가 성공적으로 등록되었습니다.',
    });
  } catch (error) {
    console.error('Create Task Error:', error);
    return NextResponse.json(
      { error: '업무 등록에 실패했습니다.' },
      { status: 500 }
    );
  }
}
