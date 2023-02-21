import { StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  docCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentTabWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  documentTabButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.Medicle.Gray.Light,
    borderColor: Colors.Medicle.Gray.SemiLight,
  },
  borderRadiusLeft: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
  },
  borderRadiusRight: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
  tabActive: {
    borderColor: Colors.Medicle.Gray.SemiLight,
    backgroundColor: Colors.Medicle.White,
  },
});
