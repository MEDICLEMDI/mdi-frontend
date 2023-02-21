enum Routes {
  // Tabs Screens:
  NFTS = 'NFTs',
  TOKENS = 'Tokens',
  PROFILE = 'Profile',
  EDIT_PROFILE = 'EditProfile',
  SWIPE_LAYOUT = 'SwipeLayout',
  // Service Page
  SERVICE = 'Service',
  DASHBOARD = 'Dashboard',
  HOSPITAL = 'Hospital',
  EVENT = 'Event',
  WALLET = 'Wallet',
  MYPAGE = 'MyPage',
  MYPAGE_SETTINGS = 'MyPageSettings',
  POINT = 'Point',
  RECEIPT = 'Receipt',
  SUBSCRIBE = 'Subscribe',
  CHART = 'Chart',
  MEDICAL_STATE = 'MedicalState',
  FAQ = 'FAQ',
  EXCHANGE = 'Exchange',
  COMMUNITY = 'Community',
  SERVICE_SETTINGS = 'ServiceSettings',
  NOTICE = 'Notice',
  NOTICE_DETAIL = 'NoticeDetail',
  SERVICE_CONTACTS = 'ServiceContacts',
  SERVICE_DOCUMENT = 'ServiceDoc',
  PERSONAL_DOCUMENT = 'PersonalDoc',
  MARKETING = 'Marketing',
  SIGNOUT = 'SignOut',
  // Auth Screens:
  LOGIN = 'Login',
  WELCOME = 'Welcome',
  CREATE_PASSWORD = 'CreatePassword',
  IMPORT_SEED_PHRASE = 'ImportSeedPhrase',
  BACKUP_SEED_PHRASE = 'BackupSeedPhrase',
  //Error Screens:
  CONNECTION_ERROR = 'ConnectionError',
  //Wallet Connect:
  WALLET_CONNECT_INITIAL_CONNECTION = 'WCInitialConnection',
  WALLET_CONNECT_FLOWS = 'WCFlows',
  WALLET_CONNECT_ERROR = 'WCError',

  // Modal Stack:
  MODAL_STACK = 'ModalStack',
  SETTINGS = 'Settings',
  CONTACTS = 'Contacts',
  APPROVED_CANISTERS = 'ApprovedCanisters',
  SEND = 'Send',
  NFT_LIST = 'NFTList',
  NFT_DETAIL = 'NFTDetail',

  // Wallet Screen
  WALLET_WELCOME = 'WalletWelcome',
  WALLET_HOME = 'WalletHome',
  WALLET_CREATE_PASSWORD = 'WalletCreatePassword',
  WALLET_IMPORT = 'WalletImport',
}

export const NATIVE_ROUTES = Object.values(Routes);

export default Routes;
