import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text } from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
interface IToast {
  show: (message: string) => void;
}

const Toast = forwardRef<IToast>((props, ref) => {
  const [message, setMessage] = useState('');
  const toastOpacity = useSharedValue(0);
  const isShowed = useRef(false);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toastOpacity.value,
    };
  }, []);

  
  useImperativeHandle(ref, () => ({
    show: show,
  }));

  const turnOnIsShow = useCallback(() => {
    isShowed.current = false;
  }, []);

  
  const show = useCallback((message: string) => {
    if (!isShowed.current) {
      setMessage(message);
      isShowed.current = true;
      toastOpacity.value = withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 }, () => {
          runOnJS(turnOnIsShow)();
        })
      );
    }
  }, []);

  return (
    <Portal>
      <Animated.View style={[styles.rootContainer, animatedStyle]}>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </Portal>
  );
});

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#989898',
    paddingVertical: 9,
    paddingHorizontal: 23,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100,
  },
  message: {
    color: '#FFFFFF',
  },
});

export default Toast;
