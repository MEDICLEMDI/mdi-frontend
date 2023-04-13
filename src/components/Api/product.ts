import {get, post} from '@/utils/api';
export const getProductGroups = async () => {
  const { data } = await get('/products'); // DB 상품 그룹
  return data;
};

export const getNewestProducts = async (page: number, search?: string) => {
  let url = `/products/newest/${page}`;
  if (search) {
    url += '/' + search;
  }
  const { data } = await get(url);
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
  const { data } = await get(url);
  console.log(data);
  return data;
};
export const getEventProducts = async (page: number, search?: string) => {
  let url = `/products/event/${page}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const { data } = await get(url);
  return data;
};

export const getReviewRankLists = async (page: number, search?: string) => {
  let url = `/products/reviews/${page}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const { data } = await get(url);
  return data;
};

export const productPayment = async (body: any) => {
  const data = await post({ url: '/payment', body: body });
  console.log(data);
  return data;
};
