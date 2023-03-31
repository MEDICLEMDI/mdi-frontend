import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 15,
    color: Colors.Medicle.Font.Gray.Standard,
    marginTop: 10,
  },
  content: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.Medicle.Font.Gray.Dark,
    marginTop: 20,
    lineHeight: 25,
  },
});
