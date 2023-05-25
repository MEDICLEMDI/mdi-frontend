import { IPaymnetProduct, IReceiptCount, ResponseDTO } from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 유저가 결제한 상품리스트 가져오기
 * @param user_id
 * @param date
 * @returns Promise<ResponseDTO<IPaymnetProduct[]>>
 */
export const getPaymentHistory = async (
  user_id: number,
  date: any
): Promise<ResponseDTO<IPaymnetProduct[]>> => {
  return await get(`/payment/list/${user_id}/${date.from}/${date.to}`);
};

/**
 * 상품결제
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const productPayment = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  return await post({ url: '/payment', body: body });
};

/**
 * 유저가 결제한 상품갯수 가져오기
 * @param user_id
 * @returns Promise<ResponseDTO<IReceiptCount>>
 */
export const getInfoCount = async (
  user_id: number
): Promise<ResponseDTO<IReceiptCount>> => {
  return await get(`/payment/infocount/${user_id}`);
};

/**
 * pg결제 금액 사전등록
 * @param product_id
 * @returns Promise<ResponseDTO<string>>
 */
export const setPaymentPrepare = async (
  product_id: number
): Promise<ResponseDTO<string>> => {
  return await post({
    url: '/pgcallback/prepare',
    body: { product_id: product_id },
  });
};
