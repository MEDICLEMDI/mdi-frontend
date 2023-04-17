import { StyleSheet } from 'react-native';
import {Colors} from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
  },
  summary: {
    marginBottom: 20,
  },
  tabWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginRight: 10,
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
    alignItems: 'center',
  }
});
