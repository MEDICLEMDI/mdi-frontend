import { post } from '@/utils/api';

export const normalUserWithdraw = async (data: any) => {
  return await post({ url: '/userWithdraw/normal', body: data });
};

export const socialUserWithdraw = async () => {
  return await post({ url: '/userWithdraw/social' });
};

export const getMyPage = async (data: any) => {
  return await post({ url: '/profile', body: data });
};

export const editPassword = async (data: any) => {
  return await post({ url: '/profile/edit/password', body: data });
};

export const editAddress = async (data: any) => {
  return await post({ url: '/profile/edit/address', body: data });
};

export const editPhone = async (phone: string, auth_code: string) => {
  const data = {
    phone: phone,
    auth_code: auth_code,
    type: 'update',
  };
  return await post({ url: '/profile/edit/phone', body: data });
};
