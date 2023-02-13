import { Portal } from '@gorhom/portal';
import * as React from 'react';
import {
  Modal,
  ModalBaseProps,
  SafeAreaView,
  View,
} from 'react-native';

interface ModalProps extends ModalBaseProps {
  name: string;
  modalDirection: 'flex-start' | 'center' | 'flex-end';
  children?: React.ReactNode;
}

const CustomModal = (props: ModalProps) => {
  const {
    name,
    animationType,
    onRequestClose,
    visible,
    transparent,
    onShow,
    children,
    modalDirection,
  } = props;

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
          animationType={animationType}
          visible={visible}
          transparent={transparent}
          onRequestClose={onRequestClose}
          onShow={onShow}>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: modalDirection,
            }}>
            {children}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Portal>
  );
};

export default CustomModal;
