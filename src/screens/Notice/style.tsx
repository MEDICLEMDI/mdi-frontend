import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  noticeList: {
    marginTop: 10,
  },
  noticeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  imageBox: {
    overflow: 'hidden',
    height: 200,
  },
  image: {
    flex: 1,
  },
  titleWrap: {
    paddingHorizontal: 30,
    marginTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  contentWrap: {
    padding: 30,
  },
});
