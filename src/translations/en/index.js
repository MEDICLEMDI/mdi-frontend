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
    address: '주소',
    addressPlaceholder: '주소',
    postCodePlaceholder: '우편번호',
    addressDetailPlaceholder: '상세주소',
    searchInputPlaceHolder: 'Search for hospitals or treatments',

    // Date picker modal
    all: 'All',
    pastYear: '1Year',
    past6month: '6Month',
    past3month: '3Month',
    pastMonth: '1Month',
    pastWeek: '1Week',
  },
  navigation: {
    home: 'Home',
    hospital: 'Hospital',
    event: 'Event',
    wallet: 'Wallet',
    profile: 'Profile'
  },
  header: {
    hospital: 'Hospital',
    event: 'Event',
    wallet: 'Wallet',
    profile: 'My Medicle',
    settings: 'Settings'
  },
  category: {
    dental: 'Dental',
    cosmetic: 'Cosmetic • Beauty',

    implant: 'Implant',
    crown: 'Crown setting',
    cavity: 'Cavity',
    scaling: 'Cleaning',
    denture: 'Denture',
    tmj: 'TMJ',
    whitening: 'Whitening',
    braces: 'Wearing braces',
    laminate: 'Dental laminate',

    skin: 'Skin',
    face: 'Face',
    eyes: 'Eyes',
    nose: 'Nose',
    lip: 'Lip',
    forehead: 'ForeHead',
    chest: 'Chest',
    bodyline: 'Body Line',
    hair1: 'Waxing',
    hair2: 'Hair',
    teeth: 'Teeth',
    ear: 'Ear',
    yzone: 'Y Zone',
    etc: 'ETC'
  },
  menus: {
    point: 'Point',
    receipt: 'Receipt',
    subscribe: 'Subscribe',
    chart: 'Chart',
    medicalState: 'Medical State',
    faq: 'FAQ',
    exchange: 'Exchange',
    community: 'Community',
    settings: 'Settings'
  },
  home: {
    inputPlaceholder: 'Search for hospitals or treatments'
  },
  wallet: {
    transactionHistory: 'Transactions',
    pastYear: 'Past 1 Year',
    welcome: {
      textFirst: 'There is currently no linked wallet',
      textSecond: 'Please create or import a wallet.',
      createButton: 'Create',
      importButton: 'Import',
    },
    create: {
      header: 'Create',
      title: 'Password Setting',
      subTitle: 'Please enter your wallet password.',
      passwordInput: '8~20 letters/numbers/special characters',
      confirmPasswordInput: 'Please enter your password once more.',
      newCreateButton: 'Create',
      importButton: 'Next',
    },
    import: {
      header: 'Import',
      title: 'Import wallet',
      subTitle: 'Please enter 12 secret recovery phrases.',
      mnemonicInput: 'Please enter your secret recovery phrase.',
      importButton: 'Import',
    },
  },
  profile: {
    myPoint: 'My Point',
    editProfile: 'Edit Profile',
  },
  setting: {
    notice: 'Notice',
    contact: 'Contact',
    doc1: 'Medicle Service Document',
    doc2: 'Penal Document',
    marketing: 'Marketing',
    signOut: 'Sign Out',
    language: 'Language Change'
  },
  option: {
    changeLang: 'Change Language'
  },
  comingSoon: 'Coming Soon',
  errorMessage: {
    unknownError: '*An error has occurred. Please try again.',
    nmemonicError: '*Syntax mismatch. Please enter again.',
    passwordConfirmError: '*Passwords do not match. Please enter again.',
    passwordValidError: '*Please enter 8 to 20 characters with a mixture of English/number/special characters.',
  },
};

export default translations;
