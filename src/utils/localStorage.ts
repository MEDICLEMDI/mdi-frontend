import AsyncStorage from '@react-native-async-storage/async-storage';

export const getKeys = async () => {
  return await AsyncStorage.getAllKeys();
};

export const clearStorage = async () => {
  const appKeys = await getKeys();
  return await AsyncStorage.multiRemove(appKeys as string[]);
};

export const getStorageData = async (key: string): Promise<any> => {
  const appKeys = await getKeys();
  if (!appKeys.includes(key)) {
    return `"${key}" is not exist key`;
  }

  const data = await AsyncStorage.getItem(key);
  try {
    if (typeof data !== 'string') {
      throw { error: true, message: 'is not string data!' };
    }
    return JSON.parse(data);
  } catch (e: any) {
    if (e.error) {
      console.error(e.message);
      throw e.message;
    }
    if (typeof data === 'string') {
      return data;
    }
  }
};

export const setStorage = async (data: any) => {
  await AsyncStorage.setItem('@LastLogin', JSON.stringify(data.user.user_id));
  await AsyncStorage.setItem('@AuthKey', data.access_token);
  await AsyncStorage.setItem('@RefreshKey', data.refresh_token);
  await AsyncStorage.setItem('@User', JSON.stringify(data.user));
};

export const resetStorage = async () => {
  await AsyncStorage.removeItem('@AuthKey');
  await AsyncStorage.removeItem('@RefreshKey');
  await AsyncStorage.removeItem('@User');
};
