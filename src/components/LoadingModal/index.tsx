import { Portal } from '@gorhom/portal';
import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  ModalBaseProps,
  SafeAreaView,
  View,
} from 'react-native';

interface ModalProps extends ModalBaseProps {
  name: string;
}

const LoadingModal = (props: ModalProps) => {
  const { name, onRequestClose, visible, onShow } = props;

  return (
    <Portal name={name}>
      <SafeAreaView>
        <Modal
          animationType={'fade'}
          visible={visible}
          transparent={true}
          onRequestClose={onRequestClose}
          onShow={onShow}>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#111111" />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Portal>
  );
};

export default LoadingModal;
