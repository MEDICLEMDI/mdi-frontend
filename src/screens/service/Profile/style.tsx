import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrap: {
    paddingHorizontal: 30,
  },
  menuItems: {
    backgroundColor: '#FCF4E9',
    borderRadius: 100,
  },
  editProfileBtn: {
    paddingVertical: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileWrap: {
    paddingHorizontal: 20,
    height: 75,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  profileNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icProfile: {
    width: 32,
    height: 32,
    padding: 20,
    marginRight: 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 15,
  },

  // Edit page
  profileHeader: {
    borderBottomWidth: 10,
    borderColor: Colors.Medicle.Gray.SemiLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  inputButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  title: {
    color: Colors.Medicle.Font.Brown.Dark,
    fontWeight: '400',
    fontSize: 16,
  },
  buttonStyle: {
    width: 40,
    height: 30,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
  },
  modal: {
    width: 277,
    height: 250,
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
    marginBottom: 30,
  },
  warningImage: {
    // marginRight: 10,
    width: 23,
    height: 23,
  },
  warningTitle: {
    color: Colors.Medicle.Font.Black,
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
    // marginTop: 30,
  },
  changeButton: {
    height: 35,
    marginTop: 20,
    borderRadius: 10,
  },
  changeLayer: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  resultErrorMessage: {
    color: Colors.Medicle.Font.Red,
    fontSize: 12,
    fontWeight: 'normal',
  },
  addressSearchButton: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addressModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
  },
  addressModal: {
    width: 360,
    height: 500,
    // flex: 1,
    backgroundColor: Colors.Medicle.White,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  addressModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addressModalClose: {
    width: 15,
    height: 15,
  },
  addressModalTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  postCode: {
    width: 320,
    height: 320,
    flex: 1,
    borderWidth: 1,
  },
  smsAuthButton: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timer: {
    color: Colors.Medicle.Font.Brown.Standard,
    fontWeight: '700',
    fontSize: 12,
  },
});
