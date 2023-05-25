import { ITerm, ResponseDTO } from '@/interfaces/api';
import { get } from '@/utils/api';

/**
 * 약관 리스트(링크) 가져오기
 * @returns Promise<ResponseDTO<ITerm[]>>
 */
export const getTerms = async (): Promise<ResponseDTO<ITerm[]>> => {
  return await get('/terms');
};
