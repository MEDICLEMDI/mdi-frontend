import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '@/constants/fonts';
import { pixelRatioScale } from '@/constants/platform';
import { Colors } from '@/constants/theme';
import { fontMaker } from '@/utils/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
    width: '100%',
    flex: 1,
  },
  medicleIcon: {
    height: pixelRatioScale(50),
    resizeMode: 'contain',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    ...fontMaker({
      size: 26,
      weight: SEMIBOLD,
      color: Colors.Medicle.Black,
    }),
    marginTop: 27,
  },
  componentMargin: {
    marginTop: 27,
  },
  buttonMargin: {
    marginTop: 22,
  },
  buttonStyling: {
    minWidth: '84%',
  },
  valid: {
    color: Colors.Medicle.black,
    marginTop: 23,
    marginLeft: 30,
  },
});
