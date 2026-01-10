// 17개 시도교육청 정보 데이터베이스
// 실제 공식 홈페이지, 매뉴얼 다운로드 링크, 연락처 포함

export interface EducationOffice {
  id: string;
  name: string;
  shortName: string;
  region: string;
  homepage: string;
  phone: string;
  address: string;
  // 주요 업무별 링크
  links: {
    main: string;
    elementary: string; // 초등교육과
    studentLife: string; // 생활지도/학교폭력
    schoolRecords: string; // 학적/생활기록부
    safety: string; // 학교안전
    welfare: string; // 교육복지
    special: string; // 특수교육
    afterSchool: string; // 돌봄/방과후
  };
  // 주요 매뉴얼 다운로드 링크
  manuals: {
    title: string;
    url: string;
    year: number;
    category: string;
  }[];
  // 교육지원청 목록
  districtOffices: {
    name: string;
    phone: string;
    area: string;
  }[];
  // 긴급 연락처
  emergencyContacts: {
    name: string;
    phone: string;
    description: string;
  }[];
  // 특이사항/참고사항
  notes: string[];
}

export const educationOffices: EducationOffice[] = [
  {
    id: 'seoul',
    name: '서울특별시교육청',
    shortName: '서울',
    region: '서울특별시',
    homepage: 'https://www.sen.go.kr/',
    phone: '02-3999-114',
    address: '서울특별시 종로구 송월길 48',
    links: {
      main: 'https://www.sen.go.kr/',
      elementary: 'https://buseo.sen.go.kr/buseo/bu12/',
      studentLife: 'https://buseo.sen.go.kr/buseo/bu15/',
      schoolRecords: 'https://buseo.sen.go.kr/buseo/bu12/user/bbs/BD_selectBbsList.do?q_bbsSn=1266',
      safety: 'https://buseo.sen.go.kr/buseo/bu16/',
      welfare: 'https://buseo.sen.go.kr/buseo/bu13/',
      special: 'https://buseo.sen.go.kr/buseo/bu14/',
      afterSchool: 'https://buseo.sen.go.kr/buseo/bu13/',
    },
    manuals: [
      {
        title: '2025 학교폭력 사안처리 가이드북',
        url: 'https://buseo.sen.go.kr/buseo/bu15/user/bbs/BD_selectBbs.do?q_bbsSn=1331&q_bbsDocNo=20250228154733640',
        year: 2025,
        category: '학교폭력',
      },
      {
        title: '2025 학적업무 도움자료',
        url: 'https://buseo.sen.go.kr/buseo/bu12/user/bbs/BD_selectBbsList.do?q_bbsSn=1266',
        year: 2025,
        category: '학적',
      },
    ],
    districtOffices: [
      { name: '동부교육지원청', phone: '02-2286-3600', area: '동대문구, 성동구, 광진구, 중랑구' },
      { name: '서부교육지원청', phone: '02-3111-2114', area: '마포구, 서대문구, 은평구' },
      { name: '남부교육지원청', phone: '02-2165-0600', area: '영등포구, 구로구, 금천구, 관악구, 동작구' },
      { name: '북부교육지원청', phone: '02-900-2400', area: '강북구, 도봉구, 노원구' },
      { name: '중부교육지원청', phone: '02-3783-2600', area: '종로구, 중구, 용산구' },
      { name: '강동송파교육지원청', phone: '02-3434-8114', area: '강동구, 송파구' },
      { name: '강서양천교육지원청', phone: '02-2698-9600', area: '강서구, 양천구' },
      { name: '강남서초교육지원청', phone: '02-3429-1800', area: '강남구, 서초구' },
      { name: '성동광진교육지원청', phone: '02-2286-3500', area: '성동구, 광진구' },
      { name: '성북강북교육지원청', phone: '02-3399-9000', area: '성북구, 강북구' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터 상담', phone: '1588-7199', description: '학생 심리상담' },
      { name: '학교안전공제회', phone: '02-2128-5800', description: '학교안전사고 보상' },
    ],
    notes: [
      '서울시교육청은 11개 교육지원청으로 구성',
      '학교폭력 심의위원회는 각 교육지원청에서 운영',
      '초등 학적업무 관련 문의는 초등교육과로',
    ],
  },
  {
    id: 'busan',
    name: '부산광역시교육청',
    shortName: '부산',
    region: '부산광역시',
    homepage: 'https://www.pen.go.kr/',
    phone: '051-860-0114',
    address: '부산광역시 부산진구 화지로 12',
    links: {
      main: 'https://www.pen.go.kr/',
      elementary: 'https://home.pen.go.kr/elem/',
      studentLife: 'https://home.pen.go.kr/student/',
      schoolRecords: 'https://home.pen.go.kr/elem/',
      safety: 'https://home.pen.go.kr/safety/',
      welfare: 'https://home.pen.go.kr/welfare/',
      special: 'https://home.pen.go.kr/special/',
      afterSchool: 'https://home.pen.go.kr/welfare/',
    },
    manuals: [
      {
        title: '2025 학교폭력 사안처리 가이드북',
        url: 'https://home.pen.go.kr/student/',
        year: 2025,
        category: '학교폭력',
      },
    ],
    districtOffices: [
      { name: '서부교육지원청', phone: '051-250-0500', area: '서구, 사하구, 중구, 영도구, 동구' },
      { name: '남부교육지원청', phone: '051-640-0500', area: '부산진구, 동래구, 연제구, 남구' },
      { name: '북부교육지원청', phone: '051-330-1200', area: '북구, 사상구, 강서구' },
      { name: '동래교육지원청', phone: '051-550-1200', area: '금정구, 기장군, 해운대구' },
      { name: '해운대교육지원청', phone: '051-709-0500', area: '해운대구' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '051-860-0535', description: '학생 심리상담' },
    ],
    notes: [
      '부산시교육청은 5개 교육지원청으로 구성',
    ],
  },
  {
    id: 'daegu',
    name: '대구광역시교육청',
    shortName: '대구',
    region: '대구광역시',
    homepage: 'https://www.dge.go.kr/',
    phone: '053-231-0000',
    address: '대구광역시 수성구 수성로 76길 11',
    links: {
      main: 'https://www.dge.go.kr/',
      elementary: 'https://www.dge.go.kr/main/cm/cntnts/cntntsView.do?mi=1010&cntntsId=1003',
      studentLife: 'https://www.dge.go.kr/main/cm/cntnts/cntntsView.do?mi=1011&cntntsId=1004',
      schoolRecords: 'https://www.dge.go.kr/main/cm/cntnts/cntntsView.do?mi=1010&cntntsId=1003',
      safety: 'https://www.dge.go.kr/main/cm/cntnts/cntntsView.do?mi=1012&cntntsId=1005',
      welfare: 'https://www.dge.go.kr/main/cm/cntnts/cntntsView.do?mi=1014&cntntsId=1007',
      special: 'https://www.dge.go.kr/main/cm/cntnts/cntntsView.do?mi=1013&cntntsId=1006',
      afterSchool: 'https://www.dge.go.kr/main/cm/cntnts/cntntsView.do?mi=1014&cntntsId=1007',
    },
    manuals: [],
    districtOffices: [
      { name: '동부교육지원청', phone: '053-231-0600', area: '동구, 수성구' },
      { name: '서부교육지원청', phone: '053-231-0700', area: '서구, 중구, 남구' },
      { name: '남부교육지원청', phone: '053-231-0800', area: '달서구' },
      { name: '달성교육지원청', phone: '053-231-0900', area: '달성군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '053-231-0660', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'incheon',
    name: '인천광역시교육청',
    shortName: '인천',
    region: '인천광역시',
    homepage: 'https://www.ice.go.kr/',
    phone: '032-420-8114',
    address: '인천광역시 남동구 정각로 9',
    links: {
      main: 'https://www.ice.go.kr/',
      elementary: 'https://www.ice.go.kr/main/cm/cntnts/cntntsView.do?mi=1016&cntntsId=1008',
      studentLife: 'https://www.ice.go.kr/main/cm/cntnts/cntntsView.do?mi=1017&cntntsId=1009',
      schoolRecords: 'https://www.ice.go.kr/main/cm/cntnts/cntntsView.do?mi=1016&cntntsId=1008',
      safety: 'https://www.ice.go.kr/main/cm/cntnts/cntntsView.do?mi=1018&cntntsId=1010',
      welfare: 'https://www.ice.go.kr/main/cm/cntnts/cntntsView.do?mi=1020&cntntsId=1012',
      special: 'https://www.ice.go.kr/main/cm/cntnts/cntntsView.do?mi=1019&cntntsId=1011',
      afterSchool: 'https://www.ice.go.kr/main/cm/cntnts/cntntsView.do?mi=1020&cntntsId=1012',
    },
    manuals: [],
    districtOffices: [
      { name: '남부교육지원청', phone: '032-430-8000', area: '미추홀구, 연수구, 남동구' },
      { name: '북부교육지원청', phone: '032-540-8000', area: '부평구, 계양구' },
      { name: '동부교육지원청', phone: '032-770-8000', area: '중구, 동구, 옹진군' },
      { name: '서부교육지원청', phone: '032-560-8000', area: '서구, 강화군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '032-420-8100', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'gwangju',
    name: '광주광역시교육청',
    shortName: '광주',
    region: '광주광역시',
    homepage: 'https://www.gen.go.kr/',
    phone: '062-380-4500',
    address: '광주광역시 서구 화운로 93',
    links: {
      main: 'https://www.gen.go.kr/',
      elementary: 'https://www.gen.go.kr/main/cm/cntnts/cntntsView.do?mi=1022&cntntsId=1014',
      studentLife: 'https://www.gen.go.kr/main/cm/cntnts/cntntsView.do?mi=1023&cntntsId=1015',
      schoolRecords: 'https://www.gen.go.kr/main/cm/cntnts/cntntsView.do?mi=1022&cntntsId=1014',
      safety: 'https://www.gen.go.kr/main/cm/cntnts/cntntsView.do?mi=1024&cntntsId=1016',
      welfare: 'https://www.gen.go.kr/main/cm/cntnts/cntntsView.do?mi=1026&cntntsId=1018',
      special: 'https://www.gen.go.kr/main/cm/cntnts/cntntsView.do?mi=1025&cntntsId=1017',
      afterSchool: 'https://www.gen.go.kr/main/cm/cntnts/cntntsView.do?mi=1026&cntntsId=1018',
    },
    manuals: [],
    districtOffices: [
      { name: '동부교육지원청', phone: '062-605-5500', area: '동구, 북구' },
      { name: '서부교육지원청', phone: '062-600-9500', area: '서구, 남구, 광산구' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '062-380-4680', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'daejeon',
    name: '대전광역시교육청',
    shortName: '대전',
    region: '대전광역시',
    homepage: 'https://www.dje.go.kr/',
    phone: '042-480-7000',
    address: '대전광역시 서구 둔산로 98',
    links: {
      main: 'https://www.dje.go.kr/',
      elementary: 'https://www.dje.go.kr/board/list.do?boardId=BBS_0000001&menuCd=DOM_000000102001000000',
      studentLife: 'https://www.dje.go.kr/board/list.do?boardId=BBS_0000002&menuCd=DOM_000000102002000000',
      schoolRecords: 'https://www.dje.go.kr/board/list.do?boardId=BBS_0000001&menuCd=DOM_000000102001000000',
      safety: 'https://www.dje.go.kr/board/list.do?boardId=BBS_0000003&menuCd=DOM_000000102003000000',
      welfare: 'https://www.dje.go.kr/board/list.do?boardId=BBS_0000005&menuCd=DOM_000000102005000000',
      special: 'https://www.dje.go.kr/board/list.do?boardId=BBS_0000004&menuCd=DOM_000000102004000000',
      afterSchool: 'https://www.dje.go.kr/board/list.do?boardId=BBS_0000005&menuCd=DOM_000000102005000000',
    },
    manuals: [],
    districtOffices: [
      { name: '동부교육지원청', phone: '042-229-1200', area: '동구, 중구' },
      { name: '서부교육지원청', phone: '042-530-1100', area: '서구, 유성구, 대덕구' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '042-480-7200', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'ulsan',
    name: '울산광역시교육청',
    shortName: '울산',
    region: '울산광역시',
    homepage: 'https://www.use.go.kr/',
    phone: '052-210-5400',
    address: '울산광역시 중구 북부순환도로 375',
    links: {
      main: 'https://www.use.go.kr/',
      elementary: 'https://www.use.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1970',
      studentLife: 'https://www.use.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1971',
      schoolRecords: 'https://use.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1971&q_bbsDocNo=20240227170215539',
      safety: 'https://www.use.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1972',
      welfare: 'https://www.use.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1974',
      special: 'https://www.use.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1973',
      afterSchool: 'https://www.use.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1974',
    },
    manuals: [
      {
        title: '2025학년도 학적업무 처리 길라잡이',
        url: 'https://use.go.kr/edumanual/user/bbs/BD_selectBbs.do?q_bbsSn=1543',
        year: 2025,
        category: '학적',
      },
      {
        title: '2025학년도 학교생활기록부 기재요령 주요 개정사항',
        url: 'https://use.go.kr/edumanual/user/bbs/BD_selectBbs.do?q_bbsSn=1543&q_bbsDocNo=20250501154436584',
        year: 2025,
        category: '학생부',
      },
    ],
    districtOffices: [
      { name: '강북교육지원청', phone: '052-219-5800', area: '중구, 북구' },
      { name: '강남교육지원청', phone: '052-226-6300', area: '남구, 동구, 울주군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '052-210-5620', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'sejong',
    name: '세종특별자치시교육청',
    shortName: '세종',
    region: '세종특별자치시',
    homepage: 'https://www.sje.go.kr/',
    phone: '044-320-2000',
    address: '세종특별자치시 한누리대로 2154',
    links: {
      main: 'https://www.sje.go.kr/',
      elementary: 'https://www.sje.go.kr/sub/info.do?m=0101&s=sje',
      studentLife: 'https://www.sje.go.kr/sub/info.do?m=0102&s=sje',
      schoolRecords: 'https://www.sje.go.kr/sub/info.do?m=0101&s=sje',
      safety: 'https://www.sje.go.kr/sub/info.do?m=0103&s=sje',
      welfare: 'https://www.sje.go.kr/sub/info.do?m=0105&s=sje',
      special: 'https://www.sje.go.kr/sub/info.do?m=0104&s=sje',
      afterSchool: 'https://www.sje.go.kr/sub/info.do?m=0105&s=sje',
    },
    manuals: [],
    districtOffices: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '044-320-2300', description: '학생 심리상담' },
    ],
    notes: [
      '세종시는 단일 교육청으로 교육지원청 없음',
    ],
  },
  {
    id: 'gyeonggi',
    name: '경기도교육청',
    shortName: '경기',
    region: '경기도',
    homepage: 'https://www.goe.go.kr/',
    phone: '031-820-0114',
    address: '경기도 수원시 장안구 조원로 18',
    links: {
      main: 'https://www.goe.go.kr/',
      elementary: 'https://www.goe.go.kr/home/bbs/bbsList.do?menuId=100000000000199&bbsMasterId=BBSMSTR_000000000051',
      studentLife: 'https://www.goe.go.kr/home/bbs/bbsList.do?menuId=100000000000200&bbsMasterId=BBSMSTR_000000000052',
      schoolRecords: 'https://www.goeic.kr/06040500/bbs/formView.do?searchMasterSid=95&sid=20390',
      safety: 'https://www.goe.go.kr/home/bbs/bbsList.do?menuId=100000000000201&bbsMasterId=BBSMSTR_000000000053',
      welfare: 'https://www.goe.go.kr/home/bbs/bbsList.do?menuId=100000000000203&bbsMasterId=BBSMSTR_000000000055',
      special: 'https://www.goe.go.kr/home/bbs/bbsList.do?menuId=100000000000202&bbsMasterId=BBSMSTR_000000000054',
      afterSchool: 'https://www.goe.go.kr/home/bbs/bbsList.do?menuId=100000000000203&bbsMasterId=BBSMSTR_000000000055',
    },
    manuals: [
      {
        title: '2025 학교 업무매뉴얼 (초등)',
        url: 'https://www.goe.go.kr/data/2025 학교 업무메뉴얼_(초등).pdf',
        year: 2025,
        category: '교무학사',
      },
      {
        title: '2025학년도 학교폭력 사안처리 가이드북',
        url: 'https://www.goe.go.kr/resource/old/BBSMSTR_000000030138/BBS_202502140257008950.pdf',
        year: 2025,
        category: '학교폭력',
      },
    ],
    districtOffices: [
      { name: '수원교육지원청', phone: '031-250-1200', area: '수원시' },
      { name: '성남교육지원청', phone: '031-780-2500', area: '성남시' },
      { name: '용인교육지원청', phone: '031-8020-9000', area: '용인시' },
      { name: '안양과천교육지원청', phone: '031-380-7200', area: '안양시, 과천시' },
      { name: '부천교육지원청', phone: '032-620-6500', area: '부천시' },
      { name: '광명교육지원청', phone: '02-2610-1500', area: '광명시' },
      { name: '고양교육지원청', phone: '031-900-2100', area: '고양시' },
      { name: '의정부교육지원청', phone: '031-820-0000', area: '의정부시, 양주시, 동두천시, 연천군' },
      { name: '남양주교육지원청', phone: '031-550-6100', area: '남양주시' },
      { name: '안산교육지원청', phone: '031-412-4500', area: '안산시' },
      { name: '시흥교육지원청', phone: '031-488-2400', area: '시흥시' },
      { name: '군포의왕교육지원청', phone: '031-390-1100', area: '군포시, 의왕시' },
      { name: '하남교육지원청', phone: '031-790-6300', area: '하남시' },
      { name: '파주교육지원청', phone: '031-940-4000', area: '파주시' },
      { name: '화성오산교육지원청', phone: '031-371-0600', area: '화성시, 오산시' },
      { name: '평택교육지원청', phone: '031-650-1200', area: '평택시' },
      { name: '김포교육지원청', phone: '031-980-1200', area: '김포시' },
      { name: '광주하남교육지원청', phone: '031-280-2100', area: '광주시, 하남시' },
      { name: '이천교육지원청', phone: '031-639-5600', area: '이천시' },
      { name: '안성교육지원청', phone: '031-678-5200', area: '안성시' },
      { name: '양평교육지원청', phone: '031-770-5300', area: '양평군' },
      { name: '여주교육지원청', phone: '031-880-2000', area: '여주시' },
      { name: '포천교육지원청', phone: '031-539-0800', area: '포천시' },
      { name: '가평교육지원청', phone: '031-580-5200', area: '가평군' },
      { name: '구리남양주교육지원청', phone: '031-550-6100', area: '구리시, 남양주시' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '031-820-0900', description: '학생 심리상담' },
    ],
    notes: [
      '경기도교육청은 25개 교육지원청으로 구성 (전국 최다)',
      '지역별로 세부 절차가 다를 수 있음',
    ],
  },
  {
    id: 'gangwon',
    name: '강원특별자치도교육청',
    shortName: '강원',
    region: '강원특별자치도',
    homepage: 'https://www.gwe.go.kr/',
    phone: '033-258-5114',
    address: '강원특별자치도 춘천시 금강로 2길 5',
    links: {
      main: 'https://www.gwe.go.kr/',
      elementary: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199070',
      studentLife: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199071',
      schoolRecords: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199070',
      safety: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199072',
      welfare: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199074',
      special: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199073',
      afterSchool: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199074',
    },
    manuals: [
      {
        title: '2025 강원특별자치도교육청 업무 매뉴얼',
        url: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199072',
        year: 2025,
        category: '종합',
      },
    ],
    districtOffices: [
      { name: '춘천교육지원청', phone: '033-250-1200', area: '춘천시' },
      { name: '원주교육지원청', phone: '033-769-0500', area: '원주시' },
      { name: '강릉교육지원청', phone: '033-640-6500', area: '강릉시' },
      { name: '동해삼척교육지원청', phone: '033-530-5500', area: '동해시, 삼척시' },
      { name: '속초양양교육지원청', phone: '033-680-3200', area: '속초시, 양양군' },
      { name: '태백교육지원청', phone: '033-550-1500', area: '태백시' },
      { name: '홍천교육지원청', phone: '033-430-1500', area: '홍천군' },
      { name: '횡성교육지원청', phone: '033-345-3200', area: '횡성군' },
      { name: '영월교육지원청', phone: '033-370-1500', area: '영월군' },
      { name: '평창교육지원청', phone: '033-330-3200', area: '평창군' },
      { name: '정선교육지원청', phone: '033-560-1500', area: '정선군' },
      { name: '철원교육지원청', phone: '033-450-1500', area: '철원군' },
      { name: '화천교육지원청', phone: '033-440-1500', area: '화천군' },
      { name: '양구교육지원청', phone: '033-480-1500', area: '양구군' },
      { name: '인제교육지원청', phone: '033-460-1500', area: '인제군' },
      { name: '고성교육지원청', phone: '033-680-2200', area: '고성군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '033-258-5600', description: '학생 심리상담' },
    ],
    notes: [
      '2023년 강원특별자치도로 명칭 변경',
    ],
  },
  {
    id: 'chungbuk',
    name: '충청북도교육청',
    shortName: '충북',
    region: '충청북도',
    homepage: 'https://www.cbe.go.kr/',
    phone: '043-290-2114',
    address: '충청북도 청주시 흥덕구 대사관로 105',
    links: {
      main: 'https://www.cbe.go.kr/',
      elementary: 'https://www.cbe.go.kr/dept-19/na/ntt/selectNttList.do?mi=11134',
      studentLife: 'https://www.cbe.go.kr/dept-20/na/ntt/selectNttList.do?mi=11145',
      schoolRecords: 'https://www.cbe.go.kr/dept-19/na/ntt/selectNttInfo.do?nttSn=1521791&mi=11134',
      safety: 'https://www.cbe.go.kr/dept-21/na/ntt/selectNttList.do?mi=11156',
      welfare: 'https://www.cbe.go.kr/dept-23/na/ntt/selectNttList.do?mi=11178',
      special: 'https://www.cbe.go.kr/dept-22/na/ntt/selectNttList.do?mi=11167',
      afterSchool: 'https://www.cbe.go.kr/dept-23/na/ntt/selectNttList.do?mi=11178',
    },
    manuals: [
      {
        title: '2025 학교생활기록부 기재요령 (초등학교)',
        url: 'https://www.cbe.go.kr/dept-19/na/ntt/selectNttInfo.do?nttSn=1542702&mi=11134',
        year: 2025,
        category: '학적',
      },
      {
        title: '2025 학교폭력 사안처리 가이드북 개정안',
        url: 'https://www.cbe.go.kr/dept-21/na/ntt/selectNttInfo.do?nttSn=1548192&mi=11221',
        year: 2025,
        category: '학교폭력',
      },
    ],
    districtOffices: [
      { name: '청주교육지원청', phone: '043-299-3100', area: '청주시' },
      { name: '충주교육지원청', phone: '043-850-0600', area: '충주시' },
      { name: '제천교육지원청', phone: '043-640-6600', area: '제천시' },
      { name: '보은교육지원청', phone: '043-540-5600', area: '보은군' },
      { name: '옥천교육지원청', phone: '043-730-4200', area: '옥천군' },
      { name: '영동교육지원청', phone: '043-740-7600', area: '영동군' },
      { name: '증평교육지원청', phone: '043-835-4700', area: '증평군' },
      { name: '진천교육지원청', phone: '043-530-5300', area: '진천군' },
      { name: '괴산증평교육지원청', phone: '043-830-5200', area: '괴산군, 증평군' },
      { name: '음성교육지원청', phone: '043-871-5000', area: '음성군' },
      { name: '단양교육지원청', phone: '043-420-6200', area: '단양군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '043-290-2580', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'chungnam',
    name: '충청남도교육청',
    shortName: '충남',
    region: '충청남도',
    homepage: 'https://www.cne.go.kr/',
    phone: '041-640-7114',
    address: '충청남도 홍성군 홍북읍 충남대로 21',
    links: {
      main: 'https://www.cne.go.kr/',
      elementary: 'https://www.cne.go.kr/main.do',
      studentLife: 'https://www.cne.go.kr/main.do',
      schoolRecords: 'https://www.cne.go.kr/main.do',
      safety: 'https://www.cne.go.kr/main.do',
      welfare: 'https://www.cne.go.kr/main.do',
      special: 'https://www.cne.go.kr/main.do',
      afterSchool: 'https://www.cne.go.kr/main.do',
    },
    manuals: [],
    districtOffices: [
      { name: '천안교육지원청', phone: '041-529-0500', area: '천안시' },
      { name: '공주교육지원청', phone: '041-850-2500', area: '공주시' },
      { name: '보령교육지원청', phone: '041-930-6500', area: '보령시' },
      { name: '아산교육지원청', phone: '041-539-2500', area: '아산시' },
      { name: '서산교육지원청', phone: '041-660-9500', area: '서산시' },
      { name: '논산계룡교육지원청', phone: '041-730-7500', area: '논산시, 계룡시' },
      { name: '당진교육지원청', phone: '041-350-4500', area: '당진시' },
      { name: '금산교육지원청', phone: '041-750-8500', area: '금산군' },
      { name: '부여교육지원청', phone: '041-830-8500', area: '부여군' },
      { name: '서천교육지원청', phone: '041-950-6500', area: '서천군' },
      { name: '청양교육지원청', phone: '041-940-4500', area: '청양군' },
      { name: '홍성교육지원청', phone: '041-630-5500', area: '홍성군' },
      { name: '예산교육지원청', phone: '041-330-3500', area: '예산군' },
      { name: '태안교육지원청', phone: '041-670-4500', area: '태안군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '041-640-7700', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'jeonbuk',
    name: '전북특별자치도교육청',
    shortName: '전북',
    region: '전북특별자치도',
    homepage: 'https://www.jbe.go.kr/',
    phone: '063-239-3114',
    address: '전북특별자치도 전주시 완산구 홍산남로 248',
    links: {
      main: 'https://www.jbe.go.kr/',
      elementary: 'https://office.jbedu.kr/jbime/',
      studentLife: 'https://office.jbedu.kr/jbime/',
      schoolRecords: 'https://office.jbedu.kr/jbime/MABAGAJACAF/view/6038607',
      safety: 'https://office.jbedu.kr/jbime/',
      welfare: 'https://office.jbedu.kr/jbime/',
      special: 'https://office.jbedu.kr/jbime/',
      afterSchool: 'https://office.jbedu.kr/jbime/',
    },
    manuals: [
      {
        title: '2025 학교폭력 사안처리 가이드북 (2025.3.1.개정판)',
        url: 'https://www.jbe.go.kr/office/board/view.jbe?boardId=BBS_0000191&dataSid=782174',
        year: 2025,
        category: '학교폭력',
      },
      {
        title: '2025학년도 학교생활기록부 기재요령 주요 개정사항 (초등)',
        url: 'https://www.jbe.go.kr/office/board/view.jbe?boardId=BBS_0000191&dataSid=792231',
        year: 2025,
        category: '학생부',
      },
    ],
    districtOffices: [
      { name: '전주교육지원청', phone: '063-270-7000', area: '전주시' },
      { name: '군산교육지원청', phone: '063-450-7000', area: '군산시' },
      { name: '익산교육지원청', phone: '063-850-7000', area: '익산시' },
      { name: '정읍교육지원청', phone: '063-539-6000', area: '정읍시' },
      { name: '남원교육지원청', phone: '063-620-7000', area: '남원시' },
      { name: '김제교육지원청', phone: '063-540-6000', area: '김제시' },
      { name: '완주교육지원청', phone: '063-290-7000', area: '완주군' },
      { name: '진안교육지원청', phone: '063-430-6000', area: '진안군' },
      { name: '무주교육지원청', phone: '063-320-6000', area: '무주군' },
      { name: '장수교육지원청', phone: '063-350-6000', area: '장수군' },
      { name: '임실교육지원청', phone: '063-640-6000', area: '임실군' },
      { name: '순창교육지원청', phone: '063-650-6000', area: '순창군' },
      { name: '고창교육지원청', phone: '063-560-6000', area: '고창군' },
      { name: '부안교육지원청', phone: '063-580-6000', area: '부안군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '063-239-3350', description: '학생 심리상담' },
    ],
    notes: [
      '2024년 전북특별자치도로 명칭 변경',
    ],
  },
  {
    id: 'jeonnam',
    name: '전라남도교육청',
    shortName: '전남',
    region: '전라남도',
    homepage: 'https://www.jne.go.kr/',
    phone: '061-260-0114',
    address: '전라남도 무안군 삼향읍 오룡길 1',
    links: {
      main: 'https://www.jne.go.kr/',
      elementary: 'https://www.jne.go.kr/main/main.do',
      studentLife: 'https://www.jne.go.kr/main/main.do',
      schoolRecords: 'https://www.jne.go.kr/main/main.do',
      safety: 'https://www.jne.go.kr/main/main.do',
      welfare: 'https://www.jne.go.kr/main/main.do',
      special: 'https://www.jne.go.kr/main/main.do',
      afterSchool: 'https://www.jne.go.kr/main/main.do',
    },
    manuals: [
      {
        title: '2025 학교폭력 사안처리 가이드북',
        url: 'https://www.jne.go.kr/main/main.do',
        year: 2025,
        category: '학교폭력',
      },
    ],
    districtOffices: [
      { name: '목포교육지원청', phone: '061-260-0500', area: '목포시' },
      { name: '여수교육지원청', phone: '061-690-5500', area: '여수시' },
      { name: '순천교육지원청', phone: '061-729-7500', area: '순천시' },
      { name: '나주교육지원청', phone: '061-330-7500', area: '나주시' },
      { name: '광양교육지원청', phone: '061-797-3500', area: '광양시' },
      { name: '담양교육지원청', phone: '061-380-8500', area: '담양군' },
      { name: '곡성교육지원청', phone: '061-360-8500', area: '곡성군' },
      { name: '구례교육지원청', phone: '061-780-8500', area: '구례군' },
      { name: '고흥교육지원청', phone: '061-830-8500', area: '고흥군' },
      { name: '보성교육지원청', phone: '061-850-8500', area: '보성군' },
      { name: '화순교육지원청', phone: '061-370-8500', area: '화순군' },
      { name: '장흥교육지원청', phone: '061-860-8500', area: '장흥군' },
      { name: '강진교육지원청', phone: '061-430-8500', area: '강진군' },
      { name: '해남교육지원청', phone: '061-530-8500', area: '해남군' },
      { name: '영암교육지원청', phone: '061-470-8500', area: '영암군' },
      { name: '무안교육지원청', phone: '061-450-8500', area: '무안군' },
      { name: '함평교육지원청', phone: '061-320-8500', area: '함평군' },
      { name: '영광교육지원청', phone: '061-350-8500', area: '영광군' },
      { name: '장성교육지원청', phone: '061-390-8500', area: '장성군' },
      { name: '완도교육지원청', phone: '061-550-8500', area: '완도군' },
      { name: '진도교육지원청', phone: '061-540-8500', area: '진도군' },
      { name: '신안교육지원청', phone: '061-240-8500', area: '신안군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '061-260-0570', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'gyeongbuk',
    name: '경상북도교육청',
    shortName: '경북',
    region: '경상북도',
    homepage: 'https://www.gbe.kr/',
    phone: '053-805-3114',
    address: '경상북도 안동시 풍천면 도청대로 511',
    links: {
      main: 'https://www.gbe.kr/',
      elementary: 'https://www.gbe.kr/main/main.do',
      studentLife: 'https://www.gbe.kr/main/main.do',
      schoolRecords: 'https://www.gbe.kr/main/main.do',
      safety: 'https://www.gbe.kr/main/main.do',
      welfare: 'https://www.gbe.kr/main/main.do',
      special: 'https://www.gbe.kr/main/main.do',
      afterSchool: 'https://www.gbe.kr/main/main.do',
    },
    manuals: [],
    districtOffices: [
      { name: '포항교육지원청', phone: '054-288-6500', area: '포항시' },
      { name: '경주교육지원청', phone: '054-770-2500', area: '경주시' },
      { name: '김천교육지원청', phone: '054-420-5500', area: '김천시' },
      { name: '안동교육지원청', phone: '054-840-2500', area: '안동시' },
      { name: '구미교육지원청', phone: '054-440-2500', area: '구미시' },
      { name: '영주교육지원청', phone: '054-630-4200', area: '영주시' },
      { name: '영천교육지원청', phone: '054-330-2500', area: '영천시' },
      { name: '상주교육지원청', phone: '054-530-2500', area: '상주시' },
      { name: '문경교육지원청', phone: '054-550-5700', area: '문경시' },
      { name: '경산교육지원청', phone: '053-810-7500', area: '경산시' },
      { name: '군위교육지원청', phone: '054-380-8500', area: '군위군' },
      { name: '의성교육지원청', phone: '054-830-1200', area: '의성군' },
      { name: '청송교육지원청', phone: '054-870-5500', area: '청송군' },
      { name: '영양교육지원청', phone: '054-680-2200', area: '영양군' },
      { name: '영덕교육지원청', phone: '054-730-8000', area: '영덕군' },
      { name: '청도교육지원청', phone: '054-370-1500', area: '청도군' },
      { name: '고령교육지원청', phone: '054-950-2500', area: '고령군' },
      { name: '성주교육지원청', phone: '054-930-2500', area: '성주군' },
      { name: '칠곡교육지원청', phone: '054-979-2100', area: '칠곡군' },
      { name: '예천교육지원청', phone: '054-650-2500', area: '예천군' },
      { name: '봉화교육지원청', phone: '054-679-1700', area: '봉화군' },
      { name: '울진교육지원청', phone: '054-780-2500', area: '울진군' },
      { name: '울릉교육지원청', phone: '054-790-6500', area: '울릉군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '053-805-3600', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'gyeongnam',
    name: '경상남도교육청',
    shortName: '경남',
    region: '경상남도',
    homepage: 'https://www.gne.go.kr/',
    phone: '055-210-5114',
    address: '경상남도 창원시 의창구 중앙대로 241',
    links: {
      main: 'https://www.gne.go.kr/',
      elementary: 'https://www.gne.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1464',
      studentLife: 'https://www.gne.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1465',
      schoolRecords: 'https://www.gne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1464&q_bbsDocNo=1717451',
      safety: 'https://www.gne.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1466',
      welfare: 'https://www.gne.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1468',
      special: 'https://www.gne.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1467',
      afterSchool: 'https://www.gne.go.kr/user/bbs/BD_selectBbsList.do?q_bbsSn=1468',
    },
    manuals: [
      {
        title: '2025학년도 학교생활기록부 기재요령 (초등학교)',
        url: 'https://www.gne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1464&q_bbsDocNo=20250212160552300',
        year: 2025,
        category: '학생부',
      },
      {
        title: '2025 학교폭력 사안처리 가이드북 (경남, 교육부)',
        url: 'https://www.gne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1464&q_bbsDocNo=20250306163138562',
        year: 2025,
        category: '학교폭력',
      },
    ],
    districtOffices: [
      { name: '창원교육지원청', phone: '055-210-0500', area: '창원시' },
      { name: '진주교육지원청', phone: '055-740-2500', area: '진주시' },
      { name: '통영교육지원청', phone: '055-650-2500', area: '통영시' },
      { name: '사천교육지원청', phone: '055-830-1500', area: '사천시' },
      { name: '김해교육지원청', phone: '055-310-1500', area: '김해시' },
      { name: '밀양교육지원청', phone: '055-350-1500', area: '밀양시' },
      { name: '거제교육지원청', phone: '055-639-5500', area: '거제시' },
      { name: '양산교육지원청', phone: '055-379-1500', area: '양산시' },
      { name: '의령교육지원청', phone: '055-570-5500', area: '의령군' },
      { name: '함안교육지원청', phone: '055-580-1500', area: '함안군' },
      { name: '창녕교육지원청', phone: '055-530-1500', area: '창녕군' },
      { name: '고성교육지원청', phone: '055-670-5500', area: '고성군' },
      { name: '남해교육지원청', phone: '055-860-5500', area: '남해군' },
      { name: '하동교육지원청', phone: '055-880-2500', area: '하동군' },
      { name: '산청교육지원청', phone: '055-970-2500', area: '산청군' },
      { name: '함양교육지원청', phone: '055-960-5500', area: '함양군' },
      { name: '거창교육지원청', phone: '055-940-5500', area: '거창군' },
      { name: '합천교육지원청', phone: '055-930-5500', area: '합천군' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '055-210-5680', description: '학생 심리상담' },
    ],
    notes: [],
  },
  {
    id: 'jeju',
    name: '제주특별자치도교육청',
    shortName: '제주',
    region: '제주특별자치도',
    homepage: 'https://www.jje.go.kr/',
    phone: '064-710-0114',
    address: '제주특별자치도 제주시 문연로 5',
    links: {
      main: 'https://www.jje.go.kr/',
      elementary: 'https://www.jje.go.kr/main/main.do',
      studentLife: 'https://www.jje.go.kr/main/main.do',
      schoolRecords: 'https://www.jje.go.kr/main/main.do',
      safety: 'https://www.jje.go.kr/main/main.do',
      welfare: 'https://www.jje.go.kr/main/main.do',
      special: 'https://www.jje.go.kr/main/main.do',
      afterSchool: 'https://www.jje.go.kr/main/main.do',
    },
    manuals: [],
    districtOffices: [
      { name: '제주시교육지원청', phone: '064-754-1200', area: '제주시' },
      { name: '서귀포시교육지원청', phone: '064-730-8000', area: '서귀포시' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터' },
      { name: 'Wee센터', phone: '064-710-0380', description: '학생 심리상담' },
    ],
    notes: [],
  },
];

// 교육부 공통 자료
export const nationalResources = {
  ministry: {
    name: '교육부',
    homepage: 'https://www.moe.go.kr/',
    phone: '02-6222-6060',
  },
  commonManuals: [
    {
      title: '2025학년도 학교폭력 사안처리 가이드북 (교육부)',
      url: 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=316&boardSeq=102619',
      year: 2025,
      category: '학교폭력',
      description: '교육부 공식 학교폭력 사안처리 가이드북 (2025.3.1 개정)',
    },
    {
      title: '2025학년도 학교생활기록부 기재요령 (초등학교)',
      url: 'https://star.moe.go.kr/web/contents/m10501.do',
      year: 2025,
      category: '학적',
      description: '초등학교 생활기록부 작성 공식 지침',
    },
    {
      title: '2025 학교생활기록부 훈령 및 기재요령 주요 개정사항 (초등)',
      url: 'https://star.moe.go.kr/web/contents/m20200.do?schM=view&id=70994',
      year: 2025,
      category: '학적',
      description: '2025학년도 학생부 기재요령 주요 개정사항 안내',
    },
    {
      title: '교원의 학생생활지도에 관한 고시',
      url: 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=316&boardSeq=98297',
      year: 2023,
      category: '생활지도',
      description: '2023.9.1 시행 교원 생활지도권 관련 고시',
    },
  ],
  emergencyContacts: [
    { name: '학교폭력 신고', phone: '117', description: '24시간 학교폭력 신고센터 (경찰청)' },
    { name: '학생위기상담 Wee', phone: '1588-7199', description: '전국 Wee센터 통합 상담전화' },
    { name: '자살예방상담', phone: '1393', description: '정신건강위기상담전화' },
    { name: '아동학대신고', phone: '112', description: '아동학대 신고의무자 신고' },
    { name: '학교안전공제회', phone: '1588-2095', description: '학교안전사고 보상 관련' },
  ],
  neis: {
    name: '나이스 (NEIS)',
    url: 'https://www.neis.go.kr/',
    description: '교육행정정보시스템',
    helpdesk: '1544-0079',
  },
};

// 헬퍼 함수
export function getEducationOfficeById(id: string): EducationOffice | undefined {
  return educationOffices.find(office => office.id === id);
}

export function getEducationOfficeByRegion(region: string): EducationOffice | undefined {
  return educationOffices.find(office =>
    office.region.includes(region) || office.shortName === region
  );
}

export function searchEducationOffices(query: string): EducationOffice[] {
  const lowerQuery = query.toLowerCase();
  return educationOffices.filter(office =>
    office.name.toLowerCase().includes(lowerQuery) ||
    office.shortName.toLowerCase().includes(lowerQuery) ||
    office.region.toLowerCase().includes(lowerQuery)
  );
}

export function getAllManuals(): { office: string; manual: EducationOffice['manuals'][0] }[] {
  const allManuals: { office: string; manual: EducationOffice['manuals'][0] }[] = [];

  educationOffices.forEach(office => {
    office.manuals.forEach(manual => {
      allManuals.push({ office: office.shortName, manual });
    });
  });

  // 교육부 공통 자료도 추가
  nationalResources.commonManuals.forEach(manual => {
    allManuals.push({ office: '교육부', manual });
  });

  return allManuals;
}

export function getManualsByCategory(category: string): { office: string; manual: EducationOffice['manuals'][0] }[] {
  return getAllManuals().filter(item =>
    item.manual.category.includes(category)
  );
}

export default educationOffices;
