import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '@/utils/api';

const Api = new API();

// auth
const tokenChecker = async () => {
  if (await Api.isJWTToken()) {
    // const { authKey, refreshKey } = await Api.getJWTToken();
    // console.log('authKey:', authKey);
    // console.log('refreshKey:', refreshKey);

    // 토큰 만료 확인 등

    return true;
  } else {
    return false;
  }
};

const setToken = async (type?: 'refresh' | 'auth' | undefined) => {
  if (type === 'refresh') {
    await Api.setRefreshToken();
  } else {
    await Api.setAuthToken();
  }
};

const signIn = async (body: {
  user_id: string | undefined;
  password: string | undefined;
}) => {
  const { data } = await Api.post('/auth', body); // DB 상품 그룹
  return data;
};

const autoSignIn = async () => {
  return await Api.post('/auth/refreshtoken');
};

const signOut = async () => {
  const body = {
    jwt_refresh_token: await AsyncStorage.getItem('@RefreshKey'),
  };
  return await Api.post('/auth/signout', body);
};

// product
const getProductGroups = async () => {
  const { data } = await Api.get('/products'); // DB 상품 그룹
  return data;
};

const getNewestProducts = async () => {
  const { data } = await Api.get('/products/newest');
  return data;
};

const getProductGroupItems = async (
  productGroup: number,
  page: number,
  search?: string
) => {
  let url = `/products/items/${productGroup}/${page}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const { data } = await Api.get(url);
  return data;
};

const getEventProducts = async () => {
  const { data } = await Api.get('/products/event');
  return data;
};
// 문의하기
const getQAList = async (id: number) => {
  const { data } = await Api.get(`/qa/list/${id}`);
  return data;
};
const getQaDetail = async (body: any) => {
  const { data } = await Api.post('/qa/detail', body);
  return data;
};

const insertProductQA = async (body: any) => {
  return await Api.post('/qa/save', body);
};

const getProductInfo = async (itemId: number) => {
  const { data } = await Api.get(`/products/detail/${itemId}`);
  return data;
};

// 병원 정보
const getHospital = async (name?: string) => {
  let url = '/company';
  if (name) {
    url += '/' + name;
  }
  const { data } = await Api.get(url);
  return data;
};

const getHospitalDetail = async (id: number) => {
  const { data } = await Api.get(`/company/detail/${id}`);
  return data;
};
// 진료 내역
const getUserAppointment = async (id: number, page: number) => {
  const { data } = await Api.get(`/appointment/list/${id}/${page}`);
  return data;
};
const getAppointmentDetail = async (id: number) => {
  const { data } = await Api.get(`/appointment/detail/${id}`);
  return data;
};
const insertReview = async (body: any) => {
  return await Api.post('/review/save', body);
};
const userWithdraw = async (password: string) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    password: password,
  };
  return await Api.post('/userWithdraw', data);
};

const getMyPage = async (password: string) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    password: password,
  };
  return await Api.post('/profile', data);
};

const editPassword = async (origin_password: string, new_password: string) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    origin_password: origin_password,
    new_password: new_password,
  };
  return await Api.post('/profile/edit/password', data);
};

const editAddress = async (
  post_number: string,
  address1: string,
  address2: string
) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    post_number: post_number,
    address1: address1,
    address2: address2,
  };
  return await Api.post('/profile/edit/address', data);
};

const editPhone = async (phone: string, auth_code: string) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    phone: phone,
    auth_code: auth_code,
    type: 'update',
  };
  return await Api.post('/profile/edit/phone', data);
};

const getUserId = async () => {
  const user = await AsyncStorage.getItem('@User');
  const user_id = JSON.parse(user!).user_id;
  return user_id;
};

export default {
  tokenChecker,
  setToken,
  signIn,
  getProductGroups,
  getNewestProducts,
  getProductGroupItems,
  getEventProducts,
  getProductInfo,
  autoSignIn,
  getHospital,
  getHospitalDetail,
  getUserAppointment,
  getAppointmentDetail,
  insertProductQA,
  getQAList,
  getQaDetail,
  insertReview,
  userWithdraw,
  signOut,
  getMyPage,
  editPassword,
  editAddress,
  editPhone,
};
