import AsyncStorage from '@react-native-async-storage/async-storage';

import { post, get } from '@/utils/api';
import { getKeys, getStorageData } from '@/utils/localStorage';
import { LoginInfo, User, ResponseDTO } from '@/interfaces/api';

/**
 * asyncStorage 에서 jwt access토큰, refresh토큰 꺼내기
 * @returns 
 */
export const tokenChecker = async () => {
  const keys = await getKeys();
  return keys.includes('@AuthKey') && keys.includes('@RefreshKey');
};

/**
 * 로그인
 * @param body user_id, password
 * @returns ResponseDTO<LoginInfo>
 */
export const signIn = async (body: {
  user_id: string | undefined;
  password: string | undefined;
}): Promise<ResponseDTO<LoginInfo>> => {
  const data = await post({ url: '/auth', body: body, auth: false }); // DB 상품 그룹
  return data;
};

/**
 * 자동로그인
 * @returns ResponseDTO<LoginInfo>
 */
export const autoSignIn = async (): Promise<ResponseDTO<LoginInfo>> => {
  const refreshToken = await getStorageData('@RefreshKey');
  return await post({ url: '/auth/refreshtoken', key: refreshToken });
};

/**
 * 로그아웃
 * @returns ResponseDTO
 */ 
export const signOut = async (): Promise<ResponseDTO<undefined>> => {
  const body = {
    jwt_refresh_token: await AsyncStorage.getItem('@RefreshKey'),
  };
  return await post({ url: '/auth/signout', body: body });
};

export const socialSignIn = async (body: any) => {
  const data = await post({ url: '/auth/social', body: body, auth: false }); // DB 상품 그룹
  return data;
};

/**
 * 유저데이터 새로고침 (정보변경등)
 * @returns ResponseDTO<User>
 */
export const userRefresh = async ():Promise<ResponseDTO<User>> => {
  const response = await get('/auth/user/refresh', true);
  return response;
}