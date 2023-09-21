import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 110,
    flex: 1,
    paddingHorizontal: 30,
  },
  contentIos: {
    paddingTop: 110,
    flex: 1,
    paddingHorizontal: 30,
  },
  signInButton: {
    height: 45,
    borderRadius: 10,
  },
  signInWrap: {
    marginBottom: 90,
  },
  input: {
    height: 45,
  },
  mt10: {
    marginTop: 10,
  },
  socialLoginButton: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  socialLoginButtonIcon: {},
  socialLoginButtonLabel: {
    flex: 1,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorText: {
    color: Colors.Medicle.Font.Red,
    fontSize: 12,
    fontWeight: 'normal',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
    flex: 1,
  },
  modalContainer: {
    backgroundColor: Colors.Medicle.White,
    width: 300,
    height: 300,
    borderRadius: 15,
    paddingTop: 20,
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
  modalCloseButton: {
    width: 15,
    height: 15,
  },
  modalContent: {
    marginTop: 20,
  },
  modalTitle: {
    color: Colors.Medicle.Font.Red,
    fontWeight: '700',
    fontSize: 16,
  },
  modalCancelButton: {
    flex: 1,
    borderBottomStartRadius: 15,
    height: 50,
    backgroundColor: Colors.Medicle.Font.Gray.Standard,
  },
  modalCheckButton: {
    flex: 1,
    borderBottomEndRadius: 15,
    height: 50,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.Medicle.Font.White,
  },
  MdiLogoImage: {
    width: '100%',
    height: 110,
    marginTop: 100,
  },
});
