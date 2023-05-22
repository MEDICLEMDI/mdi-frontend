import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentWrap: {
    marginTop: 40,
  },
  eventPanel: {
    justifyContent: 'center',
    alignItems: 'center',
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
