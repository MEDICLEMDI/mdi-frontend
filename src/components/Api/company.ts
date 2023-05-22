import { get } from '@/utils/api';

export const getHospital = async (page: number, type: number, search?: string) => {
  let url = `/company/list/${page}/${type}`;
  if (search) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};
export const getHospitalDetail = async (id: number) => {
  const { data } = await get(`/company/detail/${id}`);
  return data;
};
export const getTimetable = async (company_id: number, day: number) => {
  const { data } = await get(`/company/timetable/${company_id}/${day}`);
  return data;
}
