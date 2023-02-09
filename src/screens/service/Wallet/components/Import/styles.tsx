import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleContainer: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 30,
  },
  mnemonicContainer: {
    marginTop: 20,
  },
  btnContainer: {
    height: 52,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  errMsg: {
    color: 'red',
    fontSize: 12,
    fontWeight: '400',
  },
  mnemonicInput: {
    borderColor: '#989898',
    borderRadius: 10,
    borderWidth: 1,
    height: 150,
    paddingHorizontal: 14,
    textAlignVertical: 'top',
  },
});
