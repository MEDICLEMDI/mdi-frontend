import { get } from '@/utils/api';
export const getUserAppointment = async (id: number, page: number) => {
  const { data } = await get(`/appointment/list/${id}/${page}`);
  return data;
};
export const getAppointmentDetail = async (id: number) => {
  const { data } = await get(`/appointment/detail/${id}`);
  return data;
};