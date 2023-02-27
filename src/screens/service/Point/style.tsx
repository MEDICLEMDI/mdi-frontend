import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  pointWrap: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 18,

    backgroundColor: Colors.Medicle.Gray.Light,
  },
  point: {
    marginLeft: 10,
    color: Colors.Medicle.Font.Brown.Dark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  pointText: {
    color: Colors.Medicle.Font.Gray.Standard,
    fontSize: 10,
    marginBottom: 5,
  },
  chargeButton: {
    backgroundColor: Colors.Medicle.Primary,
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  historyWrap: {
    flex: 1,
    padding: 30,
    borderTopWidth: 12,
    borderTopColor: Colors.Medicle.Gray.Light,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  histories: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Charge Page
  borderBottom: {
    borderBottomWidth: 10,
    borderBottomColor: Colors.Medicle.Gray.Light,
  },
  chargeWrap: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  balanceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryWrap: {
    marginBottom: 20,
  },
  itemStyle: {
    borderRadius: 10,
    paddingVertical: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
  selectBox: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderWidth: 0,
    backgroundColor: Colors.Medicle.Gray.Light,
  },
  dropdownStyles: {
    marginHorizontal: 30,
    marginTop: -20,
    marginBottom: 20,
    borderWidth: 0,
    backgroundColor: Colors.Medicle.Gray.Light,
  },
  selectInput: {
    color: Colors.Medicle.Font.Gray.Standard,
  }
});
