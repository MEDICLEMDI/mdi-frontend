import { Platform, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  inputStyle: {
    marginTop: 10,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
    paddingLeft: 15,

    backgroundColor: Colors.Medicle.Gray.Light,
    borderRadius: 10,
  },
});
