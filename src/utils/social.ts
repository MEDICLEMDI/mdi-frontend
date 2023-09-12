import Api from '@/components/Api';
import { IKakao, INaver, LoginInfo, ResponseDTO } from '@/interfaces/api';
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

/**
 * 구글 소셜로그인
 */
export const handleGoogle = async (navigation: any) => {
  // 구글 api 키 설정
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_KEY,
  });

  await GoogleSignin.hasPlayServices();
  // 구글 유저정보 가져오기
  const userInfo = await GoogleSignin.signIn();
  // 가져온 정보로 백엔드에 로그인 요청
  const response: ResponseDTO<undefined | LoginInfo> = await Api.socialGoogle({
    id_token: userInfo.idToken,
    user_id_number: userInfo.user.id,
    email: userInfo.user.email,
  });

  if (response.result) {
    // 회원이 아닌경우 회원가입 페이지로
    if (response?.message === 'register') {
      const data = {
        social_type: 1,
        social_id: userInfo.user.id,
        email: userInfo.user.email,
      };
      navigation.navigate(Routes.SOCIALSIGNUP, data);
      // 회원인경우 로그인처리
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

/**
 * 카카오 소셜로그인
 * @param navigation 
 */
export const handleKakao = async (navigation: any) => {
  const { accessToken } = await kakaoLogin();
  const response: ResponseDTO<undefined | IKakao> = await Api.socialKakao({
    access_token: accessToken,
  });

  if (response.result) {
    // 회원이 아닌경우 회원가입 페이지로
    if (response?.message === 'register') {
      const data = {
        social_type: 3,
        social_id: response.data?.social_id,
        email: response.data?.email,
      };
      navigation.navigate(Routes.SOCIALSIGNUP, data);
      // 회원인경우 로그인처리
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

/**
 * 네이버 소셜 로그인
 * @param navigation 
 */
export const handleNaver = async (navigation: any) => {
  const naverToken = await getNaverToken();
  const response: ResponseDTO<undefined | INaver> = await Api.socialNaver({
    access_token: naverToken,
  });
  if (response.result) {
    // 회원이 아닌경우 회원가입 페이지로
    if (response?.message === 'register') {
      const data = {
        social_type: 2,
        social_id: response.data?.id,
        email: response.data?.email,
      };
      navigation.navigate(Routes.SOCIALSIGNUP, data);
      // 회원인경우 로그인처리
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

// 리액트네이티브 네이버 소셜로그인 기본설정 자세한 방법은 해당 라이브러리 확인
// https://github.com/crossplatformkorea/react-native-naver-login
export const getNaverToken = async () => {
  const appName = 'MDI';
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
};
