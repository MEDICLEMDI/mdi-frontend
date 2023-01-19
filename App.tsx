import './shim'

import { LogBox, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

import i18n from './config/lcale';

LogBox.ignoreAllLogs(true)

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()


  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
            <Navigation />
            <StatusBar />
        </SafeAreaProvider>
      </I18nextProvider>
    )
  }
}
