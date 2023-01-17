/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import Home from '../screens/Home'
import Landing from "../screens/Landing";

import {
  RootStackParamList,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Dashboard" component={Home} options={{ title: 'Home' }}/>
            <Tab.Screen name="Hospital" component={Home} options={{ title: 'Hospital' }}/>
            <Tab.Screen name="Event" component={Home} options={{ title: 'Event' }}/>
            <Tab.Screen name="Wallet" component={Home} options={{ title: 'Wallet' }}/>
            <Tab.Screen name="Profile" component={Home} options={{ title: 'Profile' }}/>
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
