// React native packages
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Hooks
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import Header from '@/components/Header';
// Components
import Icon from '@/icons';
import {
  RootStackParamList,
  ServiceTabParamList,
} from '@/interfaces/navigation';
import KeyRing from '@/modules/keyring';
import { useAppSelector } from '@/redux/hooks';
import { setTabDisplay } from '@/redux/slices/tabDisplay';
import Chart from '@/screens/service/Chart';
import Community from '@/screens/service/Community';
import Event from '@/screens/service/Event';
import Exchange from '@/screens/service/Exchange';
import FAQ from '@/screens/service/FAQ';
// Menus
import DashBoard from '@/screens/service/Home';
import Hospital from '@/screens/service/Hospital';
import MedicalState from '@/screens/service/MedicalState';
// Setting pages
import Notice from '@/screens/service/Notice';
import NoticeDetail from '@/screens/service/Notice/detail';
// Profile pages
import Point from '@/screens/service/Point';
import Profile from '@/screens/service/Profile';
import Receipt from '@/screens/service/Receipt';
import ServiceContacts from '@/screens/service/ServiceContacts';
import Setting from '@/screens/service/Setting';
import Subscribe from '@/screens/service/Subscribe';
import WalletCreatePassword from '@/screens/service/Wallet/components/CreatePassword';
import WalletHome from '@/screens/service/Wallet/components/Home';
// Wallet pages
import WalletWelcome from '@/screens/service/Wallet/components/Welcome';
import { navigate } from '@/utils/navigation';

// Module packages
import Routes from '../Routes';
import { modalGroupOptions, rootStackOptions } from '../utils';
import ModalStackNavigator from './ModalStackNavigator';
import WalletImport from '@/screens/service/Wallet/components/Import';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<ServiceTabParamList>();
const tabBarHideRoute: string[] = ['WalletCreatePassword'];

const RootStackNavigator = () => {
  const display = useAppSelector(state => state.tabDisplay.display);
  const { t } = useTranslation();
  const labelStyle = {
    color: '#000',
    marginTop: 5,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 70 : 60,
          borderTopWidth: 1,
          borderTopColor: '#EBEDF2',
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          backgroundColor: '#FFF',
          display: display ? 'flex' : 'none',
        },
        tabBarActiveTintColor: '#FFB61B',
        tabBarInactiveTintColor: '#101010',
      }}
      initialRouteName={Routes.DASHBOARD}>
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashBoard}
        options={{
          title: t('navigation.home'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({ size, focused, color }) => (
            <Icon name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.HOSPITAL}
        component={Hospital}
        options={{
          title: t('navigation.hospital'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              name="hospital_b"
              style={{ stroke: focused ? '#FFB61B' : '#101010' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.EVENT}
        component={Event}
        options={{
          title: t('navigation.event'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              name="gift"
              style={{ stroke: focused ? '#FFB61B' : '#101010' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.WALLET}
        component={WalletStack}
        options={{
          title: t('navigation.wallet'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              name="wallet"
              style={{ stroke: focused ? '#FFB61B' : '#101010' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.MYPAGE}
        component={SettingStack}
        options={{
          title: t('navigation.profile'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              name="user"
              style={{ stroke: focused ? '#FFB61B' : '#101010' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Routes.MYPAGE}>
      <Stack.Screen name={Routes.MYPAGE} component={Profile} />
      <Stack.Screen name={Routes.POINT} component={Point} />
      <Stack.Screen name={Routes.RECEIPT} component={Receipt} />
      <Stack.Screen name={Routes.SUBSCRIBE} component={Subscribe} />
      <Stack.Screen name={Routes.CHART} component={Chart} />
      <Stack.Screen name={Routes.MEDICAL_STATE} component={MedicalState} />
      <Stack.Screen name={Routes.FAQ} component={FAQ} />
      <Stack.Screen name={Routes.EXCHANGE} component={Exchange} />
      <Stack.Screen name={Routes.COMMUNITY} component={Community} />
      <Stack.Screen
        name={Routes.SERVICE_SETTINGS}
        component={ServiceSettings}
      />
    </Stack.Navigator>
  );
};

const ServiceSettings = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={Routes.SERVICE_SETTINGS}>
      <Stack.Screen name={Routes.SERVICE_SETTINGS} component={Setting} />
      <Stack.Screen name={Routes.NOTICE} component={Notice} />
      <Stack.Screen name={Routes.NOTICE_DETAIL} component={NoticeDetail} />
      <Stack.Screen
        name={Routes.SERVICE_CONTACTS}
        component={ServiceContacts}
      />
    </Stack.Navigator>
  );
};

function WalletStack({ navigation, route }) {
  const keyring = KeyRing.getInstance();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (tabBarHideRoute.includes(getFocusedRouteNameFromRoute(route))) {
      dispatch(setTabDisplay(false));
    } else {
      dispatch(setTabDisplay(true));
    }
  }, [navigation, route]);

  // 최초 진입되는 라우팅 페이지 설정
  const initialRoute = keyring.isInitialized
    ? Routes.WALLET_HOME
    : Routes.WALLET_WELCOME;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name={Routes.WALLET_HOME} component={WalletHome} />
        <Stack.Screen name={Routes.WALLET_WELCOME} component={WalletWelcome} />
        <Stack.Screen
          name={Routes.WALLET_CREATE_PASSWORD}
          component={WalletCreatePassword}
        />
        <Stack.Screen name={Routes.WALLET_IMPORT} component={WalletImport} />
      </Stack.Group>
      {/* <Stack.Group screenOptions={modalGroupOptions}>
          <Stack.Screen
            name={Routes.MODAL_STACK}
            component={ModalStackNavigator}
          />
        </Stack.Group> */}
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
