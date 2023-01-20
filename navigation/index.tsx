/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import Home from '../screens/Home'
import Event from "../screens/Event";
import Hospital from "../screens/Hospital";
import Wallet from "../screens/Wallet";

// Profile Menus
import Profile from "../screens/Profile";
import Setting from "../screens/Setting";
import Point from "../screens/Point";
import Receipt from "../screens/Receipt";
import Subscribe from "../screens/Subscribe";
import Chart from "../screens/Chart";
import MedicalState from "../screens/MedicalState";
import FAQ from "../screens/FAQ";
import Exchange from "../screens/Exchange";
import Community from "../screens/Community";


import LinkingConfiguration from './LinkingConfiguration'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeIcon, HospitalIcon, ProfileIcon, WalletIcon, GiftIcon } from "./icon";
import { useTranslation } from "react-i18next";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { t } = useTranslation();
    const labelStyle = {
        color: '#000',
    }

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Dashboard"
                component={Home}
                options={{
                    title: t('navigation.home'),
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <HomeIcon isFocus={focused}/>,
                }
            }/>
            <Tab.Screen
                name="Hospital"
                component={Hospital}
                options={{
                    title: t('navigation.hospital'),
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <HospitalIcon isFocus={focused}/>,
                }}
            />
            <Tab.Screen
                name="Event"
                component={Event}
                options={{
                    title: t('navigation.event'),
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <GiftIcon isFocus={focused}/>,
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={Wallet}
                options={{
                    title: t('navigation.wallet'),
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <WalletIcon isFocus={focused}/>,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={SettingStack}
                options={{
                    title: t('navigation.profile'),
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <ProfileIcon isFocus={focused}/>,
                }}
            />
        </Tab.Navigator>
    )
}

const SettingStack = () => {
    const { t } = useTranslation();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Home'
                component={Profile}
            />
            <Stack.Screen
                name='Point'
                component={Point}
            />
            <Stack.Screen
                name='Receipt'
                component={Receipt}
            />
            <Stack.Screen
                name='Subscribe'
                component={Subscribe}
            />
            <Stack.Screen
                name='Chart'
                component={Chart}
            />
            <Stack.Screen
                name='MedicalState'
                component={MedicalState}
            />
            <Stack.Screen
                name='FAQ'
                component={FAQ}
            />
            <Stack.Screen
                name='Exchange'
                component={Exchange}
            />
            <Stack.Screen
                name='Community'
                component={Community}
            />
            <Stack.Screen
                name='Setting'
                component={Setting}
            />
        </Stack.Navigator>
    )
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <TabNavigator/>
    </NavigationContainer>
  )
}
