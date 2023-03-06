import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  amountLayer: {
    marginTop: 20,
    // backgroundColor: 'red',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#443927',
  },
  sendLayer: {
    // backgroundColor: 'green',
    marginTop: 20,
  },
  sendLayerMiddle: {
    // flexDirection: 'row',
    // height: 100,
    marginTop: 20,
  },
  sendLayerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333333',
    // marginTop: 10,
    // marginLeft: 10,
  },
  sendInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#989898',
  },
  sendInputText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#333333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    width: 312,
    height: 368,
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
  modalContentLayer: {
    paddingTop: 30,
  },
  modalSend: {
    height: 40,
    flex: 1,
    borderBottomRightRadius: 10,
  },
  modalCancel: {
    height: 40,
    flex: 1,
    borderBottomLeftRadius: 10,
    backgroundColor: '#989898',
  },
  modalCancelText: {
    color: Colors.Medicle.White,
    fontSize: 14,
    weight: 'bold',
  },
  resultPage: {
    flex: 1,
    alignItems: 'center',
  },
  resultImage: {
    marginTop: 150,
    marginBottom: 50,
    width: 80,
    height: 80,
  },
  resultText: {
    color: '#443927',
    fontSize: 16,
    fontWeight: '600',
  },
  checkInfotitle: {
    color: '#2D2D2D',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
  },
  checkInfoContent: {
    marginLeft: 'auto',
    fontWeight: '700',
    fontSize: 18,
    color: '#000000',
  },
  mdi: {
    fontWeight: '400',
    fontSize: 12,
    color: '#333333',
  },
  modalTotal: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333333',
  },
  fee: {
    fontSize: 10,
    fontWeight: '400',
    color: '#989898',
    alignSelf: 'center',
  },
  totalLayer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
