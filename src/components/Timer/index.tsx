import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

import style from './style';

interface TimerProps {
  initialTime: number;
  onTimeOut: () => void;
}

const Timer = ({ initialTime, onTimeOut }: TimerProps) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {}, [time, initialTime]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
        if (time === 1) {
          onTimeOut();
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time, onTimeOut]);

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(1, '0');
  const seconds = (time % 60).toString().padStart(2, '0');

  return (
    <View>
      <Text
        style={[
          style.timer,
          time === 0 && { color: Colors.Medicle.Font.Red },
        ]}>{`${minutes}:${seconds}`}</Text>
    </View>
  );
};

export default Timer;
