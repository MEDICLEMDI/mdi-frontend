import API from '@/utils/api';
import {URLSearchParams} from "url";

const Api = new API();

const getProductGroups = async () => {
  const { data } = await Api.get('/products'); // DB 상품 그룹
  return data;
}

const getNewestProducts = async () => {
  const { data } = await Api.get(`/products/newest`);
  return data;
}

const getProductGroupItems = async (productGroup: number) => {
  const { data } = await Api.get(`/products/items/${productGroup}`);
  return data;
}

const getItemInfo = async (itemId: number) => {
  const { data } = await Api.get(`/products/detail/${itemId}`);
  return data;
}

export default { getProductGroups, getNewestProducts, getProductGroupItems, getItemInfo }
