import { get, post } from '@/utils/api';
export const getUserAppointment = async (id: number, page: number) => {
  const response = await get(`/appointment/list/${id}/${page}`);
  return response;
};
export const getAppointmentDetail = async (id: number) => {
  const { data } = await get(`/appointment/detail/${id}`);
  return data;
};

export const cancelAppointment = async (body: any) => {
  const data = await post({ url: '/appointment/cancel', body: body });
  return data;
};
