import { get } from '@/utils/api';

export const getExchangeList = async () => {
  const { data } = await get(`/extlink/exchange`);
  return data;
};
export const getCommunityList = async () => {
  const { data } = await get(`/extlink/sns`);
  return data;
}
export const getMenus = async () => {
  return await get(`/company/menus`, false)
}