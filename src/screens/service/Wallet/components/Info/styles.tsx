import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import alert from '@/redux/slices/alert';

export default StyleSheet.create({
  homeContainer: { flex: 1 },
  cardContainer: {
    paddingHorizontal: 30,
    // backgroundColor: 'red',
    height: Dimensions.get('window').height * 0.245,
    maxHeight: 1067 * 0.245,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  mdiLogo: {
    width: 22,
    height: 15,
  },
  // authContainer: {
  //   // flex: 168,
  //   backgroundColor: 'orange',
  // },
  // bottomContainer: {
  //   marginTop: 12,
  //   flex: 225,
  // },
});
