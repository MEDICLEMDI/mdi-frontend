import { ICompanyItem, IProductItem, ResponseDTO } from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 유저가 좋아요한 상품리스트 불러오기
 * @returns Promise<ResponseDTO<IProductItem[]>>
 */
export const getLikeProducts = async (): Promise<ResponseDTO<IProductItem[]>> => {
  const data = await get('/likes/product/list');
  return data;
};

/**
 * 유저가 좋아요한 병원리스트 불러오기
 * @returns Promise<ResponseDTO<ICompanyItem[]>>
 */
export const getLikeCompanys = async (): Promise<ResponseDTO<ICompanyItem[]>> => {
  const data = await get('/likes/company/list');
  return data;
};

/**
 * 해당 상품 좋아요 설정/해제
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const setLikeProducts = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({ url: '/likes/product', body: body });
  return data;
};

/**
 * 해당 병원 좋아요 설정/해제
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const setLikeCompanys = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({ url: '/likes/company', body: body });
  return data;
};
