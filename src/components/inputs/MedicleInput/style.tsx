import { Platform, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
export default StyleSheet.create({
  inputWrap: {
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10
  },
  inputRowDirection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 12,
    width: '100%',
    marginLeft: 5,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 5,
    textAlignVertical: 'top',
  },
});
