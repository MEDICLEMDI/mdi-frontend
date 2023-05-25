import useCustomToast from '@/hooks/useToast';
import Clipboard from '@react-native-clipboard/clipboard';
import * as React from 'react';
import { TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Path, Svg } from 'react-native-svg';
import Icon from '../icons';


interface CopyButtonProps extends TouchableWithoutFeedbackProps {
  style?: ViewStyle;
  copyText: string;
  toastMessage: string;
}

/**
 * CopyButton
 * @param {StyleProp<ViewStyle>} style
 * @param {string} copyText - 복사할 텍스트
 * @param {string} toastMessage - 복사후 토스터에 표기될 메세지
 * @comment 공용으로 사용되는 복사 버튼입니다.
 */
const CopyButton = ({
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
