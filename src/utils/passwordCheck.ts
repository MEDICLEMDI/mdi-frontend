import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import Config from 'react-native-config';

export const passwordCheck = async (password: string) => {
  const encryptKey = await AsyncStorage.getItem('password');
  const orginPassword = CryptoJS.AES.decrypt(
    encryptKey,
    Config.AES_KEY
  ).toString(CryptoJS.enc.Utf8);

  if (password === orginPassword) {
    return true;
  } else {
    return false;
  }
};
