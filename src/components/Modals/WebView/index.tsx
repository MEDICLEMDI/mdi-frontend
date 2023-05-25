import Icon from '@/components/icons';
import { Portal } from '@gorhom/portal';
import * as React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

interface WebViewProps {
  url: string;
  visible: boolean;
  onClose: () => void;
}

/**
 * WebViewModal
 * @comment 브라우저 앱 이동없이 페이지에서 웹뷰를 호출하기 위한 모달
 */
const WebViewModal = ({ url, visible, onClose }: WebViewProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Portal>
      <Modal animationType={'fade'} visible={visible} transparent={false}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 30,
              paddingVertical: Platform.OS === 'ios' ? 0 : 20,
              paddingBottom: 20,
            }}>
            <View style={{ flex: 1 }}></View>
            <Icon name="mdiHorizontal" fill={'#000'} />
            <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={onClose}>
              <Text>닫기</Text>
            </TouchableOpacity>
          </View>
          <WebView
            source={{
              uri: url,
            }}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default WebViewModal;
