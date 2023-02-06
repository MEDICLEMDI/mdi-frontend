import {Platform, StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentWrap: {
    marginTop: 30,
    paddingHorizontal: 30
  },
  inputWrap: {
    marginBottom: 20,
  },
  inputStyle: {
    marginTop: 10,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
    paddingLeft: 15,

    backgroundColor: '#F2F2F2',
    borderRadius: 15,
  },
});