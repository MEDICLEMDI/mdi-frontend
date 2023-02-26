import * as React from 'react';
import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import defaultStyle from './style';

interface TopLabelInputProps extends TextInputProps {
  readonly direction?: 'row' | 'column' | undefined;
  label?: string | undefined;
  style?: ViewStyle | ViewStyle[];
  password?: boolean;
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
  password,
  onChangeText,
  value,
}: TopLabelInputProps) => {
  const flexDirection = {
    flexDirection: direction === undefined ? 'column' : direction,
    alignItem: 'center',
  };

  return (
    <View style={[flexDirection, style]}>
      {label && <Text>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChange={onChange}
        onPressIn={onPressIn}
        onChangeText={onChangeText}
        secureTextEntry={password}
        style={[defaultStyle.inputStyle, multiline ? defaultStyle.textArea : null,]}
        // ios settings
        clearButtonMode="always"
        enablesReturnKeyAutomatically={true}
        // android settings
        disableFullscreenUI={true}
        value={value}
      />
    </View>
  );
};

export default MedicleInput;
