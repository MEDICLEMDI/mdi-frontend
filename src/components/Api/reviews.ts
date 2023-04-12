import { post } from '@/utils/api';
export const insertReview = async (body: any) => {
  return await post({ url: '/review/save', body: body });
};
