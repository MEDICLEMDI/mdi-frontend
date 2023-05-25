import { IReview, ResponseDTO } from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 리뷰 작성
 * @param body 
 * @returns Promise<ResponseDTO<undefined>>
 */
export const insertReview = async (body: any): Promise<ResponseDTO<undefined>> => {
  return await post({ url: '/reviews/save', body: body });
};

/**
 * 해당 병원에 대한 리뷰리스트 가져오기
 * @param id 
 * @param page 
 * @returns Promise<ResponseDTO<IReview[]>>
 */
export const getReviews = async (id: number, page: number): Promise<ResponseDTO<IReview[]>> => {
  return await get(`/reviews/${id}/${page}`);
}