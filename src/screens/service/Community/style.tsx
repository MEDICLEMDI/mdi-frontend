import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
  },
  snsLinkWrap: {
    padding: 30,

  },
  snsLinkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
    marginVertical: 5,
  },
  snsLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
