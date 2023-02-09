import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
  cardContainer: {
    marginTop: 17,
  },
  card: {
    height: 150,
    padding: 25,
  },
  cardTopLayer: {
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftLayer: {
    borderWidth: 1,
    borderColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightLayer: {
    // borderWidth: 1,
    // borderColor: 'orange',
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
    borderWidth: 1,
    borderColor: 'black',
    height: 48,
    justifyContent: 'center'
  },
  mdiBalanceText: {
    color: '#706148',
    fontSize: 25,
    fontWeight: '700',
  }
});
