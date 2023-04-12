import AsyncStorage from '@react-native-async-storage/async-storage';

import { post } from '@/utils/api';
import { getKeys, getStorageData } from '@/utils/localStorage';

export const tokenChecker = async () => {
  const keys = await getKeys();
  console.log(keys.includes('@AuthKey') && keys.includes('@RefreshKey'));
  return keys.includes('@AuthKey') && keys.includes('@RefreshKey');
};

export const signIn = async (body: {
  user_id: string | undefined;
  password: string | undefined;
}) => {
  const { data } = await post({ url: '/auth', body: body }); // DB 상품 그룹
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
  return await post('/auth/signout', body);
};
