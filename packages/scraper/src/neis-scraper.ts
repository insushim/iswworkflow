import { BaseScraper } from './base-scraper';
import { NEISSchool, NEISSchedule, ScrapingResult, ScraperConfig } from './types';

/**
 * NEIS (National Education Information System) API 스크래퍼
 * 한국 교육 정보 공개 포털 API 활용
 * https://open.neis.go.kr/
 */
export class NEISScraper extends BaseScraper {
  private apiKey: string;
  private baseUrl = 'https://open.neis.go.kr/hub';

  constructor(apiKey: string, config?: ScraperConfig) {
    super(config);
    this.apiKey = apiKey;
  }

  async scrape(): Promise<ScrapingResult> {
    const startedAt = new Date();
    let itemsScraped = 0;

    this.logInfo('NEIS 데이터 수집 시작');

    try {
      // 여기서 필요한 데이터 수집 로직 구현
      // 예: 학교 정보, 학사일정 등
    } catch (error) {
      this.logError(`NEIS 스크래핑 실패: ${(error as Error).message}`);
    }

    return this.createResult('neis', itemsScraped, startedAt);
  }

  /**
   * 학교 기본 정보 조회
   * @param officeCode 시도교육청 코드
   * @param schoolName 학교 이름 (선택)
   */
  async getSchools(
    officeCode: string,
    schoolName?: string
  ): Promise<NEISSchool[]> {
    const params = new URLSearchParams({
      KEY: this.apiKey,
      Type: 'json',
      ATPT_OFCDC_SC_CODE: officeCode,
      SCHUL_KND_SC_NM: '초등학교',
      pSize: '1000',
    });

    if (schoolName) {
      params.append('SCHUL_NM', schoolName);
    }

    const url = `${this.baseUrl}/schoolInfo?${params.toString()}`;
    const response = await this.fetchJSON<NEISSchoolResponse>(url);

    if (!response?.schoolInfo) {
      return [];
    }

    const schoolData = response.schoolInfo[1]?.row || [];

    return schoolData.map((school) => ({
      schoolCode: school.SD_SCHUL_CODE,
      schoolName: school.SCHUL_NM,
      schoolType: school.SCHUL_KND_SC_NM,
      address: school.ORG_RDNMA,
      zipCode: school.ORG_RDNZC,
      phone: school.ORG_TELNO,
      fax: school.ORG_FAXNO,
      website: school.HMPG_ADRES,
      foundedAt: this.parseDate(school.FOND_YMD),
      officeCode: school.ATPT_OFCDC_SC_CODE,
      officeName: school.ATPT_OFCDC_SC_NM,
    }));
  }

  /**
   * 학교 목록 조회 (전국)
   */
  async getAllElementarySchools(): Promise<NEISSchool[]> {
    const officeCodes = [
      'B10', // 서울
      'C10', // 부산
      'D10', // 대구
      'E10', // 인천
      'F10', // 광주
      'G10', // 대전
      'H10', // 울산
      'I10', // 세종
      'J10', // 경기
      'K10', // 강원
      'M10', // 충북
      'N10', // 충남
      'P10', // 전북
      'Q10', // 전남
      'R10', // 경북
      'S10', // 경남
      'T10', // 제주
    ];

    const allSchools: NEISSchool[] = [];

    for (const code of officeCodes) {
      try {
        const schools = await this.getSchools(code);
        allSchools.push(...schools);
        this.logInfo(`${code} 지역 ${schools.length}개 학교 조회 완료`);
        await this.delay(500); // Rate limiting
      } catch (error) {
        this.logError(`${code} 지역 조회 실패: ${(error as Error).message}`);
      }
    }

    return allSchools;
  }

  /**
   * 학사일정 조회
   * @param officeCode 시도교육청 코드
   * @param schoolCode 학교 코드
   * @param year 조회 연도
   * @param month 조회 월 (선택)
   */
  async getSchedule(
    officeCode: string,
    schoolCode: string,
    year: number,
    month?: number
  ): Promise<NEISSchedule[]> {
    const params = new URLSearchParams({
      KEY: this.apiKey,
      Type: 'json',
      ATPT_OFCDC_SC_CODE: officeCode,
      SD_SCHUL_CODE: schoolCode,
      AA_YMD: month
        ? `${year}${month.toString().padStart(2, '0')}`
        : year.toString(),
      pSize: '500',
    });

    const url = `${this.baseUrl}/SchoolSchedule?${params.toString()}`;
    const response = await this.fetchJSON<NEISScheduleResponse>(url);

    if (!response?.SchoolSchedule) {
      return [];
    }

    const scheduleData = response.SchoolSchedule[1]?.row || [];

    return scheduleData.map((schedule) => ({
      schoolCode: schedule.SD_SCHUL_CODE,
      date: new Date(
        parseInt(schedule.AA_YMD.slice(0, 4)),
        parseInt(schedule.AA_YMD.slice(4, 6)) - 1,
        parseInt(schedule.AA_YMD.slice(6, 8))
      ),
      eventName: schedule.EVENT_NM,
      eventType: this.categorizeEvent(schedule.EVENT_NM),
      grade: this.extractGrade(schedule.EVENT_NM),
      description: schedule.EVENT_CNTNT,
    }));
  }

