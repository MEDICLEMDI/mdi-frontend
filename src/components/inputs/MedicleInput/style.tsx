import { Platform, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
export default StyleSheet.create({
  inputWrap: {
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  inputRowDirection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    paddingLeft: 8,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 5,
    textAlignVertical: 'top',
  },
});
