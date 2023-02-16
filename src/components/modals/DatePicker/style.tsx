import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  monthItem: {
    textAlign: 'center',
    backgroundColor: Colors.Medicle.Primary,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  datePickerWrap: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
  },
  datePickerInput: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.Medicle.Gray.Light,
  },
});