  /**
   * 급식 정보 조회
   */
  async getMealInfo(
    officeCode: string,
    schoolCode: string,
    date: Date
  ): Promise<MealInfo | null> {
    const dateStr = this.formatDate(date);

    const params = new URLSearchParams({
      KEY: this.apiKey,
      Type: 'json',
      ATPT_OFCDC_SC_CODE: officeCode,
      SD_SCHUL_CODE: schoolCode,
      MLSV_YMD: dateStr,
    });

    const url = `${this.baseUrl}/mealServiceDietInfo?${params.toString()}`;
    const response = await this.fetchJSON<NEISMealResponse>(url);

    if (!response?.mealServiceDietInfo) {
      return null;
    }

    const mealData = response.mealServiceDietInfo[1]?.row?.[0];

    if (!mealData) return null;

    return {
      date,
      mealType: mealData.MMEAL_SC_NM,
      menu: mealData.DDISH_NM?.split('<br/>').map((item: string) =>
        item.replace(/[0-9.()]/g, '').trim()
      ),
      calories: parseFloat(mealData.CAL_INFO?.replace(/[^0-9.]/g, '') || '0'),
      nutrition: mealData.NTR_INFO?.split('<br/>'),
      origin: mealData.ORPLC_INFO?.split('<br/>'),
    };
  }

  /**
   * 시간표 조회
   */
  async getTimetable(
    officeCode: string,
    schoolCode: string,
    grade: number,
    classNum: number,
    date: Date
  ): Promise<TimetableEntry[]> {
    const dateStr = this.formatDate(date);

    const params = new URLSearchParams({
      KEY: this.apiKey,
      Type: 'json',
      ATPT_OFCDC_SC_CODE: officeCode,
      SD_SCHUL_CODE: schoolCode,
      GRADE: grade.toString(),
      CLASS_NM: classNum.toString(),
      ALL_TI_YMD: dateStr,
    });

    const url = `${this.baseUrl}/elsTimetable?${params.toString()}`;
    const response = await this.fetchJSON<NEISTimetableResponse>(url);

    if (!response?.elsTimetable) {
      return [];
    }

    const timetableData = response.elsTimetable[1]?.row || [];

    return timetableData.map((entry) => ({
      date: new Date(
        parseInt(entry.ALL_TI_YMD.slice(0, 4)),
        parseInt(entry.ALL_TI_YMD.slice(4, 6)) - 1,
        parseInt(entry.ALL_TI_YMD.slice(6, 8))
      ),
      period: parseInt(entry.PERIO),
      subject: entry.ITRT_CNTNT,
    }));
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  private categorizeEvent(eventName: string): string {
    const categories: Record<string, string[]> = {
      방학: ['방학', '개학'],
      시험: ['시험', '평가', '고사'],
      행사: ['운동회', '학예회', '축제', '발표회', '졸업', '입학'],
      체험학습: ['현장체험', '수학여행', '수련회', '캠프'],
      수업: ['수업', '보충', '방과후'],
      기념일: ['기념', '창립'],
      휴업: ['휴업', '휴일', '공휴'],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => eventName.includes(keyword))) {
        return category;
      }
    }

    return '기타';
  }

  private extractGrade(eventName: string): number | undefined {
    const gradeMatch = eventName.match(/(\d)학년/);
    if (gradeMatch) {
      return parseInt(gradeMatch[1]);
    }
    return undefined;
  }
}

// NEIS API 응답 타입
interface NEISSchoolResponse {
  schoolInfo?: [
    { head: Array<{ list_total_count: number }> },
    { row: Array<NEISSchoolRow> },
  ];
}

interface NEISSchoolRow {
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  SCHUL_KND_SC_NM: string;
  ORG_RDNMA: string;
  ORG_RDNZC: string;
  ORG_TELNO?: string;
  ORG_FAXNO?: string;
  HMPG_ADRES?: string;
  FOND_YMD?: string;
  ATPT_OFCDC_SC_CODE: string;
  ATPT_OFCDC_SC_NM: string;
}

interface NEISScheduleResponse {
  SchoolSchedule?: [
    { head: Array<{ list_total_count: number }> },
    { row: Array<NEISScheduleRow> },
  ];
}

interface NEISScheduleRow {
  SD_SCHUL_CODE: string;
  AA_YMD: string;
  EVENT_NM: string;
  EVENT_CNTNT?: string;
}

interface NEISMealResponse {
  mealServiceDietInfo?: [
    { head: Array<{ list_total_count: number }> },
    { row: Array<NEISMealRow> },
  ];
}

interface NEISMealRow {
  MMEAL_SC_NM: string;
  DDISH_NM?: string;
  CAL_INFO?: string;
  NTR_INFO?: string;
  ORPLC_INFO?: string;
}

interface NEISTimetableResponse {
  elsTimetable?: [
    { head: Array<{ list_total_count: number }> },
    { row: Array<NEISTimetableRow> },
  ];
}

interface NEISTimetableRow {
  ALL_TI_YMD: string;
  PERIO: string;
  ITRT_CNTNT: string;
}

interface MealInfo {
  date: Date;
  mealType: string;
  menu: string[];
  calories: number;
  nutrition?: string[];
  origin?: string[];
}

interface TimetableEntry {
  date: Date;
  period: number;
  subject: string;
}
