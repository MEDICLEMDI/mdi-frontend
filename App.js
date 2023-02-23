import '@/config/logs';
import '@/config/i18n';
import '@/config/reactotron';
import '@/config/extensions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import CryptoJS from 'crypto-js';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import {
  getBuildNumber,
  getBundleId,
  getVersion,
} from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from '@/components/common';
import { toastProviderProps } from '@/components/common/Toast';
import { isIos } from '@/constants/platform';
import KeyRing from '@/modules/keyring';
import Routes from '@/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { initKeyring, login } from '@/redux/slices/keyring';
import { persistor, store } from '@/redux/store';
import { navigationRef } from '@/utils/navigation';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
const baseDist = getBuildNumber();
const baseRelease = `${getBundleId()}@${getVersion()}:${Platform.OS}`;
const keyring = KeyRing.getInstance();

Sentry.init({
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: 1.0,
  dist: baseDist,
  debug: false,
  release: baseRelease,
  environment: __DEV__ ? 'local' : 'productive',
  normalizeDepth: 10,
  enableOutOfMemoryTracking: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});

const PersistedApp = () => {
  const appState = useRef(AppState.currentState);
  const [showRoutes, setShowRoutes] = useState(false);
  const dispatch = useAppDispatch();
  const { icpPrice } = useAppSelector(state => state.icp);

  useEffect(() => {
    const event = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      event.remove();
    };
  }, []);

  const checkUpdates = async () => {
    await codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
      deploymentKey: isIos
        ? Config.CODE_PUSH_IOS_DEPLOY_KEY
        : Config.CODE_PUSH_ANDROID_DEPLOY_KEY,
    });
  };

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      checkUpdates();
    }

    if (appState.current !== nextAppState) {
      appState.current = nextAppState;
    }
  };

  const unlock = async () => {
    const encryptKey = await AsyncStorage.getItem('password');
    const password = CryptoJS.AES.decrypt(encryptKey, Config.AES_KEY).toString(
      CryptoJS.enc.Utf8
    );

    dispatch(
      login({
        password: password,
        icpPrice,
      })
    );
  };

  useEffect(() => {
    dispatch(
      initKeyring({
        callback: () => {
          if (keyring.isInitialized && !keyring.isUnlocked) {
            unlock();
          }
          RNBootSplash.hide({ fade: true });
          setShowRoutes(true);
        },
      })
    );
  }, []);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <ToastProvider {...toastProviderProps}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            {showRoutes && (
              <Routes
                routingInstrumentation={routingInstrumentation}
                ref={navigationRef}
              />
            )}
          </ToastProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </PersistGate>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistedApp />
  </Provider>
);

const AppWithSentry = Sentry.wrap(__DEV__ ? Reactotron.overlay(App) : App);

export default codePush({
  checkfrecuency: codePush.CheckFrequency.MANUAL,
  deploymentKey: isIos
    ? Config.CODE_PUSH_IOS_DEPLOY_KEY
    : Config.CODE_PUSH_ANDROID_DEPLOY_KEY,
})(AppWithSentry);
