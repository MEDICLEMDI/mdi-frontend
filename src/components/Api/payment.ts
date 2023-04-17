import { get, post } from '@/utils/api';

export const getPaymentHistory = async (user_id: number, date: any) => {
  return await get(`/payment/list/${user_id}/${date.from}/${date.to}`);
};

export const productPayment = async (body: any) => {
  return await post({ url: '/payment', body: body });
};

export const getInfoCount = async (user_id: number) => {
  return await get(`/payment/infocount/${user_id}`);
};
