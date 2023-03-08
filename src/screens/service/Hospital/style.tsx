import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
  },
  tabSelected: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.Medicle.Brown.Standard,
  },
  tabButton: {
    paddingBottom: 10,
    marginBottom: 20,
    marginRight: 15,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // detail page
  image: {
    width: Dimensions.get('screen').width,
    height: 160,
  },
  itemDetailWrap: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  borderBottom: {
    borderBottomWidth: 10,
    borderBottomColor: Colors.Medicle.Gray.Light,
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    height: 50,
  },
  wishButton: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: Colors.Medicle.White,
    borderColor: Colors.Medicle.Gray.Light,
    borderWidth: 1,
  },
  FAQButton: {
    flex: 2,
    backgroundColor: Colors.Medicle.Gray.SemiDark,
  },
  PayButton: {
    flex: 3,
  },
  checkbox: {
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 20,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Medicle.Gray.Light,
    marginVertical: 20,
  },
  reserveComment: {
    marginTop: 10,
  },

  datePickerModal: {
    marginHorizontal: 30,
    padding: 30,
    borderRadius: 10,
    backgroundColor: Colors.Medicle.White,
  },
  datePickerHeader: {
    marginBottom: 20,
  },
  dataPickerInput: {
    flex: 1,
  },
});
