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
