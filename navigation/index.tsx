/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import Landing from "../screens/Landing";
import Home from '../screens/Home'
import Event from "../screens/Event";
import Hospital from "../screens/Hospital";
import Wallet from "../screens/Wallet";
import Profile from "../screens/Profile";

import {
  RootStackParamList,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import { HomeIcon, HospitalIcon, ProfileIcon, WalletIcon, GiftIcon } from "./icon";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    const labelStyle = {
        color: '#000',
    }

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Home}
                options={{
                    title: '홈',
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <HomeIcon isFocus={focused}/>,
                }
            }/>
            <Tab.Screen
                name="Hospital"
                component={Hospital}
                options={{
                    title: '병원',
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <HospitalIcon isFocus={focused}/>,
                }}
            />
            <Tab.Screen
                name="Event"
                component={Event}
                options={{
                    title: '이벤트',
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <GiftIcon isFocus={focused}/>,
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={Wallet}
                options={{
                    title: '지갑',
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <WalletIcon isFocus={focused}/>,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: '마이페이지',
                    tabBarLabelStyle: labelStyle,
                    tabBarIcon: ({size,focused,color}) => <ProfileIcon isFocus={focused}/>,
                }}
            />
        </Tab.Navigator>
    )
}

function RootNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator/>
    </NavigationContainer>
  )
}
