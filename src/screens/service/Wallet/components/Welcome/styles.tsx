import { Colors } from '@/constants/theme';
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
    color: Colors.Medicle.Font.Gray.Dark,
    lineHeight: 25,
    fontSize: 14,
    fontWeight: '500',
  },
  btnContainer: {
    marginTop: 30,
  },
  createButton: {
    height: 50,
    borderRadius: 10,
    marginBottom: 12,
  },
  importButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.Medicle.Gray.SemiDark,
  },
  importButtonText: {
    color: Colors.Medicle.Font.White,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
