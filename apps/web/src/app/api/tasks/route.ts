import { NextRequest, NextResponse } from 'next/server';
import { getAllTasks, createTaskAdmin, Timestamp } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const status = searchParams.get('status');

    const filters: {
      month?: number;
      category?: string;
      priority?: string;
      status?: string;
    } = {};

    if (month) filters.month = parseInt(month);
    if (category) filters.category = category;
    if (priority) filters.priority = priority;
    if (status) filters.status = status;

    const tasks = await getAllTasks(filters);

    return NextResponse.json({
      tasks,
      total: tasks.length,
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
    const { title, category, userId } = body;
    if (!title || !category) {
      return NextResponse.json(
        { error: '제목과 카테고리는 필수입니다.' },
        { status: 400 }
      );
    }

    const taskData = {
      userId: userId || 'anonymous',
      title,
      description: body.description || '',
      status: body.status || 'pending',
      priority: body.priority?.toLowerCase() || 'medium',
      category,
      progress: body.progress || 0,
      dueDate: body.dueDate ? Timestamp.fromDate(new Date(body.dueDate)) : null,
    };

    const taskId = await createTaskAdmin(taskData);

    return NextResponse.json({
      task: { id: taskId, ...taskData },
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
