import { NextRequest, NextResponse } from 'next/server';
import { getAllCalendarEvents, createCalendarEventAdmin, Timestamp } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    const filters: {
      startDate?: string;
      endDate?: string;
      type?: string;
    } = {};

    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (type) filters.type = type;

    const events = await getAllCalendarEvents(filters);

    // 형식 변환 (Timestamp -> ISO string)
    const formattedEvents = events.map((event) => ({
      ...event,
      startDate: event.startDate?.toDate().toISOString() || null,
      endDate: event.endDate?.toDate().toISOString() || null,
      createdAt: event.createdAt?.toDate().toISOString() || null,
    }));

    return NextResponse.json({
      events: formattedEvents,
      total: formattedEvents.length,
    });
  } catch (error) {
    console.error('Calendar API Error:', error);
    return NextResponse.json(
      { error: '일정을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, startDate, type, userId } = body;
    if (!title || !startDate || !type) {
      return NextResponse.json(
        { error: '제목, 시작일, 유형은 필수입니다.' },
        { status: 400 }
      );
    }

    const eventData = {
      userId: userId || 'anonymous',
      title,
      description: body.description || '',
      startDate: Timestamp.fromDate(new Date(startDate)),
      endDate: body.endDate ? Timestamp.fromDate(new Date(body.endDate)) : null,
      time: body.time || '',
      location: body.location || '',
      type: type as 'deadline' | 'meeting' | 'event' | 'reminder' | 'holiday',
      priority: (body.priority?.toLowerCase() || 'medium') as 'high' | 'medium' | 'low',
      isCompleted: body.isCompleted || false,
    };

    const eventId = await createCalendarEventAdmin(eventData);

    return NextResponse.json({
      event: { id: eventId, ...eventData },
      message: '일정이 성공적으로 등록되었습니다.',
    });
  } catch (error) {
    console.error('Create Event Error:', error);
    return NextResponse.json(
      { error: '일정 등록에 실패했습니다.' },
      { status: 500 }
    );
  }
}
