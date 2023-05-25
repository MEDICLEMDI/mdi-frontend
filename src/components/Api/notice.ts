import { INotice, ResponseDTO } from '@/interfaces/api';
import { get } from '@/utils/api';

/**
 * 공지사항 리스트 가져오기
 * @param page
 * @returns Promise<ResponseDTO<INotice[]>>
 */
export const getNotices = async (
  page: number
): Promise<ResponseDTO<INotice[]>> => {
  return await get(`/notices/getNotices/${page}`);
};
