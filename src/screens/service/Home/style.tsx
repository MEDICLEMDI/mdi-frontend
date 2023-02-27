import { StyleSheet } from 'react-native';
import {Colors} from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tabWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  tabButton: {
    paddingBottom: 10,
    marginBottom: 20,
    marginRight: 15,
  },
  tabSelected: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.Medicle.Brown.Standard,
  },
  categoryWrap: {
    marginBottom: 20,
  },
  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
  },
  iconStyle: {
    marginBottom: 15,
  },
  iconColor: {

  },
  textStyle: {

  },
  reviewWrap: {
    backgroundColor: '#F9F5EA',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  reviewImage: {
    width: '100%',
    height: 110,
  },
});
