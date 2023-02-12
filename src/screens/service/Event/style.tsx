import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentWrap: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  eventPanel: {
    backgroundColor: '#FCF4E9',
    height: 200,
  },
  eventBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  eventInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    marginRight: 20,
  },
  price: {
    flexDirection: 'row',
  },
});
