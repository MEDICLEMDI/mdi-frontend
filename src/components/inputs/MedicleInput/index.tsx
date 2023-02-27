import * as React from 'react';
import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme';

import defaultStyle from './style';

interface TopLabelInputProps extends TextInputProps {
  readonly direction?: 'row' | 'column' | undefined;
  label?: string | undefined;
  style?: ViewStyle | ViewStyle[];
  password?: boolean;
  errText?: string;
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
  errText,
  maxLength,
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
        maxLength={maxLength}
        style={[
          defaultStyle.inputStyle,
          multiline ? defaultStyle.textArea : null,
          { backgroundColor: errText ? '#FFE8E8' : Colors.Medicle.Gray.Light },
        ]}
        // ios settings
        clearButtonMode="always"
        enablesReturnKeyAutomatically={true}
        // android settings
        disableFullscreenUI={true}
        value={value}
      />
      {errText && <Text style={defaultStyle.errText}>{errText}</Text>}
    </View>
  );
};

export default MedicleInput;
