import * as React from 'react';
import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import defaultStyle from './style';

interface TopLabelInputProps extends TextInputProps {
  readonly direction?: 'row' | 'column' | undefined;
  label?: string | undefined;
  style?: ViewStyle;
}

const MedicleInput = ({
  direction,
  label,
  style,
  placeholder,
  editable,
  multiline,
  numberOfLines,
  onChange,
  onPressIn,
}: TopLabelInputProps) => {
  const flexDirection = {
    flexDirection: direction === undefined ? 'column' : direction,
    alignItem: 'center',
  };

  return (
    <View style={flexDirection}>
      {label && <Text>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChange={onChange}
        onPressIn={onPressIn}
        style={[style, defaultStyle.inputStyle]}
        // ios settings
        clearButtonMode="always"
        enablesReturnKeyAutomatically={true}
        // android settings
        disableFullscreenUI={true}
      />
    </View>
  );
};

export default MedicleInput;
