import { get } from '@/utils/api';
export const getTerms = async () => {
  return await get('/terms');
};
