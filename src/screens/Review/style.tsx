import { StyleSheet } from "react-native";
import {Colors} from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  borderBottom: {
    borderBottomWidth: 10,
    borderBottomColor: Colors.Medicle.Gray.Light,
  },
  accordionBody: {
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    height: 50,
  },
});
