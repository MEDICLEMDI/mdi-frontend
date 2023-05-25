import { ResponseDTO, User } from '@/interfaces/api';
import { post } from '@/utils/api';

/**
 * 일반 회원 탈퇴
 * @param data
 * @returns Promise<ResponseDTO<undefined>>
 */
export const normalUserWithdraw = async (
  data: any
): Promise<ResponseDTO<undefined>> => {
  return await post({ url: '/userWithdraw/normal', body: data });
};

/**
 * 소셜 회원 탈퇴
 * @returns Promise<ResponseDTO<undefined>>
 */
export const socialUserWithdraw = async (): Promise<ResponseDTO<undefined>> => {
  return await post({ url: '/userWithdraw/social' });
};

/**
 * 본인정보 확인 전 비밀번호 검증
 * @param data 
 * @returns Promise<ResponseDTO<undefined>>
 */
export const getMyPage = async (data: any): Promise<ResponseDTO<undefined>> => {
  return await post({ url: '/profile', body: data });
};

/**
 * 유저 비밀번호 수정
 * @param data 
 * @returns Promise<ResponseDTO<undefined>>
 */
export const editPassword = async (data: any): Promise<ResponseDTO<undefined>> => {
  return await post({ url: '/profile/edit/password', body: data });
};

/**
 * 유저 주소지 수정
 * @param data 
 * @returns Promise<ResponseDTO<User>>
 */
export const editAddress = async (data: any): Promise<ResponseDTO<any>> => {
  return await post({ url: '/profile/edit/address', body: data });
};


/**
 * 유저 전화번호 수정
 * @param phone 
 * @param auth_code 
 * @returns Promise<ResponseDTO<User>>
 */
export const editPhone = async (phone: string, auth_code: string): Promise<ResponseDTO<User>> => {
  const data = {
    phone: phone,
    auth_code: auth_code,
    type: 'update',
  };
  return await post({ url: '/profile/edit/phone', body: data });
};
