import { StyleSheet } from "react-native";

export default StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F2F2F2'
  },
  imageBox: {
    backgroundColor: '#f2f2f2',
    height: 90,
    width: 90,
    borderRadius: 10,
    marginRight: 15
  },
  itemFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems:'flex-end',
    justifyContent: 'space-between'
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
});
