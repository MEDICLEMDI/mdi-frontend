// React native packages
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import Icons from '@/icons';
import {
  RootStackParamList,
  ServiceTabParamList,
} from '@/interfaces/navigation';
import KeyRing from '@/modules/keyring';
import Chart from '@/screens/service/Chart';
import Community from '@/screens/service/Community';
import PersonalDoc from '@/screens/service/Documents/personalDoc';
import ServiceDoc from '@/screens/service/Documents/serviceDoc';
import Event from '@/screens/service/Event';
import Exchange from '@/screens/service/Exchange';
import FAQ from '@/screens/service/FAQ';
import DashBoard from '@/screens/service/Home';
import Hospital from '@/screens/service/Hospital';
import MarketingConfig from '@/screens/service/MarketingConfig';
import MedicalState from '@/screens/service/MedicalState';
import Notice from '@/screens/service/Notice';
import NoticeDetail from '@/screens/service/Notice/detail';
import Point from '@/screens/service/Point';
import Profile from '@/screens/service/Profile';
import Receipt from '@/screens/service/Receipt';
import ServiceContacts from '@/screens/service/ServiceContacts';
import Setting from '@/screens/service/Setting';
import Subscribe from '@/screens/service/Subscribe';
import WalletCreatePassword from '@/screens/service/Wallet/components/CreatePassword';
import WalletHome from '@/screens/service/Wallet/components/Home';
import WalletImport from '@/screens/service/Wallet/components/Import';
import WalletWelcome from '@/screens/service/Wallet/components/Welcome';
import SignOut from '@/screens/SignOut';
import PointCharge from '@/screens/service/Point/charge';
import Routes from '../Routes';
import EditProfile from "@/screens/service/Profile/edit";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<ServiceTabParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.DASHBOARD}
      screenOptions={{
        headerShown: false,
      }}>
      {/* 하단에 탭이 보이는 메뉴는 BottomTabNavigation에 적용되고 탭이 보이지 않는 메뉴는 Root의 Stack에 추가 */}
      <Stack.Screen name={Routes.DASHBOARD} component={BottomTabNavigation} />
      <Stack.Group>
        <Stack.Screen
          name={Routes.SERVICE_CONTACTS}
          component={ServiceContacts}
        />
        <Stack.Screen name={Routes.SIGNOUT} component={SignOut} />
      </Stack.Group>

      {/* Wallet Group */}
      <Stack.Group>
        <Stack.Screen
          name={Routes.WALLET_CREATE_PASSWORD}
          component={WalletCreatePassword}
        />
        <Stack.Screen name={Routes.WALLET_IMPORT} component={WalletImport} />
        <Stack.Screen name={Routes.POINT_CHARGE} component={PointCharge} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const BottomTabNavigation = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const labelStyle = {
    color: '#000',
    marginTop: 5,
  };
  const tabActiveController = (active: boolean) => {
    let color;
    if (active) {
      color = '#FFB61B';
    } else {
      color = '#101010';
    }
    return color;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 70 : 60,
          borderTopWidth: 1,
          borderTopColor: '#EBEDF2',
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          backgroundColor: '#FFF',
        },
        tabBarHideOnKeyboard: true,
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
          tabBarIcon: ({ focused }) => (
            <Icons
              name="home"
              style={{ fill: tabActiveController(focused) }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.HOSPITAL}
        component={Hospital}
        options={{
          title: t('navigation.hospital'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({ focused }) => (
            <Icons
              name="hospital_b"
              style={{ stroke: tabActiveController(focused) }}
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
          tabBarIcon: ({ focused }) => (
            <Icons
              name="gift"
              style={{ stroke: tabActiveController(focused) }}
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
          tabBarIcon: ({ focused }) => (
            <Icons
              name="wallet"
              style={{ stroke: tabActiveController(focused) }}
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
          tabBarIcon: ({ focused }) => (
            <Icons
              name="user"
              style={{ stroke: tabActiveController(focused) }}
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
      <Stack.Screen name={Routes.EDIT_PROFILE} component={EditProfile}/>
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
      }}
      initialRouteName={Routes.SERVICE_SETTINGS}>
      <Stack.Screen name={Routes.SERVICE_SETTINGS} component={Setting} />
      <Stack.Screen name={Routes.NOTICE} component={Notice} />
      <Stack.Screen name={Routes.NOTICE_DETAIL} component={NoticeDetail} />
      <Stack.Screen name={Routes.SERVICE_DOCUMENT} component={ServiceDoc} />
      <Stack.Screen name={Routes.PERSONAL_DOCUMENT} component={PersonalDoc} />
      <Stack.Screen name={Routes.MARKETING} component={MarketingConfig} />
    </Stack.Navigator>
  );
};

function WalletStack() {
  const keyring = KeyRing.getInstance();
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
