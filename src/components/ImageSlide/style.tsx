import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/theme";

export default StyleSheet.create({
  imageItem: {
    width: '100%',
    height: 135,
    backgroundColor: '#FCF4E9',
  },
  imageSlideIndex: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 30,
    backgroundColor: Colors.Medicle.Black + '80',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
