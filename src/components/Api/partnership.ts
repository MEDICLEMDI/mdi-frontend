import { post } from '@/utils/api';

export const partnershipQA = async (data: any) => {
  const response = await post({ url: '/partnership/write', body: data}); 
  return response;
};
