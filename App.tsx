import './shim'

import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';

import Navigation from './navigation'

import i18n from './config/lcale';

export default function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
                <Navigation />
                <StatusBar />
            </SafeAreaProvider>
        </I18nextProvider>
    )
}
