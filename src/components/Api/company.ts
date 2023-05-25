import {
  ICompanyDetail,
  ICompanyItem,
  ICompanyTimeTable,
  ResponseDTO,
} from '@/interfaces/api';
import { get } from '@/utils/api';

/**
 * 병원 리스트 불러오기
 * @param page {number}
 * @param type  {number}
 * @param search {string?}
 * @returns ResponseDTO<ICompanyItem[]>
 */
export const getHospital = async (
  page: number,
  type: number,
  search?: string
): Promise<ResponseDTO<ICompanyItem[]>> => {
  let url = `/company/list/${page}/${type}`;
  if (search) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};

/**
 * 병원 상세정보 가져오기
 * @param id {number}
 * @returns ICompanyDetail
 */
export const getHospitalDetail = async (
  id: number
): Promise<ICompanyDetail> => {
  const { data } = await get(`/company/detail/${id}`);
  return data;
};

/**
 * 병원 운영시간 가져오기
 * @param company_id {number}
 * @param day {number}
 * @returns ICompanyTimeTable
 */
export const getTimetable = async (
  company_id: number,
  day: number
): Promise<ICompanyTimeTable> => {
  const { data } = await get(`/company/timetable/${company_id}/${day}`);
  return data;
};
