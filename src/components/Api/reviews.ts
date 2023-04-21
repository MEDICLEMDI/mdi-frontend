import { get, post } from '@/utils/api';
export const insertReview = async (body: any) => {
  return await post({ url: '/reviews/save', body: body });
};
export const getReviews = async (id: number, page = 1) => {
  return await get(`/reviews/${id}/${page}`);
}