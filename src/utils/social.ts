import Api from '@/components/Api';
import { responseDTO } from '@/interfaces/api';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getProfile as getKakaoProfile,
  login as kakaoLogin,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import Routes from '@/navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eventEmitter from './eventEmitter';
import { setStorage } from './localStorage';

export const handleGoogle = async navigation => {
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_KEY,
  });

  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  const response: responseDTO = await Api.socialGoogle({
    id_token: userInfo.idToken,
    user_id_number: userInfo.user.id,
    email: userInfo.user.email,
  });

  if (response.result) {
    if (response?.message === 'register') {
      const data = {
        social_type: 1,
        social_id: userInfo.user.id,
        email: userInfo.user.email,
      };
      navigation.navigate(Routes.SOCIALSIGNUP, data);
    } else if (response?.message === 'login success') {
      await setStorage(response.data);
      eventEmitter.emit('loggedIn');
    } else {
      throw 'error';
    }
  } else {
    throw 'error';
  }
};

export const handleKakao = async navigation => {
  const {accessToken} = await kakaoLogin();
  const response = await Api.socialKakao({
    access_token: accessToken,
  });


  if (response.result) {
    if (response?.message === 'register') {
      const data = {
        social_type: 3,
        social_id: response.data.social_id,
        email: response.data.email,
      }
      navigation.navigate(Routes.SOCIALSIGNUP, data);
    } else if (response?.message === 'login success') {
      await setStorage(response.data);
      eventEmitter.emit('loggedIn');
    } else {
      throw 'error';
    }
  } else {
    throw 'error';
  }

};

export const handleNaver = async navigation => {
  try {
    const naverToken = await getNaverToken();
    const response = await Api.socialNaver({
      access_token: naverToken,
    });
    if (response.result) {
      if (response?.message === 'register') {
        const data = {
          social_type: 2,
          social_id: response.data.id,
          email: response.data.email,
        }
        navigation.navigate(Routes.SOCIALSIGNUP, data);
      } else if (response?.message === 'login success') {
        await setStorage(response.data);
        eventEmitter.emit('loggedIn');
      } else {
        throw 'error';
      }
    } else {
      throw 'error';
    }
  } catch (e) {
    console.error(e);
  }
};


export const getNaverToken = async () => {
  const appName = '메디클';
  const consumerKey = Config.NAVER_SOCIAL_CLIENT_ID!;
  const consumerSecret = Config.NAVER_SOCIAL_CLIENT_SECRET!;
  const serviceUrlScheme = 'com.medicle.alpha';
  const naver = await NaverLogin.login({
    appName,
    consumerKey,
    consumerSecret,
    serviceUrlScheme,
  });

  if (naver.isSuccess) {
    return naver.successResponse?.accessToken;
  } else {
    throw 'error';
  }
}
