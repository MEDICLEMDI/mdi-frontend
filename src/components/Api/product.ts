import {get, post} from '@/utils/api';
export const getProductGroups = async () => {
  const { data } = await get('/products'); // DB 상품 그룹
  return data;
};

export const getNewestProducts = async (groupId: number) => {
  const { data } = await get(`/products/newest/${groupId}`);
  return data;
};

export const getProductGroupItems = async (
  productGroup: number,
  page: number,
  search?: string
) => {
  let url = `/products/items/${productGroup}/${page}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};
export const getAllEventProducts = async (page: number, type: number, search?: string) => {
  let url = `/products/allevent/${page}/${type}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};
export const getEventProducts = async (page: number, event_id?: number) => {
  let url = `/products/event/${page}`;
  if(event_id !== undefined) {
    url += '/'+event_id;
  }
  return await get(url);
}

export const getReviewRankLists = async (page: number, type: number, search?: string) => {
  let url = `/products/reviews/${page}/${type}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};

export const getProductInfo = async (itemId: number) => {
  const { data } = await get(`/products/detail/${itemId}`);
  return data;
};
