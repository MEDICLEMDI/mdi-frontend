import Clipboard from '@react-native-clipboard/clipboard';
import Toast, { useToast } from 'react-native-toast-notifications';

export const copy = target => {
  Clipboard.setString(target);
};

export const showToast = message => {
  Toast.show(message, {
    duration: 3000,
    position: 'bottom',
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};
