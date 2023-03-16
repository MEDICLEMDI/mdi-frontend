import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  userInfo: {
    paddingHorizontal: 30,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  signUpButton: {
    height: 50,
  },
  labelText: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.Medicle.Font.Brown.Dark,
    marginBottom: 10,
    marginTop: 20,
  },
  hr: {
    marginTop: 38,
  },
  terms: {
    paddingHorizontal: 30,
    height: 245,
  },
  termsHeader: {
    marginTop: 30,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    marginRight: 22,
  },
  termsHeaderText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  termsContents: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  essentialText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.Medicle.Font.Brown.Dark,
  },
  optionsText: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.Medicle.Font.Gray.Standard,
  },
  mt10: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
  },
  modal: {
    width: 360,
    height: 500,
    // flex: 1,
    backgroundColor: Colors.Medicle.White,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalClose: {
    width: 15,
    height: 15,
  },
  modalTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  postCode: {
    width: 320,
    height: 320,
    flex: 1,
    borderWidth: 1,
  }
});
