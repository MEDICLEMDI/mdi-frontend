import Api from '@/components/Api';
import { ResponseDTO, User } from '@/interfaces/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorageData } from './localStorage';

/**
 * 유저정보가 변경될만한 특정 이벤트마다 유저정보 새로저장
 * @returns 
 */
export const userRefresh = async () => {
  const response: ResponseDTO<User> = await Api.userRefresh();
  if (response.result) {
    await AsyncStorage.setItem('@User', JSON.stringify(response.data));
  }
  return await getStorageData('@User');
};
