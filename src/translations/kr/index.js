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
    resetPasswordConfirmPlaceholder:
      '새 비밀번호를 입력해주세요. (영문/숫자/특수문자 혼합 8~20자)',
    address: '주소',
    addressPlaceholder: '주소',
    postCodePlaceholder: '우편번호',
    addressDetailPlaceholder: '상세주소',

    // Home search input
    searchInputPlaceHolder: '궁금한 시술, 병원 이름을 검색해주세요.',

    // Date picker modal
    all: '전체',
    pastYear: '1년',
    past6month: '6개월',
    past3month: '3개월',
    pastMonth: '1개월',
    pastWeek: '1주일',
  },
  button: {
    change: '변경',
    addressChange: '주소 변경',
    submit: '입력완료',
    goHome: '홈으로',
    cancel: '취소',
    send: '보내기',
    deleteWallet: '지갑 삭제',
    next: '다음',
  },
  toast: {
    copy: '복사완료',
  },
  errorMessage: {
    E001: '*오류가 발생하였습니다, 나중에 다시 시도해주세요.',
    nmemonicError: '*구문이 일치하지 않습니다. 다시 입력해주세요.',
    passwordConfirmError: '*비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
    passwordShortError: '*비밀번호가 일치하지 않습니다.',
    passwordValidError: '*영문/숫자/특수문자 혼합 8~20자로 입력해주세요.',
    invalidNumberMessage: '*인증번호가 일치하지 않습니다. 다시 입력해주세요.',
    overError: '*니모닉 문구는 12개의 단어 입니다.',
    feeOverError: '*수수료 합산시 보유수량을 초과합니다.',
    addressError: '*유효하지 않은 주소입니다.',
    principalVaildError: '*지갑주소는 63자리 입니다.',
    amountZeroError: '*0 이상의 수량을 입력하여 주세요.',
    amountOverError: '*보유 MDI보다 많은 수량을 전송할 수 없습니다.',
    amountVaildError: '*정확한 수량을 입력하여 주세요.',
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
    send: '보내기',
    walletSettings: '설정',
    securityWallet: '보안 정보',
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
  wallet: {
    mdi: 'MDI',
    walletAddress: '지갑주소',
    pastYear: '최근 1년',
    krw: 'KRW',
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
    info: {
      referralCode: '나의 추천인 코드',
      authStatus: '인증 상태',
      identityVerify: '본인 인증',
      phoneVerify: '핸드폰 인증',
      id: '아이디',
      balance: '보유 MDI',
      send: '보내기',
    },
    send: {
      transferRequest: '전송이 요청되었습니다.',
      balance: '보유 MDI',
      receiverInput: '보낼 주소를 입력해 주세요.',
      amountInput: '보낼 수량을 입력해 주세요.',
      all: '전액',
      total: 'TOTAL',
      totalInput: '수수료가 포함된 최종 수량입니다.',
      modalTitle: '보내기',
      modalReceiver: '보낼 주소',
      modalAmount: '보내는 수량',
    },
    setting: {
      walletSetting: '지갑 설정',
      walletInfo: '지갑 정보',
      balance: '보유 MDI',
      securityInfo: '보안 정보',
      nmemonicDisclosure: '비밀 복구 구문 공개',
      deleteWallet: '지갑 삭제하기',
      deleteWalletCheck: '지갑을 삭제하시겠습니까?',
      password: '비밀번호를 입력해주세요',
    },
    nmemonic: {
      title: '비밀 복구 구문 공개',
      subTitle: `계정을 연결하려면 이 비밀 복구 구문이 필요합니다.\n기밀이 보장된안전한 곳에 보관하세요.`,
      warningText: `이 구문은 누구와도 공유하지 마세요!\n이 구문은 계정 전체를 도용하는데 사용 될 수 있습니다.`,
      continue: '계속하려면 암호 입력',
      password: '암호를 입력해주세요.',
      nmemonicDisclosure: '비공개 비밀 복구 구문',
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
  toastMessage: {
    copy: '복사완료',
  },
};

export default translations;
