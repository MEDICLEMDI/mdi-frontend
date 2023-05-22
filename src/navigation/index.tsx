import {PortalProvider} from '@gorhom/portal';
import {NavigationContainer, Theme} from '@react-navigation/native';
import React, {forwardRef, memo, useEffect, useRef} from 'react';
import {AppState, Dimensions, Linking, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';

import {Colors} from '@/constants/theme';
import RootStackNavigator from '@/navigation/navigators/RootStackNavigator';

const Navigator = ({routingInstrumentation}: any) => {
  const navTheme = {
    colors: {
      background: Colors.White.Pure,
    },
  } as Theme;

  return (
    <PortalProvider>
      <NavigationContainer theme={navTheme}>
        <GestureHandlerRootView style={styles.container}>
          <Host>
          <RootStackNavigator />
          </Host>
        </GestureHandlerRootView>
      </NavigationContainer>
    </PortalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// export default memo(forwardRef(Navigator));
export default Navigator;
