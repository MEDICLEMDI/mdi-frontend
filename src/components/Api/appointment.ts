import {
  IAppointmentDetail,
  IAppointmentItem,
  ResponseDTO,
} from '@/interfaces/api';
import { get, post } from '@/utils/api';
/**
 * 유저 예약 리스트 불러오기
 * @param id number
 * @param page number
 * @returns ResponseDTO<IAppointmentItem>
 */
export const getUserAppointment = async (
  id: number,
  page: number
): Promise<ResponseDTO<IAppointmentItem>> => {
  const response = await get(`/appointment/list/${id}/${page}`);
  return response;
};
/**
 * 유저 예약 상세정보
 * @param id number
 * @returns IAppointmentDetail
 */
export const getAppointmentDetail = async (
  id: number
): Promise<IAppointmentDetail> => {
  const { data } = await get(`/appointment/detail/${id}`);
  return data;
};

/**
 * 유저 예약 취소
 * @param body {id: number}
 * @returns ResponseDTO<IAppointmentDetail>
 */
export const cancelAppointment = async (
  body: any
): Promise<ResponseDTO<IAppointmentDetail>> => {
  const data = await post({ url: '/appointment/cancel', body: body });
  return data;
};
