import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 230,
    marginTop: Dimensions.get('window').height >= 700 ? 190 : 100,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 70,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    lineHeight: 25,
    fontSize: 14,
    fontWeight: '500',
  },
  btnContainer: {
    // backgroundColor: 'yellow',
    marginTop: 30,
  },
  createBtn: {
    backgroundColor: '#E7E1D5',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  importBtn: {
    marginTop: 12,
    backgroundColor: '#5F5F5F',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
