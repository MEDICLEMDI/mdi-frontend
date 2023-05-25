import { IPointHistory, ResponseDTO } from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 포인트 거래 리스트 불러오기
 * @param user_id
 * @param date
 * @returns Promise<ResponseDTO<IPointHistory[]>>
 */
export const getPointHistory = async (
  user_id: number,
  date: any
): Promise<ResponseDTO<IPointHistory[]>> => {
  return await get(`/userspoint/list/${user_id}/${date.from}/${date.to}`, true);
};
