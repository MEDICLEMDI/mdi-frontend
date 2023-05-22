import { get, post } from '@/utils/api';

export const getLikeProducts = async () => {
  const data = await get('/likes/product/list');
  return data;
};

export const getLikeCompanys = async () => {
  const data = await get('/likes/company/list');
  return data;
};

export const setLikeProducts = async (body: any) => {
  const data = await post({ url: '/likes/product', body: body });
  return data;
};

export const setLikeCompanys = async (body: any) => {
  const data = await post({ url: '/likes/company', body: body });
  return data;
};

