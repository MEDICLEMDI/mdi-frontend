import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  imageSlideIndex: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    left: 20,
    backgroundColor: Colors.Medicle.Black + '80',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
