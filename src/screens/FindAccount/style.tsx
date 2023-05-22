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
  signUpButton: {
    height: 50,
  },
  docCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentTabWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  documentTabButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.Medicle.Gray.Light,
    borderColor: Colors.Medicle.Gray.SemiLight,
  },
  borderRadiusLeft: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
  },
  borderRadiusRight: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
  tabActive: {
    borderColor: Colors.Medicle.Gray.SemiLight,
    backgroundColor: Colors.Medicle.White,
  },
  inputLayer: {
    paddingHorizontal: 30,
  },
  labelText: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.Medicle.Font.Brown.Dark,
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timer: {
    color: Colors.Medicle.Font.Brown.Standard,
    fontWeight: '700',
    fontSize: 12,
  },
  mt10: {
    marginTop: 10,
  },
  resultId: {
    marginTop: 30,
  },
  resultPassword: {
    marginTop: 40,
  },
  errorText: {
    color: '#FF2D2D',
    fontSize: 12,
    fontWeight: 'normal',
  },
});
