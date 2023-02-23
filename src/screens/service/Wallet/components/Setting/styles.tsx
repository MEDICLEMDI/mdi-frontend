import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: 30,
    width: Dimensions.get('window').width - 60,
    maxWidth: 420,
  },
  titleContainer: {
    marginTop: 20,
    height: 27,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  menuContainer: {
    // backgroundColor: 'green',
    height: '100%',
    paddingTop: 22,
  },
  animatedTitleBoxText: {
    fontWeight: '700',
    fontSize: 17,
    color: '#333333',
  },
  content: {
    justifyContent: 'space-around',
    bottom: 5,
  },
  contentText: {
    fontSize: 18,
  },
  walletInfo: {
    paddingHorizontal: 20,
  },
  animatedTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 57,
    alignItems: 'center',
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  profileWrap: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
  },
  animatedContents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nmemonicButton: {
    backgroundColor: '#E7E1D5',
    flex: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  nmemonicButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  walletDeleteButton: {
    height: 57,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#E7E1D5',
    borderRadius: 10,
  },
});
