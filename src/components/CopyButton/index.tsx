import Clipboard from '@react-native-clipboard/clipboard';
import * as React from 'react';
import { TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Path, Svg } from 'react-native-svg';

import Toast from '../Toast';

interface CopyButtonProps extends TouchableWithoutFeedbackProps {
  color: string;
  imgHeight: number;
  imgWidth: number;
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
  const toastRef = React.useRef(null);

  const onPress = React.useCallback(() => {
    Clipboard.setString(copyText);
    toastRef.current.show(toastMessage);
  }, []);
  return (
    <>
      <TouchableOpacity style={style} onPress={onPress}>
        <Svg
          width={imgWidth}
          height={imgHeight}
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M12 9.675V12.825C12 15.45 10.95 16.5 8.325 16.5H5.175C2.55 16.5 1.5 15.45 1.5 12.825V9.675C1.5 7.05 2.55 6 5.175 6H8.325C10.95 6 12 7.05 12 9.675Z"
            stroke={color}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M16.5 5.175V8.325C16.5 10.95 15.45 12 12.825 12H12V9.675C12 7.05 10.95 6 8.325 6H6V5.175C6 2.55 7.05 1.5 9.675 1.5H12.825C15.45 1.5 16.5 2.55 16.5 5.175Z"
            stroke={color}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      </TouchableOpacity>
      <Toast ref={toastRef} />
    </>
  );
};

export default CopyButton;
