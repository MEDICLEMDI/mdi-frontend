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
      {visible && (
        <View
          style={{
            opacity: 0.5,
            backgroundColor: '#000',
            flex: 1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
      )}
      <SafeAreaView>
        <Modal
          animationType={'fade'}
          visible={true}
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
