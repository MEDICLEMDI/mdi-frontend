import React from 'react';
import { Image, View } from 'react-native';

import MedicleLogo from '@/assets/icons/medicle-logo-full.png';
import ErrorState from '@/commonComponents/ErrorState';
import { ERROR_TYPES } from '@/constants/general';

import styles from './styles';

function ConnectionError() {
  return (
    <View style={styles.container}>
      <Image source={MedicleLogo} style={styles.image} />
      <ErrorState
        errorType={ERROR_TYPES.CONNECTION_ERROR}
        style={styles.errorState}
      />
    </View>
  );
}

export default ConnectionError;
