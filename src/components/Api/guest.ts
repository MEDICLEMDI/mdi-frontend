import { IKakao, INaver, LoginInfo, ResponseDTO } from '@/interfaces/api';
import { post } from '@/utils/api';
/**
 * 유저 이메일 아이디 찾기 (마스킹된 이메일아이디 보여줌)
 * @param body
 * @returns ResponseDTO<string>
 */
export const getUserLoginId = async (
  body: any
): Promise<ResponseDTO<string>> => {
  const data = await post({
    url: '/findaccount/user_id',
    body: body,
    auth: false,
  });
  return data;
};

/**
 * 유저 비밀번호 찾기 (유저의 이메일로 임시 비밀번호 발금)
 * @param body
 * @returns ResponseDTO<undefined>
 */
export const getUserPassword = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({
    url: '/findaccount/password',
    body: body,
    auth: false,
  });
  return data;
};

/**
 * 핸드폰 인증코드 발송
 * @param body
 * @returns <ResponseDTO<undefined>>
 */
export const getPhoneAuthCode = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({
    url: '/phoneauth/reqcode',
    body: body,
    auth: false,
  });
  return data;
};

/**
 * 이메일 인증코드 발송
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const getEmailAuthCode = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({
    url: '/mailauth/reqcode',
    body: body,
    auth: false,
  });
  return data;
};

/**
 * 핸드폰 인증코드 확인
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const checkPhoneAuthCode = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({
    url: '/phoneauth/checkcode',
    body: body,
    auth: false,
  });
  return data;
};

/**
 * 이메일 인증코드 확인
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const checkEmailAuthCode = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({
    url: '/mailauth/checkcode',
    body: body,
    auth: false,
  });
  return data;
};

/**
 * 일반 회원가입
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const normalSignUp = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({ url: '/register/normal', body: body, auth: false });
  return data;
};

/**
 * 소셜 회원가입
 * @param body
 * @returns Promise<ResponseDTO<undefined>>
 */
export const socialSignUp = async (
  body: any
): Promise<ResponseDTO<undefined>> => {
  const data = await post({ url: '/register/social', body: body, auth: false });
  return data;
};

/**
 * 소셜 구글 진행 회원가입 or 로그인 프로세스
 * @param body
 * @returns Promise<ResponseDTO<undefined|LoginInfo>>
 */
export const socialGoogle = async (
  body: any
): Promise<ResponseDTO<undefined | LoginInfo>> => {
  const data = await post({ url: '/social/google', body: body, auth: false });
  return data;
};

/**
 * 소셜 네이버 진행 회원가입 or 로그인 프로세스
 * @param body
 * @returns Promise<ResponseDTO<undefined|INaver>>
 */
export const socialNaver = async (
  body: any
): Promise<ResponseDTO<undefined | INaver>> => {
  const data = await post({ url: '/social/naver', body: body, auth: false });
  return data;
};

/**
 * 소셜 카카오 진행 회원가입 or 로그인 프로세스
 * @param body
 * @return Promise<ResponseDTO<undefined|IKakao>>
 */
export const socialKakao = async (
  body: any
): Promise<ResponseDTO<undefined | IKakao>> => {
  const data = await post({ url: '/social/kakao', body: body, auth: false });
  return data;
};
