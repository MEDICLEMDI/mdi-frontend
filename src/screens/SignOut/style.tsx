import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30.
  },
  signOutWrap: {
    paddingHorizontal: 30,
    marginVertical: 8,
    marginHorizontal: 30,

    height: 75,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContent: {
    borderTopWidth: 12,
    borderTopColor: Colors.Medicle.Gray.Light,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  pointWrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  alertWrap: {
    paddingHorizontal: 20,
  },
  alertText: {
    fontSize: 12,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 40,
  },
  signOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
  },
  walletTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  walletSubTitle: {
    fontWeight: '400',
    fontSize: 15,
    color: Colors.Medicle.Font.Gray.Standard,
    marginTop: 10,
  },
  walletContent: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.Medicle.Font.Gray.Dark,
    marginTop: 20,
    lineHeight: 25,
  },
  walletContainer: {
    // flex: 1,
    paddingHorizontal: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
  },
  modal: {
    width: 277,
    height: 320,
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
    color: Colors.Medicle.Font.Red,
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
    color: Colors.Medicle.Font.Black,
    fontWeight: '400',
    fontSize: 10,
    textAlign: 'center',
  },
  passwordLayer: {
    marginTop: 30,
  },
});
