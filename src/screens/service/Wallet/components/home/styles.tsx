import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  cardContainer: {
    marginTop: 17,
    paddingHorizontal: 30,
  },
  card: {
    height: 150,
    padding: 25,
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
    color: '#443927',
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
    color: '#706148',
    fontSize: 25,
    fontWeight: '700',
  },
  cardBottomLayer: {
    marginTop: 10,
    height: 23,
    flexDirection: 'row',
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
    color: '#FFFFFF',
  },
  refreshButton: {
    height: 23,
    width: 23,
    marginLeft: 10,
  },
  historyContainer: {
    marginTop: 30,
    flex: 1,
  },
  menuButton: {
    width: 24,
    height: 24,
  },
  historyTopLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  historySubText: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.Medicle.Gray.Standard,
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
    marginTop: 10,
  },
  emptyText: {
    color: '#333333',
    fontWeight: '400',
    fontSize: 14,
  },
  flatList: {
    // paddingTop: 10,
    // borderWidth: 1,
    // borderColor: 'red',
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
    color: '#443927',
  },
  historyCardBottomLayer: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'flex-end',
  },
  trasactionBal: {
    color: '#443927',
    fontWeight: '700',
    fontSize: 20,
  },
  moreButtonLayer: {
    paddingHorizontal: 30,
  },
  moreButton: {
    backgroundColor: '#E7E1D5',
    height: 40,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  moreButtonText: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 14,
  },
});
