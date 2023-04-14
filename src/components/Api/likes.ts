import { get, post } from '@/utils/api';

export const getLikeProducts = async (type: number, page: number) => {
  const data = await get(`/likes/produce/list?type=${type}&page=${page}`);
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
