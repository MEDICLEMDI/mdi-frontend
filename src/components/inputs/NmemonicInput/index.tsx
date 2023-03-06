import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Text,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import CopyIcon from '@/assets/images/copy_gray.png';

import styles from './style';
interface NmemonicInputProps extends TextInputProps {
  editable?: boolean;
  nmemonicValue?: string;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  error?: 'nmemonic' | 'unknown' | 'over' | undefined;
}

const NmemonicInput = ({
  onPress,
  editable,
  nmemonicValue,
  error,
  onChangeText,
  onSubmitEditing,
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
        {editable === false && (
          <TouchableOpacity onPress={onPress}>
            <Image source={CopyIcon} style={styles.copyButton} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errMessage}>{t(`errorMessage.${error}Error`)}</Text>
      )}
    </View>
  );
};

export default NmemonicInput;
