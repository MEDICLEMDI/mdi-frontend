import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Medicle.Beige,
  },
  contentContainer: {
    justifyContent: 'space-between',
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  version: {
    alignSelf: 'flex-end',
  },
});
