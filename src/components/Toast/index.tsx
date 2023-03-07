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

const Toast = forwardRef((props, ref) => {
  const [message, setMessage] = useState('');
  const toastOpacity = useSharedValue(0);
  /**
   * isShowed를 통해 애니메이션이 중복으로 실행되는 것을 방지
   */
  const isShowed = useRef(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toastOpacity.value,
    };
  }, []);

  /**
   * useImperativeHandler를 통해 show 함수를 외부에서 접근할 수 있도록 허용
   */
  useImperativeHandle(ref, () => ({
    show: show,
  }));

  const turnOnIsShow = useCallback(() => {
    isShowed.current = false;
  }, []);

  /**
   * show 함수가 실행되면 toastOpacity를 변경하는 animation이 실행된다.
   * 애니메이션은 opacity를 1로 만드는 애니메이션 -> opacity를 0으로 만드는 애니메이션 순으로 실행된다.
   */
  const show = useCallback(message => {
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
  //   root: {
  //     width: Dimensions.get('window').width,
  //     height: Dimensions.get('window').height,
  //     flex: 1,
  //     backgroundColor: 'red',
  //   },
});

export default Toast;
