import { StyleSheet } from 'react-native';

export default (
  color: string,
  offset: number[],
  opacity: number,
  radius: number,
  elevation: number
) =>
  StyleSheet.create({
    boxWrap: {
      padding: 20,
      backgroundColor: '#FFF',

      shadowColor: color,
      shadowOffset: {
        width: offset[0],
        height: offset[1],
      },
      shadowOpacity: opacity,
      shadowRadius: radius,
      elevation: elevation,
    },
  });
