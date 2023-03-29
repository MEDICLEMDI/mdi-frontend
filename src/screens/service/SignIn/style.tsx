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
});
