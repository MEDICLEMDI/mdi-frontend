import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

import CircleCheckbox from '@/components/icons/svg/CircleCheckbox.svg';
import SelectedCircleCheckbox from '@/components/icons/svg/SelectedCircleCheckbox.svg';
import SelectedSquareCheckbox from '@/components/icons/svg/SelectedSquareCheckbox.svg';
import SquareCheckbox from '@/components/icons/svg/SquareCheckbox.svg';
import {COMMON_HITSLOP} from '@/constants/general';

import styles from './styles';

interface Props {
  onPress?: () => void;
  selected: boolean;
  children?: any;
  circle?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

function CustomCheckbox({
  onPress,
  selected,
  testID,
  circle,
  style,
  children,
}: Props) {
  const Checkbox = circle
    ? selected
      ? SelectedCircleCheckbox
      : CircleCheckbox
    : selected
    ? SelectedSquareCheckbox
    : SquareCheckbox;

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.container, style]}
      hitSlop={COMMON_HITSLOP}>
      <Checkbox width={24} height={24} />
      {children && children}
    </TouchableOpacity>
  );
}

export default CustomCheckbox;
