import useCustomToast from '@/hooks/useToast';
import Clipboard from '@react-native-clipboard/clipboard';
import * as React from 'react';
import { TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Path, Svg } from 'react-native-svg';
import Icon from '../icons';


interface CopyButtonProps extends TouchableWithoutFeedbackProps {
  color?: string;
  imgHeight?: number;
  imgWidth?: number;
  style?: ViewStyle;
  copyText: string;
  toastMessage: string;
}

const CopyButton = ({
  color,
  imgHeight,
  imgWidth,
  style,
  copyText,
  toastMessage,
}: CopyButtonProps) => {
  const { showToast } = useCustomToast();
  const onPress = React.useCallback(() => {
    Clipboard.setString(copyText);
    showToast(toastMessage);
  }, []);
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name="copy" />
    </TouchableOpacity>
  );
};

export default CopyButton;
