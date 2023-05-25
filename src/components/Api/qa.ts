import { IQaDetail, IQaItem, ResponseDTO } from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 유저 문의 리스트 가져오기
 * @param page
 * @returns Promise<ResponseDTO<IQaItem>>
 */
export const getQAList = async (
  page: number
): Promise<ResponseDTO<IQaItem>> => {
  const response = await get(`/qa/list/${page}`);
  return response;
};

/**
 * 유저 문의 상세정보
 * @param body
 * @returns IQaDetail
 */
export const getQaDetail = async (
  body: any
): Promise<IQaDetail> => {
  const { data } = await post({ url: '/qa/detail', body: body });
  return data;
};

/**
 * 문의 등록
 * @param body
 * @returns :Promise<ResponseDTO<undefined>>
 */
export const insertProductQA = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  return await post({ url: '/qa/save', body: body });
};

/**
 * 문의 취소
 * @param body
 * @returns :Promise<ResponseDTO<undefined>>
 */
export const cancelQa = async (body: any): Promise<ResponseDTO<undefined>> => {
  const data = await post({ url: '/qa/cancel', body: body });
  return data;
};
