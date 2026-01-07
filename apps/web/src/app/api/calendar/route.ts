import { NextRequest, NextResponse } from 'next/server';

// Mock calendar events
const mockEvents = [
  {
    id: 'e1',
    title: '개학식',
    description: '2024학년도 1학기 개학',
    startDate: '2024-03-04T09:00:00',
    endDate: '2024-03-04T10:00:00',
    isAllDay: false,
    location: '운동장',
    type: { name: 'ceremony', nameKo: '의식행사' },
    status: 'SCHEDULED',
  },
  {
    id: 'e2',
    title: '교직원 회의',
    description: '주간 교직원 회의',
    startDate: '2024-03-04T15:00:00',
    endDate: '2024-03-04T16:00:00',
    isAllDay: false,
    location: '교무실',
    type: { name: 'meeting', nameKo: '회의' },
    status: 'SCHEDULED',
  },
  {
    id: 'e3',
    title: '학부모 상담 주간',
    description: '1학기 학부모 상담 주간',
    startDate: '2024-03-18T00:00:00',
    endDate: '2024-03-22T23:59:59',
    isAllDay: true,
    location: '각 교실',
    type: { name: 'counseling', nameKo: '상담' },
    status: 'SCHEDULED',
  },
  {
    id: 'e4',
    title: '학교교육계획 마감',
    description: '3월 학교교육계획 제출 마감',
    startDate: '2024-03-08T18:00:00',
    isAllDay: false,
    type: { name: 'deadline', nameKo: '마감' },
    status: 'SCHEDULED',
  },
  {
    id: 'e5',
    title: '삼일절',
    description: '3·1절 공휴일',
    startDate: '2024-03-01T00:00:00',
    endDate: '2024-03-01T23:59:59',
    isAllDay: true,
    type: { name: 'holiday', nameKo: '공휴일' },
    status: 'SCHEDULED',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    let filteredEvents = [...mockEvents];

    if (startDate) {
      const start = new Date(startDate);
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.startDate) >= start
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.startDate) <= end
      );
    }

    if (type) {
      filteredEvents = filteredEvents.filter(
        (event) => event.type.name === type
      );
    }

    // Sort by start date
    filteredEvents.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return NextResponse.json({
      events: filteredEvents,
      total: filteredEvents.length,
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

    const { title, startDate, typeId } = body;
    if (!title || !startDate || !typeId) {
      return NextResponse.json(
        { error: '제목, 시작일, 유형은 필수입니다.' },
        { status: 400 }
      );
    }

    const newEvent = {
      id: `event_${Date.now()}`,
      ...body,
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      event: newEvent,
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
