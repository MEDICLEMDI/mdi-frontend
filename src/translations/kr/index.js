import { getNumberFormatSettings } from 'react-native-localize';

import { ACTIVITY_STATUS } from '@/constants/business';
import { ERROR_TYPES, MIN_PASSWORD_LENGTH } from '@/constants/general';
import Routes from '@/navigation/Routes';

const { decimalSeparator } = getNumberFormatSettings();

const translations = {
  input: {
    // Service Contact Inputs
    name: '성함',
    namePlaceholder: '성함을 입력해주세요.',
    company: '회사명',
    companyPlaceholder: '회사명을 입력해주세요.',
    phone: '휴대폰 번호',
    phonePlaceholder: '010-1234-5678',
    comment: '요청사항',
    commentPlaceholder: '업체에 요청하실 내용을 작성해주세요.',
    contact: '문의하기',
    agreementDescription: '회원 본인은 문의 및 예약 확인데 동의합니다.',
    doc1: '개인정보 수집 및 이용동의',
    doc2: '개인정보 제 3자 제공동의',
    detail: '자세히',
    confirm: '문의하기',

    // Edit Profile Inputs
    password: '비밀번호',
    resetPasswordPlaceholder: '현재 비밀번호를 입력해주세요',
    resetPasswordConfirmPlaceholder: '새 비밀번호를 입력해주세요. (영문/숫자/특수문자 혼합 8~20자)',
    address: 'Address',
    addressPlaceholder: 'address',
    postCodePlaceholder: 'pose code',
    addressDetailPlaceholder: 'detail address',

    // Home search input
    searchInputPlaceHolder: 'Search for hospitals or treatments',

    // Date picker modal
    all: '전체',
    pastYear: '1년',
    past6month: '6개월',
    past3month: '3개월',
    pastMonth: '1개월',
    pastWeek: '1주일',
  },
  errorMessage: {
    unknownError: '*오류가 발생하였습니다, 나중에 다시 시도해주세요.',
    nmemonicError: '*구문이 일치하지 않습니다. 다시 입력해주세요.',
    passwordConfirmError: '*비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
    passwordValidError: '*영문/숫자/특수문자 혼합 8~20자로 입력해주세요.',
    invalidNumberMessage: '*인증번호가 일치하지 않습니다. 다시 입력해주세요.',
  },
  navigation: {
    home: '홈',
    hospital: '병원',
    reserve: '예약하기',
    medicalInquire: '진료 문의하기',
    event: '이벤트',
    wallet: '지갑',
    setting: '설정',
    secure: '보안 정보',
    send: '보내기',
    receive: '받기',
    importWallet: '불러오기',
    profile: '마이페이지',
  },
  header: {
    hospital: '병원',
    event: '이벤트',
    wallet: '지갑',
    profile: 'My 메디클',
    settings: '환경설정',
    editProfile: '내 정보 수정',
  },
  category: {
    dental: '치과',
    cosmetic: '성형외과 • 피부과',
    implant: '임플란트',
    crown: '크라운 보철',
    cavity: '충치',
    scaling: '스케일링',
    denture: '틀니보철',
    tmj: '턱관절 치료',
    whitening: '치아미백',
    braces: '치아교정',
    laminate: '라미네이트',
    skin: '피부',
    face: '얼굴형',
    eyes: '눈',
    nose: '코',
    lip: '입술',
    forehead: '이마',
    chest: '가슴',
    bodyline: '바디라인',
    hair1: '털/제모/눈썹',
    hair2: '머리/헤어',
    teeth: '치아',
    ear: '귀',
    yzone: 'Y존',
    etc: '기타',
  },
  menus: {
    point: '포인트',
    receipt: '결제목록',
    subscribe: '관심상품',
    chart: '진료내역',
    medicalState: '진료현황',
    faq: '고객센터',
    exchange: '거래소',
    community: '커뮤니티',
    settings: '환경설정',
  },
  home: {
    inputPlaceholder: '궁금한 시술, 병원 이름을 검색해주세요.',
  },
  wallet: {
    pastYear: '최근 1년',
    welcome: {
      textFirst: '현재 연결 된 지갑이 없습니다.',
      textSecond: '지갑을 생성하거나 연결해주세요.',
      createButton: '지갑 생성하기',
      importButton: '지갑 불러오기',
    },
    create: {
      header: '생성하기',
      title: '비밀번호 설정',
      subTitle: '지갑 비밀번호를 입력해주세요.',
      passwordInput: '영문/숫자/특수문자 혼합 8~20자',
      confirmPasswordInput: '비밀번호를 한번 더 입력해주세요.',
      newCreateButton: '생성하기',
      importButton: '다음',
    },
    import: {
      header: '불러오기',
      title: '지갑 불러오기',
      subTitle: '12개의 비밀 복구 구문을 입력해주세요.',
      mnemonicInput: '비밀 복구 구문을 입력해주세요.',
      importButton: '불러오기',
    },
    home: {
      transactionHistory: '거래내역',
      emptyHistory: '거래 내역이 없습니다.',
    },
  },
  profile: {
    myPoint: '내 포인트',
    editProfile: '내 정보 수정하기',
  },
  setting: {
    notice: '공지사항',
    contact: '제휴 문의',
    document: '이용약관',
    doc1: '메디클 서비스 이용약관',
    doc2: '개인정보 처리방침',
    marketing: '마케팅 정보 수신',
    signOut: '회원 탈퇴',
    language: '언어 설정',
  },
  option: {
    changeLang: '언어 변경',
  },
};

export default translations;
