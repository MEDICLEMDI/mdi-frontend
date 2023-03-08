import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import alert from '@/redux/slices/alert';
import { BACKEND_CANISTER_ID } from '@/config/index';

export default StyleSheet.create({
  homeContainer: { flex: 1 },
  cardContainer: {
    paddingHorizontal: 30,
    // backgroundColor: 'red',
    height: Dimensions.get('window').height * 0.245,
    maxHeight: 1067 * 0.245,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  mdiLogo: {
    width: 22,
    height: 15,
  },
  cardTopLayer: {},
  cardMiddleLayer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBottomLayer: {
    marginTop: 15,
    marginBottom: 5,
  },
  referralText: {
    color: Colors.Medicle.Font.Brown.Dark,
    fontSize: 13,
    fontWeight: '400',
  },
  mdiText: {
    color: Colors.Medicle.Font.Brown.Light,
    fontWeight: '700',
    fontSize: 25,
    marginLeft: 5,
  },
  walletTitleText: {
    color: Colors.Medicle.Font.Brown.Dark,
    fontWeight: '400',
    fontSize: 13,
  },
  walletBottomLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  walletContentsText: {
    color: Colors.Medicle.Font.Brown.Dark,
    fontWeight: '400',
    fontSize: 13,
    marginTop: 3,
  },
  copyIcon: {
    height: 18,
    width: 18,
  },
  authContainer: {
    marginHorizontal: 30,
    marginTop: 20,
    // backgroundColor: 'orange',
  },
  authStatus: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Medicle.Font.Gray.Dark,
  },
  identityBox: {
    marginTop: 20,
    paddingHorizontal: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
  },
  phoneBox: {
    marginTop: 10,
    paddingHorizontal: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
  },
  authImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  shadowBoxCommon: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadowInnerCommon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    marginHorizontal: 30,
  },
  bottomBox: {
    height: 181,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 3,
    alignItems: 'center',
  },
  userId: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.Medicle.Font.Brown.Dark,
  },
  mdiAmount: {
    fontWeight: '400',
    fontSize: 18,
    color: Colors.Medicle.Font.Brown.Dark,
  },
  waveImage: {
    width: 10,
    height: 10,
    marginRight: 4,
  },
  mdiKrwAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.Medicle.Font.Brown.Light,
  },
  sendButton: {
    height: 35,
    borderRadius: 10,
    marginTop: 20,
  },
  sendButtonText: {
    color: Colors.Medicle.Font.Gray.Dark,
    fontWeight: '500',
    fontSize: 12,
  },
});
