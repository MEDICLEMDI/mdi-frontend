import { Platform, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: Platform.OS == 'ios' ? 30 : 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  inputWrap: {
    marginBottom: 20,
  },
  inputStyle: {
    marginTop: 10,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
    paddingLeft: 15,

    backgroundColor: '#F2F2F2',
    borderRadius: 15,
  },
  agreeComment: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginBottom: 10,
  },
  checkBoxLabel: {
    marginLeft: 10,
    paddingLeft: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    marginLeft: 5,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  confirmButton: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.Grey.Standard,
  },
});
