import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabButtonWrap: {
    height: 35,
    paddingHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabButton: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#989898',
  },
  active: {
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 8,
  },
  activeBorder: {
    borderBottomWidth: 3,
    borderBottomColor: '#97876D',
  },
});
