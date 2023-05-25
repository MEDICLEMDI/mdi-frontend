import {
  IEventProduct,
  IProductDetail,
  IProductGroup,
  IProductItem,
  ResponseDTO,
} from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 진료과목 리스트 가져오기
 * @returns Promise<ResponseDTO<IProductGroup>>
 */
export const getProductGroups = async (): Promise<
  ResponseDTO<IProductGroup>
> => {
  const { data } = await get('/products'); // DB 상품 그룹
  return data;
};

/**
 * 해당 상품그룹의 제일 최신상품 5개 가져오기
 * @param groupId
 * @returns Promise<ResponseDTO<IProductItem>>
 */
export const getNewestProducts = async (
  groupId: number
): Promise<ResponseDTO<IProductItem>> => {
  const { data } = await get(`/products/newest/${groupId}`);
  return data;
};

/**
 * 선택된 그룹의 상품리스트 가져오기
 * @param productGroup
 * @param page
 * @param search
 * @returns Promise<ResponseDTO<IProductItem[]>>
 */
export const getProductGroupItems = async (
  productGroup: number,
  page: number,
  search?: string
): Promise<ResponseDTO<IProductItem[]>> => {
  let url = `/products/items/${productGroup}/${page}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};

/**
 * 모든 이벤트 상품 가져오기
 * @param page
 * @param type
 * @param search
 * @returns Promise<ResponseDTO<IProductItem[]>>
 */
export const getAllEventProducts = async (
  page: number,
  type: number,
  search?: string
): Promise<ResponseDTO<IProductItem[]>> => {
  let url = `/products/allevent/${page}/${type}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};

/**
 * 랜덤으로 이벤트 카테고리 지정해서 상품리스트 가져오기
 * @param page
 * @param event_id
 * @returns Promise<ResponseDTO<IEventProduct>>
 */
export const getEventProducts = async (
  page: number,
  event_id?: number
): Promise<ResponseDTO<IEventProduct>> => {
  let url = `/products/event/${page}`;
  if (event_id !== undefined) {
    url += '/' + event_id;
  }
  return await get(url);
};

/**
 * 리뷰순 상품리스트 가져오기
 * @param page
 * @param type
 * @param search
 * @returns Promise<ResponseDTO<IProductItem[]>>
 */
export const getReviewRankLists = async (
  page: number,
  type: number,
  search?: string
): Promise<ResponseDTO<IProductItem[]>> => {
  let url = `/products/reviews/${page}/${type}`;
  if (search !== undefined) {
    url += '/' + search;
  }
  const response = await get(url);
  return response;
};

/**
 * 상품 상세정보 가져오기
 * @param itemId
 * @returns IProductDetail
 */
export const getProductInfo = async (
  itemId: number
): Promise<IProductDetail> => {
  const { data } = await get(`/products/detail/${itemId}`);
  return data;
};
