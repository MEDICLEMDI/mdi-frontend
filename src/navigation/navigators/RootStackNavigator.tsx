// React native packages
import React from 'react';
import { Platform } from "react-native";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Hooks
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


// Module packages
import Routes from '../Routes';
import KeyRing from '@/modules/keyring';
import {
  RootStackParamList,
  ServiceTabParamList,
} from '@/interfaces/navigation';

// Components
import Icon from '@/icons';
import Header from "@/components/Header";
import ModalStackNavigator from './ModalStackNavigator';
import { modalGroupOptions, rootStackOptions } from '../utils';
// Menus
import DashBoard from '@/screens/service/Home';
import Hospital from '@/screens/service/Hospital';
import Event from '@/screens/service/Event';
import HomeWallet from '@/screens/service/Wallet/components/home';
import Profile from '@/screens/service/Profile';
// Wallet pages
import WelcomeWallet from '@/screens/service/Wallet/components/welcome';

// Profile pages
import Point from '@/screens/service/Point';
import Receipt from '@/screens/service/Receipt';
import Subscribe from '@/screens/service/Subscribe';
import Chart from '@/screens/service/Chart';
import MedicalState from '@/screens/service/MedicalState';
import FAQ from '@/screens/service/FAQ';
import Exchange from '@/screens/service/Exchange';
import Community from '@/screens/service/Community';
import Setting from '@/screens/service/Setting';

// Setting pages
import Notice from "@/screens/service/Notice";
import NoticeDetail from "@/screens/service/Notice/detail"
import ServiceContacts from "@/screens/service/ServiceContacts";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<ServiceTabParamList>();

const RootStackNavigator = () => {
  const keyring = KeyRing.getInstance();
  // 최초 진입되는 라우팅 페이지 설정
  const initialRoute = keyring.isInitialized
    ? keyring.isUnlocked
      ? Routes.SWIPE_LAYOUT
      : Routes.LOGIN
    : Routes.WELCOME;

  const navigation = useNavigation();
  const { t } = useTranslation();
  const labelStyle = {
    color: '#000',
    marginTop: 5,
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 70 : 60,
          borderTopWidth: 1,
          borderTopColor: '#EBEDF2',
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 20 :10,
          backgroundColor: '#FFF',
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
          tabBarIcon: ({size, focused, color}) => <Icon name='home' color={color}/>,
        }}
      />
      <Tab.Screen
        name={Routes.HOSPITAL}
        component={Hospital}
        options={{
          title: t('navigation.hospital'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({size, focused, color}) => <Icon name='hospital_b' style={{ stroke: focused ? '#FFB61B' : '#101010' }}/>,
        }}
      />
      <Tab.Screen
        name={Routes.EVENT}
        component={Event}
        options={{
          title: t('navigation.event'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({size, focused, color}) => <Icon name='gift' style={{ stroke: focused ? '#FFB61B' : '#101010' }}/>,
        }}
      />
      <Tab.Screen
        name={Routes.WALLET}
        component={WalletStack}
        options={{
          title: t('navigation.wallet'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({size, focused, color}) => <Icon name='wallet' style={{ stroke: focused ? '#FFB61B' : '#101010' }}/>,
        }}
      />
      <Tab.Screen
        name={Routes.MYPAGE}
        component={SettingStack}
        options={{
          title: t('navigation.profile'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({size, focused, color}) => <Icon name='user' style={{ stroke: focused ? '#FFB61B' : '#101010' }}/>,
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
      <Stack.Screen name={Routes.SERVICE_SETTINGS} component={Setting} />
    </Stack.Navigator>
  )
}

const ServiceSettings = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={Routes.SERVICE_SETTINGS}
    >
      <Stack.Screen name={Routes.SERVICE_SETTINGS} component={Setting} />
      <Stack.Screen name={Routes.NOTICE} component={Notice} />
      <Stack.Screen name={Routes.NOTICE_DETAIL} component={NoticeDetail} />
      <Stack.Screen name={Routes.SERVICE_CONTACTS} component={ServiceContacts} />
    </Stack.Navigator>
  )
}


function WalletStack() {
  const keyring = KeyRing.getInstance();
  const { t } = useTranslation();

  // 최초 진입되는 라우팅 페이지 설정
  const initialRoute = keyring.isInitialized
    ? Routes.WALLET_HOME
    : Routes.WALLET_WELCOME;

  return (
    <>
      <Header goBack={false} title={t('header.wallet')} />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={rootStackOptions}>
        <Stack.Group>
          <Stack.Screen name={Routes.WALLET_HOME} component={HomeWallet} />
          <Stack.Screen name={Routes.WALLET_WELCOME} component={WelcomeWallet} />
        </Stack.Group>
        <Stack.Group screenOptions={modalGroupOptions}>
          <Stack.Screen
            name={Routes.MODAL_STACK}
            component={ModalStackNavigator}
          />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
}

export default RootStackNavigator;
