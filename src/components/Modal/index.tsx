import { Portal } from '@gorhom/portal';
import * as React from 'react';
import { Modal, ModalBaseProps, SafeAreaView } from 'react-native';

interface ModalProps extends ModalBaseProps {
  name: string;
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
  } = props;
  return (
    <Portal name={name}>
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {children}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Portal>
  );
};

export default CustomModal;
