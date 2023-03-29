import API from '@/utils/api';

const Api = new API();

// auth
const signIn = async (body: {user_id: string | undefined; password: string | undefined;}) => {
  const { data } = await Api.post('/auth', body); // DB 상품 그룹
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
  const page = 1;
  const { data } = await Api.get(`/products/items/${productGroup}/${page}`);
  return data;
}

const getEventProducts = async () => {
  const { data } = await Api.get(`/products/event`);
  return data;
}


const getMoreProductItems = async (productGroup: number, page: number) => {
  const { data } = await Api.get(`/products/items/${productGroup}/${page}`);
  return data;
}

const getProductInfo = async (itemId: number) => {
  const { data } = await Api.get(`/products/detail/${itemId}`);
  return data;
}

const getHospital = async () => {
  const { data } = await Api.get(`/company`);
  return data;
}

export default {
  signIn,

  getProductGroups,
  getNewestProducts,
  getProductGroupItems,
  getEventProducts,
  getMoreProductItems,
  getProductInfo,

  getHospital,
}
