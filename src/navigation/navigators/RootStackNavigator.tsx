import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';

import Icon from '@/icons';
import {RootStackParamList, ServiceTabParamList} from '@/interfaces/navigation';
import Chart from '@/screens/Chart';
import ChartDetail from '@/screens/Chart/detail';
import QaDetail from '@/screens/Chart/qaDetail';
import Community from '@/screens/Community';
import PersonalDoc from '@/screens/Documents/personalDoc';
import ServiceDoc from '@/screens/Documents/serviceDoc';
import Event from '@/screens/Event';
import Exchange from '@/screens/Exchange';
import FAQ from '@/screens/FAQ';
import FindAccount from '@/screens/FindAccount';
import DashBoard from '@/screens/Home';
import Hospital from '@/screens/Hospital';
import HospitalDetail from '@/screens/Hospital/info';

import Product from '@/screens/Product';
import ProductQA from '@/screens/Product/contact';
import ProductDetail from '@/screens/Product/detail';
import ProductPayment from '@/screens/Product/payment';

import PointCharge from '@/screens/Point/charge';

import LogOut from '@/screens/Logout';
import MarketingConfig from '@/screens/MarketingConfig';
import MedicalState from '@/screens/MedicalState';
import MedicalStateDetail from '@/screens/MedicalState/detail';
import Notice from '@/screens/Notice';
import NoticeDetail from '@/screens/Notice/detail';
import Point from '@/screens/Point';
import Profile from '@/screens/Profile';
import EditProfile from '@/screens/Profile/edit';
import EditAddress from '@/screens/Profile/editAddress';
import EditPassword from '@/screens/Profile/editPassword';
import EditPhone from '@/screens/Profile/editPhone';
import Receipt from '@/screens/Receipt';
import Review from '@/screens/Review';
import ServiceContacts from '@/screens/ServiceContacts';
import Setting from '@/screens/Setting';
import SignIn from '@/screens/SignIn';
import Social from '@/screens/SignIn/social';
import SignUp from '@/screens/SignUp';
import Subscribe from '@/screens/Subscribe';
// import HandleTest from '@/screens/Wallet/components/HandleTest';
import SignOut from '@/screens/SignOut';
import eventEmitter from '@/utils/eventEmitter';
import Wallet from '@/screens/Wallet';
import Send from '@/screens/Wallet/send';
import Transaction from '@/screens/Wallet/transaction';

import Routes from '../Routes';
import SocialSignUp from '@/screens/SignUp/social';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<ServiceTabParamList>();

const RootStackNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<
    boolean | undefined
  >(undefined);
  React.useEffect(() => {
    async function checkAuth() {
      try {
        const user = await AsyncStorage.getItem('@User');
        const authKey = await AsyncStorage.getItem('@AuthKey');
        const refreshKey = await AsyncStorage.getItem('@RefreshKey');

        if (authKey && refreshKey && user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      }
    }

    eventEmitter.addListener('loggedIn', checkAuth);
    eventEmitter.addListener('loggedOut', checkAuth);
    eventEmitter.addListener('autoLoggedIn', checkAuth);
    eventEmitter.addListener('autoLoggedOut', checkAuth);

    return () => {
      eventEmitter.removeListener('loggedIn', checkAuth);
      eventEmitter.removeListener('loggedOut', checkAuth);
      eventEmitter.removeListener('autoLoggedIn', checkAuth);
      eventEmitter.removeListener('autoLoggedOut', checkAuth);
    };
  }, []);

  React.useEffect(() => {}, [isAuthenticated]);

  const initialRoute = Routes.SOCIAL;
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      {/* 하단에 탭이 보이는 메뉴는 BottomTabNavigation에 적용되고 탭이 보이지 않는 메뉴는 Root의 Stack에 추가 */}

      {!isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name={Routes.SIGNIN} component={SignIn} />
          <Stack.Screen name={Routes.SOCIAL} component={Social} />
          <Stack.Screen name={Routes.SOCIALSIGNUP} component={SocialSignUp} />
          <Stack.Screen name={Routes.SIGNUP} component={SignUp} />
          <Stack.Screen name={Routes.FINDACCOUNT} component={FindAccount} />
        </Stack.Group>
      ) : (
        <>
          <Stack.Screen
            name={Routes.DASHBOARD}
            component={BottomTabNavigation}
          />
          <Stack.Group>
            <Stack.Screen
              name={Routes.SERVICE_CONTACTS}
              component={ServiceContacts}
            />
            <Stack.Screen name={Routes.SIGNOUT} component={SignOut} />
            <Stack.Screen name={Routes.LOGOUT} component={LogOut} />
            <Stack.Screen name={Routes.REVIEW} component={Review} />
            <Stack.Screen
              name={Routes.PRODUCT_DETAIL}
              component={ProductDetail}
            />
            <Stack.Screen
              name={Routes.PRODUCT_PAYMENT}
              component={ProductPayment}
            />
            <Stack.Screen
              name={Routes.PRODUCT_CONTACT}
              component={ProductQA}
            />
            <Stack.Screen name={Routes.POINT_CHARGE} component={PointCharge} />
          </Stack.Group>
          {/* Wallet Group */}
          {/* <Stack.Group>
            <Stack.Screen
              name={Routes.WALLET_CREATE_PASSWORD}
              component={WalletCreatePassword}
            />
            <Stack.Screen
              name={Routes.WALLET_IMPORT}
              component={WalletImport}
            />
            <Stack.Screen
              name={Routes.WALLET_MNEMONIC}
              component={WalletNmemonic}
            />
            <Stack.Screen name={Routes.WALLET_SEND} component={WalletSend} />
            <Stack.Screen name={Routes.POINT_CHARGE} component={PointCharge} />
          </Stack.Group> */}
        </>
      )}
    </Stack.Navigator>
  );
};

