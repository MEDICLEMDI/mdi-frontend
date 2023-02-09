import { StyleSheet } from 'react-native';

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
    borderWidth: 1,
    borderColor: 'black',
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
    paddingHorizontal: 30,
  },
  menuButton: {
    width: 24,
    height: 24,
  },
  historyTopLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  historySubText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#989898',
  },
  historyList: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 22,
    // position: 'absolute',
    height: '10%',
  },
  emptyHistory: {},
});
