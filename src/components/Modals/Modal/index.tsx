import { Portal } from '@gorhom/portal';
import * as React from 'react';
import { Modal, ModalBaseProps, SafeAreaView, View } from 'react-native';

interface ModalProps extends ModalBaseProps {
  name: string;
  modalDirection: 'flex-start' | 'center' | 'flex-end';
  readonly children?: React.ReactNode;
}

/**
 * CustomModal
 * @comment 별도의 복잡한 구성없이 검은색 투명 백그라운드를 가진 모달
 */
const CustomModal = (props: ModalProps) => {
  const {
    name,
    animationType,
    onRequestClose,
    visible,
    onShow,
    children,
    modalDirection,
  } = props;

  if (!visible) {
    return null;
  }

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
      <Modal
        animationType={animationType}
        visible={visible}
        transparent={true}
        onRequestClose={onRequestClose}
        onShow={onShow}>
        <View
          style={{
            flex: 1,
            justifyContent: modalDirection,
          }}>
          {children}
        </View>
      </Modal>
    </Portal>
  );
};

export default CustomModal;
