import { Portal } from '@gorhom/portal';
import * as React from 'react';
import { ActivityIndicator, Modal, ModalBaseProps, View } from 'react-native';

interface ModalProps extends ModalBaseProps {
  name: string;
}

const LoadingModal = (props: ModalProps) => {
  const { name, onRequestClose, visible, onShow } = props;

  return (
    <Portal name={name}>
      <Modal
        animationType={'fade'}
        visible={visible}
        transparent={true}
        onRequestClose={onRequestClose}
        onShow={onShow}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#111111" />
        </View>
      </Modal>
    </Portal>
  );
};

export default LoadingModal;
