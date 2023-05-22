import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';

import api from '@/components/Api';
import eventEmitter from '@/utils/eventEmitter';
import Navigator from './src/navigation';
import i18n from '@/config/i18n';
import { resetStorage } from '@/utils/localStorage';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'mobx-react';
import RootStore from './src/store'

const rootStore = new RootStore(); // RootStore의 인스턴스를 생성합니다.

function App() {
  i18n; // 다국어

  const [showRoutes, setShowRoutes] = useState(false);

  useEffect(() => {
    authChecker();
    setShowRoutes(true);
    getMenus();
  }, []);

  const authChecker = async () => {
    const auth = await api.tokenChecker();
    if (auth) {
      try {
        const response = await api.autoSignIn();
        if (response.result || response.ok) {
          // set new token
          const {data} = response;
          await AsyncStorage.setItem('@LastLogin', JSON.stringify(data.user.user_id));
          await AsyncStorage.setItem('@User', JSON.stringify(data.user));
          await AsyncStorage.setItem('@AuthKey', data.access_token);
          await AsyncStorage.setItem('@RefreshKey', data.refresh_token);

          eventEmitter.emit('autoLoggedIn');
        } else {
          await resetStorage();
          eventEmitter.emit('autoLoggedOut');
        }
      } catch (err) {
        await resetStorage();
        eventEmitter.emit('autoLoggedOut');
      }
    }
  };

  const getMenus = async () => {
    try {
      const { data } = await api.getMenus();
      const { appManageStore } = rootStore;
      appManageStore.init(data)
    } catch (err) {
      console.error(err);
    } finally {
      SplashScreen.hide();
    }
  }

  return (
    <SafeAreaProvider>
      {/* Provider 컴포넌트를 사용하여 RootStore를 제공합니다. */}
      <Provider rootStore={rootStore}>
        <ToastProvider successColor="grey">
          <StatusBar barStyle="light-content" backgroundColor="black" />
          {showRoutes && <Navigator />}
        </ToastProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
