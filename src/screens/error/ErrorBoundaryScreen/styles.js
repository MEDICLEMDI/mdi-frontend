import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Medicle.White,
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    alignSelf: 'center',
  },
  errorState: {
    marginBottom: '30%',
  },
  buttonStyle: {
    flexDirection: 'row-reverse',
  },
});
