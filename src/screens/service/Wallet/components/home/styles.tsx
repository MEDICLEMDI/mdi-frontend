import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 30,
    height: Dimensions.get('window').height * 0.245,
    maxHeight: 1067 * 0.245,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTopLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftLayer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightLayer: {
    justifyContent: 'center',
  },
  mdiLogo: {
    width: 22,
    height: 15,
  },
  mdiTitleText: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.Medicle.Font.Brown.Dark,
    marginLeft: 7,
  },
  settingIcon: {
    width: 18,
    height: 18,
  },
  cardMiddleLayer: {
    height: 48,
    justifyContent: 'center',
  },
  mdiBalanceText: {
    color: Colors.Medicle.Font.Brown.Light,
    fontSize: 25,
    fontWeight: '700',
  },
  cardBottomLayer: {
    marginTop: 10,
    height: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  krwBalanceLayer: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    minWidth: 70,
  },
  krwBalance: {
    color: Colors.Medicle.Font.White,
  },
  refreshButton: {
    height: 23,
    width: 23,
    marginLeft: 10,
  },
  historyContainer: {
    marginTop: 20,
    flex: 2,
  },
  menuButton: {
    width: 24,
    height: 24,
  },
  historyTopLayer: {
    paddingHorizontal: 30,
  },
  emptyHistory: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  homeContainer: {
    flex: 1,
  },
  historyList: {
    flex: 1,
  },
  emptyText: {
    color: Colors.Medicle.Font.Gray.Dark,
    fontWeight: '400',
    fontSize: 14,
  },
  flatList: {
    width: '100%',
  },
  historyCard: {
    marginTop: 10,
    height: 120,
    borderRadius: 10,
    marginLeft: 30,
  },
  historyCardTopLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trasactionDate: {
    color: Colors.Medicle.Gray.Standard,
    fontSize: 12,
    fontWeight: '400',
  },
  trasactionType: {
    color: Colors.Medicle.Gray.Standard,
    fontSize: 12,
    fontWeight: '400',
  },
  historyCardMiddleLayer: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
  },
  trasactionTxID: {
    color: Colors.Medicle.Font.Brown.Dark,
  },
  historyCardBottomLayer: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'flex-end',
  },
  trasactionBal: {
    color: Colors.Medicle.Font.Brown.Dark,
    fontWeight: '700',
    fontSize: 20,
  },
  moreButtonLayer: {
    paddingHorizontal: 30,
  },
  moreButton: {
    backgroundColor: Colors.Medicle.Primary,
    height: 40,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  moreButtonText: {
    color: Colors.Medicle.Font.Gray.Dark,
    fontWeight: '500',
    fontSize: 14,
  },
});
