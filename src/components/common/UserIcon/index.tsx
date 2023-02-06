import React from 'react';
import { Image, StyleProp, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MedicleLogo from '@/assets/icons/il_medicle.png';
import Touchable from '@/commonComponents/Touchable';
import { Rainbow } from '@/constants/theme';

// import Text from '../Text';
import styles from './styles';

type UserIconSize = 'extralarge' | 'large' | 'medium' | 'small';

interface Props {
  size?: UserIconSize;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
const getStyles = (size: UserIconSize) => {
  return {
    circleStyle: styles[size] as StyleProp<ViewStyle>,
    backgroundStyle: styles[`background${size}`] as StyleProp<ViewStyle>,
    textStyle: styles[`text${size}`] as StyleProp<ViewStyle>,
  };
};

const UserIcon = ({ size = 'medium', style, onPress }: Props) => {
  const { backgroundStyle, circleStyle } = getStyles(size);

  return (
    <Touchable onPress={() => onPress?.()}>
      <LinearGradient style={[styles.circle, circleStyle, style]} {...Rainbow}>
        <View style={[styles.background, backgroundStyle]}>
          {/* <Text style={textStyle}>{icon || ''}</Text> */}
          <Image
            source={MedicleLogo}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>
    </Touchable>
  );
};

export default UserIcon;
