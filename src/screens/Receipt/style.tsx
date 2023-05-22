import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  contentWrap: {
    padding: 30,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItemWrap: {
    alignItems: 'center'
  },
  summaryItem: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.Brown.Light,
    marginBottom: 15,
  },
  receiptWrap: {
    marginVertical: 30,
  },
  receiptItem: {
    marginHorizontal: 25,
    marginBottom: 15,
  },
  infoWrap: {
    paddingVertical: 20,
    marginBottom: 20,
    borderBottomColor: Colors.Medicle.Gray.Light,
    borderBottomWidth: 1,
  },
  imageWrap: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  receiptButtonWrap: {
    marginTop: 20,
  },
  receiptButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
