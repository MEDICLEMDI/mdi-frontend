import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  signOutWrap: {
    paddingHorizontal: 30,
    marginVertical: 8,
    marginHorizontal: 30,

    height: 75,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContent: {
    borderTopWidth: 12,
    borderTopColor: Colors.Medicle.Gray.Light,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  pointWrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  alertWrap: {
    paddingHorizontal: 20,
  },
  alertText: {
    fontSize: 12,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 40,
  },
  signOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
  }
});
