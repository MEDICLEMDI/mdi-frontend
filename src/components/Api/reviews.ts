import { get, post } from '@/utils/api';
export const insertReview = async (body: any) => {
  return await post({ url: '/reviews/save', body: body });
};
export const getReviews = async (id: number, page: number) => {
  return await get(`/reviews/${id}/${page}`);
}