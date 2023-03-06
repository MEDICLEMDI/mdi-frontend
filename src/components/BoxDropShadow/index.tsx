import {Platform, View, ViewStyle} from 'react-native';

import BoxShadow from './style';
import {Colors} from "@/constants/theme";

const BoxDropShadow = ({
  color = Platform.OS === 'ios' ? Colors.Medicle.Gray.SemiLight : Colors.Medicle.Gray.Standard,
  offset = [0, 7],
  elevation = 8,
  opacity = 0.95,
  radius = 20,
  style = { borderRadius: 10, borderWidth: 1, borderColor: Colors.Medicle.Gray.SemiLight },
  children,
}:{
  color?: string;
  offset?: number[];
  opacity?: number;
  radius?: number;
  elevation?: number;
  style?: ViewStyle | ViewStyle[] ;
  children?: React.ReactNode;
}) => {
  return (
    <View
      style={[
        BoxShadow(color, offset, opacity, radius, elevation).boxWrap,
        style,
      ]}>
      {children}
    </View>
  );
};

export default BoxDropShadow;
