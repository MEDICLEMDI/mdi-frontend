import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    // marginHorizontal: 30,
    // width: Dimensions.get('window').width - 60,
    // maxWidth: 420,
    flex: 1,
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.Medicle.Font.Gray.Dark,
  },
  subTitleText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 22,
    color: Colors.Medicle.Font.Gray.Dark,
  },
  warningCard: {
    backgroundColor: Colors.Medicle.WarningCard,
    height: 64,
    marginTop: 10,
    padding: 15,
    flexDirection: 'row',
    borderRadius: 10,
  },
  warningImage: {
    width: 15,
    height: 15,
  },
  warningText: {
    color: Colors.Medicle.Font.Red,
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 6,
    lineHeight: 16,
  },
  btnContainer: {
    height: 52,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  middleContainer: {
    marginTop: 20,
  },
  contentText: {
    marginBottom: 10,
    color: Colors.Medicle.Font.Gray.Dark,
    fontWeight: '400',
    fontSize: 13,
  },
  passwordInput: {
    backgroundColor: Colors.Medicle.White,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.Standard,
  },
  toastStyle: {
    top: -35,
    left: '12%',
  },
  toastPointerStyle: {
    top: 20,
  },
});
