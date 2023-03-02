import React from 'react';
import {
  Image,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import CopyIcon from '@/assets/images/copy_gray.png';

import styles from './style';
interface NmemonicInputProps extends TextInputProps {
  style?: ViewStyle;
  editable?: boolean;
  nmemonicValue?: string;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
}

const NmemonicInput = ({
  onPress,
  editable,
  nmemonicValue,
}: NmemonicInputProps) => {
  return (
    <View style={styles.view}>
      <TextInput
        style={styles.textInput}
        editable={editable === false ? editable : true}
        multiline
        numberOfLines={4}
        value={nmemonicValue && nmemonicValue}
      />
      {editable === false && (
        <TouchableOpacity onPress={onPress}>
          <Image source={CopyIcon} style={styles.copyButton} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NmemonicInput;
