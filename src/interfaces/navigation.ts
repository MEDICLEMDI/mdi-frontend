import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import Routes from '@/navigation/Routes';

export type RootStackParamList = {
  [Routes.NFTS]: undefined;
  [Routes.TOKENS]: undefined;
  [Routes.PROFILE]: undefined;
  [Routes.EDIT_PROFILE]: undefined;
  [Routes.EDIT_PASSWORD]: undefined;
  [Routes.EDIT_PHONE]: undefined;
  [Routes.EDIT_ADDRESS]: undefined;
  [Routes.SWIPE_LAYOUT]: undefined;
  [Routes.LOGIN]: { manualLock: boolean };
  [Routes.WELCOME]: undefined;
  [Routes.CREATE_PASSWORD]: { flow: 'create' | 'import' };
  [Routes.IMPORT_SEED_PHRASE]: {
    password: string;
    shouldSaveBiometrics: boolean;
  };
  [Routes.SOCIAL]: undefined;
  [Routes.SIGNIN]: undefined;
  [Routes.SIGNUP]: undefined;
  [Routes.SOCIALSIGNUP]: {type: string, email: string, user_id: string};
  [Routes.FINDACCOUNT]: undefined;
  // [Routes.IDCHECK]: undefined;
  // [Routes.PASSWORDCHECK]: undefined;
  [Routes.DASHBOARD]: undefined;
  [Routes.SERVICE]: undefined;
  [Routes.BACKUP_SEED_PHRASE]: { mnemonic: string };
  [Routes.CONNECTION_ERROR]: undefined;
  // [Routes.WALLET_CONNECT_INITIAL_CONNECTION]: WalletConnectCallRequest;
  // [Routes.WALLET_CONNECT_FLOWS]: undefined;
  // [Routes.WALLET_CONNECT_ERROR]: { dappName: string; dappUrl: string };
  // [Routes.MODAL_STACK]: NavigatorScreenParams<ModalStackParamList>;

  [Routes.MYPAGE]: undefined;
  [Routes.MYPAGE_SETTINGS]: undefined;
  [Routes.POINT]: undefined;
  [Routes.POINT_CHARGE]: undefined;
  [Routes.HOSPITAL]: undefined;
  [Routes.HOSPITAL_DETAIL]: { id: number };
  [Routes.PRODUCT_DETAIL]: { id: number };
  [Routes.PRODUCT]: { groupId: number };
  [Routes.PRODUCT_PAYMENT]: { itemData: any };
  [Routes.PRODUCT_CONTACT]: { itemData: any };
  [Routes.RECEIPT]: undefined;
  [Routes.SUBSCRIBE]: undefined;
  [Routes.CHART]: undefined;
  [Routes.CHART_DETAIL]: { id: string }; // add item id
  [Routes.QA_DETAIL]: { id: string }; // add item id
  [Routes.MEDICAL_STATE]: undefined;
  [Routes.MEDICAL_STATE_DETAIL]: undefined; // add item id
  [Routes.REVIEW]: { company_id: number, appointment_id: number, product_id: number, user_id: number }; // add item id
  [Routes.FAQ]: undefined;
  [Routes.EXCHANGE]: undefined;
  [Routes.COMMUNITY]: undefined;
  [Routes.SERVICE_SETTINGS]: undefined;
  [Routes.WALLET]: undefined;
  [Routes.SEND]: undefined;
  [Routes.TRANSACTION]: undefined;
  [Routes.NOTICE]: undefined;
  [Routes.NOTICE_DETAIL]: { title: string; content: string };
  [Routes.SERVICE_CONTACTS]: undefined;
  // about wallet screens
  // [Routes.WALLET_WELCOME]: undefined;
  // [Routes.WALLET_HOME]: undefined;
  // [Routes.WALLET_CREATE_PASSWORD]: { flow: 'create' | 'import' };
  // [Routes.WALLET_IMPORT]: { password: string };
  // [Routes.WALLET_SETTING]: undefined;
  // [Routes.WALLET_MNEMONIC]: undefined;
  // [Routes.WALLET_SEND]: undefined;
  // [Routes.WALLET_INFO]: undefined;
  // [Routes.HANDLE_TEST]: undefined;
  [Routes.SERVICE_DOCUMENT]: undefined;
  // [Routes.PERSONAL_DOCUMENT]: undefined;
  [Routes.MARKETING]: undefined;
  [Routes.SIGNOUT]: undefined;
  [Routes.LOGOUT]: undefined;
};

export type ServiceTabParamList = {
  [Routes.DASHBOARD]: undefined;
  [Routes.HOSPITAL]: undefined;
  [Routes.EVENT]: { eventId: number };
  [Routes.WALLET]: undefined;
  [Routes.MYPAGE]: undefined;
};

// export type ModalStackParamList = {
//   [Routes.SETTINGS]: undefined;
//   [Routes.CONTACTS]: undefined;
//   [Routes.APPROVED_CANISTERS]: { app: ConnectedApp };
//   [Routes.SEND]: { token?: Asset; nft?: CollectionToken };
//   [Routes.NFT_LIST]: { canisterId: string };
//   [Routes.NFT_DETAIL]: {
//     canisterId: string;
//     index: string | number;
//     showBack?: boolean;
//   };
// };

export type ServiceScreenProps<T extends keyof ServiceTabParamList> =
  BottomTabScreenProps<ServiceTabParamList, T>;

export type RootScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// export type ModalScreenProps<T extends keyof ModalStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<ModalStackParamList, T>,
//     RootScreenProps<keyof RootStackParamList>
//   >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface ServiceParamList extends ServiceTabParamList {}
  }
}
