import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  view: {
    // backgroundColor: 'orange',
    padding: 10,
    height: 150,
    borderWidth: 1,
    borderColor: '#989898',
    borderRadius: 10,
  },
  textInput: {
    // backgroundColor: 'red',
    height: 110,
    textAlignVertical: 'top',
    padding: 5,
    fontWeight: '400',
    fontSize: 12,
    color: '#333333',
  },
  copyButton: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
  },
  errMessage: {
    color: '#FF2D2D',
    fontWeight: '400',
    fontSize: 12,
  },
});