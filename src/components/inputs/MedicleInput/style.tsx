import { Platform, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
export default StyleSheet.create({
  inputStyle: {
    flex: 1,
    paddingLeft: 8,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  errText: {
    color: '#FF2D2D',
    fontWeight: '400',
    fontSize: 12,
  },
  inputWrapFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 8,
  }
});
