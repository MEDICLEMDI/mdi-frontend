import { ResponseDTO } from '@/interfaces/api';
import { post } from '@/utils/api';

/**
 * 제휴문희 등록하기
 * @param data
 * @returns Promise<ResponseDTO<undefined>>
 */
export const partnershipQA = async (
  data: any
): Promise<ResponseDTO<undefined>> => {
  const response = await post({ url: '/partnership/write', body: data });
  return response;
};
