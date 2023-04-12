import { post } from '@/utils/api';

export const getUserLoginId = async (body: any) => {
  const data = await post({ url: '/findaccount/user_id', body: body });
  return data;
};

export const getPhoneAuthCode = async (body: any) => {
  const data = await post({ url: '/phoneauth/reqcode', body: body });
  return data;
};

export const getEmailAuthCode = async (body: any) => {
  const data = await post({ url: '/mailauth/reqcode', body: body });
  return data;
};

export const checkPhoneAuthCode = async (body: any) => {
  const data = await post({ url: '/phoneauth/checkcode', body: body });
  return data;
};

export const checkEmailAuthCode = async (body: any) => {
  const data = await post({ url: '/mailauth/checkcode', body: body });
  return data;
};

export const signUp = async (body: any) => {
  const data = await post({ url: '/register', body: body });
  return data;
};
