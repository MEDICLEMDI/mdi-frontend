import { get } from '@/utils/api';

export const getHospital = async (page: number, search?: string) => {
  let url = `/company/list/${page}`;
  if (search) {
    url += '/' + search;
  }
  const { data } = await get(url);
  return data;
};
export const getHospitalDetail = async (id: number) => {
  const { data } = await get(`/company/detail/${id}`);
  return data;
};
export const getTimetable = async (company_id: number, day: number) => {
  const { data } = await get(`/company/timetable/${company_id}/${day}`);
  return data;
}
