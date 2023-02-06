import React, { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Touchable } from '@/components/common';
import { useAppDispatch } from '@/redux/hooks';
import { getBalance } from '@/redux/slices/user';

const TokenRefresh = () => {
  const dispatch = useAppDispatch();
  const handleRefresh = () => {
    dispatch(getBalance());
  };

  return (
    <>
      <Touchable onPress={handleRefresh}>
        <View>
          <Icon name="refresh" size={30} color="#111111" />
        </View>
      </Touchable>
    </>
  );
};

export default TokenRefresh;
