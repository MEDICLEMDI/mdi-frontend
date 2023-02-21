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
  contentWrap: {
    flex: 1,
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
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
