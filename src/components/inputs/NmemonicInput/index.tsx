import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  TextInputProps,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import CopyButton from '@/components/CopyButton';

import styles from './style';
interface NmemonicInputProps extends TextInputProps {
  editable?: boolean;
  nmemonicValue?: string;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  error?: 'nmemonic' | 'unknown' | 'over' | undefined;
  color?: string;
  imgHeight?: number;
  imgWidth?: number;
  toastMessage?: string;
  copyText?: string;
}

const NmemonicInput = ({
  onPress,
  editable,
  nmemonicValue,
  error,
  onChangeText,
  onSubmitEditing,
  color,
  imgHeight,
  imgWidth,
  toastMessage,
  copyText,
}: NmemonicInputProps) => {
  const { t } = useTranslation();
  const nmemonicRef = useRef(null);

  return (
    <View>
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          editable={editable === false ? editable : true}
          placeholder={
            editable === false ? undefined : t('wallet.import.mnemonicInput')
          }
          multiline
          numberOfLines={4}
          value={nmemonicValue && nmemonicValue}
          onChangeText={onChangeText}
          ref={nmemonicRef}
          returnKeyType="done"
          onSubmitEditing={onSubmitEditing}
        />
        {color && imgHeight && imgWidth && copyText && toastMessage && (
          <CopyButton
            color={color}
            imgHeight={imgHeight}
            imgWidth={imgWidth}
            style={{ marginLeft: 'auto' }}
            onPress={onPress}
            copyText={copyText}
            toastMessage={toastMessage}
          />
        )}
      </View>
      {error && (
        <Text style={styles.errMessage}>{t(`errorMessage.${error}Error`)}</Text>
      )}
    </View>
  );
};

export default NmemonicInput;
