import API from '@/utils/api';

const Api = new API();

// auth
const signIn = async (body: {
  user_id: string | undefined;
  password: string | undefined;
}) => {
  await Api.isJWTToken();
  const { data } = await Api.post('/auth', body); // DB 상품 그룹
  return data;
};

const autoSignIn = async () => {
  return await Api.get('/auth/check');
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

const getProductGroupItems = async (productGroup: number) => {
  const page = 1;
  const { data } = await Api.get(`/products/items/${productGroup}/${page}`);
  return data;
};

const getEventProducts = async () => {
  const { data } = await Api.get('/products/event');
  return data;
};

const getMoreProductItems = async (productGroup: number, page: number) => {
  const { data } = await Api.get(`/products/items/${productGroup}/${page}`);
  return data;
};

const getProductInfo = async (itemId: number) => {
  const { data } = await Api.get(`/products/detail/${itemId}`);
  return data;
};

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

const userWithdraw = async (body: {
  user_id: string | undefined;
  password: string | undefined;
}) => {
  return await Api.post('/userWithdraw', body);
};

export default {
  signIn,
  getProductGroups,
  getNewestProducts,
  getProductGroupItems,
  getEventProducts,
  getMoreProductItems,
  getProductInfo,
  autoSignIn,
  getHospital,
  getHospitalDetail,
  userWithdraw,
};
