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
    marginVertical: 10,
  },
  reserveComment: {
    marginTop: 10,
  },

  datePickerModal: {
    marginHorizontal: 30,
    padding: 30,
    borderRadius: 10,
    backgroundColor: Colors.Medicle.White,
    height: 400,
  },
  datePickerHeader: {
    marginBottom: 20,
  },
  dataPickerInput: {
    flex: 1,
  },
  calendarWrap: {
    paddingVertical: 20,
  },
  timeWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSelectItem: {
    paddingVertical: 2,
  },
  chargeWrap: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  sectionHeader: {
    // marginBottom: 20,
  },
  mdiBalance: {
    marginBottom: 10,
  },
  inputWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStyle: {
    borderRadius: 10,
    paddingVertical: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
  selectBox: {
    marginBottom: 20,
    borderWidth: 0,
    backgroundColor: Colors.Medicle.Gray.Light,
  },
  dropdownStyles: {
    marginTop: -20,
    marginBottom: 20,
    borderWidth: 0,
    backgroundColor: Colors.Medicle.Gray.Light,
  },
  selectInput: {
    color: Colors.Medicle.Font.Gray.Standard,
  },
  totalWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  totalPriceWrap: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Medicle.Gray.Light,
    marginBottom: 10,
    paddingBottom: 10,
  },
  totalPrice: {
    fontWeight: 'bold',
    color: '#FFB61B',
  },
  checkDocsWrap: {
    marginTop: 10,
    paddingTop: 10,
    borderTopColor: Colors.Medicle.Gray.Light,
    borderTopWidth: 1,
  },
  checkDoc: {
    marginBottom: 10,
  },
  checkDocLabel: {
    marginLeft: 20,
    fontSize: 12,
    color: Colors.Medicle.Font.Gray.Standard,
  },
  detailText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
