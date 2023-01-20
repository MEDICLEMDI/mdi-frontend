import './shim'

import * as React from 'react';

import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';

import Navigation from './navigation'

import i18n from './config/lcale';
import Landing from "./screens/Landing";

export default function App() {
    const [isLoading, setLoading] = React.useState(true);
    const sleep = async (ms) => {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        )
    }

    React.useEffect(() => {
        const loadingScene = async () => {
            setLoading(true);
            await sleep(3000);
            setLoading(false);
        }

        loadingScene();
    }, [])

    if(isLoading) return <Landing/>
    return (
        <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
                <Navigation />
                <StatusBar />
            </SafeAreaProvider>
        </I18nextProvider>
    )
}
