import { get, post } from '@/utils/api';

export const getQAList = async (page: number) => {
  const response = await get(`/qa/list/${page}`);
  return response;
};
export const getQaDetail = async (body: any) => {
  const { data } = await post({ url: '/qa/detail', body: body });
  return data;
};
export const insertProductQA = async (body: any) => {
  return await post({ url: '/qa/save', body: body });
};

export const cancelQa = async (body: any) => {
  const data = await post({ url: '/qa/cancel', body: body });
  return data;
};
