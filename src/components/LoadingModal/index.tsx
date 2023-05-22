import { Portal } from '@gorhom/portal';
import * as React from 'react';
import { ActivityIndicator, Modal, ModalBaseProps, View } from 'react-native';
import Icon from '../icons';
import { Colors } from '@/constants/theme';


interface ModalProps extends ModalBaseProps {
  name?: string;
}

const LoadingModal = (props: ModalProps) => {
  const { name, onRequestClose, visible, onShow } = props;

  return (
    <Portal>
      <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.Medicle.ModalBackground,
      }}>
        <Icon name="mdiHorizontal" />
        <View style={{ marginTop: 20 }}>
        <ActivityIndicator size="large" />
        </View>
      </View>
      </Modal>
    </Portal>
  );
};

export default LoadingModal;
