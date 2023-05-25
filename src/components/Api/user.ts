import { ResponseDTO, User } from '@/interfaces/api';
import { get, post } from '@/utils/api';

/**
 * 유저 마켓팅 정보 수신 동의/거부
 * @param marketingAgree 
 * @returns User
 */
export const updateMarketingFlag = async (
  marketingAgree: boolean
): Promise<User> => {
  const { data } = await post({
    url: '/profile/edit/marketingAgree',
    body: { agreement: marketingAgree },
  });
  return data;
};