const BottomTabNavigation = () => {
  const {t} = useTranslation();
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
          tabBarIcon: ({focused}) => (
            <Icon name="home" fill={tabActiveController(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PRODUCT}
        component={Product}
        options={{
          unmountOnBlur: false,
          title: "상품",
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({focused}) => (
            <Icon name="hospital_b" stroke={tabActiveController(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.HOSPITAL}
        component={HospitalStack}
        options={{
          unmountOnBlur: false,
          title: t('navigation.hospital'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({focused}) => (
            <Icon name="hospital_b" stroke={tabActiveController(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.EVENT}
        component={Event}
        options={{
          title: t('navigation.event'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({focused}) => (
            <Icon name="gift" stroke={tabActiveController(focused)} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={Routes.WALLET}
        component={WalletStack}
        options={{
          title: t('navigation.wallet'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({ focused }) => (
            <Icon name="wallet" stroke={tabActiveController(focused)} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={Routes.MYPAGE}
        component={SettingStack}
        options={{
          title: t('navigation.profile'),
          tabBarLabelStyle: labelStyle,
          tabBarIcon: ({focused}) => (
            <Icon name="user" stroke={tabActiveController(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HospitalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.HOSPITAL}>
      <Stack.Screen name={Routes.HOSPITAL} component={Hospital} />
      <Stack.Screen name={Routes.HOSPITAL_DETAIL} component={HospitalDetail} />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.MYPAGE}>
      <Stack.Screen name={Routes.MYPAGE} component={Profile} />
      <Stack.Screen name={Routes.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={Routes.EDIT_PASSWORD} component={EditPassword} />
      <Stack.Screen name={Routes.EDIT_PHONE} component={EditPhone} />
      <Stack.Screen name={Routes.EDIT_ADDRESS} component={EditAddress} />
      <Stack.Screen name={Routes.POINT} component={Point} />
      <Stack.Screen name={Routes.RECEIPT} component={Receipt} />
      <Stack.Screen name={Routes.SUBSCRIBE} component={Subscribe} />
      <Stack.Screen name={Routes.CHART} component={Chart} />
      <Stack.Screen name={Routes.CHART_DETAIL} component={ChartDetail} />
      <Stack.Screen name={Routes.QA_DETAIL} component={QaDetail} />
      <Stack.Screen name={Routes.MEDICAL_STATE} component={MedicalState} />
      <Stack.Screen
        name={Routes.MEDICAL_STATE_DETAIL}
        component={MedicalStateDetail}
      />
      <Stack.Screen name={Routes.FAQ} component={FAQ} />
      <Stack.Screen name={Routes.EXCHANGE} component={Exchange} />
      <Stack.Screen name={Routes.COMMUNITY} component={Community} />
      <Stack.Screen
        name={Routes.SERVICE_SETTINGS}
        component={ServiceSettings}
      />
      <Stack.Screen name={Routes.WALLET} component={Wallet} />
      <Stack.Screen name={Routes.SEND} component={Send} />
      <Stack.Screen name={Routes.TRANSACTION} component={Transaction} />
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
      {/* <Stack.Screen name={Routes.PERSONAL_DOCUMENT} component={PersonalDoc} /> */}
      <Stack.Screen name={Routes.MARKETING} component={MarketingConfig} />
    </Stack.Navigator>
  );
};

// function WalletStack() {
//   const keyring = KeyRing.getInstance();
//   // 최초 진입되는 라우팅 페이지 설정
//   const initialRoute = keyring.isInitialized
//     ? Routes.WALLET_HOME
//     : Routes.WALLET_WELCOME;

//   return (
//     <Stack.Navigator
//       initialRouteName={initialRoute}
//       screenOptions={{ headerShown: false }}>
//       <Stack.Group>
//         <Stack.Screen name={Routes.WALLET_HOME} component={WalletHome} />
//         <Stack.Screen name={Routes.WALLET_WELCOME} component={WalletWelcome} />
//         <Stack.Screen name={Routes.WALLET_SETTING} component={WalletSetting} />
//         <Stack.Screen name={Routes.WALLET_INFO} component={WalletInfo} />
//       </Stack.Group>
//       {/* <Stack.Group screenOptions={modalGroupOptions}>
//           <Stack.Screen
//             name={Routes.MODAL_STACK}
//             component={ModalStackNavigator}
//           />
//         </Stack.Group> */}
//     </Stack.Navigator>
//   );
// }

export default RootStackNavigator;
