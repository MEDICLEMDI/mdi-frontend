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
    color: Colors.Medicle.Font.Brown.Dark,
    marginBottom: 10,
  },
  sendLayer: {
    marginTop: 20,
  },
  sendLayerMiddle: {
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
    color: Colors.Medicle.Font.Gray.Dark,
  },
  sendInput: {
    backgroundColor: Colors.Medicle.White,
    borderColor: Colors.Medicle.Font.Gray.Standard,
  },
  sendInputText: {
    fontWeight: '700',
    fontSize: 15,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
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
    color: Colors.Medicle.Font.Brown.Dark,
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
    backgroundColor: Colors.Medicle.Font.Gray.Standard,
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
    color: Colors.Medicle.Font.Brown.Dark,
    fontSize: 16,
    fontWeight: '600',
  },
  checkInfotitle: {
    color: Colors.Medicle.Font.Gray.Dark,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
  },
  checkInfoContent: {
    marginLeft: 'auto',
    fontWeight: '700',
    fontSize: 18,
    color: Colors.Medicle.Font.Black,
  },
  mdi: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  modalTotal: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  fee: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.Medicle.Font.Gray.Standard,
    alignSelf: 'center',
  },
  totalLayer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
