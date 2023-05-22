import { useToast } from 'react-native-toast-notifications';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (message, type = 'success', duration = 2000) => {
    toast.show(message, { type, duration });
  };

  return { showToast };
};

export default useCustomToast;