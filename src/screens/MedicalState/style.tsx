import { StyleSheet } from 'react-native';
import {Colors} from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
  },
  justifyTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemDate: {
    marginBottom: 20,
  },
  infoWrap: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Medicle.Gray.Light,
  },
  priceWrap: {
    marginBottom: 20,
  },
  button: {
    height: 35,
    borderRadius: 10,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // detail page
  detailHeader: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  tabWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    paddingBottom: 10,
    marginBottom: 20,
  },
  detailWrap: {
    marginBottom: 20
  },
  detailRow: {
    marginBottom: 10,
  },
  detailText: {
    textAlign: 'left',
  },
  detailTextLabel: {
    flex: 1
  },
  dentalTextContent: {
    flex: 2,
  },
});