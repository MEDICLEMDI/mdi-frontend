import { get, post } from '@/utils/api';

export const getLikeProducts = async (type: number, page: number) => {
  const data = await get(`/likes/produce/list?type=${type}&page=${page}`);
  return data;
};

export const getUserPassword = async (body: any) => {
  const data = await post({ url: '/findaccount/password', body: body });
  return data;
};

export const setLikeProducts = async (product_id: number) => {
  const body = {
    product_id: product_id,
  };
  const data = await post({ url: 'likes/product', body: body });
  return data;
};

export const setLikeCompanys = async (company_id: number) => {
  const body = {
    company_id: company_id,
  };
  const data = await post({ url: 'likes/company', body: body });
  return data;
};
