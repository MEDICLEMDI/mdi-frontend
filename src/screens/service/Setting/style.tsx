import { StyleSheet } from 'react-native';
import {Colors} from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  settingWrap: {
    paddingVertical: 30,
  },
  profileWrap: {
    paddingHorizontal: 30,
    marginVertical: 4,
    marginHorizontal: 30,

    backgroundColor: Colors.Medicle.White,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
