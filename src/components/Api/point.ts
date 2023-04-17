import { get, post } from '@/utils/api';

export const getPointHistory = async (user_id: number, date: any) => {
  return await get(`/userspoint/list/${user_id}/${date.from}/${date.to}`, true);
};