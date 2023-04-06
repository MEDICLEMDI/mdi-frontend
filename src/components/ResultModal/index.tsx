import { Portal } from '@gorhom/portal';
import * as React from 'react';
import {
    GestureResponderEvent,
  Image,
  Modal,
  ModalBaseProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ResultImage from '@/assets/images/result_icon.png';

import MedicleButton from '../buttons/MedicleButton';
import style from './style';

interface ModalProps extends ModalBaseProps {
  name?: string;
  onPress?: (event: GestureResponderEvent) => void;
  buttonText: string;
  resultText: string;
  visible: boolean;
}

const ResultModal = (props: ModalProps) => {
  const { name, onPress, buttonText, resultText, visible } = props;

  return (
    <Portal name={name}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={style.modalContainer}>
          <View style={style.modal}>
            <View style={style.modalPaddingLayer}>
              <View style={style.modalContent}>
                <Image source={ResultImage} style={style.image} />
                <Text style={style.text}>{resultText}</Text>
              </View>
            </View>
            <MedicleButton
              text={buttonText}
              buttonStyle={style.deleteButton}
              onPress={onPress}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ResultModal;
