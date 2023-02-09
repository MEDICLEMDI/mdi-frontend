import { getNumberFormatSettings } from 'react-native-localize';

import { ACTIVITY_STATUS } from '@/constants/business';
import { ERROR_TYPES, MIN_PASSWORD_LENGTH } from '@/constants/general';
import Routes from '@/navigation/Routes';

const { decimalSeparator } = getNumberFormatSettings();

const translations = {
  common: {
    back: 'Back',
    cancel: 'Cancel',
    change: 'Change',
    close: 'Close',
    collectibles: 'Collectibles',
    comingSoon: 'Coming Soon!',
    continue: 'Continue',
    deposit: 'Deposit',
    more: 'More',
    or: 'Or',
    pluggedInto: 'Plugged into {{name}}',
    send: 'Send',
    swap: 'Swap',
    tokens: 'Tokens',
    biometricSignIn: 'Sign in with biometrics?',
    copied: 'Copied!',
    copyClipboard: 'Copy to clipboard',
    revealPhrase: 'Reveal Seed Phrase',
    available: 'available',
    max: 'Max',
    questionMark: '?',
    the: 'The',
    enterPassword: 'Enter Password',
    importWallet: 'Import Wallet',
    learnMore: 'Learn More',
  },
  routes: {
    [Routes.NFTS]: 'Collectibles',
    [Routes.TOKENS]: 'Tokens',
    [Routes.PROFILE]: 'Profile',
    [Routes.SETTINGS]: 'Settings',
    [Routes.CONTACTS]: 'Contacts',
    [Routes.APPROVED_CANISTERS]: 'Approved Canisters',
    [Routes.SEND]: 'Send',
  },
  welcome: {
    title: 'Welcome to Medicle',
    initTitle: 'Choose an option',
    create: 'Create Wallet',
    createNew: 'Create New Wallet',
    importNew: 'Import New Wallet',
  },
  login: {
    submit: 'Submit',
    unlock: 'Unlock Medicle',
    signInBiometric: 'Sign in with biometrics',
    moreOptions: 'More options',
  },
  importSeedPhrase: {
    enterPhrase: 'Please enter your 12 word Secret Recovery Phrase.',
    secretPhrase: 'Secret Recovery Phrase',
    notFound: 'Recovery phrase not found',
  },
  createPassword: {
    title: 'Create Password',
    subtitle: 'Please create a secure password that you will remember.',
  },
  backupSeed: {
    title: 'Seed Phrase Backup',
    subtitle: 'Below is the seed phrase for your new wallet, write it down.',
    confirm: "I've saved these words",
  },
  deposit: {
    title: 'Deposit',
    principalIdDesc:
      "Use when receiving from Plug accounts & users, or other apps that support sending directly to Principal ID's.",
    accountIdDesc:
      "Use when receiving from exchanges, or other apps that only support sending to Accounts ID's.",
  },
  send: {
    title: 'Send',
    inputLabel: 'To:',
    inputPlaceholder: 'Name or address',
    enterAmount: 'Enter an Amount',
    noFunds: 'Insufficient Funds',
    reviewSend: 'Review Send',
    contact: 'Contact',
    enterPassword: 'Enter your password',
    contacts: 'Contacts',
    noPriceAvailable: 'No price available for {{token}}',
  },
  transactionTypes: {
    swap: 'Swap',
    swapFor: 'Swap {{from}} for {{to}}',
    buyNTF: 'Buy NFT',
    listNFT: 'List NFT',
    cancelListingNFT: 'Cancel NFT Listing',
    makeOfferNFT: 'Make Offer',
    acceptOfferNFT: 'Accept Offer',
    cancelOfferNFT: 'Cancel Offer',
    denyOfferNFT: 'Deny Offer',
    transfer: 'Transfer',
    send: 'Send',
  },
  reviewSend: {
    to: 'To',
    saveContact: 'Save as contact',
    goToActivity: 'View in Activity',
    holdToSend: 'Hold to Send',
    holdToRetry: 'Hold to Retry',
    totalFee: 'Total Fee: {{value}}',
    transactionSuccess: 'Confirmed',
    transactionError: 'Transaction Failed',
    transactionPending: 'Review Send',
  },
  saveContact: {
    title: 'Save Contact',
    namePlaceholder: 'Name',
  },
  tokensTab: {
    tokenActions: {
      send: 'Send',
      copy: 'Copy ID',
      delete: 'Delete',
    },
    deleteTitle: 'Delete Token',
    deleteAction: 'Delete',
    deleteMessage: 'Would you like to delete {{token}} from your token list?',
  },
  nftTab: {
    emptyTitle: "You don't own any Collectibles yet",
    emptySubtitle:
      "When you do, they'll show here, where you will see their traits and send them.",
    items: '{{count}} item',
    items_plural: '{{count}} items',
  },
  nftDetail: {
    collectionTitle: '🧩 Collection',
    descriptionTitle: '📝 Description',
    attributesTitle: '🎛 Attributes',
    moreTitle: 'More Options',
    manage: 'Manage',
    moreOptions: {
      view: 'View',
      download: 'Download',
    },
  },
  activity: {
    details: {
      title: 'Activity Detail',
      trxType: 'Transaction Type:',
      from: 'From:',
      to: 'To:',
      you: ' (you)',
      copied: 'Address copied in clipboard',
    },
    [ACTIVITY_STATUS.COMPLETED]: 'Completed',
    [ACTIVITY_STATUS.PENDING]: 'Pending',
    [ACTIVITY_STATUS.REVERTED]: 'Failed',
    title: 'Activity',
    subtitleTo: ' · To: {{value}}',
    subtitleFrom: ' · From: {{value}}',
    emptyTitle: 'You have no activity yet',
    emptySubtitle:
      "When you do, they'll show here, where you will see their traits and send them.",
  },
  settings: {
    title: 'Settings',
    items: {
      contacts: { name: 'Contacts', desc: 'Add, edit, remove contacts.' },
      phrase: { name: 'Seed Phrase', desc: 'View your seed phrase & backup.' },
      biometric: {
        name: 'Biometric Unlock',
        desc: 'Turn Biometrics on or off.',
      },
      lock: { name: 'Lock Account', desc: 'Lock your account and sign out.' },
      connectedApps: {
        name: 'Connected Apps',
        desc: 'View your connected apps.',
      },
      exportPem: {
        name: 'Export DFX Identity',
        desc: 'Get a PEM file to use in DFX.',
      },
    },
    version: 'v{{version}}({{build}})',
    infoItems: {
      docs: '📕  Learn more about Plug',
      blog: '📰  Read our Blog',
      twitter: '🐦  Follow us on Twitter',
      discord: '👾  Join our Discord',
      delete: '🗑  Delete Wallet',
    },
  },
  accounts: {
    title: 'Accounts',
    createImportAccount: 'Create/Import Account',
    moreOptions: {
      edit: 'Edit Account',
      addIcns: 'Add ICNS Domain',
      changeIcns: 'Change ICNS Domain',
      copy: 'Copy Address',
      removeAccount: 'Remove Account',
    },
    icns: {
      setICNS: 'Choose ICNS Name',
      none: 'None',
      emptyState:
        'We weren’t able to find any ICNS names in your Plug account. ',
      buyICNS: 'Buy an ICNS name',
      proceed: ' to proceed.',
      info: 'By choosing an ICNS name, it will be set to your Principal ID for this account, and also set your reverse-resolution to the selected ICNS name. ',
    },
    removeAccountMessage:
      'Are you sure you want to remove {{accountName}} from your account list? \nYou can always add the wallet back by importing it again.',
    setEmoji: 'Set Emoji',
    editEmoji: 'Edit emoji',
    editButton: '👈 Edit',
    accountNamePlaceholder: 'Account name',
    edit: 'Edit Account',
    create: 'Create Account',
    errorImport: {
      title: 'Error Importing Account',
      message:
        'There was an error while importing the account. Please try again.',
    },
  },
  contacts: {
    title: 'Contacts',
    addContact: 'Add contact',
    editContact: 'Edit contact',
    emptyState: {
      title: 'Empty Contact List',
      message:
        'You don’t have any contacts yet. Invite your friends to send tokens, collectibles, and more.',
    },
    moreOptions: {
      edit: 'Edit Contact',
      copy: 'Copy Address',
      delete: 'Delete Contact',
    },
    namePlaceholder: 'Name',
    idPlaceholder: 'Principal, Account ID or ICNS name',
    nameTaken: 'Name is already taken!',
    unresolvedICNS: 'Unable to resolve ICNS name',
    contactAlreadySaved: 'Contact already saved as {{value}}',
  },
  connectedApps: {
    viewDetail: 'View Details',
    deleteConnection: 'Delete Connection',
    approvedCanisters: 'Approved Canisters',
    emptyState: 'No apps connected yet',
  },
  placeholders: {
    amount: `0${decimalSeparator}00`,
    contactDescription: 'contact description',
  },
  validations: {
    passRequired: 'Password is required.',
    passMinLength: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    passIncorrect: 'The password is incorrect',
    invalidChar: 'Invalid character.',
  },
  errors: {
    [ERROR_TYPES.FETCH_ERROR]: {
      emoji: '🤔',
      title: 'We had an issue',
      description:
        'We are unable to surface your account info due to an error.',
      buttonTitle: 'Refresh',
    },
    [ERROR_TYPES.CONNECTION_ERROR]: {
      emoji: '📡',
      title: 'Internet Connection Error',
      description:
        'We are unable to surface your account info due to an internet connection error.',
      buttonTitle: 'Retry Connection',
    },
    [ERROR_TYPES.ERROR_BOUNDARY]: {
      emoji: '😨',
      title: 'Oops, we had an issue!',
      description:
        // 'Close and reopen the app to try again. If the issue persists, contact our team on Discord.',
        'Close and reopen the app to try again.',
      buttonTitle: '👾 Join Discord',
    },
  },
  addToken: {
    title: 'Add Token',
    reviewTitle: 'Review Token',
    customTokenTitle: 'Custom Token',
    availableTokens: 'Available Tokens',
    search: 'Search Tokens',
    searchResults: 'Search Results',
    noResults: 'No search results found.',
    addCustomToken: 'Add custom token',
    balanceError: 'Failed to fetch balance',
    addError: 'Failed to add custom token',
    addButton: 'Add Token',
    safetyAlert:
      'Token Safety Alert: For your security, make sure to do proper research before interacting with any token.',
    customTokenId: 'Token Canister ID',
    customTokenStandard: "Token's Interface Standard",
    customCaption: 'This allows tokens to be used by Plug',
    dabCaption:
      'Helping improve dicoverability, reputation, and trust in IC tokens.',
    invalidInterfaceTokenError:
      'Invalid token’s standard. Select a valid option for the current canister ID.',
    invalidCanisterTokenError: 'Invalid Canister ID.',
    nftTokenError: 'Custom non-fungible tokens are not supported yet.',
    poweredByDab: 'POWERED BY DAB',
  },
  walletConnect: {
    changeWallet: 'Change Wallet',
    decline: 'Decline',
    allow: 'Allow',
    confirm: 'Confirm',
    connect: 'Connect',
    connectTitle: 'Connect Wallet',
    connectTo: 'Would you like to connect your wallet to ',
    cannisterPermission: 'wants pemission to use these canisters:',
    actionsPermission: {
      one: 'wants pemission to perform the\nfollowing action:',
      several: 'wants pemission to perform the\nfollowing actions:',
    },
    transaction: 'Transaction',
    request: 'Request',
    balance: 'Balance',
    wallet: 'Wallet',
    startAgain: 'Start Again',
    timeOutTitle: 'The connection has timed out',
    timeOutSubtitle: 'took to long to respond',
    unsafeDappName: 'Unknown DApp',
    unknown: 'Unknown',
    unknownArguments: 'Unknown arguments',
  },
  deleteWallet: {
    title: 'Delete Wallet',
    question:
      'Are you sure you want to remove all wallet related data from your device?',
    description:
      'You can always recover your accounts through your Secret recovery Phrase given that your accounts exists on the blockchain.',
    action: 'Delete Wallet',
  },
  createImportAccount: {
    importKey: 'Private Key',
    importPem: 'PEM File',
    create: 'Create',
    invalidKey: 'Invalid key. Please, try again.',
    alreadyImported: 'This account is already imported',
    importError:
      'There was an error while importing the account. Please try again.',
  },
  exportPem: {
    safeCheck: 'I’ll be safe with my DFX Identity.',
    downloadPem: 'Download PEM file',
    error: {
      title: 'Error Exporting Account',
      message:
        'There was an error while exporting the account. Please try again.',
    },
    permissionError: {
      title: 'Error Exporting Account',
      message: 'You need to allow the app to access storage to save the file.',
    },
    success: {
      title: 'Account Successfully Exported',
      messageIos: 'Your .pem file should be located at the choosen directory.',
      messageAndroid: 'Your .pem file should be located at Downloads folder.',
    },
    selectAccount:
      "Select the account you would like to export it's DFX Identity.",
  },
  addCollection: {
    customCollectionId: 'Collection Canister ID',
    customCollectionStandard: 'Collection Interface Standard',
    customCollection: 'Custom Collection',
    customCaption: 'This allows Collectibles to be used by Plug',
    title: 'Add Collection',
    noName: 'Unable to load name',
    invalidCanisterId: 'Invalid canister ID. ',
    canisterNotCompatible:
      'Canister Id not compatible with {{standard}}. Please, try again.',
    safetyAlert:
      'Collection Safety Alert: For your security, make sure to do proper research before interacting with any Collections.',
    errorToastTitle: 'Error Adding Custom Collection',
    errorToastMessage:
      'There was an unexpected error while trying to add a custom collection. Please try again later.',
    infoToastTitle: 'Custom Collection Already Added',
    infoToastMessage:
      'You’ve added this collection before. Remember, you need to own items from {{name}} to be able to access it.',
    successToastTitle: 'Custom Collection Successfully Added',
    successToastMessage:
      'You’ll only be able to access the collection if own items from it.',
    unknownCollection: 'unknown collection',
  },
  input: {
    name: '성함',
    namePlaceholder: '성함을 입력해주세요.',
    company: '회사명',
    companyPlaceholder: '회사명을 입력해주세요.',
    phone: '연락처',
    phonePlaceholder: '010-1234-5678',
    comment: '요청하상',
    commentPlaceholder: '업체에 요청하실 내용을 작성해주세요.',
    contact: '문의하기',
  },
  navigation: {
    home: '홈',
    hospital: '병원',
    event: '이벤트',
    wallet: '지갑',
    profile: '마이페이지'
  },
  header: {
    hospital: '병원',
    event: '이벤트',
    wallet: '지갑',
    profile: 'My 메디클',
    settings: '환경설정'
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
    etc: '기타'
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
    settings: '환경설정'
  },
  home: {
    inputPlaceholder: '궁금한 시술, 병원 이름을 검색해주세요.'
  },
  wallet: {
    transactionHistory: '거래내역',
    pastYear: '최근 1년'
  },
  profile: {
    myPoint: '내 포인트',
    editProfile: '내 정보 수정하기'
  },
  setting: {
    notice: '공지사항',
    contact: '제휴 문의',
    doc1: '메디클 서비스 이용약관',
    doc2: '개인정보 처리방침',
    marketing: '마케팅 정보 수신',
    signOut: '회원 탈퇴',
    language: '언어 설정'
  },
  option: {
    changeLang: '언어 변경'
  },
  comingSoon: '해당 서비스는 아직 준비중이에요.',
  errorMessage: {
    unknownError: '*오류가 발생하였습니다, 나중에 다시 시도해주세요.',
    nmemonicError: '*구문이 일치하지 않습니다. 다시 입력해주세요.',
    passwordConfirmError: '*비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
    passwordValidError: '*영문/숫자/특수문자 혼합 8~20자로 입력해주세요.',
  },
};

export default translations;
