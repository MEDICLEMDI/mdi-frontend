import * as React from 'react';
import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';
import defaultStyle from './style';
import {fontStyleCreator} from "@/utils/fonts";
interface TopLabelInputProps extends TextInputProps {
  readonly direction?: 'row' | 'column' | undefined;
  label?: string | undefined;
  style?: ViewStyle | ViewStyle[];
  password?: boolean;
  errText?: string;
  leftInputNode?: React.ReactNode;
  rightInputNode?: React.ReactNode;
  inputButtonNode?: React.ReactNode;
  marginBottom?: number;
}
const MedicleInput = ({
  direction = 'column',
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
  leftInputNode,
  rightInputNode,
  inputButtonNode,
  marginBottom = 0,
}: TopLabelInputProps) => {

  const ERROR_TEXT = fontStyleCreator({
    color: '#FF2D2D',
    size: 12,
    weight: 'normal',
  })
  const [errorMargin, setErrorMargin] = React.useState(0);
  const flexStyle: ViewStyle = {
    flexDirection: direction,
    alignItems: direction === 'row' ? 'center' : 'baseline',
  };

  const onLabelLayout = event => {
    const { width } = event.nativeEvent.layout;
    setErrorMargin(width);
  }

  return (
    <View style={{ marginBottom: marginBottom }}>
      <View style={[flexStyle, defaultStyle.inputWrap]}>
        {label && (
          <Text
            onLayout={onLabelLayout}
            style={direction === 'row' ? { paddingRight: 10 } : { marginBottom: 10 }}>
            {label}
          </Text>
        )}
        <View style={[
          defaultStyle.inputContainer,
          direction === 'row' && defaultStyle.inputRowDirection,
          multiline ? defaultStyle.textArea : null,
          { backgroundColor: errText ? '#FFE8E8' : Colors.Medicle.Gray.Light }]}>
          {!multiline && leftInputNode && <View>{leftInputNode}</View>}
          <TextInput
            style={[
              defaultStyle.input,
              direction === 'row' && { flex: 1 },
              multiline ? defaultStyle.textArea : null
            ]}
            placeholder={placeholder}
            maxLength={maxLength}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onChange={onChange}
            onPressIn={onPressIn}
            onChangeText={onChangeText}
            secureTextEntry={password}
            value={value}
            // ios settings
            clearButtonMode="always"
            enablesReturnKeyAutomatically={true}
            // android settings
            disableFullscreenUI={true}
          />
          {!multiline && rightInputNode && <View>{rightInputNode}</View>}
        </View>
        {!multiline && inputButtonNode && <View style={{ marginLeft: 10 }}>{inputButtonNode}</View>}
      </View>
      {errText && (<Text style={[ERROR_TEXT, direction === 'row' && {marginLeft: errorMargin}]}>{errText}</Text>)}
    </View>
  );
};
export default MedicleInput;
