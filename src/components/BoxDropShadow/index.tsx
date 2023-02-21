import { View, ViewProps } from 'react-native';

import BoxShadow from './style';

interface BoxDropShadowProps extends ViewProps {
  color: string;
  offset: number[];
  opacity: number;
  radius: number;
  elevation: number;
}

const BoxDropShadow = (props: BoxDropShadowProps) => {
  const { color, offset, opacity, radius, elevation, children, style } = props;
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
