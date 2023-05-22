import AsyncStorage from '@react-native-async-storage/async-storage';

import { post, get } from '@/utils/api';
import { getKeys, getStorageData } from '@/utils/localStorage';

export const tokenChecker = async () => {
  const keys = await getKeys();
  return keys.includes('@AuthKey') && keys.includes('@RefreshKey');
};

export const signIn = async (body: {
  user_id: string | undefined;
  password: string | undefined;
}) => {
  const data = await post({ url: '/auth', body: body, auth: false }); // DB 상품 그룹
  return data;
};

export const autoSignIn = async () => {
  const refreshToken = await getStorageData('@RefreshKey');
  return await post({ url: '/auth/refreshtoken', key: refreshToken });
};

export const signOut = async () => {
  const body = {
    jwt_refresh_token: await AsyncStorage.getItem('@RefreshKey'),
  };
  return await post({ url: '/auth/signout', body: body });
};

export const socialSignIn = async (body: any) => {
  const data = await post({ url: '/auth/social', body: body, auth: false }); // DB 상품 그룹
  return data;
};

export const userRefresh = async () => {
  const response = await get('/auth/user/refresh', true);
  return response;
}