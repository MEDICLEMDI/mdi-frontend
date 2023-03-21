import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 50,
  },
  resultText: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.Medicle.Font.Brown.Dark,
  },
  children: {
    width: '100%',
    paddingHorizontal: 30,
  },
});
