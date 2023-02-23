import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    // marginHorizontal: 30,
    // width: Dimensions.get('window').width - 60,
    // maxWidth: 420,
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: 'red',
  },
  titleContainer: {
    marginTop: 20,
    backgroundColor: 'orange',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  subTitleText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 22,
    color: '#333333',
  },
  warningCard: {
    backgroundColor: 'pink',
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
    color: '#FF2D2D',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 6,
    lineHeight: 16,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  btnContainer: {
    height: 52,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
