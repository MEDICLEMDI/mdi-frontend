import { get } from '@/utils/api';

export const getNotices = async (page: number) => {
    return await get(`/notices/getNotices/${page}`);
}