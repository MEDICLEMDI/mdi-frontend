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
    color: '#333333',
  },
  walletDeleteButton: {
    height: 57,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#E7E1D5',
    borderRadius: 10,
  },
  animatedContentsText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '400',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    width: 277,
    height: 409,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#443927',
  },
  modalCloseButton: {
    width: 13,
    height: 13,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  modalHeaderRight: {
    position: 'absolute',
    right: 0,
  },
  modalPaddingLayer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  modalTextLayer: {
    marginTop: 25,
  },
  textTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  warningImage: {
    // marginRight: 10,
    width: 23,
    height: 23,
  },
  warningTitle: {
    color: '#FF2D2D',
    fontWeight: '700',
    fontSize: 19,
  },
  deleteButton: {
    marginTop: 'auto',
    height: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  warningDescript: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 10,
    textAlign: 'center',
  }
});
