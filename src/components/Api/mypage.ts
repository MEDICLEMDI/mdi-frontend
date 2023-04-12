import { post } from '@/utils/api';
import { getStorageData } from '@/utils/localStorage';

export const userWithdraw = async (password: string) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    password: password,
  };
  return await post({ url: '/userWithdraw', body: data });
};

export const getMyPage = async (password: string) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    password: password,
  };
  return await post({ url: '/profile', body: data });
};

export const editPassword = async (
  origin_password: string,
  new_password: string
) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    origin_password: origin_password,
    new_password: new_password,
  };
  return await post({ url: '/profile/edit/password', body: data });
};

export const editAddress = async (
  post_number: string,
  address1: string,
  address2: string
) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    post_number: post_number,
    address1: address1,
    address2: address2,
  };
  return await post({ url: '/profile/edit/address', body: data });
};

export const editPhone = async (phone: string, auth_code: string) => {
  const user_id = await getUserId();
  const data = {
    user_id: user_id,
    phone: phone,
    auth_code: auth_code,
    type: 'update',
  };
  return await post({ url: '/profile/edit/phone', body: data });
};

export const getUserId = async () => {
  const user = await getStorageData('@User');
  return user.user_id;
};