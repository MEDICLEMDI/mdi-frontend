import { post } from '@/utils/api';

export const getUserLoginId = async (body: any) => {
  const data = await post({ url: '/findaccount/user_id', body: body, auth: false });
  return data;
};

export const getUserPassword = async (body: any) => {
  const data = await post({ url: '/findaccount/password', body: body, auth: false });
  return data;
};

export const getPhoneAuthCode = async (body: any) => {
  const data = await post({ url: '/phoneauth/reqcode', body: body, auth: false });
  return data;
};

export const getEmailAuthCode = async (body: any) => {
  const data = await post({ url: '/mailauth/reqcode', body: body, auth: false });
  return data;
};

export const checkPhoneAuthCode = async (body: any) => {
  const data = await post({ url: '/phoneauth/checkcode', body: body, auth: false });
  return data;
};

export const checkEmailAuthCode = async (body: any) => {
  const data = await post({ url: '/mailauth/checkcode', body: body, auth: false });
  return data;
};

export const normalSignUp = async (body: any) => {
  const data = await post({ url: '/register/normal', body: body, auth: false });
  return data;
};

export const socialSignUp = async (body: any) => {
  const data = await post({ url: '/register/social', body: body, auth: false });
  return data;
};

export const socialGoogle = async (body: any) => {
  const data = await post({ url: '/social/google', body: body, auth: false });
  return data;
};

export const socialNaver = async (body: any) => {
  const data = await post({ url: '/social/naver', body: body, auth: false });
  return data;
};

export const socialKakao = async (body: any) => {
  const data = await post({ url: '/social/kakao', body: body, auth: false });
  return data;
};