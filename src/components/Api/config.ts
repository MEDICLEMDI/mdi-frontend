import { IExtLink, IHomeMenu, ResponseDTO } from '@/interfaces/api';
import { get } from '@/utils/api';
import { IAppManage } from 'src/store/appManageStore';

/**
 * 거래소 리스트 가져오기
 * @returns IExtLink[]
 */
export const getExchangeList = async (): Promise<IExtLink[]> => {
  const { data } = await get(`/extlink/exchange`);
  return data;
};

/**
 * 커뮤니티 리스트 가져오기
 * @returns IExtLink[]
 */
export const getCommunityList = async (): Promise<IExtLink[]> => {
  const { data } = await get(`/extlink/sns`);
  return data;
};

/**
 * 홈 화면 랜더링을 위해 진료병원과목, 과목에 따른 상품카테고리 가져오기
 * @returns ResponseDTO<IHomeMenu>
 */
export const getMenus = async (): Promise<ResponseDTO<IAppManage>> => {
  return await get(`/company/menus`, false);
};
