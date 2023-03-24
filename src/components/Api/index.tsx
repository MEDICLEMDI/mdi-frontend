import API from '@/utils/api';
import {URLSearchParams} from "url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Api = new API();


// auth
const signIn = async (body: {user_id: string | undefined; password: string | undefined;}) => {
  const { data } = await Api.post('/auth', body); // DB 상품 그룹
  return data;
}

// 미사용
const getUserInfo = async () => {
  let userInfo = await AsyncStorage.getItem('@User');
  if(userInfo === undefined || typeof userInfo !== 'string') throw { message: 'Wrong connection!' }

  userInfo = JSON.parse(userInfo);

  const { data } = await Api.post('/auth/payload', {user_id: userInfo?.user_id, id: userInfo?.id }); // DB 상품 그룹
  return data;
}

// product
const getProductGroups = async () => {
  const { data } = await Api.get('/products'); // DB 상품 그룹
  return data;
}

const getNewestProducts = async () => {
  const { data } = await Api.get(`/products/newest`);
  return data;
}

const getProductGroupItems = async (productGroup: number) => {
  const { data } = await Api.get(`/products/items/${productGroup}`);
  return data;
}

const getItemInfo = async (itemId: number) => {
  const { data } = await Api.get(`/products/detail/${itemId}`);
  return data;
}

export default { getProductGroups, getNewestProducts, getProductGroupItems, getItemInfo, getUserInfo, signIn }
