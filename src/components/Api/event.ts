import { IEvent, ResponseDTO } from '@/interfaces/api';
import { get } from '@/utils/api';

/**
 * 이벤트 리스트 가져오기 (상품x 이벤트 리스트)
 * @returns ResponseDTO<IEvent>
 */
export const getEventLists = async (): Promise<ResponseDTO<IEvent>> => {
  const data = await get('/event');
  return data;
};
